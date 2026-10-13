import Navbar from "./components/Navbar";

import Hero from "./components/Hero";

import ProductList from "./components/ProductList";

import Footer from "./components/Footer";


export default function Home() {


    return (

        <main className="min-h-screen bg-white text-gray-900">


            <Navbar />

            <div className="mx-auto max-w-6xl px-4 pb-10">

                <Hero />

                <ProductList />

            </div>




            <Footer />



        </main>
    );

    
}