import { LayoutRegister } from '@/components';
import { IoStarOutline } from 'react-icons/io5';
import { CategoryRegisterForm } from './ui/CategoryRegisterForm';

export default function RegisterCategoryPage() {
    return (
        <LayoutRegister
            title={'Registrar categoría'}
            direcLink={'/admin/categorys'}
            titleLink={'Ir a categorias'}
            sizeForm='md:w-6/12'
            icon={<IoStarOutline className='w-6 h-6' />}
        >
            <CategoryRegisterForm />
        </LayoutRegister>
    );
}
