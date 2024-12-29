'use server';

import prisma from '@/lib/prisma';
import { normalizeDateAacc } from '@/utils';

export const getRenewalsBy = async (id: string) => {

    try {

        const renewal = await prisma.account.findFirst({
            select: {
                categoria: {
                    select: {
                        name: true
                    }
                },
                proveedor: {
                    select: {
                        company: true
                    }
                },
                id: true,
                numberProfiles: true,
                email: true,
                renewals: {
                    orderBy: {
                        purchaseDate: 'desc'
                    }
                },
                purchaseDate: true,
                renewalDate: true,
                profiles: {
                    select:{
                        rental:{
                             select:{
                                renewals:true,
                             }
                        }
                    }
                }
            },
            where: {
                id: id
            }
        });

        if (!renewal) {
            return {
                status: false,
                message: 'No pudimos encontrar la cuenta',
                renewal: null
            }
        }

        const reportRenewal = await prisma.renewalAccounts.aggregate({
            _sum: {
                total: true,
            },
            where: {
                accountId:id
            },
        });

        let total= 0;

        renewal.profiles.forEach(data => {
            const subsTotal = data.rental?.renewals.reduce((subTotal, product) => (product.total) + subTotal, 0) || 0
            total = total +subsTotal;
        })

        const { categoria, proveedor,profiles, ...rests } = renewal;

        const egresos = reportRenewal._sum.total || 0;

        const newRenewal = {
            ...rests,
            ingresos:total,
            egressos:egresos,
            utilidad:total - egresos,
            idAccount: rests.id,
            category: renewal.categoria.name,
            supplier: renewal.proveedor.company,
            purchaseDate: normalizeDateAacc(rests.purchaseDate),
            renewalDate: normalizeDateAacc(rests.renewalDate),
            renewals: rests.renewals.map(data => ({
                ...data,
                purchaseDate: normalizeDateAacc(data.purchaseDate),
                renewalDate: normalizeDateAacc(data.renewalDate)
            }))
        }

        return {
            status: true,
            message: 'Ok',
            renewal: newRenewal
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                renewal: null,
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            renewal: null,
        }
    }
}
