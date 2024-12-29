'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IProfile } from '@/interfaces';
import { IoEyeOutline, IoPencilOutline, IoSearch } from 'react-icons/io5';
import { ModalAddProfile } from './ModalAddProfile';
import { capitalize } from '@/utils';
import { ModalUpdateProfile } from './ModalUpdateProfile';

interface Props {
    profiles: IProfile[],
    idAccount: string;
}

export const TableSearh = ({ profiles, idAccount }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [openModalUpProfile, setOpenModalUpProfile] = useState(false);
    const [profileView, setProfileView] = useState<IProfile>();

    const filteredProfiles = profiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectView = (data: IProfile) => {
        setProfileView(data);
        setOpenModalUpProfile(true);
    }

    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <div className='relative w-full md:w-2/6'>
                        <input
                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                            placeholder='Buscar perfil'
                            autoComplete="off"
                            value={searchTerm}
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
                        <ModalAddProfile idAccount={idAccount} />
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                Usuario
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
                                        <h3>{capitalize(prof.name)}</h3>
                                    </th>
                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xl whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <h3>{capitalize(prof.pin)}</h3>
                                    </th>
                                    <th className="flex flex-row gap-5 items-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                        <Link
                                            href={`/admin/accounts/profiles/detail/${prof.id}`}
                                        >
                                            <span>
                                                <IoEyeOutline className="w-6 h-6" />
                                            </span>
                                        </Link>
                                        <button
                                            onClick={() => handleSelectView(prof)}
                                        >
                                            <IoPencilOutline className='w-6 h-6' />
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {
                (profileView && openModalUpProfile) &&
                (<ModalUpdateProfile
                    profile={profileView}
                    openModal={openModalUpProfile}
                    handleClose={() => setOpenModalUpProfile(false)}
                    idAccount={idAccount}
                />
                )
            }
        </>
    )
}
