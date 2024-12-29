import prisma from '@/lib/prisma';
import { normalizeDateAacc } from '@/utils';

export const getAccounts = async () => {
    try {

        const accounts = await prisma.account.findMany({
            select: {
                id: true,
                email: true,
                numberProfiles: true,
                password: false,
                purchaseDate: true,
                renewalDate: true,
                iv: false,
                categoria: {
                    select: {
                        name: true
                    }
                },
                proveedor: {
                    select: {
                        company: true
                    }
                }
            },
            orderBy:{
                renewalDate:'asc'
            }
        });

        const newAccounts = accounts.map(({ categoria, proveedor, ...rests }) => ({
            ...rests,
            category: categoria.name,
            supplier: proveedor.company,
            purchaseDate: normalizeDateAacc(rests.purchaseDate),
            renewalDate: normalizeDateAacc(rests.renewalDate)
        }))

        return {
            status: true,
            message: 'Ok',
            accounts: newAccounts
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                accounts: [],
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            accounts: [],
            total:0
        }
    }
}
