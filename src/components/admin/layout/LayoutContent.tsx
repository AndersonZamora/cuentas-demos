
interface Props {
    title: string;
    children: React.ReactNode;
}

export const LayoutContent = ({ title, children }: Props) => {
    return (
        <div className='fade-in transition-all duration-300 bg-white p-2 md:p-4 rounded-lg shadow-md border-l-4 border-blue-600'>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{title}</h2>
            {children}
        </div>
    )
}
