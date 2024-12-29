import { IoFilmOutline, IoPeopleCircleSharp, IoPlanetOutline, IoStarOutline, IoTrendingUpOutline } from 'react-icons/io5';
import { ItemsCard } from '@/components';
import { getDataDashboard } from '@/actions';
import { currencyFormat } from '@/utils';

export default async function AdminPage() {

  const { renewals, accounts, categorys, suppliers,profiles, reportFinan } = await getDataDashboard();
 
  // await createUser();

  return (
    <div className='px-0 md:px-10 fade-in'>
      <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>
      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Cuentas'}
            quantity={`${accounts}`}
            icon={<IoFilmOutline className='w-8 h-8 text-white' />}
            rederi='/admin/accounts'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Categorias'}
            quantity={`${categorys}`}
            icon={<IoStarOutline className='w-8 h-8 text-white' />}
            rederi='/admin/categorys'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Proveedores'}
            quantity={`${suppliers}`}
            icon={<IoPlanetOutline className='w-8 h-8 text-white' />}
            rederi='/admin/suppliers'
          />
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Perfiles por renovar'}
            quantity={`${renewals}`}
            bgIcon={'bg-amber-600'}
            icon={<IoPeopleCircleSharp className='w-8 h-8 text-white' />}
            rederi='/admin/profiles/renew'
          />

          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Utilidades'}
            quantity={`${currencyFormat(reportFinan || 0)}`}
            bgIcon={'bg-green-600'}
            icon={<IoTrendingUpOutline className='w-8 h-8 text-white' />}
            rederi='/admin/utilities'
          />
          
          <ItemsCard
            classNa='mb-6 sm:mt-0'
            title={'Perfiles'}
            quantity={`${profiles}`}
            bgIcon={'bg-green-600'}
            icon={<IoPeopleCircleSharp className='w-8 h-8 text-white' />}
            rederi='/admin/profiles'
          />
        </div>
      </div>
    </div>
  );
}
