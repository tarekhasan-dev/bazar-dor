"use client";

import Link from "next/link";



import { useRouter } from "next/navigation";


import { useState } from "react";


// import { Github } from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";




export default function SignUpPage() {

   
    
        const router = useRouter();

        const [name, setName] = useState("");

        const [email, setEmail] = useState("");

        const [password, setPassword] = useState("");

        const [confirmPassword, setConfirmPassword] = useState("");

        const [loading, setLoading] = useState(false);


    async function handleSignUp(event) {



        event.preventDefault();



        if (!name.trim() || !email.trim() || password.length < 8) {


            toast.error("নাম, ইমেইল এবং কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।");



            return;

        }


        if (password !== confirmPassword) {


            toast.error("দুটি পাসওয়ার্ড মিলছে না।");



            return;



        }


        setLoading(true);



        try {



            const { error } = await authClient.signUp.email({



                name: name.trim(),
                email: email.trim(),
                password,



            }
            
            );


            if (error) {



                toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");



                return;




            }


            toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।");


            router.push("/signin");




        }


        catch {

            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");

        }





        finally {

            setLoading(false);




        }

    }


    async function handleSocialLogin(provider) {

        setLoading(true);


        try {

            const { error } = await authClient.signIn.social({

                provider,

                callbackURL: "/",

            });


            if (error) {

                toast.error(error.message || "সাইন ইন করা যায়নি।");

            }

        }


        catch {

            toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");

        }


        finally {

            setLoading(false);

        }

    }


    return (

        <main className="min-h-screen bg-[#F0F6F1] px-4 pt-4 pb-8">



            <div className="mx-auto w-full max-w-md">



                <h1 className="text-center text-2xl font-bold text-[#202A23]">

                    অ্যাকাউন্ট তৈরি করুন



                </h1>


                <p className="mt-2 text-center text-sm text-gray-600">



                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।




                </p>


                <div className="mt-7 rounded-2xl border border-[#DFE7E0] bg-[#FAFCFA] px-[26px] py-7">




                    <form onSubmit={handleSignUp} noValidate className="space-y-5">




                        <div>

                            <label htmlFor="name" className="block text-sm font-semibold text-[#202A23]">

                                নাম

                            </label>


                            <input id="name" type="text" autoComplete="name" placeholder="যেমন: Tarek Hasan" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-[42px] w-full rounded-lg border border-[#DFE7E0] bg-transparent px-3 text-sm text-[#202A23] placeholder:text-gray-500 focus:border-green-600 focus:outline-none" />





                        </div>







                        <div>



                            <label htmlFor="email" className="block text-sm font-semibold text-[#202A23]">

                                ইমেইল

                            </label>




                            <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-[42px] w-full rounded-lg border border-[#DFE7E0] bg-transparent px-3 text-sm text-[#202A23] placeholder:text-gray-500 focus:border-green-600 focus:outline-none" />





                        </div>






                        <div>

                            <label htmlFor="password" className="block text-sm font-semibold text-[#202A23]">

                                পাসওয়ার্ড

                            </label>




                            <input id="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-[42px] w-full rounded-lg border border-[#DFE7E0] bg-transparent px-3 text-sm text-[#202A23] placeholder:text-gray-500 focus:border-green-600 focus:outline-none" />




                        </div>





                        <div>

                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#202A23]">



                                পাসওয়ার্ড নিশ্চিত করুন



                            </label>


                            <input id="confirmPassword" type="password" autoComplete="new-password" placeholder="আবার লিখুন" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 h-[42px] w-full rounded-lg border border-[#DFE7E0] bg-transparent px-3 text-sm text-[#202A23] placeholder:text-gray-500 focus:border-green-600 focus:outline-none" />




                        </div>




                        <button type="submit" disabled={loading} className="w-full rounded-lg bg-[#008A3D] px-4 py-3 text-sm font-bold text-white shadow-md shadow-green-700/25 transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">
                            


                            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}



                        </button>


                    </form>







                    <div className="my-5 flex items-center gap-4">


                        <div className="h-px flex-1 bg-[#DFE7E0]"></div>

                        <span className="text-xs text-[#202A23]">

                            অথবা

                        </span>

                        <div className="h-px flex-1 bg-[#DFE7E0]"></div>

                    </div>


                    <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">




                        <button type="button" onClick={() => handleSocialLogin("google")} disabled={loading} className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#DFE7E0] px-2 py-3 text-sm font-semibold text-[#202A23] transition-colors hover:bg-green-50 disabled:opacity-60">




                            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">

                                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1 1 32.5 14l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5Z" />

                                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 32.5 14l5.7-5.7A20 20 0 0 0 6.3 14.7Z" />

                                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44Z" />

                                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4 5.5l6.2 5.2A20 20 0 0 0 44 24c0-1.2-.1-2.4-.4-3.5Z" />


                            </svg>


                            Google দিয়ে চালিয়ে যান

                        </button>





                        <button type="button" onClick={() => handleSocialLogin("github")} disabled={loading} className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#DFE7E0] px-2 py-3 text-sm font-semibold text-[#202A23] transition-colors hover:bg-green-50 disabled:opacity-60">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">

                                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />

                            </svg>




                            GitHub দিয়ে চালিয়ে যান





                        </button>





                    </div>






                    <p className="mt-5 text-center text-sm text-[#202A23]">



                        অ্যাকাউন্ট আছে?{" "}



                        <Link href="/signin" className="text-green-700 hover:underline">
                            


                            সাইন ইন করুন

                        </Link>


                    </p>




                </div>


                <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-green-700">
                    

                    ← হোম পেজে ফিরে যান

                </Link>






            </div>





        </main>


        
        

    );

}
