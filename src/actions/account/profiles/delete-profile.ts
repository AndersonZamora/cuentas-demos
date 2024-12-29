'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

interface Props {
    id: string;
    idAccount: string;
}

export const deleteProfile = async ({ id, idAccount }: Props) => {

    try {

        const dbProfile = await prisma.profile.findUnique({
            select: {
                rental: {
                    select: {
                        id: true
                    }
                }
            },
            where: { id: id }
        });

        if (!dbProfile) {
            return {
                status: false,
                message: 'No pudimos encontrar el perfil'
            }
        }

        await prisma.$transaction(async (tx) => {

            if (!dbProfile.rental) {
                throw new Error('No pudimos encontrar al usuario');
            }

            //! 1. Eliminar renewals
            await tx.renewalProfile.deleteMany({
                where: { rentalId: dbProfile.rental.id }
            });

            //! 2. Eliminar rental
            await tx.rental.deleteMany({
                where: { id: dbProfile.rental.id }
            });

            //! 3. Eliminar profile
            await tx.profile.deleteMany({
                where: { id: id }
            });
        })

        revalidatePath(`/admin/accounts/profiles/${idAccount}`)

        return {
            status: true,
            message: 'Perfil eliminado'
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
