'use server';

import prisma from '@/lib/prisma';
import { decryptPasswordAsync } from '@/utils';

interface Props {
    id: string,
    code: string
}

export const decryAccount = async ({ id, code }: Props) => {
    try {

        const codeen = process.env.NEXT_PUBLIC_CODE;

        if (codeen !== code) {
            throw new Error('Error 8988 no controlado - contacte al administrador');
        }

        const dbAccount = await prisma.account.findUnique({ where: { id } });

        if (!dbAccount) {
            throw new Error('No pudimos encontrar la cuenta');
        }

        const { decryptedData } = await decryptPasswordAsync(dbAccount.password, dbAccount.iv)

        return {
            status: true,
            message: decryptedData,
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
