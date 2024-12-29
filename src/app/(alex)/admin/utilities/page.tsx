import { getFinancialReports } from '@/actions';
import { FinancialReportChart, LayoutContentPage } from '@/components';

export default async function UtilitiesPage() {

  const { report } = await getFinancialReports();

  return (
    <LayoutContentPage title={"Utilidades"} sizeTable='w-9/12'>
      <div className="flex flex-col w-full items-center">
        <div className='w-full md:w-1/2'>
          <FinancialReportChart reports={report} />
        </div>
      </div>
    </LayoutContentPage>
  );
}
