'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { updateSupplier } from '@/actions';
import { ISupplier } from '@/interfaces';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface RSupplier {
    id: string;
    name: string;
    company: string;
    contact: string
}

interface Props {
    supplier: ISupplier;
}

export const SupplierUpdateForm = ({ supplier }: Props) => {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<RSupplier>({
        defaultValues: { ...supplier }
    });

    const handleOnSutmit = async (data: RSupplier) => {

        loadingAlert('Actualizando proveedor...');

        const { status, message } = await updateSupplier(data);
        if (!status) {
            errorAlert(message);
            return;
        }

        successAlert(message);
        router.replace('/admin/suppliers');
    }

    return (
        <form className='fade-in px-2 md:px-4' onSubmit={handleSubmit(handleOnSutmit)} noValidate autoComplete="off">
            <div className="grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span>Nombre</span>
                    <input
                        type="text"
                        autoComplete="off"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('name', {
                            required: { value: true, message: 'El nombre es requerida' },
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                            minLength: { value: 3, message: 'Minimo 3 letras' },
                            maxLength: { value: 100, message: 'Maximo 100 letras' }
                        })}
                    />
                    {errors.name && (<span className="text-red-500 font-mono">{errors.name?.message}</span>)}
                </div>
                <div className='flex flex-col mb-2'>
                    <span>Compañía</span>
                    <input
                        type="text"
                        autoComplete="off"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('company', {
                            required: { value: true, message: 'La compañía es requerida' },
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                            minLength: { value: 3, message: 'Minimo 3 letras' },
                            maxLength: { value: 100, message: 'Maximo 100 letras' }
                        })}
                    />
                    {errors.company && (<span className="text-red-500 font-mono">{errors.company?.message}</span>)}
                </div>
                <div className='flex flex-col mb-2'>
                    <span>Contacto</span>
                    <input
                        type="text"
                        autoComplete="off"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('contact', {
                            pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                            minLength: { value: 3, message: 'Minimo 3 letras' },
                            maxLength: { value: 100, message: 'Maximo 100 letras' }
                        })}
                    />
                    {errors.contact && (<span className="text-red-500 font-mono">{errors.contact?.message}</span>)}
                </div>
            </div>
            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="w-[200px] md:w-[300px]  text-center  rounded bg-slate-800 py-2.5 text-md font-semibold text-white"
                    type="submit"
                >
                    Actualizar proveerdor
                </button>
            </div>
        </form>
    )
}
