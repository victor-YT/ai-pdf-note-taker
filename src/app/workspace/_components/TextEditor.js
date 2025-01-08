import React from 'react'
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import Placeholder from "@tiptap/extension-placeholder"
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import EditorExtension from "@/app/workspace/_components/EditorExtension"
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

function TextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'staring writing ...'
            }),
            Bold,
            Italic,
            Highlight,
            Strike,
            Subscript,
            Superscript,
            Underline,
            Heading.configure({
                levels: [1, 2, 3]
            }),
            CodeBlockLowlight.configure({
                lowlight
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus: outline-none h-screen p-5'
            }
        }
    })

    if (!editor) {
        return null
    }

    return (
        <div>
            <EditorExtension editor={editor}/>
            <div>
                <EditorContent editor={editor}/>
            </div>
        </div>
    )
}

export default TextEditor
