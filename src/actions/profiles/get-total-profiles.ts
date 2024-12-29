'use server';
import prisma from '@/lib/prisma';

export const getTotalProfiles = async () => {
    try {

        const profiles = await prisma.profile.findMany({
            select: {
                id:true,
                name: true,
                pin: true,
                rental:{
                    select:{
                        phone:true,
                        user:true,
                    }
                },
                accounts: {
                    select: {
                        categoria: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            where: {
                status: true
            }
        });

        return {
            status: true,
            message: 'Ok',
            profiles: profiles.map(({ accounts,rental, ...rest }) => {
                return {
                    ...rest,
                    perfil:rest.name,
                    category: accounts.categoria.name,
                    phone:rental?.phone || "Sin asignar",
                    cliente:rental?.user || "Sin asignar"
                }
            })
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                profiles: []
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            profiles: []
        }
    }
}
