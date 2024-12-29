'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteAccount = async (id: string) => {
    try {

        const dbAccount = await prisma.account.findUnique({
            select: {
                id: true,
                profiles: {
                    select: {
                        id: true,
                        rental: true,
                    }
                },
                renewals: true
            },
            where: { id }
        })

        if (!dbAccount) {
            return {
                status: false,
                message: 'No pudimos encontrar la cuenta'
            }
        }

        await prisma.$transaction(async (tx) => {

            //! 1 eliminar renewals account
            const deleteRenewalAccountPromises = dbAccount.renewals.map((async renewal => {
                return tx.renewalAccounts.deleteMany({
                    where: { id: renewal.id }
                })
            }))

            await Promise.all(deleteRenewalAccountPromises);

            //! 2 elimnar renewals profiles
            const deleteRenewalProfilePromises = dbAccount.profiles.map((async profile => {

                if (!profile.rental) {
                    throw new Error('No pudimos encontrar al usuario');
                }

                return tx.renewalProfile.deleteMany({
                    where: { rentalId: profile.rental.id }
                })

            }))

            await Promise.all(deleteRenewalProfilePromises);

            //! 3 elimnar rental
            const deleteRentalProfilePromises = dbAccount.profiles.map((async profile => {

                if (!profile.rental) {
                    throw new Error('No pudimos encontrar al usuario');
                }

                return tx.rental.deleteMany({
                    where: { profileId: profile.id }
                })

            }))

            await Promise.all(deleteRentalProfilePromises);

            //! 3 elimnar profiles
            const deleteProfilesPromises = dbAccount.profiles.map((async profile => {
                return tx.profile.deleteMany({
                    where: { accountId: id }
                })
            }))

            await Promise.all(deleteProfilesPromises);

            //! 3 elimnar cuenta
            return tx.account.deleteMany({
                where: { id }
            })
        })

        revalidatePath('/admin/accounts');

        return {
            status: true,
            message: 'Cuenta eliminada'
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
