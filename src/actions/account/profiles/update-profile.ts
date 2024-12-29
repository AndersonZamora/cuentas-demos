'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

type IUpdate = {
    id: string;
    name: string;
    pin: string;
}

interface Props {
    data: IUpdate,
    idAccount: string;
}

export const updateProfile = async ({ data, idAccount }: Props) => {

    const { id, name, pin } = data;

    try {

        const dbProfile = await prisma.profile.findUnique({
            where: { id: id }
        });

        if (!dbProfile) {
            return {
                status: false,
                message: 'No pudimos encontrar el perfil'
            }
        }

        await prisma.profile.updateMany({
            data: {
                pin: pin.trim().toLocaleLowerCase(),
                name: name.trim().toLocaleLowerCase(),
            },
            where: {
                id: id
            }
        })

        revalidatePath(`/admin/accounts/profiles/${idAccount}`)

        return {
            status: true,
            message: 'Perfil actualizado'
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
