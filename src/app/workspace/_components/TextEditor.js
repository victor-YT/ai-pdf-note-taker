import React from 'react'
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'


function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello</p>',
        editorProps: {
            attributes: {
                class: 'focus: outline-none h-screen p-5'
            }
        }
    })
    return (
        <div>
            <div>
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

export default TextEditor
