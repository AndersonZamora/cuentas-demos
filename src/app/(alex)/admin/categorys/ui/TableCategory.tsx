'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ICategory } from '@/interfaces';
import { IoRemoveCircleOutline, IoSearch, IoStarOutline } from 'react-icons/io5';
import { capitalize, errorAlert, loadingAlert, successAlert } from '@/utils';
import Swal from 'sweetalert2';
import { deleteCategory } from '@/actions';

interface Props {
    categorys: ICategory[]
}

export const TableCategory = ({ categorys }: Props) => {

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');

    const filteredCategorys = categorys.filter((account) =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "!Atención!",
            icon: "warning",
            text: 'Estas seguro de eliminar la categoria?',
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            cancelButtonText: "No"
        }).then(async (result) => {
            if (result.isConfirmed) {

                loadingAlert('Eliminano categoria...');

                const { status, message } = await deleteCategory(id);
                if (!status) {
                    errorAlert(message);
                    return;
                }

                successAlert(message);
                router.refresh();
            }
        });
    }

    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className='relative w-full md:w-2/6'>
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder='Buscar categoria'
                            value={searchTerm}
                            autoComplete="off"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button"
                        >
                            <IoSearch className="w-8 h-8 text-slate-600" />
                        </button>
                    </div>

                    <div className="flex mb-3 md:mb-0 flex-col md:gap-2 shrink-0 sm:flex-row">
                        <Link
                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-md font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            href={'/admin/categorys/register'}
                        >
                            <IoStarOutline className='md:w-6 h-6' />
                            Registrar categoria
                        </Link>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Categoria
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none ttext-black">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCategorys.map(cate => (
                                <tr key={cate.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <h3>{capitalize(cate.name)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <button
                                            onClick={() => handleDelete(cate.id)}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <IoRemoveCircleOutline className="w-6 h-6 text-red-600" />
                                            </span>
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
