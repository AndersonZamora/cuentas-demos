import prisma from '@/lib/prisma';
import { getDateCurrentRenew } from '@/utils';

export const getDataDashboard = async () => {
    try {

        const { newToday, newDaysFromNow } = getDateCurrentRenew(3);

        const renewals = await prisma.rental.count({
            where: {
                OR: [
                    {
                        renewalDate: {
                            lt: newToday, //! Menor que la fecha actual
                        },
                    },
                    {
                        renewalDate: {
                            gte: newToday,
                            lte: newDaysFromNow, //! Entre la fecha actual y 3 días en el futuro
                        },
                    },
                ],
            },
        });

        const reportFinan = await prisma.financialReport.aggregate({
            _sum: {
                utility: true,
            },
        });

        const accounts = await prisma.account.count();
        const categorys = await prisma.category.count();
        const suppliers = await prisma.supplier.count();
        const profiles = await prisma.profile.count();

        return {
            status: true,
            message: 'ok',
            renewals,
            accounts,
            categorys,
            suppliers,
            profiles,
            reportFinan: reportFinan._sum.utility,
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                renewals: 0,
                accounts: 0,
                categorys: 0,
                suppliers: 0,
                profiles:0,
                reportFinan: 0,
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            renewals: 0,
            accounts: 0,
            categorys: 0,
            suppliers: 0,
            reportFinan: 0,
        }
    }
}
