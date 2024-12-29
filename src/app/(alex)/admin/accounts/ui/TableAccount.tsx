'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IAccount } from '@/interfaces';
import { capitalize } from '@/utils';
import { IoFilmOutline, IoGitCompareOutline, IoLockClosedOutline, IoPeopleCircleOutline, IoReload, IoSearch } from 'react-icons/io5';
import { ModalPassw } from './ModalPassw';
import { ModalUpdatePass } from './ModalUpdatePass';

interface Props {
    accounts: IAccount[]
}

interface IViewPass {
    id: string,
    code: string,
    email: string,
    password: string,
}

export const TableAccount = ({ accounts }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [idAccount, setIdAccount] = useState('')
    const [dataAcc, setdataAcc] = useState<IViewPass>()
    const [viewPass, setViewPass] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);

    const filteredAccounts = accounts.filter((account) =>
        account.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hanldeViewPass = (id: string) => {
        setIdAccount(id);
        setViewPass(true);
    }

    const hanldeUpdatePass = (data: IViewPass) => {
        setdataAcc({ ...data });
        setUpdatePass(true);
    }

    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className='relative w-full md:w-2/6'>
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder='Buscar cuenta'
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
                            href={'/admin/accounts/register'}
                        >
                            <IoFilmOutline className='md:w-6 h-6' />
                            Registrar cuenta
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
                                Proveedor
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                N° Perfiles
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Fecha de renovación
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Correo
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Contraseña
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredAccounts.map(acco => (
                                <tr key={acco.id}>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <h3>{capitalize(acco.category)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <h3>{capitalize(acco.supplier)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{acco.numberProfiles}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{acco.renewalDate}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <h3>{acco.email}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <button
                                            onClick={() => hanldeViewPass(acco.id)}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <IoLockClosedOutline className='w-6 h-6' />
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => hanldeUpdatePass({
                                                id: acco.id,
                                                password: '',
                                                email: acco.email,
                                                code: ''
                                            })}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <IoGitCompareOutline className='w-6 h-6' />
                                            </span>
                                        </button>
                                    </th>
                                    <th className="flex flex-row border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                        <Link
                                            href={`/admin/accounts/profiles/${acco.id}`}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <IoPeopleCircleOutline className="w-6 h-6" />
                                            </span>
                                        </Link>
                                        <Link
                                            href={`/admin/accounts/renewals/${acco.id}`}
                                            className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                <IoReload className="w-6 h-6" />
                                            </span>
                                        </Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {(viewPass && idAccount !== '') && (<ModalPassw idAccount={idAccount} openModal={viewPass} handleClose={() => setViewPass(false)} />)}
            {(updatePass && dataAcc) && (<ModalUpdatePass openModal={updatePass} dataAcc={dataAcc} handleClose={() => setUpdatePass(false)} />)}
        </>
    )
}
