'use client';

import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { ModalPassw } from '../../../ui/ModalPassw';

interface Props {
    idAccount: string;
}

export const ContentViewPass = ({ idAccount }: Props) => {

    const [openViewPass, setopenViewPass] = useState(false);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-xl">Contraseña:</h3>
                <button
                    onClick={() => setopenViewPass(true)}
                    className="text-xl flex flex-row"
                >
                    <IoLockClosedOutline />
                    <p>*********</p>
                </button>
            </div>
            {
                (openViewPass) && (<ModalPassw
                    idAccount={idAccount}
                    openModal={openViewPass}
                    handleClose={() => setopenViewPass(false)}
                />)
            }
        </>
    )
}
