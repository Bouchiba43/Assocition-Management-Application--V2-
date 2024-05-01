
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

    const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #333;">Email Verification</h1>
            <p>Welcome to our community!</p>
            <p>
                Please verify your email address to complete your registration. Click the
                link below to confirm your account:
            </p>
            <p>
                <a
                href="${confirmLink}"
                style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                "
                >
                Verify Email
                </a>
            </p>
            <p>If you didn't create an account with us, please ignore this email.</p>
            <p>Thank you!</p>
            <p>Bouchiba Dev</p>
            </div>
        `;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: htmlContent
    });
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

    const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #333;">Password Reset</h1>
            <p>We received a request to reset your password.</p>
            <p>
                Click the link below to reset your password:
            </p>
            <p>
                <a
                href="${resetLink}"
                style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                "
                >
                Reset Password
                </a>
            </p>
            <p>If you didn't request a password reset, please ignore this email.</p>
            <p>Thank you!</p>
            <p>Bouchiba Dev</p>
            </div>
        `;

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset your password',
            html: htmlContent
        });
}