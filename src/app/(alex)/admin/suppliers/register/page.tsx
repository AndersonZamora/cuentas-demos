import { LayoutRegister } from '@/components';
import { IoPlanetOutline } from 'react-icons/io5';
import { SupplierRegisterForm } from './ui/SupplierRegisterForm';

export default function RegisterSupplierPage() {
    return (
        <LayoutRegister
            title={'Registrar proveedor'}
            direcLink={'/admin/suppliers'}
            titleLink={'Ir a proveedores'}
            sizeForm='md:w-8/12'
            icon={<IoPlanetOutline className='w-6 h-6' />}
        >
            <SupplierRegisterForm />
        </LayoutRegister>
    );
}
