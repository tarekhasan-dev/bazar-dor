"use client";



import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import toast from "react-hot-toast";



export default function LoginRequired() {


    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {


        toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন।", {
            id: "login-required",
            

        }
        
        
        );

        router.replace(`/signin?callbackUrl=${encodeURIComponent(pathname || "/")}`);
        

    },
        
        [router, pathname]);
    
    
    
    return (

        <div className="py-12 text-center ">
            
            <p className="text-gray-600">

                সাইন ইন পেজে নেওয়া হচ্ছে…

            </p>

            <Link href="/signin" className="mt-4 inline-block font-bold text-green-700">
                

            
                সাইন ইন করুন

            </Link>
            


        </div>
        
    ); 



}