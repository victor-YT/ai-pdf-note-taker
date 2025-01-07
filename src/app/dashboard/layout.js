import React from 'react'
import Sidebar from "@/app/dashboard/_components/SideBar";

function DashboardLayout({children}) {
    return (
        <div>
            <div className='md:w-64 h-screen fixed'>
                <Sidebar/>
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout