'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { separateDateRegister } from '@/utils';

interface IRenew {
    id: string;
    idAccount: string;
    price: number;
    numberMonths: number;
    total: number;
    purchaseDate: string;
    renewalDate: string;
}

export const createRenewalProfile = async (data: IRenew) => {
    try {

        const { id, idAccount, purchaseDate, renewalDate, price, numberMonths, total } = data;

        const dbProfile = await prisma.profile.findUnique({ where: { id: id } });

        if (!dbProfile) {
            return {
                status: false,
                message: 'No encontramos el perfil'
            }
        }

        const dbAccount = await prisma.account.findUnique({ where: { id: idAccount } });

        if (!dbAccount) {
            return {
                status: false,
                message: 'No encontramos la cuenta asignada a este ferfil'
            }
        }

        const dbfinan = await prisma.financialReport.findFirst({ where: { accountId: dbAccount.id } });

        if (!dbfinan) {
            return {
                status: false,
                message: 'No pudimos encontrar el historial de renovaciones de la cuenta'
            }
        }

        const startTime = separateDateRegister(purchaseDate);
        const endTime = separateDateRegister(renewalDate);

        //! Verificar si hay conflictos en la base de datos
        const overlappingRentals = await prisma.rental.findMany({
            where: {
                profileId:id,
                OR: [
                    //! Caso 1: Reservas que empiezan antes de la nueva reserva pero terminan durante o después
                    {
                        purchaseDate: {
                            lte: startTime,
                        },
                        renewalDate: {
                            gte: startTime,
                        },
                    },
                    //! Caso 2: Reservas que empiezan durante el nuevo rango
                    {
                        purchaseDate: {
                            lte: endTime,
                            gte: startTime,
                        },
                    },
                ]
            },
        });

        if (overlappingRentals.length > 0) {
            throw new Error('El rango de tiempo, ya está renovado');
        }

        await prisma.$transaction(async (tx) => {

            await tx.rental.update({
                data: {
                    purchaseDate: startTime,
                    renewalDate: endTime,
                    renewals: {
                        createMany: {
                            data: {
                                purchaseDate: startTime,
                                renewalDate: endTime,
                                numberMonths: +numberMonths,
                                total: +total,
                                price: +price,
                            }
                        }
                    }
                },
                where: {
                    profileId: id
                }
            });

            await tx.financialReport.updateMany({
                data: {
                    entries: {
                        increment: +total
                    },
                    utility: {
                        increment: +total
                    }
                },
                where: {
                    id: dbfinan.id
                }
            })
        })

        revalidatePath(`/admin/accounts/profiles/detail/${id}`);

        return {
            status: true,
            message: 'Renovación agregada'
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
