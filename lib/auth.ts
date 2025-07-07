import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/prisma/generated/prisma";
import { nextCookies } from "better-auth/next-js";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";
import nodemailer from "nodemailer";
import React from "react";
import { render } from "@react-email/components";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail({ to, subject, reactBody }: { to: string; subject: string; reactBody: React.ReactElement }) {
  const html = await render(reactBody);
  await transporter.sendMail({
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
    to,
    subject,
    html,
  });
}

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await sendMail({
                to: user.email,
                subject: `Hey ${user.name}! Verify your SafeBites email`,
                reactBody: VerifyEmail({ username: user.name, verifyUrl: url }),
            });
        },
        sendOnSignUp: true,
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await sendMail({
                to: user.email,
                subject: "Reset your SafeBites password",
                reactBody: ForgotPasswordEmail({ username: user.name, resetUrl: url, userEmail: user.email }),
            });
        },
        requireEmailVerification: true
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [nextCookies()]
})