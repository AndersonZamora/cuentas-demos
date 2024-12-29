import prisma from '@/lib/prisma';
import { normalizeDateAacc } from '@/utils';

export const getDetailProfileByid = async (id: string) => {
    try {

        const dbProfile = await prisma.profile.findUnique({
            select: {
                id: true,
                name: true,
                pin: true,
                accountId: true,
                rental: {
                    select: {
                        id: true,
                        phone: true,
                        user: true,
                        purchaseDate: true,
                        renewalDate: true,
                        renewals: {
                            orderBy: {
                                purchaseDate: 'desc',
                            }
                        }
                    },
                },
                accounts: {
                    select: {
                        id: true,
                        categoria: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            },

            where: {
                id: id
            },

        })

        if (!dbProfile) {
            return {
                status: false,
                message: 'No encontramos el perfil',
                profile: null
            }
        }

        if (!dbProfile.rental) {
            return {
                status: false,
                message: 'No encontramos al usuario',
                profile: null
            }
        }

        const { accounts, ...newProf } = dbProfile;

        const reportRenewal = await prisma.renewalProfile.aggregate({
            _sum: {
                total: true,
            },
            where: {
                rentalId: dbProfile.rental.id
            },
        });

        const newProfile = {
            ...newProf,
            total:reportRenewal._sum.total,
            category: accounts.categoria.name,
            rental: {
                ...dbProfile.rental,
                purchaseDate: normalizeDateAacc(dbProfile.rental.purchaseDate || new Date()),
                renewalDate: normalizeDateAacc(dbProfile.rental.renewalDate || new Date()),
                renewals: dbProfile.rental.renewals.map(data => ({
                    ...data,
                    purchaseDate: normalizeDateAacc(data.purchaseDate || new Date()),
                    renewalDate: normalizeDateAacc(data.renewalDate || new Date()),
                })) || []
            }
        }

        return {
            status: true,
            message: 'Ok',
            profile: newProfile
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                profile: null
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            profile: null
        }
    }
}
