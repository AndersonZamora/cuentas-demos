import clsx from 'clsx';
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';

interface Props {
    title: string;
    openModal: boolean;
    children: React.ReactNode;
    handleClose: () => void;
}

export const HeaderModal = ({ title, openModal, handleClose, children }: Props) => {
    return (
        <div className={
            clsx(
                'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                { 'invisible': !openModal }
            )
        }>
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                        <h2 className="font-semibold" id="exampleHeader">{title}</h2>
                        <button
                            onClick={handleClose}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="p-2 text-center">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
