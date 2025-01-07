import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'van57@ethereal.email',
        pass: 'dUC1EH6pevZUKyDExZ'
    }
});


export type EmailOption = {
    from?: string; // email nguồn
    to: string | string[]; // email nhận (1 hoặc nhiều email)
    subject: string; // tiêu đề email
    text?: string; // option 1: chỉ gửi mỗi nội dung là chữ cái
    html?: string; // option 2: gửi nội dung email có chứa giao diện bằng html/css
};


export const sendOTPEmailUtil = async (email: string, otp: string): Promise<void> => {
    const mailOptions: EmailOption = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Mã OTP đã được gửi đến bạn',
        html: `
                <h1>Mã OTP của bạn là: ${otp}</h1>
                <p>Vui lòng sử dụng mã OTP này để đăng nhập vào tài khoản của bạn.</p>
            `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendResetPasswordEmail = async (to: string, token: string) => {
    const resetUrl = `http://localhost:5000/auth/reset-password/${token}`;
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject: 'Reset Your Password',
        html: `<p>Click the link below to reset your password:</p>
             <a href="${resetUrl}">Reset Password</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset password email sent to:', to);
    } catch (error) {
        console.error('Error sending reset password email:', error);
    }
};
