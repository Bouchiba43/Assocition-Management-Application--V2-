import {v4 as uuidv4} from 'uuid';
import crypto from 'crypto';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';

export const generateTwoFactorToken = async (email : string) => {
    const token = crypto.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 5* 60 * 1000);
    const createdAt = new Date();

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where:{
                id : existingToken.id
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
            createdAt
        }
    })

    return twoFactorToken;
}

export const generatePasswordResetToken = async (email : string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const createdAt = new Date();

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where:{
                id : existingToken.id
            }
        })
    } 

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
            createdAt
        }
    })

    return passwordResetToken;
}

export const generateVerificationToken = async (email : string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const createdAt = new Date();

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where:{
                id : existingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
            createdAt
        }
    })

    return verificationToken;
}