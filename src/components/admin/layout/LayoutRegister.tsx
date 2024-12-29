import Link from 'next/link';
import clsx from 'clsx';

interface Props {
    title: string;
    sizeForm?: string;
    direcLink: string;
    titleLink: string;
    icon: JSX.Element;
    children: React.ReactNode;
}

export const LayoutRegister = ({ title, sizeForm = 'w-12/12', direcLink, titleLink, icon, children }: Props) => {
    return (
        <div className='fade-in transition-all duration-300 bg-white p-2 md:p-4 rounded-lg shadow-md border-l-4 border-blue-600'>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{title}</h2>
            <div className={
                clsx(
                    'w-full mb-12 xl:mb-0 px-1 md:px-4 mx-auto mt-4',
                    `${sizeForm}`
                )
            }>
                <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                            <div className='relative w-full md:w-2/6'>
                            </div>
                            <div className="flex mb-3 md:mb-0 flex-col md:gap-2 shrink-0 sm:flex-row">
                                <Link
                                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-md font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    href={direcLink}
                                >
                                    {icon}
                                    {titleLink}
                                </Link>
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
