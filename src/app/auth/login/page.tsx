import { LoginForm } from '@/components';

export default function LoginPage() {

    return (
        <div className="bg-no-repeat bg-cover bg-center relative"
            style={{
                backgroundImage: 'url(/image-login.png)'
            }}
        >
            <div className="absolute bg-gradient-to-b from-gray-500 to-gray-400 opacity-75 inset-0 z-0"></div>
            <div className="min-h-screen flex sm:flex-row mx-0 justify-center">
                <div className="flex-col hidden lg:flex self-center p-10 sm:max-w-5xl md:max-w-md xl:max-w-2xl z-10">
                    <div className="self-start  flex-col text-white">
                        <h1 className="mb-3 font-bold text-5xl">Hi Welcome</h1>
                        <p className="pr-3">Welcome to our platform to manage your streaming accounts!</p>
                    </div>
                </div>
                <div className="flex justify-center items-center self-center z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-100">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign In</h3>
                            <p className="text-gray-500">Inicie sesión en su cuenta.</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
