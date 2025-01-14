import Image from 'next/image'
import React from 'react'
import {UserButton, useUser} from "@clerk/nextjs"
import {Button} from "@/components/ui/button"
import {useEditorState} from "@/contexts/EditorContext"
import {useParams} from "next/navigation"
import {useMutation} from "convex/react"
import {api} from "../../../../convex/_generated/api"
import {toast} from "sonner"
import {House} from "lucide-react"
import Link from "next/link"


function WorkspaceHeader({fileName}) {
    const {editorState} = useEditorState()
    console.log("header editor: ", editorState)
    const {fileId} = useParams()
    const {user} = useUser()
    const saveNotes = useMutation(api.notes.AddNotes)
    const handleSave = () => {
        saveNotes({
            notes: editorState.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        toast("Note saved successfully.")
    }

    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src={'/logo.svg'} alt='logo' width={140} height={140}/>
            <Link href="/dashboard">
                <Button className="ml-6 flex items-center">
                    <House/>
                </Button>
            </Link>
            <h2 className="center-text absolute left-1/2 transform -translate-x-1/2">{fileName}</h2>
            <div className="flex gap-2 items-center ml-auto mr-6">
                <Button onClick={handleSave}>
                    save
                </Button>
            </div>
            <UserButton/>
        </div>
    )
}

export default WorkspaceHeader
