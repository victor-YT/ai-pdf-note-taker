import Image from 'next/image'
import React from 'react'
import {UserButton} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"

function WorkspaceHeader({fileName}) {
    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src={'/logo.svg'} alt='logo' width={140} height={140}/>
            <h2 className="font-bold absolute left-1/2 transform -translate-x-1/2">{fileName}</h2>
            <div className="flex gap-2 items-center ml-auto mr-6">
                <Button>save</Button>
            </div>
            <UserButton/>
        </div>
    )
}

export default WorkspaceHeader