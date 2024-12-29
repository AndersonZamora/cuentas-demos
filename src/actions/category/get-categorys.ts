'use server';

import prisma from '@/lib/prisma';


export const getCategorys = async () => {

    try {

        const dbCategorys = await prisma.category.findMany();

        return {
            status: true,
            message: 'Categoría registrada',
            categorys: dbCategorys
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                categorys: []
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            categorys: []
        }
    }
}
