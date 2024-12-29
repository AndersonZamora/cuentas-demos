import Link from 'next/link';

export default async function Home() {
  return (
    <div className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(/image-login.png)'
      }}
    >
      <div className="absolute bg-gradient-to-b from-gray-500 to-gray-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen flex sm:flex-row mx-0 justify-center">
        <div className="flex justify-center items-center self-center z-10">
          <div className="px-12 self-start  flex-col text-white">
            <h1 className="mb-3 font-bold text-5xl">Hi Welcome</h1>
            <p className="pr-3">Welcome to our platform to manage your streaming accounts!</p>
            <div className="flex w-56 mt-4">
              <Link
                href={"/admin"}
                className="px-3  mt-3 py-1 h-10 text-center text-lg w-full shadow-lg shadow-gray-500/50 bg-red-700 text-white rounded-lg text-[15px] cursor-pointer active:scale-[.97]"
              >
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
