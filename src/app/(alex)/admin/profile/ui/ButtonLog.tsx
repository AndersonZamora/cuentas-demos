'use client'

import { logout } from '@/actions';

export const ButtonLog = () => {

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="flex">
            <button
                onClick={() => handleLogout()}
                className="px-3 mt-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-red-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
            >
                Cerrar sesión
            </button>
        </div>
    )
}
