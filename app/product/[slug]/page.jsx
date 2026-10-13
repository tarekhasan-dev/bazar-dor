
import Link from "next/link";

import { Suspense } from "react";

import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";


import LoginRequired from "@/app/components/LoginRequired";

const units = {


    kg: "প্রতি কেজি",
         litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",


};

function formatPrice(price) {  return Number(price).toLocaleString("bn-BD", {
        maximumFractionDigits: 2,
}

);
    
    
}

async function getProducts() {


    const urls = ["https://api.api-store.workers.dev/api/bazardor/products", "https://api.abcz.workers.dev/api/bazardor/products",];
    


    for (const url of urls) {


        try {  const response = await fetch(url, {cache: "no-store", signal: AbortSignal.timeout(10000), });

            if (!response.ok) continue;

            const data = await response.json();




            if (Array.isArray(data)) {

                return data;
            }



        } catch {


            // API ব্যর্থ হলে পরের API চেষ্টা করবে।
        }


    }



    return null;

}

async function ProductDetails({ params }) {


    const { slug } = await params;
    const products = await getProducts();


    if (!products) {

        return (
            
            <p role="alert" className="py-10 text-center text-red-600" >

                পণ্যের তথ্য আনা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
            </p>

        );
    }

    const product = products.find((item) => item.slug === slug);

    if (!product) {

        notFound();
    
    }

    const requestHeaders = await headers();


    const session = requestHeaders.get("cookie")
        
        ? await auth.api.getSession({ headers: requestHeaders })

        : null;

    if (!session) {

        return <LoginRequired />;
    }

    const markets = product.markets || [];


    const minimum = markets.length
        
        ? Math.min(...markets.map((market) => Number(market.min)))
        : Number(product.today);
    
    
    

    const maximum = markets.length
        
        
        ? Math.max(...markets.map((market) => Number(market.max)))

        : Number(product.today);

    const average = markets.length ? markets.reduce(
    
    
    
              (total, market) =>
                  total +
            (Number(market.min) + Number(market.max)) / 2,
        
        
        0

              
    ) / markets.length
        
        : Number(product.today);
    

    const summary = [
    
        { title: "সর্বনিম্ন দাম", price: minimum },
        { title: "সর্বোচ্চ দাম", price: maximum },
        { title: "গড় দাম", price: average },



    ];

    return (

        <article className="space-y-5">


            <nav aria-label="Breadcrumb" className="text-sm text-gray-600">

                <ol className="flex flex-wrap items-center gap-2">
                    
                    <li>
                        

                        <Link href="/" className="hover:text-green-700">
                            
                            হোম
                            
                        </Link>
                        
                    </li>
                    

                    <li aria-hidden="true">
                        
                        ›

                    </li>
                    



                    <li>
                        
                        <Link href={`/category/${product.category}`}
                            
                            className="hover:text-green-700">
                            
                            {product.categoryNameBn}
                            
                        </Link>
                        
                    </li>

                    

                    <li aria-hidden="true">

                        ›
                    
                    </li>


                    <li aria-current="page" className="font-medium text-[#202A23]">
                        

                        {product.nameBn}
                        
                    </li>
                </ol>
                
            </nav>

            <Link href="/" className="inline-block text-sm font-semibold text-green-700 hover:text-green-900" >
                

                ← সব পণ্যে ফিরে যান


            </Link>

            <section className="flex flex-col justify-between gap-5 rounded-xl border border-[#D5E7D8] bg-[#FAFCFA] 
            
            p-4 sm:flex-row sm:items-center">


                <div className="flex items-center gap-4">

                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">


                        {product.image}


                    </span>

                    <div>

                        <h1 className="text-xl font-bold text-[#202A23] sm:text-2xl">


                            {product.nameBn}


                        </h1>

                        <p className="mt-1 text-sm text-gray-500">


                            {product.categoryNameBn} ·{" "}

                            {units[product.unit] || product.unit}


                        </p>

                        <p className="mt-2 text-xs text-gray-600">


                            বিভিন্ন বাজারের আজকের দামের তথ্য এক নজরে।

                        </p>


                    </div>


                </div>

                <div className="shrink-0 rounded-xl bg-[#F0F5F0] px-5 py-3 sm:text-right">

                    <p className="text-xs text-gray-500">


                        আজকের দাম


                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#173D28]">

                        {formatPrice(product.today)} টাকা


                    </p>

                    <p className="mt-1 text-xs text-gray-500">

                        {units[product.unit] || product.unit}


                    </p>


                    {product.change && (
                        

                        <p className={`mt-2 text-sm font-bold ${
                            
                            product.change.dir === "up"
                            

                            ? "text-red-600"
                            
                            : product.change.dir === "down"
                                
                                ? "text-green-700"
                                

                                : "text-gray-500"
                            
                            }`}>
                            

                            {product.change.dir === "up"
                                
                                ? "▲"
                                
                                : product.change.dir === "down"
                                    
                                    ? "▼"
                                    
                                    : "—"}{" "}
                            

                            {formatPrice(Math.abs(Number(product.change.pct)))}%
                            

                        </p>
                        

                    )
                    
                    
                    }


                </div>
                



            </section>

         
            <div>


                <Link href={`/category/${product.category}`} className="inline-flex rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 hover:bg-green-200"  >
                    

                    {product.categoryIcon} {product.categoryNameBn}


                </Link>


            </div>

           
            <section className="rounded-xl border border-[#E1EAE2] bg-[#FAFCFA] p-4">

                <h2 className="text-base font-bold text-[#202A23]">

                    দামের সারসংক্ষেপ

                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    {summary.map((item) => (

                        <div key={item.title} className="rounded-xl border border-[#E1EAE2] bg-white p-4" >


                            <p className="text-xs text-gray-500">

                                {item.title}

                            </p>

                            <p className={`mt-2 font-bold ${item.title === "সর্বোচ্চ দাম" ? "text-2xl text-red-600" : "text-xl text-green-700"}`}>
                                

                                {formatPrice(item.price)} টাকা
                                

                            </p>

                            

                            <p className="mt-1 text-xs text-gray-500">

                                {item.title === "গড় দাম"
                                    ? "প্রতি বাজারের গড়"
                                    : "সকল বাজারের মধ্যে"}
                                
                            </p>


                        </div>


                    ))
                    
                    
                    }


                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">

                    গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের
                    মধ্যমানের গড় থেকে হিসাব করা হয়েছে।
                </p>


            </section>

          
            <section className="rounded-xl border border-[#E1EAE2] bg-[#FAFCFA] p-4">

                <h2 className="text-base font-bold text-[#202A23]">

                    বাজারভিত্তিক আজকের দাম


                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    
                    {units[product.unit] || product.unit}


                </p>

                {markets.length === 0 ? (

                    <p className="mt-5 text-sm text-gray-600">


                        বাজারভিত্তিক তথ্য এখন পাওয়া যাচ্ছে না।

                    </p>


                ) : (
                        <div className="mt-4 overflow-x-auto rounded-xl border border-[#E1EAE2]">
                            
                            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                                

                                <thead className="bg-white">
                                    
                                    <tr className="text-gray-600">
                                        
                                        <th className="px-3 py-3 font-semibold">
                                            
                                            বাজার
                                            
                                        </th>
                                        

                                        <th className="px-3 py-3 font-semibold">
                                            
                                            বিভাগ
                                            

                                        </th>
                                        

                                        <th className="px-3 py-3 text-right font-semibold">
                                            

                                            সর্বনিম্ন
                                            
                                        </th>
                                        

                                        <th className="px-3 py-3 text-right font-semibold">
                                            
                                            সর্বোচ্চ
                                            
                                        </th>
                                        

                                        <th className="px-3 py-3 text-right font-semibold">
                                            
                                        গড়
                                        </th>
                                        


                                    </tr>
                                    

                                </thead>
                                


                                <tbody>
                                    
                                    {markets.map((market, index) => {
                                    
                                        const min = Number(market.min);
                                        
                                        const max = Number(market.max);
                                        
                                        const avg = (min + max) / 2;
                                        


                                        return (
                                        


                                            <tr key={`${market.market}-${index}`} className="border-t border-[#E1EAE2] even:bg-[#F0F5F0]" >
                                                

                                                <td className="px-3 py-3 font-medium text-[#202A23]">
                                                    
                                                    {market.market}
                                                    
                                                </td>
                                                

                                                <td className="px-3 py-3 text-gray-600">
                                                    
                                                    {market.division || "—"}
                                                    
                                                </td>
                                                

                                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                                    
                                                    {formatPrice(min)} টাকা
                                                    
                                                </td>
                                                

                                                <td className="whitespace-nowrap px-3 py-3 text-right">
                                                    
                                                    {formatPrice(max)} টাকা
                                                    
                                                </td>
                                                

                                                <td className="whitespace-nowrap px-3 py-3 text-right font-semibold">
                                                    
                                                    {formatPrice(avg)} টাকা
                                                    
                                                </td>
                                                
                                            </tr>
                                            
                                        );
                                        
                                    })
                                    
                                    }


                                </tbody>
                                
                            </table>
                            
                        </div>
                        
                )}

            </section>

        </article>

    );

}


export default function ProductPage({ params }) {

    return (


        <main className="min-h-screen bg-[#F0F5F0] text-gray-900">

            <Navbar />


            <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">

                <Suspense
                    
                    fallback={
                        <div role="status" className="animate-pulse rounded-xl bg-white p-10 text-center text-gray-600">



                            পণ্যের বিস্তারিত আসছে…

                        </div>


                    } >
                    

                    <ProductDetails params={params} />


                </Suspense>

            </div>


            <Footer />

        </main>

    );

}
