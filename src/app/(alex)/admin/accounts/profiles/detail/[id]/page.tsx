import { notFound } from 'next/navigation';
import { LayoutContent } from '@/components';
import { capitalize, currencyFormat } from '@/utils';
import { DeleteProfile } from './ui/DeleteProfile';
import { ModalAdd } from './ui/ModalAdd';
import { getDetailProfileByid } from '@/actions';

interface Props {
    params: {
        id: string;
    }
}

export default async function DetailProfilePage({ params }: Props) {

    const id = params.id || '-';

    const { profile } = await getDetailProfileByid(id)

    if (!profile) {
        notFound();
    }

    const { category, total } = profile;

    return (
        <LayoutContent title={`Detalle del perfil - categoría: ${capitalize(category)}`}>
            <div className="bg-gray-100 pt-3 rounded-lg">
                <div className="w-full">
                    <div className="p-2 bg-gray-100">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2 p-4 text-sm flex flex-col gap-2 rounded border">
                                <h3 className="mt-2 text-center font-bold text-xl">Resumen de cuenta</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Usuario:</h3>
                                    <h3 className="text-xl text-left">{capitalize(profile.name)}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Pin:</h3>
                                    <h3 className="text-xl">{capitalize(profile.pin)}</h3>
                                </div>
                                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative before:content-[''] before:block before:border-8 before:border-gray-600 before:w-4 before:h-4 before:rounded-full before:absolute before:left-0 before:-top-2 after:content-[''] after:block after:border-8 after:border-gray-600 after:w-4 after:h-4 after:rounded-full after:absolute after:right-0 after:-top-2" />
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Celular:</h3>
                                    <h3 className="text-xl">{profile.rental.phone}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Nombre:</h3>
                                    <h3 className="text-xl">{capitalize(profile.rental.user)}</h3>
                                </div>
                                <DeleteProfile idProfile={profile.id} idAccount={profile.accountId} />
                            </div>
                            <div className="w-full md:w-1/2 p-4 text-sm flex flex-col gap-2 rounded border">
                                <h3 className="mt-2 text-center font-bold text-xl">Ingresos del perfil</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Total:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{currencyFormat(total || 0)}</h3>
                                </div>
                                <h3 className="mt-2 text-center font-bold text-xl">Ultima renovación</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Inicio:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{profile.rental.purchaseDate}</h3>
                                </div>
                                <div className="flex justify-between mb:0 md:mb-8 xl:mb-5">
                                    <h3 className="text-xl">Fin:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{profile.rental.renewalDate}</h3>
                                </div>
                                <ModalAdd idProfile={profile.id} idAccount={profile.accountId} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="w-full mt-5 md:w-2/2 rounded  border">
                                <h3 className="mt-2 text-center font-bold text-xl">Historial de renovaciones</h3>
                                <div className="block w-full overflow-x-auto mt-5 px-1">
                                    <table className="items-center bg-transparent w-full border-collapse ">
                                        <thead>
                                            <tr>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Inicio de Alquiler
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                    Fin de alquiler
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                                    Meses
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                                    Precio
                                                </th>
                                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                profile.rental.renewals.map(data => (
                                                    <tr key={data.id}>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                            <h3 className="text-xl">{data.purchaseDate}</h3>
                                                        </th>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                            <h3 className="text-xl">{data.renewalDate}</h3>
                                                        </th>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                                            <h3 className="text-xl">{data.numberMonths}</h3>
                                                        </th>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                                            <h3 className="text-xl">{currencyFormat(data.price)}</h3>
                                                        </th>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                                            <h3 className="text-xl">{currencyFormat(data.total)}</h3>
                                                        </th>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutContent>
    );
}
