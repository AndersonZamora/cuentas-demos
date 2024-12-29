import clsx from 'clsx';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';

interface Props {
    title: string;
    sizeTable?: string;
    titleInput: string;
    direcLink: string;
    titleLink: string;
    icon: JSX.Element;
    children: React.ReactNode;
    actionButton?: React.ReactNode;
    actionSearch?: React.ReactNode;
}

export const LayoutTable = ({ title, titleInput, titleLink, direcLink, sizeTable = 'w-12/12', icon, children, actionButton, actionSearch }: Props) => {
    return (
        <div className='fade-in transition-all duration-300 bg-white p-2 md:p-4 rounded-lg shadow-md border-l-4 border-blue-600'>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{title}</h2>
            <div className={
                clsx(
                    'w-full mb-12 xl:mb-0 px-2 md:px-4 mx-auto mt-4',
                    `${sizeTable}`
                )
            }>
                <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                            {
                                (actionSearch) ?
                                    (<>{actionSearch}</>) :
                                    (<div className='relative w-full md:w-2/6'>
                                        <input
                                            className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-700 text-slate-700 text-sm border border-slate-400 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                            placeholder={titleInput}
                                        />
                                        <button
                                            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                            type="button"
                                        >
                                            <IoSearch className="w-8 h-8 text-slate-600" />
                                        </button>
                                    </div>)
                            }
                            <div className="flex mb-3 md:mb-0 flex-col md:gap-2 shrink-0 sm:flex-row">
                                {
                                    (actionButton) ?
                                        (<>{actionButton}</>)
                                        : (<Link
                                            className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-md font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            href={direcLink}
                                        >
                                            {icon}
                                            {titleLink}
                                        </Link>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
