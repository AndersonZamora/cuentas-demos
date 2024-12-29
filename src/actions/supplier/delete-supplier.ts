'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteSupplier = async (id: string) => {

    try {

        const dbSupplier = await prisma.supplier.findUnique({ where: { id } });

        if (!dbSupplier) {
            return {
                status: false,
                message: 'No pudimos encontrar al proveedor'
            }
        }

        await prisma.supplier.deleteMany({
            where: { id }
        })

        revalidatePath('/admin/suppliers');

        return {
            status: true,
            message: 'Proveedor eliminado'
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: 'Es posible que el proveedor este en uso',
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
