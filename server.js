const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ==========================================
// 1. الاتصال بـ MongoDB Atlas
// ==========================================
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// ==========================================
// 2. تصميم شكل جدول المستخدمين (Schema)
// ==========================================
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ==========================================
// 3. مسار التسجيل (Register)
// ==========================================
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // التأكد هل المستخدم موجود مسبقاً
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'اسم المستخدم مستخدم مسبقاً!' });
        }

        // إنشاء وحفظ المستخدم الجديد
        const newUser = new User({ username, password });
        await newUser.save();

        res.json({ success: true, message: 'User registered successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// مسار الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
