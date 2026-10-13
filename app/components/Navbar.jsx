
"use client";


import PriceTicker from "./PriceTicker";



import Link from "next/link";

import Image from "next/image";

import CategoryNav from "./CategoryNav";


import { ShoppingCart, ChevronDown, UserRound, Undo2 } from "lucide-react";

import { Suspense, useEffect, useState } from "react";

import { useRouter } from "next/navigation";


import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";



export default function Navbar() {


    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(false);


    const { data: session, isPending } = authClient.useSession();

    const router = useRouter();



    useEffect(() => {


        const today = new Date();


        const bangladesh = today.toLocaleDateString("bn-BD", {

            day: "numeric",

            month: "long",

            year: "numeric",

            weekday: "long",

            timeZone: "Asia/Dhaka",

        });


        setDate(bangladesh);


    }, []);




    async function handleSignOut() {


        setLoading(true);


        try {


            const { error } = await authClient.signOut();


            if (error) {

                toast.error("সাইন আউট করা যায়নি।");

                return;

            }


            toast.success("সাইন আউট হয়েছে।");


            router.push("/");

            router.refresh();


        }


        catch {

            toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");

        }


        finally {

            setLoading(false);

        }


    }




    return (


        <header className="border-b border-[#DFE7E0] bg-[#FAFCFA]">


            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">


                <div>


                    <Link href="/" className="flex items-center gap-3">


                        <span className="flex items-center justify-center bg-transparent">

                            <ShoppingCart size={30} strokeWidth={2} aria-hidden="true" className="text-red-500" />

                        </span>


                        <div>


                            <p className="text-xl font-bold text-[#008A3D]">

                                বাজার দর

                            </p>


                            <p className="mt-1 text-xs font-normal text-gray-500">

                                {date}

                            </p>


                        </div>


                    </Link>


                </div>




                <nav aria-label="অ্যাকাউন্ট" className="flex items-center gap-3">


                    {isPending ? (


                        <div role="status" aria-label="অ্যাকাউন্টের তথ্য আসছে" className="h-10 w-28 animate-pulse rounded-lg bg-green-100" />


                    ) : session ? (


                        <details className="group relative">


                            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full bg-[#DDF5E4] px-3 py-2 text-sm font-medium text-[#202A23] transition-colors hover:bg-[#B3E8C4] [&::-webkit-details-marker]:hidden" >


                                {session.user.image ? (


                                    <Image src={session.user.image} alt="প্রোফাইল ছবি" width={44} height={44} unoptimized className="h-11 w-11 shrink-0 rounded-full object-cover" />


                                ) : (


                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-800">


                                        {(session.user.name || "ব্যবহারকারী").charAt(0).toLowerCase()}


                                    </span>


                                )}


                                <span className="max-w-[150px] truncate text-base font-medium">


                                    {session.user.name || "ব্যবহারকারী"}


                                </span>


                                <ChevronDown size={18} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" />


                            </summary>




                            <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-[#DFE7E0] bg-white p-4 shadow-lg">


                                <div className="border-b border-gray-100 px-1 pb-3">


                                    <p className="text-sm font-semibold text-[#202A23]">


                                        {session.user.name || "ব্যবহারকারী"}


                                    </p>


                                    <p className="mt-1 break-all text-xs text-gray-500">


                                        {session.user.email}


                                    </p>


                                </div>




                                <Link href="/profile" className="mt-2 flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-medium text-[#202A23] hover:bg-green-50">


                                    <UserRound size={16} className="shrink-0" aria-hidden="true" />


                                      <span>আমার প্রোফাইল</span>



                                </Link>




                                <button type="button" onClick={handleSignOut} disabled={loading} className="mt-1 flex w-full items-center gap-2 rounded-lg px-1 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">


                                    <Undo2 size={16} aria-hidden="true" />


                                    {loading ? "অপেক্ষা করুন…" : "সাইন আউট"}


                                </button>


                            </div>


                        </details>


                    ) : (


                        <>


                            <Link href="/signin" className="px-3 py-2 text-sm font-bold text-[#202A23] transition-colors hover:text-green-700">


                                সাইন ইন


                            </Link>


                            <Link href="/signup" className="rounded-full bg-[#008A3D] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-green-800">


                                সাইন আপ


                            </Link>


                        </>


                    )}


                </nav>


            </div>




            <Suspense fallback={


                <div className="h-12 animate-pulse bg-green-50" />


            }>


                <CategoryNav />


            </Suspense>


            <PriceTicker />
            

        </header>


    );


}
