import { LayoutContentPage } from '@/components';
import { TableSearhFree } from '../ui/TableSearhFree';
import { getRenewProfiles } from '@/actions';

export default async function NamePage() {

    const { rentals} = await getRenewProfiles();

    return (
        <LayoutContentPage
            title={'Perfiles a renovar en los proximos 3 dias'}
        >
            <TableSearhFree profiles={rentals} />
        </LayoutContentPage>
    );
}
