'use server'

import prisma from '@/lib/prisma';
import { capitalize } from '@/utils';

export const getProfilesAcById = async (id: string) => {
    try {

        const dbProflesAcc = await prisma.account.findFirst({
            select: {
                categoria: {
                    select: {
                        name: true
                    }
                },
                profiles: true,
                numberProfiles: true
            },
            where: {
                id: id
            }
        })

        if (!dbProflesAcc) {
            return {
                status: false,
                message: 'No encontramos los perfiles',
                profiles: [],
                categogy: null,
                total: 0,
                stock: 0,
            }
        }

        const stock = dbProflesAcc.numberProfiles;
        const profilesAc = dbProflesAcc.profiles.length;

        const total = stock - profilesAc;

        return {
            status: true,
            message: 'Ok',
            total,
            stock,
            categogy: capitalize(dbProflesAcc.categoria.name),
            profiles: dbProflesAcc.profiles.map((data) => ({
                ...data
            }))
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                profiles: [],
                categogy: null,
                total: 0,
                stock: 0,
            }
        }
        
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            profiles: [],
            categogy: null,
            total: 0,
            stock: 0,
        }
    }
}
