"use client"
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useMutation} from "convex/react"
import {api} from "../../../../convex/_generated/api"
import {Loader2Icon} from "lucide-react"
import uuid4 from "uuid4"
import {useUser} from "@clerk/nextjs";


function UploadPdfDialog({children}) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const {user} = useUser()
    const [fileName, setFileName] = useState()

    const onFileSelect = (event) => {
        setFile(event.target.files[0])
    }

    const OnUpload = async () => {
        setLoading(true)

        // 1. get the short-lived upload URL
        const postUrl = await generateUploadUrl()

        // 2. POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        })
        const { storageId } = await result.json()
        console.log('storageId: ',storageId)

        const fileId = uuid4()
        // 3. save the newly allocated storage id to the database
        const resp = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName??'Untitled File',
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        console.log(resp)
        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload PDF File</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Select a file to Upload</h2>
                            <div className="mt-5 gap-2 p-3 rounded-md border">
                                <input type='file' accept='application/pdf'
                                onChange={(event) => onFileSelect(event)}/>
                            </div>
                            <div className='mt-2'>
                                <label>File Name *</label>
                                <Input placeholder='File Name' onChange={(e) => setFileName(e.target.value)}/>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={OnUpload}>
                        {loading?
                            <Loader2Icon className='animate-spin'/>:'Upload'
                        }
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UploadPdfDialog
