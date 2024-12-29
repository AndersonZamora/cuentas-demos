'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { encryptPasswordAsync, separateDateRegister } from '@/utils';
import { isAfter } from 'date-fns';

type IRaccount = {
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

export const createAccount = async (data: IRaccount) => {

    const {
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

        const { iv, newPass } = await encryptPasswordAsync(password);

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

        await prisma.$transaction(async (tx) => {

            const newAccount = await tx.account.create({
                data: {
                    numberProfiles: +numberProfiles,
                    email: email.trim().toLocaleLowerCase(),
                    password: newPass,
                    iv,
                    purchaseDate: startTime,
                    renewalDate: endTime,
                    categoryId: categoryId,
                    supplierId: supplierId,
                    renewals: {
                        create: {
                            purchaseDate: startTime,
                            numberMonths: +numberMonths,
                            renewalDate: endTime,
                            price: +price,
                            total: +total,
                        }
                    }
                }
            })

            await tx.financialReport.createMany({
                data: {
                    category: dbCategory.name,
                    categoryId: dbCategory.id,
                    supplier: dbSupplier.name,
                    supplierId: dbSupplier.id,
                    accountId: newAccount.id,
                    email: email.trim().toLocaleLowerCase(),
                    entries: 0,
                    expenses: +total,
                    utility: -total,
                }
            })
        })

        revalidatePath('/admin/accounts');

        return {
            status: true,
            message: 'Cuenta registrada'
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
