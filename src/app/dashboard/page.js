"use client"
import React from 'react'
import {useUser} from "@clerk/nextjs"
import {useQuery} from "convex/react"
import {api} from "../../../convex/_generated/api"
import Image from "next/image"
import Link from 'next/link'


function Dashboard() {
    const {user} = useUser()
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })

    console.log("fileList:", fileList)

    return (
        Boolean(fileList)
            ?
            <div>
                <h2 className='font-medium text-2xl'>Workspace</h2>
                {fileList?.length === 0 && (
                    <div className="flex items-center justify-center h-[80]vh">
                        <div className="absolute top-[45%] transform text-center">
                            <p>No files found</p>
                            <p>Please upload new PDF</p>
                        </div>
                    </div>
                )}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                xl:grid-cols-5 gap-5 mt-8'>
                    {fileList?.map((file, index) => (
                        <Link key={index} href={'/workspace/' + file.fileId}>
                            <div key={index} className='flex p-4 shadow-md rounded-md flex-col
                                items-center justify-center border cursor-pointer hover:scale-105'>
                                <Image src={'/pdf.png'} alt={'file'} width={50} height={50}/>
                                <h2 className='mt-3 font-medium text-lg'>{file?.fileName}</h2>
                            </div>
                        </Link>))}
                </div>
            </div>
            :
            <div className='flex flex-col h-[85vh] overflow-y-hidden'>
                <h2 className='font-medium text-2xl'>Workspace</h2>
                <div className='flex-grow'>
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="loader">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Dashboard
