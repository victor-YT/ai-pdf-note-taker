"use client"
import React from 'react'
import Image from 'next/image'
import {Button} from '@/components/ui/button'
import {Layout, Shield} from "lucide-react"
import {Progress} from "@/components/ui/progress"
import UploadPdfDialog from "@/app/dashboard/_components/UploadPdfDialog"
import {useUser} from '@clerk/nextjs'
import {useQuery} from "convex/react"
import {api} from "../../../../convex/_generated/api"
import {usePathname} from "next/navigation"
import Link from "next/link"

function Sidebar() {
    const {user} = useUser()
    const path = usePathname()
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })
    const GetUserInfo = useQuery(api.user.GetUserInfo, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })
    console.log(GetUserInfo)

    return (
        <div className='shadow-md h-screen p-7'>
            <Image src={'/logo.svg'} alt='logo' width={170} height={120}/>

            <div className='mt-10'>
                <UploadPdfDialog isMaxFile={(fileList?.length >= 100 && !GetUserInfo.upgrade)}>
                    <Button className='w-full'>+ Upload PDF</Button>
                </UploadPdfDialog>
                <Link href={'/dashboard'}>
                <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer
                    ${path==='/dashboard'&&'bg-slate-200'}`}>
                    <Layout/>
                    <h2>Workspace</h2>
                </div>
                </Link>
                <Link href={'/dashboard/upgrade'}>
                <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer
                    ${path==='/dashboard/upgrade'&&'bg-slate-200'}`}>
                    <Shield/>
                    <h2>Upgrade</h2>
                </div>
                </Link>
            </div>
            {!(GetUserInfo?.upgrade) && <div className='absolute bottom-12 w-[80%]'>
                <Progress value={fileList?.length > 0 ? fileList?.length : 0}/>
                <p className="text-sm mt-1 text-center"> {fileList?.length > 0 ? fileList?.length : 0} out of 100 PDF Uploaded</p>
            </div>}
            {(GetUserInfo?.upgrade) &&
                <div className='absolute bottom-12 w-[80%]'>
                    <Progress value={0}/>
                    <p className="text-sm mt-1 text-center">Unlimited PDF upload</p>
                </div>
            }
        </div>
    )
}

export default Sidebar
