
"use client"; 


import Link from "next/link";

// import { ShoppingCart } from "lucide-react";

import { ShoppingCart } from "lucide-react";

import { useEffect, useState } from "react";

export default function Navbar() {


    const [date, setDate] = useState("");


    useEffect(() => {


        const today = new Date();

        const bangladesh = today.toLocaleDateString("bn-BD", {

            day: "numeric",
            month: "long",
            year: "numeric",
          timeZone: "Asia/Dhaka",

             
        });


          
        setDate(bangladesh);


    
    },
        
        
        []); 
    
    

    return (

        <header className="border-b border-gray-200 bg-white">

            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5">


                <div>

                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-green-700">

                        <ShoppingCart size={24} className="text-red-500" />

                        

                   বাজার দর

                </Link>


                <p className="mt-1 text-xs text-gray-500 ">

                      {date}


                </p>


                </div>
                

                {/* sing in and sing up btn  */}

                <nav className="flex items-center gap-3">

                    <Link href="/signin" className="px-3 py-3  text-sm font-bold text-gray-900 sm:text-base  transition-colors hover:text-green-700 active:text-green-700 ">

                        সাইন ইন

                    </Link>

                    <Link href="/signup" className=" rounded-full bg-[#008A3D] px-5 py-2 text-sm font-bold text-white shadow-md shadow-green-700/25 transition-colors hover:bg-green-800  sm:text-base ">

                        সাইন আপ

                    </Link>

                </nav>
 
            </div>

        </header>

    );

}