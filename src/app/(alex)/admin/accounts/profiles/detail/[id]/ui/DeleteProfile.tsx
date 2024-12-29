'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { deleteProfile } from '@/actions';
import { errorAlert, loadingAlert, successAlert } from '@/utils';

interface Props {
  idProfile: string;
  idAccount: string;
}

export const DeleteProfile = ({ idProfile, idAccount }: Props) => {

  const router = useRouter();

  const handleDeleteProfile = () => {
    Swal.fire({
      title: "!Atención!",
      icon: "warning",
      text: 'Estas seguro de eliminar el perfil?',
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {

        loadingAlert('Eliminando perfil...');

        const { status, message } = await deleteProfile({ id: idProfile, idAccount });
        if (!status) {
          errorAlert(message);
          return;
        }

        successAlert(message);
        router.replace(`/admin/accounts/profiles/${idAccount}`);
      }
    });
  }

  return (
    <div className="flex flex-col items-center mt-2" >
      <button
        onClick={() => handleDeleteProfile()}
        className="px-3 py-1 h-12 w-full md:w-[200px] shadow-lg shadow-gray-500/50 bg-red-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
      >
        Eliminar perfil
      </button>
    </div>
  )
}
