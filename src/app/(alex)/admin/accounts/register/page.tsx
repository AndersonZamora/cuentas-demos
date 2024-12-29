import { LayoutRegister } from '@/components';
import { IoFilmOutline } from 'react-icons/io5';
import { AccountRegisterForm } from './ui/AccountRegisterForm';
import { getCatSup } from '@/actions';

export default async function AccountPage() {

    const { categorys, suppliers } = await getCatSup();

    return (
        <LayoutRegister
            title={'Registrar cuenta'}
            direcLink={'/admin/accounts'}
            titleLink={'Ir a cuentas'}
            sizeForm='md:w-11/12'
            icon={<IoFilmOutline className='w-6 h-6' />}
        >
            <AccountRegisterForm categorys={categorys} suppliers={suppliers} />
        </LayoutRegister>
    );
}
