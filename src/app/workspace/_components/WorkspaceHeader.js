import Image from 'next/image'
import React from 'react'
import {UserButton} from "@clerk/nextjs";

function WorkspaceHeader() {
    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src={'/logo.svg'} alt='logo' width={140} height={140} />
            <UserButton/>
        </div>
    )
}

export default WorkspaceHeader