"use client";

import Image from "next/image";


import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


import { Undo2, Camera } from "lucide-react";




export default function UpdateProfileForm({ user, editing = false }) {

    const [name, setName] = useState(user.name || "");
    const [image, setImage] = useState(user.image || "");

    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const [loggingOut, setLoggingOut] = useState(false);

    const fileInputRef = useRef(null);

    const router = useRouter();


    useEffect(() => {

        setName(user.name || "");
        setImage(user.image || "");

    }, [user.name, user.image]);


    
    
    async function handleUpdate(event) {

        event.preventDefault();

        if (!name.trim()) {

            toast.error("আপনার নাম লিখুন।");

            return;

        }


        if (name.trim() === (user.name || "").trim()) {

            toast.error("নামে কোনো পরিবর্তন করা হয়নি।");

            return;

        }


        setLoading(true);

        try {

            const result = await authClient.updateUser({

                name: name.trim(),

            });


            if (result.error) {

                toast.error(result.error.message || "নাম আপডেট করা যায়নি।");

                return;

            }


            toast.success("আপনার নাম আপডেট হয়েছে।");

            router.replace("/profile");

            router.refresh();

        }




        catch (error) {

            console.error("Profile update error:", error);

            toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");

        }



        finally {

            setLoading(false);

        }



    }


    async function handleImageUpdate(event) {

        const file = event.target.files?.[0];

        if (!file) {

            return;

        }


        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {

            toast.error("JPG, PNG অথবা WEBP ছবি নির্বাচন করুন।");

            event.target.value = "";

            return;

        }


        if (file.size > 2 * 1024 * 1024) {

            toast.error("ছবির সাইজ সর্বোচ্চ 2 MB হতে পারবে।");

            event.target.value = "";

            return;

        }


        setImageLoading(true);

        try {

            const imageUrl = await new Promise((resolve, reject) => {

                const reader = new FileReader();

                reader.onload = () => resolve(reader.result);

                reader.onerror = () => reject(new Error("ছবি পড়া যায়নি।"));

                reader.readAsDataURL(file);

            });


            const result = await authClient.updateUser({

                image: imageUrl,

            });


            if (result.error) {

                toast.error(result.error.message || "ছবি আপডেট করা যায়নি।");

                return;

            }


            setImage(imageUrl);

            toast.success("প্রোফাইল ছবি আপডেট হয়েছে।");

            router.refresh();

        }


        catch (error) {

            console.error("Profile image update error:", error);

            toast.error("ছবি আপডেট করা যায়নি। আবার চেষ্টা করুন।");

        }


        finally {

            setImageLoading(false);

            event.target.value = "";

        }

    }




    async function handleSignOut() {

        setLoggingOut(true);


        try {

            const { error } = await authClient.signOut();

            if (error) {

                toast.error("সাইন আউট করা যায়নি।");

                return;

            }


            toast.success("সাইন আউট হয়েছে।");

            router.push("/");

            router.refresh();

        }



        catch (error) {

            console.error("Sign out error:", error);

            toast.error("সংযোগে সমস্যা হয়েছে।");

        }

        finally {

            setLoggingOut(false);

        }

    }


    return (

        <div className="mx-auto w-full max-w-[680px]">

            <h1 className="text-2xl font-bold text-[#202A23]">

                আমার প্রোফাইল

            </h1>

            <p className="mt-1 text-sm text-gray-500">

                আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।

            </p>


            <section className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#DFE7E0] bg-[#FAFCFA] p-5">

                <div className="flex min-w-0 items-center gap-4">

                    {image ? (

                        <Image src={image} alt="প্রোফাইল ছবি" width={64} height={64} unoptimized className="h-16 w-16 shrink-0 rounded-full object-cover" />

                    ) : (

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-800">

                            {(name || user.name || "ব্যবহারকারী").charAt(0).toLowerCase()}

                        </div>

                    )}


                    <div className="min-w-0">

                        <h2 className="break-words text-lg font-bold text-[#202A23]">

                            {name || user.name}

                        </h2>


                        <p className="mt-1 break-all text-sm text-gray-500">

                            {user.email}

                        </p>

                    </div>

                </div>


                <button type="button" onClick={handleSignOut} disabled={loggingOut || loading || imageLoading} className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-[#FF3333] px-5 py-2 text-sm font-semibold text-[#FF3333] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">

                    <Undo2 size={18} aria-hidden="true" className="shrink-0" />

                    <span>

                        {loggingOut ? "অপেক্ষা করুন…" : "সাইন আউট"}

                    </span>

                </button>

            </section>


            <section className="mt-5 rounded-2xl border border-[#DFE7E0] bg-[#FAFCFA] p-5">

                <h2 className="font-bold text-[#202A23]">

                    তথ্য

                </h2>


                {editing && (

                    <div className="mt-5 flex flex-col items-center gap-3">
                        

                    <input ref={fileInputRef}type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpdate} disabled={imageLoading || loading || loggingOut}className="block"/>

       
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={imageLoading ||    loading || loggingOut} aria-label="প্রোফাইল ছবি পরিবর্তন করুন" title="ছবি পরিবর্তন করতে ক্লিক করুন" className="group relative h-24 w-24 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-60" >
                            

                            {image ? (
                                
                                <Image src={image} alt="প্রোফাইল ছবি" width={96} height={96} unoptimized className="h-full w-full rounded-full object-cover" />
                            
                            ) : (
                                    

                                    <span className="flex h-full w-full items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-800">

                                        


                                        {(name || user.name || "ব্যবহারকারী").charAt(0).toLowerCase()}

                                        

                                    </span>
                                    

                            )}
                            

                            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                                
            

                                <Camera size={26} aria-hidden="true" />

                                

                            </span>
                            

                        </button>
                        

                        <p className="text-xs text-gray-500">
                            

                            {imageLoading
                                
                                ? "ছবি আপডেট হচ্ছে…"
                                
                                : "ছবি পরিবর্তন করতে ছবিতে ক্লিক করুন"}
                            

                        </p>

                        

                        <p className="text-xs text-gray-500">
                            

                            JPG, PNG অথবা WEBP · সর্বোচ্চ 2 MB
                            

                        </p>
                        

                    </div>
                    

                )}
                


                <form onSubmit={handleUpdate} noValidate className="px-0 pb-4 pt-8 sm:px-5">

                    <label htmlFor="profile-name" className="block text-sm text-[#202A23]">

                        নাম

                    </label>


                    <input id="profile-name" type="text" autoComplete="name" value={name} readOnly={!editing} onChange={(event) => setName(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-[#DFE7E0] bg-transparent px-3 text-sm text-[#202A23] focus:border-green-700 focus:outline-none" />


                    {editing ? (

                        <button type="submit" disabled={loading || loggingOut || imageLoading} className="mt-4 flex h-10 w-full items-center justify-center rounded-lg bg-[#008A3D] text-sm font-bold text-white shadow-md shadow-green-700/20 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">

                            {loading ? "আপডেট হচ্ছে…" : "আপডেট"}

                        </button>

                    ) : (

                        <Link href="/profile/update" className="mt-4 flex h-10 w-full items-center justify-center rounded-lg bg-[#008A3D] text-sm font-bold text-white shadow-md shadow-green-700/20 hover:bg-green-800">

                            আপডেট

                        </Link>

                    )}

                </form>

            </section>

        </div>

    );

}