'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { encryptPasswordAsync, separateDateRegister } from '@/utils';
import { isAfter } from 'date-fns';

type IRaccount = {
    id: string;
    categoryId: string;
    supplierId: string;
    price: number;
    numberMonths: number;
    total: number;
    email: string;
    password: string;
    numberProfiles: number;
    purchaseDate: string;
    renewalDate: string;
}

export const createNewRenewals = async (data: IRaccount) => {

    const {
        id,
        price,
        numberMonths,
        total,
        password,
        categoryId,
        supplierId,
        email,
        numberProfiles,
        purchaseDate,
        renewalDate,
    } = data;

    try {

        const startTime = separateDateRegister(purchaseDate);
        const endTime = separateDateRegister(renewalDate);

        if (isAfter(startTime, endTime)) {
            throw new Error('El tiempo de compra debe ser antes del tiempo de renovación');
        }

        const dbCategory = await prisma.category.findUnique({ where: { id: categoryId } });

        if (!dbCategory) {
            return {
                status: false,
                message: 'No pudimos encontrar la categoría'
            }
        }

        const dbSupplier = await prisma.supplier.findUnique({ where: { id: supplierId } });

        if (!dbSupplier) {
            return {
                status: false,
                message: 'No pudimos encontrar al proveedor'
            }
        }

        const dbAccount = await prisma.account.findUnique({
            select: {
                profiles: true
            },
            where: { id: id }
        });

        if (!dbAccount) {
            return {
                status: false,
                message: 'No pudimos encontrar la cuenta'
            }
        }

        const dbRenewals = await prisma.renewalAccounts.findFirst({ where: { accountId: id } });

        if (!dbRenewals) {
            return {
                status: false,
                message: 'No pudimos encontrar el historial de nevovaciones de la cuenta'
            }
        }

        const totalPro = dbAccount.profiles.length;

        if (dbAccount.profiles.length > +numberProfiles) {
            return {
                status: false,
                message: `Actualmente existen ${totalPro} perfiles y estas tratando de agregar menos de los que esta comprando`
            }
        }

        //! Verificar si hay conflictos en la base de datos
        const overlappingRentals = await prisma.account.findMany({
            where: {
                id: id,
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
                ],
            },
        });

        if (overlappingRentals.length > 0) {
            throw new Error('El rango de tiempo ya está renovado');
        }

        const { iv, newPass } = await encryptPasswordAsync(password);

        await prisma.$transaction(async (tx) => {

            await tx.account.update({
                data: {
                    numberProfiles: +numberProfiles,
                    email,
                    password: newPass,
                    iv,
                    categoryId,
                    supplierId,
                    purchaseDate: startTime,
                    renewalDate: endTime,
                    renewals: {
                        create: {
                            purchaseDate: startTime,
                            numberMonths: +numberMonths,
                            renewalDate: endTime,
                            price: +price,
                            total: +total,
                        }
                    }
                },
                where: {
                    id: id
                }
            })

            await tx.financialReport.updateMany({
                data: {
                    category: dbCategory.name,
                    categoryId: dbCategory.id,
                    supplier: dbSupplier.name,
                    supplierId: dbSupplier.id,
                    accountId: id,
                    email: email.trim().toLocaleLowerCase(),
                    expenses: {
                        increment: +total
                    },
                    utility: {
                        decrement: +total
                    }
                },
                where: {
                    accountId: id
                }
            })
        })

        revalidatePath(`/admin/accounts/renewals/${id}`);

        return {
            status: true,
            message: 'Cuenta renovada'
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
