"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

// import { useEffect, useState } from "react";

import { Suspense, useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import ProductCard from "../../components/ProductCard";

import { ChevronDown } from "lucide-react";



function CategoryContent() {

     
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState("");

    const [sortBy, setSortBy] = useState("default");
    
    
    


    useEffect(() => {

        async function loadProducts() {
                        
            setLoading(true);
             
                        
            setError("");
             
                        
            setCategory(null);
             
                        
            setProducts([]);
             
                

            try {

                const categoryResponse = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");



                if (!categoryResponse.ok) {

                    throw new Error("ক্যাটাগরির তথ্য আনা যায়নি।");

                }


                const categories = await categoryResponse.json();

                const selectedCategory = categories.find((item) => item.slug === slug);



                if (!selectedCategory) {

                    return;

                }

                setCategory(selectedCategory);

                const response = await fetch(`/api/products?category=${encodeURIComponent(slug)}`);



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
         

    }, [slug]);
    
    
    const sortedProducts = [...products];

    if (sortBy === "low") {
          
        sortedProducts.sort((a, b) => a.today - b.today);

    }

    else if (sortBy === "high") {

        sortedProducts.sort((a, b) => b.today - a.today);

    }
        
    

    
    return (

        <main className="min-h-screen bg-white text-gray-900">


            <Navbar />


            <div className="mx-auto max-w-6xl px-4 py-10">


                {loading ? (

                    <div role="status" className="animate-pulse rounded-2xl bg-gray-100 p-10 text-center text-gray-600">

                        পণ্যের তথ্য আসছে…

                    </div>

                ) : error ? (
                        

                    <p role="alert" className="text-red-600">

                        {error}

                    </p>
                        

                ) : !category || products.length === 0 ? (
                            

                    <div className="rounded-2xl bg-green-50 px-6 py-12 text-center">
                                

                        <h1 className="text-2xl font-bold">
                                    

                            এখানে কোনো পণ্য পাওয়া যায়নি
                                    

                        </h1>
                                

                        <Link href="/" className="mt-6 inline-flex rounded-full bg-[#008A3D] px-6 py-2 font-bold text-white hover:bg-green-800">
                                    

                            হোম পেজে ফিরে যান
                                    

                        </Link>
                                

                    </div>
                            

                ) : (


                    <section>

                        <div className="rounded-2xl border border-gray-200 bg-green-50 px-5 py-5">

                            <h1 className="flex items-center gap-3 text-2xl font-bold text-[#FF7F50]">

                                <span>{category.icon}</span>

                                {category.nameBn}

                            </h1>

                        </div>


                        <div className="mt-6 flex justify-end rounded-2xl border border-gray-200 bg-green-50 px-3 py-2">

                            <label className="flex items-center gap-2 text-sm text-[#FF7F50]">

                                সাজান

                                <div className="relative">

                                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-9 text-sm text-[#FF7F50]">

                                        <option value="default">

                                            ডিফল্ট

                                        </option>

                                        <option value="low">

                                            দাম: কম থেকে বেশি

                                        </option>

                                        <option value="high">

                                            দাম: বেশি থেকে কম

                                        </option>

                                    </select>


                                    <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />

                                </div>

                            </label>

                        </div>


                        <p className="mt-4 text-sm text-gray-600">

                            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে

                        </p>


                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {sortedProducts.map((product) => (

                                <ProductCard key={product.id} product={product} />

                            ))}

                        </div>

                    </section>
                                

                )
                
                }
                

            </div>


        </main>


    );


}

export default function CategoryPage() {

    return (

        <Suspense
            fallback={

                <div
                    role="status"
                    className="mx-auto mt-10 max-w-6xl animate-pulse rounded-2xl bg-gray-100 p-10 text-center text-gray-600"
                >

                    পণ্যের তথ্য আসছে…

                </div>

            }
        >

            <CategoryContent />

        </Suspense>

    );

}

