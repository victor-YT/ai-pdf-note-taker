import React from 'react'
import {Bold, Italic, Highlighter, Strikethrough, Subscript, Superscript, Underline, Heading1, Heading2, Heading3, Code, AlignLeft, AlignCenter, AlignRight, Sparkles} from 'lucide-react'
import {api} from "../../../../convex/_generated/api"
import {useParams} from "next/navigation"
import { useAction } from 'convex/react'

function EditorExtension({editor}) {
    const {fileId} = useParams()
    const SearchAI = useAction(api.myAction.search)

    const onAiClick = async () => {
        if (editor.state.selection.from === editor.state.selection.to) {
            console.log("No text selected, start tracking");

            editor.commands.focus()
            editor.commands.insertContent('\n')
            editor.commands.insertContent('-> ')
            editor.commands.focus()

            editor.commands.setTextSelection({options: { scrollIntoView: false } });

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
            console.log("nows answer: ", result)
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
