"use client";

import Link from "next/link";

import { useEffect, useState } from "react";



export default function PriceTicker() {
    
    const [products, setProducts] = useState([]);


    useEffect(() => {

        async function loadProducts() {

            try {
                const response = await fetch("/api/products");
                

                if (!response.ok) return;

                const data = await response.json();



                if (Array.isArray(data)) {

                    setProducts(data.filter((product) => product.change));
                }


            } catch {

                // পণ্যের তথ্য না এলে ticker দেখাবে না।
            }


        }

        loadProducts();

    
    },
        
        []);
    
    

    if (products.length === 0) {

        return (

            <div className="border-b border-[#DFE7E0] bg-[#FAFCFA] px-4 py-3 text-sm text-gray-500">
                
                পণ্যের দামের তথ্য আসছে…
                
            </div>
        );
        
       


    }



    function formatPrice(price) {


        return Number(price).toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });
        

    }

    return (


        <div className="overflow-hidden border-b border-[#DFE7E0] bg-[#FAFCFA]">

            <div className="flex w-max animate-[ticker_90s_linear_infinite] hover:[animation-play-state:paused]">


                {[...products, ...products].map((product, index) => (

                    <Link key={`${product.id}-${index}`} href={`/product/${product.slug}`} className="flex shrink-0 items-center gap-2 border-r border-[#E1EAE2] px-5 py-3 text-sm">


                        
                        <span>
                          
                            {product.image}

                        
                        </span>

                        <span className="font-medium text-[#202A23]">


                            {product.nameBn}

                        </span>

                        <span className="text-gray-600">

                            {formatPrice(product.today)} টাকা/
                        
                            {product.unit === "kg"
                                
                                ? "কেজি"


                                : product.unit === "litre"
                                    
                                    ? "লিটার"
                                    

                                    : product.unit === "dozen"
                                        
                                        ? "ডজন"
                                        
                                        : "পিস"}
                            
                        </span>

                        <span className={product.change.dir === "up" ? "font-bold text-red-600" : product.change.dir === "down" ? "font-bold text-green-700" : "font-bold text-gray-500"} >
                            

                            {product.change.dir === "up"
                                
                                ? "▲"
                                : product.change.dir === "down"
                                ? "▼"
                                    : "—"}{" "}
                            

                            {formatPrice(Math.abs(Number(product.change.pct)))}%
                            

                        </span>


                    </Link>

                ))
                    
                
                
                }

            </div>


            <style jsx>{`@keyframes ticker { from {

                        transform: translateX(0);

                    }

                    to {


                        transform: translateX(-50%);
                    }

                }

            `}
            
            </style>


        </div>

    );
}


