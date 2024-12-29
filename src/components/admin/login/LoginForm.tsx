'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {

    const [state, dispath] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace('/admin')
        }
    }, [state])

    return (
        <form action={dispath} className="flex flex-col" noValidate autoComplete="off">
            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                    <input className=" w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type="email"
                        autoComplete="off"
                        name='email'
                        placeholder="email@gmail.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">Contraseña</label>
                    <input className=" w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                        type="password"
                        autoComplete="off"
                        name='password'
                        placeholder="*********"
                    />
                </div>
            </div>
            <div className='flex h-8 items-end space-x-1'
                aria-live='polite'
                aria-atomic='true'
            >
                {state === 'Invalid credentials.' && (
                    <div className='mb-2 flex flex-grow'>
                        <IoInformationOutline className='h-5 w-5 text-red-500' />
                        <p className='text-sm text-red-500'>Credenciales no son correctas</p>
                    </div>
                )}

            </div>
            <LoginButton />
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            className={
                clsx({
                    "btn-primary": !pending,
                    "btn-disabled": pending
                })
            }
            disabled={pending}
        >
            Ingresar
        </button>
    )
}
