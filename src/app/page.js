"use client"

import {Button} from "@/components/ui/button"
import {UserButton, useUser, SignInButton, SignUpButton} from "@clerk/nextjs"
import {useMutation} from "convex/react"
import {api} from "../../convex/_generated/api"
import React, {useEffect} from "react"
import Image from "next/image"
import Link from "next/link";

export default function Home() {

    const {user} = useUser()
    const createUser = useMutation(api.user.createUser)

    useEffect(() => {
    user && CheckUser()
    }, [user]);

    const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName: user?.fullName
    })
    console.log(result)
    }
    return (
        <div className="w-screen h-screen bg-[url('/home_bg.jpg')] bg-cover bg-center">
            <div
                className="w-screen, h-[12vh] p-4 pl-7 flex justify-between">
                <Link href="/">
                    <Image src={'/logo.svg'} alt='logo' width={140} height={140}/>
                </Link>
                <div className="w-1/2 h-full flex flex-row items-center justify-end pr-7 space-x-7">
                    <a href='https://github.com/victor-YT/ai-pdf-note-taker' target="_blank" rel="noopener noreferrer">
                        <p className='inline text-gray-500'>technical detail</p>
                    </a>
                    <Link href='/topbar'>
                        <p className='inline text-gray-500'>contact</p>
                    </Link>
                    <UserButton/>
                    {!user &&
                        <SignInButton mode="modal">
                            <Button className="rounded-full">sign in</Button>
                        </SignInButton>}
                </div>
            </div>
            <div className="w-screen h-[6vh]">
            </div>
            <div className="text-center mt-20">
                <div>
                    <h1 className="text-7xl font-bold text-gray-800">
                        Simplify<span className="text-blue-600"> PDF</span><span
                        className="text-red-600"> Note</span>-Taking
                    </h1>
                    <h1 className="text-7xl font-bold text-gray-800 mt-3 mb-5">
                        with AI-Powered
                    </h1>
                </div>
                <p className='text-gray-400'>Elevate your note-taking experience with our AI-powered PDF app.</p>
                <p className='text-gray-400'>Seamlessly extract key insights, summaries and annotations from any PDF
                    with just a few clicks</p>
            </div>
            <div className="w-screen flex justify-center items-center p-4">
                {!user &&
                    <SignInButton mode="modal">
                        <Button className="mt-5 rounded-full">
                            Start now
                        </Button>
                    </SignInButton>}
                {user &&
                    <Link href='/dashboard'>
                        <Button className="mt-5 rounded-full">
                            Start now
                        </Button>
                    </Link>}
            </div>
            <div className="shadow-sm h-[8vh] w-screen"></div>
            <div className="w-screen h-[20vh] flex items-center justify-between bottom-5">
                <div className="w-[20%] pl-10 ml-10">
                    <p className='text-gray-500'><b>Unlimited LLM support</b></p>
                    <p className='text-gray-400'>Google Gemini 1.5 powered</p>
                </div>

                <div className="w-[19%] pl-10 ml-10">
                    <p className='text-gray-500'><b>Powerful note-taking</b></p>
                    <p className='text-gray-400'>Minimalist yet elegant</p>
                </div>

                <div className="w-[20%] pr-10 mr-10">
                    <p className='text-gray-500'><b>Custom AI</b></p>
                    <p className='text-gray-400'>Answer based on given PDF</p>
                </div>
            </div>
        </div>
        // <div className="relative w-screen h-screen">
        //     <div className="absolute inset-0 bg-white/30 backdrop-blur-[20px] scale-125"></div>
        //
        //     <div className="flex items-center justify-center h-full">
        //         <h1 className="text-7xl font-bold text-gray-800">
        //             Simplify<span className="text-blue-600"> PDF</span>
        //             <span className="text-red-600"> Note</span>-Taking
        //         </h1>
        //     </div>
        // </div>
    )
}




