import Link from "next/link";


export default function NotFound() {

    return (

        <main className="flex min-h-screen items-center justify-center bg-green-50 px-4">

            <div className="max-w-md text-center">


                <p className="text-7xl font-bold text-[#008A3D]">


                    ৪০৪

                </p>

                <h1 className="mt-6 text-2xl font-bold text-gray-900">

                    পেজটি পাওয়া যায়নি

                </h1>

                <p className="mt-3 leading-7 text-gray-600">



                    লিংকটি ভুল হতে পারে অথবা পেজটি এখন পাওয়া যাচ্ছে না।
                </p>

                <Link href="/" className="mt-6 inline-flex rounded-full bg-[#008A3D] px-6 py-3 font-bold text-white transition-colors hover:bg-green-800">
                    
                    হোম পেজে ফিরে যান

                </Link>

            </div>

        </main>

    );
    
}