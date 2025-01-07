import {NextResponse} from "next/server"
import {WebPDFLoader} from "@langchain/community/document_loaders/web/pdf"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"


const pdfUrl = "https://savory-oyster-573.convex.cloud/api/storage/9a18f7ba-c189-4bb3-a060-71c216708d48"

export async function GET (req) {

    // 1. load the PDF file
    const response = await fetch(pdfUrl)
    const data = await response.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdfTextContent = ''
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent + doc.pageContent
    })

    // 2. split the text
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20
    })

    const output = await splitter.createDocuments([pdfTextContent])

    let splitterList = []
    output.forEach(doc => {
        splitterList.push(doc.pageContent)
    })

    return NextResponse.json({result: splitterList})
}
