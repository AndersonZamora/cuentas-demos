
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface IRsupplier {
    name: string;
    company: string;
    contact: string
}

export const createSupplier = async (data: IRsupplier) => {

    try {

        const { name, company, contact } = data

        const dbSupplier = await prisma.supplier.findUnique({
            where: {
                company: company.trim().toLocaleLowerCase()
            }
        });

        if (dbSupplier) {
            return {
                status: false,
                message: 'compañía ya registrada'
            }
        }

        await prisma.supplier.createMany({
            data: {
                name: name.trim().toLocaleLowerCase(),
                company: company.trim().toLocaleLowerCase(),
                contact: contact?.trim().toLocaleLowerCase() || '-',
            }
        })

        revalidatePath('/admin/suppliers');

        return {
            status: true,
            message: 'Proveedor registrado'
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
