
import prisma from '@/lib/prisma';

export const getFinancialReports = async () => {

    try {
        const reportFinan = await prisma.financialReport.aggregate({
            _sum: {
                utility: true,
                entries: true,
                expenses: true
            },
        });

        return {
            status: true,
            message: 'Categoría registrada',
            report:  [{
                category: 'Utilidad Total',
                entries: reportFinan._sum.entries || 0,
                expenses: reportFinan._sum.expenses || 0,
                utility: reportFinan._sum.utility || 0
            }],
        }

    } catch (error) {
        if (error instanceof Error) {
            return {
                status: false,
                message: error.message,
                report: []
            }
        }
        return {
            status: false,
            message: 'Error no controlado - contacte al administrador',
            report: []
        }
    }
}
