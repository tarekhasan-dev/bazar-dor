
import { Suspense } from "react";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";


import LoginRequired from "@/app/components/LoginRequired";

import UpdateProfileForm from "@/app/components/UpdateProfileForm";




async function UpdateContent() {


    const requestHeaders = await headers();

    const session = requestHeaders.get("cookie")

        ? await auth.api.getSession({ headers: requestHeaders })
        : null;


    if (!session) {

        return <LoginRequired />;

    }


    return (

        <UpdateProfileForm editing={true} user={{ name: session.user.name, email: session.user.email, image: 
            session.user.image }} />

        
        
    );
}


export default function UpdateProfilePage() {

    return (

    
        
        <main className="flex min-h-screen flex-col bg-[#F0F6F1] text-[#202A23]">

        
            <Navbar />


           
            <div className="flex-1 px-4 py-10">

           
                <Suspense fallback={

           
                    
                    <div role="status" className="mx-auto max-w-[680px] animate-pulse rounded-2xl bg-green-50 p-10 text-center">

                        

                        
                        তথ্য আসছে…

                        
                   
                    </div>

                    
                }>
                 
                    <UpdateContent />

                            
                </Suspense>

            </div>


            <Footer />

        </main>

    );

}

