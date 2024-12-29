import { LayoutContentPage } from '@/components';
import { TableAccount } from './ui/TableAccount';
import { getAccounts } from '@/actions';

export default async function AccountsPage() {

  const { accounts } = await getAccounts();

  return (
    <LayoutContentPage
      title={'Lista de cuentas'}
    >
      <TableAccount accounts={accounts} />
    </LayoutContentPage>
  );
}
