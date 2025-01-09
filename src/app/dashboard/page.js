"use client"
import React from 'react'
import {useUser} from "@clerk/nextjs"
import {useQuery} from "convex/react"
import {api} from "../../../convex/_generated/api"
import Image from "next/image"

function Dashboard() {
    const {user} = useUser()
    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })

    console.log(fileList)

    return (
        <div>
            <h2 className='font-medium text-2xl'>workspace</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5 gap-5 mt-8 bg-amber-500'>
                {fileList?.length>0?fileList?.map((file, index) => (
                    <div key={index} className='flex p-4 shadow-md rounded-md flex-col
                    items-center justify-center border cursor-pointer hover:scale-105'>
                        <Image src={'/pdf.png'} alt={'file'} width={50} height={50}/>
                        <h2 className='mt-3 font-medium text-lg'>{file?.fileName}</h2>
                    </div>
                ))
                    : <div>
                        <div className="loader">
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                            <div className="loader-square"></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dashboard
