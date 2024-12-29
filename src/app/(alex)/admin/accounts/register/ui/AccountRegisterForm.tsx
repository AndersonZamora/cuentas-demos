'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createAccount } from '@/actions';
import type { ICategory, ISupplier } from '@/interfaces';
import { addOneMonth, capitalize, errorAlert, loadingAlert, successAlert } from '@/utils';

type IRaccount = {
    categoryId: string;
    supplierId: string;
    price: number;
    numberMonths: number;
    total: number;
    email: string;
    password: string;
    numberProfiles: number;
    purchaseDate: string;
    renewalDate: string;
}

interface Props {
    categorys: ICategory[];
    suppliers: ISupplier[];
}

export const AccountRegisterForm = ({ categorys, suppliers }: Props) => {

    const router = useRouter();

    const { register, handleSubmit, setValue, watch, setError, formState: { errors } } = useForm<IRaccount>();

    const handleOnSutmit = async (data: IRaccount) => {
        loadingAlert('Registrando cuenta...');

        const { status, message } = await createAccount({
            ...data
        });
        if (!status) {
            errorAlert(message);
            return;
        }

        successAlert(message);
        router.replace('/admin/accounts');
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
        <form className='fade-in px-2 md:px-4' onSubmit={handleSubmit(handleOnSutmit)} noValidate autoComplete="off">
            <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span>Categoría</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', {
                            required: { value: true, message: 'Seleccione una Categoría' },
                        })}
                    >
                        <option value="">[ Seleccione ]</option>
                        {
                            categorys.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {`${capitalize(cat.name)}`}
                                </option>
                            ))
                        }
                    </select>
                    {errors.categoryId && (<span className="text-red-500 font-mono">{errors.categoryId?.message}</span>)}
                </div>
                <div className="flex flex-col mb-2">
                    <span>Proveedor</span>
                    <select
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('supplierId', {
                            required: { value: true, message: 'Seleccione un proveedor' },
                        })}
                    >
                        <option value="">[ Seleccione ]</option>
                        {
                            suppliers.map(sup => (
                                <option key={sup.id} value={sup.id}>
                                    {`${capitalize(sup.company)}`}
                                </option>
                            ))
                        }
                    </select>
                    {errors.supplierId && (<span className="text-red-500 font-mono">{errors.supplierId?.message}</span>)}
                </div>
                <div className="flex flex-col mb-2">
                    <span>Fecha de compra</span>
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
                <div className="flex flex-col mb-2">
                    <span>Número de perfiles</span>
                    <input
                        type="text"
                        autoComplete="off"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('numberProfiles', {
                            required: { value: true, message: 'Se requiere el número de perfiles' },
                            pattern: { value: /^[0-9]+$/, message: 'Solo números' },
                            min: { value: 1, message: 'No puede ser cero' }
                        })}
                    />
                    {errors.numberProfiles && (<span className="text-red-500 font-mono">{errors.numberProfiles?.message}</span>)}
                </div>
                <div className="flex flex-col mb-2">
                    <span>Correo</span>
                    <input
                        type="text"
                        autoComplete="off"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('email', {
                            required: { value: true, message: 'Se requiere un correo' },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Correo no valido' },
                        })}
                    />
                    {errors.email && (<span className="text-red-500 font-mono">{errors.email?.message}</span>)}
                </div>
                <div className="flex flex-col mb-2">
                    <span>Contraseña</span>
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
            </div>
            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                    type="submit"
                >
                    Registrar cuenta
                </button>
            </div>
        </form>
    )
}
