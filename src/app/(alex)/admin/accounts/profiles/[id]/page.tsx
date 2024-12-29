import { notFound } from 'next/navigation';
import { LayoutContentPage } from '@/components';
import { TableSearh } from './ui/TableSearh';
import { getProfilesAcById } from '@/actions';

interface Props {
    params: {
        id: string;
    }
}

export default async function ProfilesAccountPage({ params }: Props) {

    const id = params.id || '-';

    const { profiles, categogy, total, stock } = await getProfilesAcById(id);

    if (!categogy) {
        notFound();
    }

    return (
        <LayoutContentPage
            title={`Perfiles de la cuenta: ${categogy} - disponibles  ${total}/${stock}`}
        >
            <TableSearh profiles={profiles} idAccount={id} />
        </LayoutContentPage>
    );
}
