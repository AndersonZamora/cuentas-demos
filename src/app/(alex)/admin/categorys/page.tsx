import { LayoutContentPage } from '@/components';
import { TableCategory } from './ui/TableCategory';
import { getCategorys } from '@/actions';

export default async function CategorysPage() {

  const { categorys } = await getCategorys()

  return (
    <LayoutContentPage
      title={'Lista de categorias'}
      sizeTable={'md:w-8/12'}
    >
      <TableCategory categorys={categorys} />
    </LayoutContentPage>
  );
}
