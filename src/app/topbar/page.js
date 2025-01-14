"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"


function Page() {
    return (
        <div className="w-screen h-screen bg-[url('/home_bg.jpg')] bg-cover bg-center">
            <div
                className="w-screen, h-[12vh] p-4 pl-7 flex justify-between">
                <Image src={'/logo.svg'} alt='logo' width={140} height={140}/>
                <div className="w-1/2 h-full flex flex-row items-center justify-end pr-7">
                    <Link href='/'>
                        <Button className="rounded-full">back to homepage</Button>
                    </Link>
                </div>
            </div>
            <div className='h-[70vh] flex justify-center items-center'>
                <a href="https://github.com/victor-YT" target="_blank" rel="noopener noreferrer">
                    <div className="text-center text-l inline-block">https://github.com/victor-YT</div>
                </a>
            </div>
        </div>
    )
}

export default Page
