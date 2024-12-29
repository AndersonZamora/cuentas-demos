'use client';

import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { closeAlert, errorAlert, loadingAlert } from '@/utils';
import { decryAccount } from '@/actions';

interface IViewPass {
    id: string;
    code: string;
    password: string;
}

interface Props {
    idAccount: string;
    openModal: boolean;
    handleClose: () => void;
}

export const ModalPassw = ({ idAccount, openModal, handleClose }: Props) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IViewPass>({
        defaultValues: {
            id: idAccount,
            code: '',
            password: '**********'
        }
    });
    

    const handleOnSubmit = async (data: IViewPass) => {

        loadingAlert('Verificando...');

        const { status, message, } = await decryAccount({ ...data });

        if (!status) {
            errorAlert(message);
            return;
        }

        closeAlert();

        reset({
            id: idAccount,
            code: '',
            password: message
        })
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
                        <h2 className="font-semibold" id="exampleHeader">Ver contraseña</h2>
                        <button
                            onClick={() => handleClose()}
                            className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                        >
                            <IoCloseCircleOutline className='w-6 h-6' />
                        </button>
                    </header>
                    <div className="p-2 text-center">
                        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate autoComplete="off">
                            <div className="grid grid-cols-1 gap-2 sm:gap-5">
                                <div className="flex flex-col mb-2">
                                    <span>Contraseña</span>
                                    <input
                                        type="text"
                                        disabled
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('password', {
                                            required: { value: true, message: 'La contraseña es requerida' },
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
                            </div>
                            <div className='flex justify-center mt-5 mb-5'>
                                <button
                                    className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-green-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
                                    type="submit"
                                >
                                    Ver contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
