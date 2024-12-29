'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createProfile } from '@/actions';
import { HeaderModal } from '@/components';
import { addOneMonth, errorAlert, loadingAlert, successAlert } from '@/utils';
import { IoPeopleCircleOutline } from 'react-icons/io5';

interface Props {
    idAccount: string;
}

interface IProfileAdd {
    name: string;
    pin: string;
    id: string;
    user: string;
    phone: string;
    purchaseDate: string;
    renewalDate: string;
    numberMonths: number;
    price: number;
    total: number
}

export const ModalAddProfile = ({ idAccount }: Props) => {

    const router = useRouter();
    const { register, handleSubmit, setValue, watch, setError, reset,  formState: { errors } } = useForm<IProfileAdd>();
    const [openModalAddProfile, setOpenModalAddProfile] = useState(false);

    const handleOnSubmit = async (data: IProfileAdd) => {

        loadingAlert('Registrando...');

        const { status, message } = await createProfile({
            ...data,
            id: idAccount
        });

        if (!status) {
            errorAlert(message);
            return;
        }
        reset();
        successAlert(message);
        setOpenModalAddProfile(false);
        router.refresh();
    }

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === 'numberMonths' || name === 'purchaseDate') {
                if (value.numberMonths && value.purchaseDate && value.numberMonths > 0) {
                    const { fecha, status, message } = addOneMonth(value.purchaseDate, +value.numberMonths);
                    if (!status) {
                        setError('renewalDate', {
                            message
                        })
                        return;
                    }

                    setValue('renewalDate', fecha, { shouldValidate: false })
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    useEffect(() => {
        const subscription = watch(({ numberMonths, price }, { name }) => {
            if (name === 'numberMonths' || name === 'price') {
                const nMonth = Number(numberMonths);
                const nPrice = Number(price);

                if (+nMonth > 0 && +nPrice > 0) {
                    const costo = (+nPrice * +nMonth).toFixed(2);
                    setValue('total', parseFloat(costo), { shouldValidate: false });
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    return (
        <>
            <div className="flex flex-col items-center mt-2">
                <button
                    onClick={() => setOpenModalAddProfile(true)}
                    className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-md font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <IoPeopleCircleOutline className='w-6 h-6' />
                    Registrar perfil
                </button>
            </div>
            {
                (openModalAddProfile) &&
                (
                    <HeaderModal
                        title={'Registrar perfil'}
                        openModal={openModalAddProfile}
                        handleClose={() => setOpenModalAddProfile(false)}
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
                                <div className="flex flex-col mb-2">
                                    <span>Cliente</span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('user', {
                                            required: { value: true, message: 'Se requiere el cliente' },
                                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/, message: 'Solo letras y numeros' },
                                            minLength: { value: 2, message: 'Ingrese al menos 2 caracteres' }
                                        })}
                                    />
                                    {errors.user && (<span className="text-red-500 font-mono">{errors.user?.message}</span>)}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <span>Celular</span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('phone', {
                                            required: { value: true, message: 'Se requiere el cliente' },
                                            pattern: { value: /^[0-9]+$/, message: 'Solo números' },
                                            minLength: { value: 9, message: 'Número no valido' },
                                            maxLength: { value: 9, message: 'Número no valido' }
                                        })}
                                    />
                                    {errors.phone && (<span className="text-red-500 font-mono">{errors.phone?.message}</span>)}
                                </div>

                                <div className="flex flex-col mb-2">
                                    <span>Fecha de alquiler</span>
                                    <input
                                        type="date"
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('purchaseDate', {
                                            required: { value: true, message: 'La fecha de compra es requerida' },
                                        })}
                                    />
                                    {errors.purchaseDate && (<span className="text-red-500 font-mono">{errors.purchaseDate?.message}</span>)}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <span>Número de meses a contratar</span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('numberMonths', {
                                            required: { value: true, message: 'Se requiere el número de meses' },
                                            pattern: { value: /^[0-9]+$/, message: 'Solo números' },
                                            min: { value: 1, message: 'No puede ser cero' }
                                        })}
                                    />
                                    {errors.numberMonths && (<span className="text-red-500 font-mono">{errors.numberMonths?.message}</span>)}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <span>Fecha de renovación</span>
                                    <input
                                        disabled
                                        autoComplete="off"
                                        type="date"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('renewalDate', {
                                            required: { value: true, message: 'La fecha de renovacion es requerida' }
                                        })}
                                    />
                                    {errors.renewalDate && (<span className="text-red-500 font-mono">{errors.renewalDate?.message}</span>)}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <span>Precio</span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('price', {
                                            required: { value: true, message: 'El precio es requerido' },
                                            pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                                            min: { value: 1, message: 'No puede ser cero' }
                                        })}
                                    />
                                    {errors.price && (<span className="text-red-500 font-mono">{errors.price?.message}</span>)}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <span>Total</span>
                                    <input
                                        type="text"
                                        disabled
                                        autoComplete="off"
                                        className="p-2 border rounded-md bg-gray-200"
                                        {...register('total', {
                                            required: { value: true, message: 'Se requiere el total' },
                                            pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Solo números' },
                                            min: { value: 1, message: 'No puede ser cero' }
                                        })}
                                    />
                                    {errors.total && (<span className="text-red-500 font-mono">{errors.total?.message}</span>)}
                                </div>
                            </div>
                            <div className='flex justify-center mt-5 mb-5'>
                                <button
                                    className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-green-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
                                    type="submit"
                                >
                                    Registrar perfil
                                </button>
                            </div>
                        </form>
                    </HeaderModal>
                )
            }
        </>
    )
}
