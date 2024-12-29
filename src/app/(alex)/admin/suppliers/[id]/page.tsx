import { notFound } from 'next/navigation';
import { LayoutRegister } from '@/components';
import { IoFilmOutline } from 'react-icons/io5';
import { SupplierUpdateForm } from './ui/SupplierUpdateForm';
import { getSupplierById } from '@/actions/supplier/get-supplier-by-id';

interface Props {
    params: {
        id: string;
    }
}

export default async function SuppliersDetailPage({ params }: Props) {

    const id = params.id || '-'

    const { supplier } = await getSupplierById(id)

    if (!supplier) {
        notFound();
    }

    return (
        <LayoutRegister
            title={'Actualizar proveedor'}
            direcLink={'/admin/suppliers'}
            titleLink={'Ir a proveedores'}
            sizeForm='md:w-8/12'
            icon={<IoFilmOutline className='w-6 h-6' />}
        >
            <SupplierUpdateForm supplier={supplier} />
        </LayoutRegister>
    );
}
