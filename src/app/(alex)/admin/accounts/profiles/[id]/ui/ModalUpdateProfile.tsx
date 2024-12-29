'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { HeaderModal } from '@/components';
import { IProfile } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';
import { updateProfile } from '@/actions';

interface Props {
    profile: IProfile;
    openModal: boolean;
    idAccount: string;
    handleClose: () => void;
}

export const ModalUpdateProfile = ({ profile, openModal, idAccount, handleClose }: Props) => {

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProfile>({
        defaultValues: { ...profile }
    });

    const handleOnSubmit = async (data: IProfile) => {
        
        loadingAlert('Actualizando...');

        const { status, message } = await updateProfile({
            data,
            idAccount
        });

        if (!status) {
            errorAlert(message);
            return;
        }

        reset()
        handleClose();
        successAlert(message);
        router.refresh();
    }

    useEffect(() => {
        reset({ ...profile })
    }, [])

    return (
        <HeaderModal
            title={'Actualizar perfil'}
            openModal={openModal}
            handleClose={() => handleClose()}
        >
            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate autoComplete="off">
                <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
                    <div className="flex flex-col mb-2">
                        <span>Usuario</span>
                        <input
                            type="text"
                            autoComplete="off"
                            className="p-2 border rounded-md bg-gray-200"
                            {...register('name', {
                                required: { value: true, message: 'El nombre es requerido' },
                                pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/, message: 'Solo letras y numeros' },
                                minLength: { value: 2, message: 'Ingrese al menos 2 caracteres' }
                            })}
                        />
                        {errors.name && (<span className="text-red-500 font-mono">{errors.name?.message}</span>)}
                    </div>
                    <div className="flex flex-col mb-2">
                        <span>Pin</span>
                        <input
                            type="text"
                            autoComplete="off"
                            className="p-2 border rounded-md bg-gray-200"
                            {...register('pin', {
                                required: { value: true, message: 'Se requiere un pin' },
                                pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/, message: 'Solo letras y números' },
                                minLength: { value: 2, message: 'Ingrese al menos 2 caracteres' }
                            })}
                        />
                        {errors.pin && (<span className="text-red-500 font-mono">{errors.pin?.message}</span>)}
                    </div>
                </div>
                <div className='flex justify-center mt-5 mb-5'>
                    <button
                        className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-green-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
                        type="submit"
                    >
                        Actualizar perfil
                    </button>
                </div>
            </form>
        </HeaderModal>
    )
}
