import clsx from 'clsx';

interface Props {
    title: string;
    sizeTable?: string;
    children: React.ReactNode;
}

export const LayoutContentPage = ({ title, sizeTable = 'w-12/12', children }: Props) => {
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
                    {children}
                </div>
            </div>
        </div>
    )
}
