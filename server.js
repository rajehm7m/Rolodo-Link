const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// إعدادات البريد الصحيحة اللي جربناها وضبطت
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rajehmm7m@gmail.com',
        pass: 'vlmfimbkycqtogsk'
    }
});

// دالة توليد كود عشوائي من 6 أرقام
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// مسار إرسال كود التحقق
app.post('/send-code', async (req, res) => {
    const { to } = req.body;
    const code = generateCode(); 

    try {
        await transporter.sendMail({
            from: 'rajehmm7m@gmail.com',
            to: to,
            subject: "كود التحقق الخاص بك",
            text: `كود التحقق الخاص بك هو: ${code}`
        });
        
        res.status(200).json({ success: true, message: 'تم إرسال الكود!', code: code });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'فشل الإرسال', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});