import React, {useEffect, useRef, useState} from 'react';
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.css'

export const MyEditor = (props) => {
    const {value, onChange, readOnly, placeholder} = props
    const editor = useRef(null)
    const focus = () => editor.current.focus();

    let forOldEvent=EditorState.createEmpty()
    try {
        forOldEvent === value ?
            EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
            : EditorState.createEmpty()
    }catch (e){
        const x = () => {
        }
    }

    const [editorState, setEditorState] = useState(forOldEvent)

    useEffect(() => {
        try {
            if (value && (!editorState.getCurrentContent().hasText() || readOnly)) {
                setEditorState(value ?
                    EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
                    : EditorState.createEmpty())
            }
        }catch (e){
            const x = () => {
            }
        }
    }, [value])

    useEffect(() => {
        if (onChange) {
            if (editorState.getCurrentContent().hasText())
                onChange(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            else
                onChange('')
        }
    }, [editorState])


    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }

    const styleMap = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
    };

    const onTab = (e) => {
        const maxDepth = 4;
        setEditorState(RichUtils.onTab(e, editorState, maxDepth));
    }

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return null;
        }
    }

    let className = `RichEditor-editor ${readOnly ? 'RichEditor-editor-read' : ''}`

    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <>
            <div className={`RichEditor-root${readOnly ? '-read' : ''}`}>
                <div className={className} onClick={focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        onChange={setEditorState}
                        onTab={onTab}
                        placeholder={placeholder}
                        ref={editor}
                        spellCheck={true}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </>
    );
}

