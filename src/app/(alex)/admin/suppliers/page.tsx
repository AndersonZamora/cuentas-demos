import { LayoutContentPage } from '@/components';
import { TableSupplier } from './ui/TableSupplier';
import { getSuppliers } from '@/actions';

export default async function SuppliersPage() {

  const { suppliers } = await getSuppliers();

  return (
    <LayoutContentPage
      title={'Lista de proveedores'}
      sizeTable={'md:w-11/12'}
    >
      <TableSupplier suppliers={suppliers} />
    </LayoutContentPage>
  );
}
