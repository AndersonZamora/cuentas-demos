'use server';

import prisma from '@/lib/prisma';


export const deleteCategory = async (id: string) => {

    try {

        const dbCategory = await prisma.category.findUnique({ where: { id } });

        if (!dbCategory) {
            return {
                status: false,
                message: 'No pudimos encontrar la categoría'
            }
        }

        await prisma.category.deleteMany({
            where: { id }
        })

        return {
            status: true,
            message: 'Categoría eliminada'
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: "Es posible que la cetegoria este en uso",
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
        }
    }
}
