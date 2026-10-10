

"use client";



import Link from "next/link";

import { usePathname } from "next/navigation";


import { useEffect, useState } from "react";



export default function  CategoryNav() {
    

    const pathname =  usePathname();

    const [categories, setCategories] = useState([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");




    useEffect(() =>  {

        async function loadCategories() {

          
          
          
            try {
                
                
                const response = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");



                if (!response.ok) {

                    throw new Error("ক্যাটাগরির তথ্য আনা যায়নি।");



                }



                const data = await response.json();

                setCategories(data);



            }



            catch (error) {


                setError(error.message);



            }



            finally {



                setLoading(false);



            }


        }

        loadCategories();
        


    },
        
        
        []);
    
    
    
    

    return (

        <nav aria-label="পণ্যের ক্যাটাগরি" className="border-t border-gray-100">


            <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-1">

                {loading && (

                    <p role="status" className="animate-pulse text-sm text-gray-900">

                        ক্যাটাগরি আসছে…

                    </p>

                 )
                
                
                }



                {error && (

                    <p role="alert" className="text-sm text-red-600">

                        {error}

                    </p>

                )
                
                
                }



                {categories.map((category) => (

                    <Link key={category.id} href={`/category/${category.slug}`} className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${ pathname === `/category/${category.slug}` ? "bg-green-100 text-green-900"  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                        }`
                    
                    }>

                        <span>{category.icon}</span>


                        {category.nameBn}


                    </Link>

                ))
                
                }

            </div>


        </nav>

    );

}