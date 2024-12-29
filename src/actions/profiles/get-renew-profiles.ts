'use server';

import prisma from '@/lib/prisma';
import { getDateCurrentRenew, normalizeReport } from '@/utils';

export const getRenewProfiles = async () => {
    try {

        const { newToday, newDaysFromNow } = getDateCurrentRenew(3)

        const rentals = await prisma.rental.findMany({
            include: {
                perfil: {
                    select: {
                        accounts: {
                            select: {
                                categoria: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy:{
                renewalDate: 'asc'
            },
            where: {
                OR: [
                    {
                        renewalDate: {
                            lt: newToday, //! Menor que la fecha actual
                        },
                    },
                    {
                        renewalDate: {
                            gte: newToday,
                            lte: newDaysFromNow, //! Entre la fecha actual y 3 días en el futuro
                        },
                    },
                ],
            },
        });

        const newRentals = rentals.map(({ perfil, ...rests }) => ({
            ...rests,
            category: perfil.accounts.categoria.name,
            purchaseDate: normalizeReport(rests.purchaseDate),
            renewalDate: normalizeReport(rests.renewalDate)
        }))

        return {
            status: true,
            message: 'Ok',
            rentals: newRentals
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                rentals: []
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            rentals: []
        }
    }
}
