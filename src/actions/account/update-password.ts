'use server';

import prisma from '@/lib/prisma';
import { encryptPasswordAsync } from '@/utils';

interface Props {
    id: string,
    code: string,
    email: string,
    password: string,
}

export const updatePassword = async ({ id, code, email, password }: Props) => {
    try {

        const codeen = process.env.NEXT_PUBLIC_CODE;

        if (codeen !== code) {
            throw new Error('Error 8988 no controlado - contacte al administrador');
        }

        const dbAccount = await prisma.account.findUnique({ where: { id } });

        if (!dbAccount) {
            throw new Error('No pudimos encontrar la cuenta');
        }

        const { iv, newPass } = await encryptPasswordAsync(password)

        await prisma.account.updateMany({
            data: {
                password: newPass,
                iv,
                email,
            },
            where: {
                id
            }
        })

        return {
            status: true,
            message: 'Contraseña actualizada',
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
