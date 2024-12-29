import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { LayoutContentPage } from '@/components';
import { ButtonLog } from './ui/ButtonLog';

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login')
    }

    const { email, name, role } = session.user;

    return (
        <LayoutContentPage title={"Perfil"}>
            <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
                <div className="md:col-span-1 h-60 shadow-xl ">
                    <div className="flex w-full h-full relative">
                        <img src="/avatar.png" className="w-44 h-44 m-auto" alt="" />
                    </div>
                </div>
                <div className="md:col-span-3 h-60 shadow-xl p-4 space-y-2 ">
                    <div className="flex ">
                        <span
                            className="text-sm border bg-blue-50 font-bold uppercase rounded-l px-4 py-2 whitespace-no-wrap w-full md:w-1/2">
                            Name: {name}
                        </span>
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-full md:w-1/2">
                            Email: {email}
                        </span>
                    </div>
                    <div className="flex ">
                        <span
                            className="text-sm font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-full md:w-1/2">
                            Role: {role}
                        </span>
                    </div>
                    <ButtonLog />
                </div>
            </div>
        </LayoutContentPage>
    );
}
