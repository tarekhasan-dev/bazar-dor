"use client";

// import { Montaga } from "next/font/google";
import Image from "next/image";


import { useEffect, useState } from "react";

export default function Hero() {

    const [date, setDate] = useState("");
    
    useEffect(() => {

    
        const today = new Date();

        const banglaDate = today.toLocaleDateString("bn-BD", {
            
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Dhaka",
            weekday: "long",
            // timeZone: "Asia/Dhaka"

        }
             
        );

         setDate(banglaDate);
        
    },
        
        []); 
    


    
    return (

        <section className="mt-8  rounded-2xl bg-green-50 px-6 py-10  sm:px-10  ">


            <div className=" grid items-center gap-8 md:grid-cols-2 ">
                
     
                <div>
                    

                    {/* <p className="text-sm font-bold text-green-700">
                        
            
                        প্রতিদিনের বাজারের খবর
                        

                    </p> */}

                    <p className=" inline-block rounded-full text-sm font-bold text-green-700 bg-green-100 px-4 py-2 "> 
                        
                        {date}

                    </p>
                    


                    <h1 className="mt-4 text-3xl font-bold leading-snug text-gray-900 sm:text-4xl ">
                        

                        আজকের বাজারের দাম                        
       

                        <br />
                        

                        এক নজরে 
                        

                    </h1>
                    
        
                    <p className="mt-4 leading-7 text-gray-600 ">
                        
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        
            
                    </p>
                    
        
                    <a href="#সব-পণ্য" className="mt-6 inline-flex items-center gap-2 rounded-full  bg-[#008A3D] px-6 py-2  font-bold  text-white transition-colors hover:bg-green-800">                        

                        সব পণ্য দেখুন

                        <span aria-hidden="true" >
                            ↓
                        </span>

                        </a>
                    


                </div>
                


                <div className="flex items-center justify-center md:justify-end  ">
                    

                    <Image src="/Hero.png" alt="hero img" width={280} height={280} className="hero-picture h-auto w-full max-w-[220px] mix-blend-multiply sm:max-w-[270px]" />
                    
        
                </div>
                

            </div>

        </section>

        
    )

}

