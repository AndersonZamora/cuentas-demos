'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createCategory } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface IRcategory {
    name: string;
}

export const CategoryRegisterForm = () => {

    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm<IRcategory>();

    const handleOnSutmit = async (data: IRcategory) => {
  
         loadingAlert('Registrando categoria...');

        const { status, message } = await createCategory(data);
        
        if (!status) {
            errorAlert(message);
            return;
        }

         successAlert(message);
         router.replace('/admin/categorys');
    }

    return (
        <form className='fade-in' onSubmit={handleSubmit(handleOnSutmit)} noValidate autoComplete="off">
            <div className='px-1 md:px-10 flex flex-col mb-2 w-full'>
                <span>Categoria</span>
                <input
                    type="text"
                    autoComplete="off"
                    className="p-2 border rounded-md bg-gray-200"
                    {...register('name', {
                        required: { value: true, message: 'La descripción es requerida' },
                        pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.#\-_°]+$/, message: 'No valido' },
                        minLength: { value: 3, message: 'Minimo 3 letras' },
                        maxLength: { value: 100, message: 'Maximo 100 letras' }
                    })}
                />
                {errors.name && (<span className="text-red-500 font-mono">{errors.name?.message}</span>)}
            </div>

            <div className='flex justify-center mt-5 mb-5'>
                <button
                    className="w-[200px] md:w-[300px]  text-center  rounded bg-green-800 py-2.5 text-md font-semibold text-white"
                    type="submit"
                >
                    Registrar categoria
                </button>
            </div>
        </form>
    )
}
