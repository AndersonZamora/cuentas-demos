
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface IRsupplier {
    id: string;
    name: string;
    company: string;
    contact: string
}

export const updateSupplier = async (data: IRsupplier) => {

    try {

        const { id, name, company, contact } = data

        const dbSupplier = await prisma.supplier.findUnique({ where: { id } });

        if (!dbSupplier) {
            return {
                status: false,
                message: 'No pudimos encontrar al proveedor'
            }
        }

        await prisma.supplier.updateMany({
            data: {
                name: name.trim().toLocaleLowerCase(),
                company: company.trim().toLocaleLowerCase(),
                contact: contact?.trim().toLocaleLowerCase() || '-',
            },
            where: {
                id
            }
        })

        revalidatePath('/admin/suppliers');

        return {
            status: true,
            message: 'Proveedor actualizado'
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
