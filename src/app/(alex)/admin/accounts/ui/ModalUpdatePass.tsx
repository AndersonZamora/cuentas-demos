'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { errorAlert, loadingAlert, successAlert } from '@/utils';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { updatePassword } from '@/actions/account/update-password';

interface IViewPass {
    id: string;
    password: string;
    email: string;
    code: string;
}

interface Props {
    dataAcc: IViewPass;
    openModal: boolean;
    handleClose: () => void;
}

export const ModalUpdatePass = ({ dataAcc, openModal, handleClose }: Props) => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IViewPass>({
        defaultValues: { ...dataAcc }
    });

    const handleOnSubmit = async (data: IViewPass) => {

        loadingAlert('Actualizando...');

        const { status, message } = await updatePassword(data);

        if (!status) {
            errorAlert(message);
            return;
        }

        handleClose()
        successAlert(message);
        router.refresh();
    }

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
                        <h2 className="font-semibold" id="exampleHeader">Actualizar contraseña</h2>
                        <button
                            onClick={() => handleClose()}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="p-2 text-center">
                        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate autoComplete="off">
                            <div className="flex flex-col mb-2">
                                <span>Correo</span>
                                <input
                                    type="text"
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('email', {
                                        required: { value: true, message: 'Se requiere un correo' },
                                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Correo no valido' },
                                    })}
                                />
                                {errors.email && (<span className="text-red-500 font-mono">{errors.email?.message}</span>)}
                            </div>
                            <div className="flex flex-col mb-2">
                                <span>Nueva contraseña</span>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('password', {
                                        required: { value: true, message: 'Se requiere una contraseña' },
                                        pattern: { value: /^\S+$/, message: 'No se permiten esapcios' },
                                        minLength: { value: 4, message: 'Ingrese al menos 4 caracteres' }
                                    })}
                                />
                                {errors.password && (<span className="text-red-500 font-mono">{errors.password?.message}</span>)}
                            </div>
                            <div className="flex flex-col mb-2">
                                <span>Código</span>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    className="p-2 border rounded-md bg-gray-200"
                                    {...register('code', {
                                        required: { value: true, message: 'Se requiere un codigo para ver la contraseña' },
                                    })}
                                />
                                {errors.code && (<span className="text-red-500 font-mono">{errors.code?.message}</span>)}
                            </div>
                            <div className='flex justify-center mt-5 mb-5'>
                                <button
                                    className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-green-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
                                    type="submit"
                                >
                                    Actualizar contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
