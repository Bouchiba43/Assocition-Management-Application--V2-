import { userRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: userRole;
    isTwoFactorEnabled: boolean;
}

declare module "next-auth" {
    interface Session{
        user: ExtendedUser;
    }
}