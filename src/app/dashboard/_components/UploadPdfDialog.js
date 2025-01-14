"use client"
import React, {useState} from 'react'
import { X } from "lucide-react"
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogPrimitive
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useAction, useMutation} from "convex/react"
import {api} from "../../../../convex/_generated/api"
import {Loader2Icon} from "lucide-react"
import uuid4 from "uuid4"
import {useUser} from "@clerk/nextjs";
import {toast} from "sonner";


function UploadPdfDialog({children, isMaxFile}) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb)
    const getFileUrl = useMutation(api.fileStorage.getFileUrl)
    const embeddingDocument = useAction(api.myAction.ingest)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const {user} = useUser()
    const [fileName, setFileName] = useState()
    const [open, setOpen] = useState(false)

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
        const fileUrl = await getFileUrl({storageId: storageId})
        // 3. save the newly allocated storage id to the database
        const resp = await addFileEntry({
            fileId: fileId,
            storageId: storageId,
            fileName: fileName??'Untitled File',
            fileUrl: fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        // console.log(resp)

        // API call to fetch PDF process data
        const ApiResponse = await axios.get('/api/pdf_loader?pdfUrl='+fileUrl)
        console.log(ApiResponse.data.result)
        await embeddingDocument({
            splitText: ApiResponse.data.result,
            fileId: fileId
        })
        // console.log(embeddingResult)
        setLoading(false)
        setOpen(false)
        toast('File is ready.')
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} disabled={isMaxFile} className={'w-full'}>+ Upload PDF File</Button>
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
                    <DialogPrimitive.Close
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        onClick={() => {setOpen(false)}}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={OnUpload} disabled={loading}>
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
