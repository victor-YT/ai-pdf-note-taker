import React, { createContext, useContext, useState } from 'react'

export const EditorContext = createContext(null)

export const useEditorState = () => useContext(EditorContext)

export const EditorProvider = ({ children }) => {
    const [editorState, setEditorState] = useState(null)

    return (
        <EditorContext.Provider value={{ editorState, setEditorState }}>
            {children}
        </EditorContext.Provider>
    );
};
