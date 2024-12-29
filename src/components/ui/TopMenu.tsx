'use client';

import Link from 'next/link';
import { useUIStore } from '@/store';
import { IoCloseCircleSharp, IoMenu, IoPersonCircleOutline } from 'react-icons/io5';

export const TopMenu = () => {

    const openMenu = useUIStore(state => state.openSideMenu);
    const closeSideMenu = useUIStore(state => state.closeSideMenu);
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
                {
                    (isSideMenuOpen) ?
                        (
                            <button onClick={closeSideMenu} className="text-gray-500 fade-in focus:outline-none">
                                <IoCloseCircleSharp className="w-6 h-6" />
                            </button>
                        ) :
                        (
                            <button onClick={openMenu} className="text-gray-500 fade-in focus:outline-none">
                                <IoMenu className="w-6 h-6" />
                            </button>
                        )
                }

                <div className="relative mx-4">
                    <Link
                        href={'/admin'}
                        className="" >
                        Cuentas Alex
                    </Link>
                </div>
            </div>

            <div className="flex items-center">
                <Link
                    href={'/admin/profile'}
                    className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none" >
                    <IoPersonCircleOutline className="object-cover w-full h-full" />
                </Link>
            </div >
        </header >
    )
}
