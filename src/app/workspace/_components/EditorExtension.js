import React from 'react'
import {Bold, Italic, Highlighter, Strikethrough, Subscript, Superscript, Underline, Heading1, Heading2, Heading3, Code, AlignLeft, AlignCenter, AlignRight, Sparkles} from 'lucide-react'
import {api} from "../../../../convex/_generated/api"
import {useParams} from "next/navigation"
import {useAction, useMutation} from 'convex/react'
import {chatSession} from "@/configs/AIModel"
import {toast} from "sonner"
import {useUser} from "@clerk/nextjs"


function EditorExtension({editor}) {
    const {fileId} = useParams()
    const SearchAI = useAction(api.myAction.search)
    const saveNotes = useMutation(api.notes.AddNotes)
    const {user} = useUser()

    const onAiClick = async () => {
        toast("AI is getting the answer ...")
        if (editor.state.selection.from === editor.state.selection.to) {
            console.log("No text selected, start tracking")
            const AllText = editor.getHTML()
            editor.commands.focus()
            editor.commands.setContent(AllText + '<p>->&nbsp;</p>')
            let selectedText = ""

        } else {
            const selectedText = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                ''
            )
            console.log(selectedText)

            const result = await SearchAI({
                query: selectedText,
                fileId: fileId
            })

            const UnformattedAns = JSON.parse(result)
            let AllUnformattedAns=''
            UnformattedAns && UnformattedAns.forEach(item => {
                AllUnformattedAns = AllUnformattedAns + item.pageContent
            })

            const PROMT = "For question: " + selectedText + " and the given content as answer," +
                " please give only one appropriate answer in string format (use '' to content the answer). The answer content is: " + AllUnformattedAns

            const AiModelResult = await chatSession.sendMessage(PROMT)
            console.log("final answer: ", AiModelResult.response.text())
            const finalAns = AiModelResult.response.text().replace("'", '').replace("'", '')
            const AllText = editor.getHTML()
            editor.commands.setContent(AllText + '<p> <strong>Answer: </strong>'+finalAns+'</p>')

            saveNotes({
                notes: editor.getHTML(),
                fileId: fileId,
                createdBy: user?.primaryEmailAddress?.emailAddress
            })
        }
    }

    return editor&&(
        <div className='p-5'>
            <div className="control-group">
                <div className="button-group flex gap-3">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'text-blue-500' : ''}
                    >
                        <Highlighter/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-blue-500' : ''}
                    >
                        <Strikethrough/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        className={editor.isActive('subscript') ? 'text-blue-500' : ''}
                    >
                        <Subscript/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        className={editor.isActive('superscript') ? 'text-blue-500' : ''}
                    >
                        <Superscript/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'text-blue-500' : ''}
                    >
                        <Underline/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={editor.isActive('heading', {level: 1}) ? 'text-blue-500' : ''}
                    >
                        <Heading1/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={editor.isActive('heading', {level: 2}) ? 'text-blue-500' : ''}
                    >
                        <Heading2/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={editor.isActive('heading', {level: 3}) ? 'text-blue-500' : ''}
                    >
                        <Heading3/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'text-blue-500' : ''}
                    >
                        <Code/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({textAlign: 'left'}) ? 'text-blue-500' : ''}
                    >
                        <AlignLeft/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({textAlign: 'center'}) ? 'text-blue-500' : ''}
                    >
                        <AlignCenter/>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({textAlign: 'right'}) ? 'text-blue-500' : ''}
                    >
                        <AlignRight/>
                    </button>
                    <button
                        onClick={() => onAiClick()}
                        className={'hover:text-blue-500'}
                    >
                        <Sparkles/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditorExtension
