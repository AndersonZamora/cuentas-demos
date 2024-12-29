'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IoBowlingBall, IoFilmOutline, IoPlanetOutline, IoStarOutline, IoTrendingUpOutline } from 'react-icons/io5';
import { useUIStore } from '../../store';

export const Sidebar = () => {

    const currentPath = usePathname();
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);

    return (
        <>
            <div onClick={closeMenu} className={
                clsx(
                    'fixed inset-0 z-20 transition-opacity bg-black opacity-50',
                    {
                        'block': isSideMenuOpen,
                        'hidden': !isSideMenuOpen
                    }
                )
            }>
            </div>
            <div className={
                clsx(
                    'fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto transition duration-300 transform bg-gray-900  ',
                    {
                        'translate-x-0 ease-out': isSideMenuOpen,
                        '-translate-x-full ease-in': !isSideMenuOpen,
                    }
                )
            } >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <img
                            src="/logo.png"
                            className="w-16 h-12"
                            alt={"Logo"}
                        />
                        <span className="mx-2 text-2xl font-semibold text-white">Dashboard</span>
                    </div>
                </div>
                <nav className="mt-10">
                    <Link
                        href="/admin"
                        onClick={closeMenu}
                        className={
                            clsx(
                                'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                {
                                    'text-gray-100 bg-gray-700': currentPath === '/admin',
                                    'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin',
                                }
                            )
                        } >
                        <IoBowlingBall className="w-6 h-6" />
                        <span className="mx-3">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/categorys"
                        onClick={closeMenu}
                        className={
                            clsx(
                                'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                {
                                    'text-gray-100 bg-gray-700': currentPath === '/admin/categorys',
                                    'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/categorys',
                                }
                            )
                        }>
                        <IoStarOutline className="w-6 h-6" />
                        <span className="mx-3">Categorias</span>
                    </Link>
                    <Link
                        href="/admin/suppliers"
                        onClick={closeMenu}
                        className={
                            clsx(
                                'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                {
                                    'text-gray-100 bg-gray-700': currentPath === '/admin/suppliers',
                                    'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/suppliers',
                                }
                            )
                        }>
                        <IoPlanetOutline className="w-6 h-6" />
                        <span className="mx-3">Proveedores</span>
                    </Link>
                    <Link
                        href="/admin/accounts"
                        onClick={closeMenu}
                        className={
                            clsx(
                                'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                {
                                    'text-gray-100 bg-gray-700': currentPath === '/admin/accounts',
                                    'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/accounts',
                                }
                            )
                        }>
                        <IoFilmOutline className="w-6 h-6" />
                        <span className="mx-3">Cuentas</span>
                    </Link>
                    <Link
                        href="/admin/utilities"
                        onClick={closeMenu}
                        className={
                            clsx(
                                'flex items-center px-6 py-2 mt-4 bg-opacity-25',
                                {
                                    'text-gray-100 bg-gray-700': currentPath === '/admin/utilities',
                                    'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100': currentPath !== '/admin/utilities',
                                }
                            )
                        }>
                        <IoTrendingUpOutline className="w-6 h-6" />
                        <span className="mx-3">Utilidades</span>
                    </Link>
                </nav>
            </div >
        </>
    )
}
