'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { separateDateRegister } from '@/utils';

interface IRProfile {
    name: string;
    pin: string;
    id: string;
    user: string;
    phone: string;
    purchaseDate: string;
    renewalDate: string;
    numberMonths: number;
    price: number;
    total: number
}

export const createProfile = async (data: IRProfile) => {

    try {

        const { name, pin, id, user, phone, purchaseDate, renewalDate, price, numberMonths, total } = data;

        const dbAccount = await prisma.account.findUnique({
            select: {
                numberProfiles: true,
                profiles: true
            },
            where: {
                id: id
            }
        });

        if (!dbAccount) {
            return {
                status: false,
                message: 'No encontramos la cuenta'
            }
        }

        const dbfinan = await prisma.financialReport.findFirst({ where: { accountId: id } });

        if (!dbfinan) {
            return {
                status: false,
                message: 'No pudimos encontrar el historial de renovaciones de la cuenta'
            }
        }

        const totalPro = dbAccount.profiles.length;
        const numbePro = dbAccount.numberProfiles;

        if (totalPro >= numbePro) {
            return {
                status: false,
                message: 'Se alcanzo el limite de perfiles permitidos'
            }
        }

        const startTime = separateDateRegister(purchaseDate);
        const endTime = separateDateRegister(renewalDate);

        await prisma.$transaction(async (tx) => {

            await tx.profile.create({
                data: {
                    name: name.trim().toLocaleLowerCase(),
                    pin,
                    accountId: id,
                    status: true,
                    rental: {
                        create: {
                            user: user.trim().toLocaleLowerCase(),
                            phone: phone.trim().toLocaleLowerCase(),
                            purchaseDate: startTime,
                            renewalDate: endTime,
                            renewals: {
                                create: {
                                    purchaseDate: startTime,
                                    renewalDate: endTime,
                                    numberMonths: +numberMonths,
                                    total: +total,
                                    price: +price,
                                }
                            }
                        }
                    }
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

        revalidatePath(`/admin/accounts/profiles/${id}`);

        return {
            status: true,
            message: 'Pefil registrado'
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
