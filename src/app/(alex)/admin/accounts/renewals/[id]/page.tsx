import { notFound } from 'next/navigation';
import { LayoutContent } from '@/components';
import { capitalize, currencyFormat } from '@/utils';
import { DeleteRenewal } from './ui/DeleteRenewal';
import { ModalAddRenewal } from './ui/ModalAddRenewal';
import { ContentViewPass } from './ui/ContentViewPass';
import { getCatSup, getRenewalsBy } from '@/actions';

interface Props {
    params: {
        id: string;
    }
}

export default async function RenocacionCuentaPage({ params }: Props) {

    const id = params.id || '-'

    const { renewal } = await getRenewalsBy(id)

    if (!renewal) {
        notFound();
    }

    const { categorys, suppliers } = await getCatSup();

    const {
        egressos,
        idAccount,
        category,
        supplier,
        numberProfiles,
        email,
        purchaseDate,
        renewalDate,
        renewals,
        ingresos,
        utilidad
    } = renewal

    return (
        <LayoutContent title={"Historial de renovaciones"}>
            <div className="bg-gray-100 pt-3 rounded-lg">
                <div className="w-full">
                    <div className="p-2 bg-gray-100">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="w-full md:w-1/2 p-4 text-sm flex flex-col gap-2 rounded border">
                                <h3 className="mt-2 text-center font-bold text-xl">Resumen de cuenta</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Categoria:</h3>
                                    <h3 className="text-xl text-left">{capitalize(category)}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Proveedor:</h3>
                                    <h3 className="text-xl">{capitalize(supplier)}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">N° Perfiles:</h3>
                                    <h3 className="text-xl">{numberProfiles}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Correo:</h3>
                                    <h3 className="text-xl">{email}</h3>
                                </div>
                                <ContentViewPass idAccount={idAccount} />
                                <p className="hidden md:block">
                                    &nbsp;
                                </p>
                                <p className="hidden md:block">
                                    &nbsp;
                                </p>
                                <p className="hidden xl:block">
                                    &nbsp;
                                </p>
                                <DeleteRenewal idAccount={idAccount} />
                            </div>
                            <div className="w-full md:w-1/2 p-4 text-sm flex flex-col gap-2 rounded border">
                                <h3 className="mt-2 text-center font-bold text-xl">Egresos/Ingresos de la cuenta</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Egresos:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{currencyFormat(egressos || 0)}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Ingresos:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{currencyFormat(ingresos || 0)}</h3>
                                </div>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Utilidad:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{currencyFormat(utilidad || 0)}</h3>
                                </div>
                                <h3 className="mt-2 text-center font-bold text-xl">Ultima renovación</h3>
                                <div className="flex justify-between">
                                    <h3 className="text-xl">Inicio:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{purchaseDate}</h3>
                                </div>
                                <div className="flex justify-between mb:0 md:mb-4">
                                    <h3 className="text-xl">Fin:</h3>
                                    <h3 className="text-xl sm:text-[16px] md:text-[17px] xl:text-2xl">{renewalDate}</h3>
                                </div>
                                <ModalAddRenewal idAccount={idAccount} categorys={categorys} suppliers={suppliers} />
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
                                                renewals.map(data => (
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
