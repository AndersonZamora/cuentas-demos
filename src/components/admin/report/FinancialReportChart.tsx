'use client'

import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Report {
    category: string;
    entries: number;
    expenses: number;
    utility: number;
}

interface FinancialReportChartProps {
    reports: Report[];
}

export const FinancialReportChart: React.FC<FinancialReportChartProps> = ({ reports }) => {
    const data = {
        labels: reports.map(report => report.category),
        datasets: [
            {
                label: 'Egresos',
                data: reports.map(report => report.expenses),
                backgroundColor: 'rgb(235 54 54 / 84%)'
            },
            {
                label: 'Ingresos',
                data: reports.map(report => report.entries),
                backgroundColor: 'rgb(57 203 61 / 84%)'
            },
            {
                label: 'Utility',
                data: reports.map(report => report.utility),
                backgroundColor: reports.map(da => {
                    if (da.utility <= 0) {
                        return "rgb(235 54 54 / 84%)"
                    } else {
                       return 'rgb(57 82 203 / 84%)'
                    }
                })
            },
        ],
    };

    return (
        <div className="w-full h-auto md:h-96">
            <Bar data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: `Utilidades`,
                        },
                    },
                }}
            />
        </div>
    )
};
