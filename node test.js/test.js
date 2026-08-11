const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rajehmm7m@gmail.com',
        pass: 'vlmfimbkycqtogsk'
    }
});

async function send() {
    try {
        let info = await transporter.sendMail({
            from: 'rajehmm7m@gmail.com',
            to: 'rajehmm7m@gmail.com',
            subject: 'تجربة كود',
            text: 'اشتغل يا وحش!'
        });
        console.log('تم الإرسال بنجاح: ' + info.response);
    } catch (error) {
        console.error('فشل الإرسال:', error);
    }
}

send();