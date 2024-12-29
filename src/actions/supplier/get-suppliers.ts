'use server';

import prisma from '@/lib/prisma';

export const getSuppliers = async () => {

    try {

        const dbSuppliers = await prisma.supplier.findMany();

        return {
            status: true,
            message: 'ok',
            suppliers: dbSuppliers
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                suppliers: []
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            suppliers: []
        }
    }
}
