import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {Layout} from "lucide-react";

function Sidebar() {
    return (
        <div className='shadow-md h-screen p-7'>
            <Image src={'/logo.svg'} alt='logo' width={170} height={120}/>

            <div className='mt-10'>
                <Button className='w-full'>+ Upload PDF</Button>

                <div className='flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Layout/>
                    <h2>Workspace</h2>
                </div>
                <div className='flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Layout/>
                    <h2>Upgrade</h2>
                </div>
            </div>
        </div>
    )
}

export default Sidebar