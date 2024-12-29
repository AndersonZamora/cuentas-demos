'use server';

import prisma from '@/lib/prisma';

export const getSupplierById = async (id: string) => {

    try {

        const dbSupplier = await prisma.supplier.findFirst({
            where: { id }
        })

        if (!dbSupplier) {
            return {
                status: true,
                message: 'No pudimos encontrar el proveedor',
                supplier: null
            }
        }

        return {
            status: true,
            message: 'Categoría registrada',
            supplier: dbSupplier
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                supplier: null
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            supplier: null
        }
    }
}
