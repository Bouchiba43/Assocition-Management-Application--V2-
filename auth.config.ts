import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import type { NextAuthConfig } from "next-auth";

import bcrypt from "bcryptjs";

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
        Credentials({
            async authorize(credentials) {
        
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user  = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch)  return user;
                }
                return null;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
}satisfies NextAuthConfig