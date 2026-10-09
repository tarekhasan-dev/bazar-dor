"use client";

import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

export default function ProductList() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

           
           
           
                 try {

                const response = await fetch("https://api.api-store.workers.dev/api/bazardor/products");

                if (!response.ok) {

                    throw new Error("পণ্যের তথ্য আনা যায়নি। আবার চেষ্টা করুন।");

                }

                const data = await response.json();

                setProducts(data);

            }

            catch (error) {

                setError(error.message);

            }

            finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    if (loading) {

        return (

            <div role="status" className="mt-6 animate-pulse rounded-2xl bg-gray-100 p-10 text-center text-gray-600">

                পণ্যের তথ্য আসছে…

            </div>

        );

    }

    if (error) {

       return <p role="alert" className="mt-6 text-red-600">{error}</p>;

    }


    const risers = products
    
        .filter((product) => product.change.dir === "up")
        

        .sort((a, b) => b.change.pct - a.change.pct)
    
        .slice(0, 6); 
    
    const fallers = products
     
        .filter((product) => product.change.dir === "down")
    
        .sort((a, b) => a.change.pct - b.change.pct)
    
        .slice(0, 6);   
    

    return (

        <div className="mt-12 space-y-12 ">


            <section>

                <h2 className="text-2xl font-bold text-green-700">

                    আজ দাম বেড়েছে ▲
                    


                </h2>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">

                     {risers.map((product) => (

                        <ProductCard key={product.id} product={product} />
                        
                    ))
                        
                    
                    
                    }


                </div>


            </section>


            <section>

                <h2 className="text-2xl font-bold text-red-700 ">
                    

                    আজ দাম কমেছে ▼

                </h2>


                <div className="mt-6 grid grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3  ">

                    {fallers.map((product) => (
                         
                        <ProductCard key={product.id} product={product} />

                    ))
                    
                    }



                </div>

            </section>
            

          


            
            <section id="সব-পণ্য" className="scroll-mt-6">

                <h2 className="text-2xl font-bold text-gray-900 ">

                     সব পণ্য


                </h2>

           

            
            <p className="mt-2 text-gray-600">

                নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে।
                

            </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                    


                {products.map((product) => (
                    
                    <ProductCard key={product.id} product={product} />
                     

                 ))
                
                }

                </div>

            </section>
            

        </div>
        

    );
    

}