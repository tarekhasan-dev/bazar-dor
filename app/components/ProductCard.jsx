

import Link from "next/link";

export default function ProductCard({ product }) {

    const units = {
         
        kg: "প্রতি কেজি",
        litre: "প্রতি লিটার",
        dozen: "প্রতি ডজন",

        piece: "প্রতি পিস"
         

    }; 

    let changeColor = "bg-gray-100 text-gray-600"; 
    let changeIcon = "—";

    if (product.change.dir === "up") {
          
        changeColor = "bg-green-100 text-green-700";
        
         changeIcon = "▲";

    }
    

    else if (product.change.dir === "down") {
        
        changeColor = "bg-red-100 text-red-700";

         changeIcon = "▼";


    }
    

    return (

        // <Link href={`/product/${product.slug}`} className="group block rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">

        <Link href={`/product/${product.slug}`} className="group block rounded-2xl border border-green-200 bg-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-green-100 hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none">

            <div className="flex items-center gap-4 ">      
           
                

       

            {/* product image  */}

            <div className=" flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-3xl transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none "> 
                
                {product.image}
                

                </div>
          
            <div>

            {/* product name  */}

            <h3 className="text-lg font-bold text-gray-900">

            {product.nameBn}
                
            </h3>



            {/* product units */}

             <p className="mt-1 text-sm text-gray-500">

               {units[product.unit]}
                
                </p>
                
                </div>
                
            </div>
            



            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">

                <div>

                    <p className="text-xs text-gray-500">

                        আজকের দাম
                        
                    </p>


                    <p className="mt-1 text-xl font-bold text-gray-900">
                        

                        {product.today.toLocaleString("bn-BD")} টাকা
                        


                    </p>

                    </div>



                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}>


                        {changeIcon} {Math.abs(product.change.pct).toLocaleString("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
                    
                     </span>
                    
                    
                </div>

            
        </Link>

        

    )
    



}