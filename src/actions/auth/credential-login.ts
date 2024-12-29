'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const credentialLogin = async (email: string, pass:string) => {

    try {

         const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

         if (!user) return null;

         if (!bcryptjs.compareSync(pass, user.password)) return null;

         const { password, ...rest } = user;

        return rest;

    } catch (error) {
        return null
    }
}
