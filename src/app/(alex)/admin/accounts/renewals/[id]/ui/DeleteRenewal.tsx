'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { errorAlert, loadingAlert, successAlert } from '@/utils';
import { deleteAccount } from '@/actions';

interface Props {
  idAccount: string;
}

export const DeleteRenewal = ({ idAccount }: Props) => {

  const router = useRouter();

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "!Atención!",
      icon: "warning",
      text: 'Estas seguro de eliminar la cuenta? se eliminaran los perfiles asociados a esta cuenta',
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminalo",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {

        loadingAlert('Eliminando cuenta...');

        const { status, message } = await deleteAccount(idAccount);
        if (!status) {
          errorAlert(message);
          return;
        }

        successAlert(message);
        router.replace('/admin/accounts')
      }
    });
  }

  return (
    <div className="flex flex-col items-center mt-2" >
      <button
        onClick={() => handleDeleteAccount()}
        className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-red-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
      >
        Eliminar cuenta
      </button>
    </div>
  )
}
