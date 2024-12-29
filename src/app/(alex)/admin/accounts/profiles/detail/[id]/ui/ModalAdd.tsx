'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { addOneMonth, errorAlert, loadingAlert, successAlert } from '@/utils';
import { createRenewalProfile } from '@/actions';

interface IRenew {
    id: string;
    idAccount: string;
    price: number;
    numberMonths: number;
    total: number;
    purchaseDate: string;
    renewalDate: string;
}

interface Props {
    idProfile: string;
    idAccount: string;
}

export const ModalAdd = ({ idProfile, idAccount }: Props) => {

    const router = useRouter();
    const { register, handleSubmit, setValue, watch, setError, reset, formState: { errors } } = useForm<IRenew>();
    const [openModalProfile, setOpenModalProfile] = useState(false);

    const handleOnSubmit = async (data: IRenew) => {
        loadingAlert('Registrando...');

        const { status, message } = await createRenewalProfile({
            ...data,
            id: idProfile,
            idAccount,
        });

        if (!status) {
            errorAlert(message);
            return;
        }
        reset();
        setOpenModalProfile(false);
        successAlert(message);
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
                    onClick={() => setOpenModalProfile(true)}
                    className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-green-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
                >
                    Agregar renovación
                </button>
            </div>
            {
                (openModalProfile) &&
                (
                    <div className={
                        clsx(
                            'fade-in px-1 md:px-0 fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10',
                            { 'invisible': !openModalProfile }
                        )
                    }>
                        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                            <div className="w-full">
                                <header className="flex items-center justify-between p-2 border-b-2 border-gray-400">
                                    <h2 className="font-semibold" id="exampleHeader">Agregar renovación</h2>
                                    <button
                                        onClick={() => setOpenModalProfile(false)}
                                        className="transition-colors hover:bg-gray-50 focus:ring focus:outline-none p-2 rounded-full"
                                    >
                                        <IoCloseCircleOutline className='w-6 h-6' />
                                    </button>
                                </header>
                                <div className="p-2 text-center">
                                    <form onSubmit={handleSubmit(handleOnSubmit)} noValidate autoComplete="off">
                                        <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">

                                            <div className="flex flex-col mb-2">
                                                <span>Fecha de renovación</span>
                                                <input
                                                autoComplete="off"
                                                    type="date"
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
                                                    type="date"
                                                    autoComplete="off"
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
                                                Agregar renovación
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}
