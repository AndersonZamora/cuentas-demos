'use client';

import { IProfilest } from '@/interfaces';
import { capitalize } from '@/utils';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoEyeOutline, IoSearch } from 'react-icons/io5';

interface Props {
    profiles:IProfilest[]
}

export const TableSearchProfiles = ({ profiles }: Props) => {
   
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState<IProfilest[]>(profiles);

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        const fill = profiles.filter((profile) =>
            profile.category.toLowerCase().includes(value.toLowerCase().trim()) ||
            profile.cliente.toLowerCase().includes(value.toLowerCase().trim()) ||
            profile.phone.toLowerCase().includes(value.toLowerCase().trim())
        );

        setFilteredProfiles(fill);
    }

    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className='relative w-full md:w-2/6'>
                        <input
                            autoComplete="off"
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder='Buscar por cliente/celular/cuenta'
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button
                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                            type="button"
                        >
                            <IoSearch className="w-8 h-8 text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Cliente
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Celular
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Cuenta
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Perfil
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Pin
                            </th>
                            
                          
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                <p className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none ttext-black">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredProfiles.map(prof => (
                                <tr key={prof.id}>
                                     <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{capitalize(prof.cliente)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{prof.phone}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{capitalize(prof.category)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{capitalize(prof.perfil)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{prof.pin}</h3>
                                    </th>
                                   
                                   
                                    <th className="flex flex-row gap-5 items-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <Link
                                            href={`/admin/accounts/profiles/detail/${prof.id}`}
                                        >
                                            <span>
                                                <IoEyeOutline className="w-6 h-6" />
                                            </span>
                                        </Link>
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
