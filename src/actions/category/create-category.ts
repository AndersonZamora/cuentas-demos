'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface IRcategory {
    name: string;
}

export const createCategory = async (data: IRcategory) => {

    try {

        const { name } = data;

        const dbCategory = await prisma.category.findUnique({
            where: {
                name: name.trim().toLocaleLowerCase()
            }
        });

        if (dbCategory) {
            return {
                status: false,
                message: 'Categoría ya registrada'
            }
        }

        await prisma.category.createMany({
            data: {
                name: data.name.trim().toLocaleLowerCase()
            }
        })

        revalidatePath('/admin/categorys');

        return {
            status: true,
            message: 'Categoría registrada'
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
