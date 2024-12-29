'use server';

import prisma from '@/lib/prisma';

export const getCatSup = async () => {
    try {

        const dbCategorys = await prisma.category.findMany();
        const dbSuppliers = await prisma.supplier.findMany();

        return {
            status: true,
            message: 'Ok',
            categorys: dbCategorys,
            suppliers: dbSuppliers,
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                categorys: [],
                suppliers: [],
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            categorys: [],
            suppliers: [],
        }
    }
}
