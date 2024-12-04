import React, { useMemo, useRef } from "react";
import { DraftBlockType, EditorState, RichUtils } from "draft-js";
import { HeadingBlockList, INLINE_STYLE_TASK_EDITOR, TInlineStyleTaskEditor } from "./config";
import { ChangeLevelHeadingBtn } from "./ChangeLevelHeadingBtn";
import { ToggleInlineStyleBtn } from "./ToggleInlineStyleBtn";
import { ButtonSetBlockList } from "./ButtonSetBlockList";
import { ButtonSetBlockNumberList } from "./ButtonSetBlockNumberList";

interface IEditorTaskToolbarProps {
    setEditorStateTask: React.Dispatch<EditorState>,
    editorStateTask: EditorState,
}

export const EditorTaskToolbar: React.FC<IEditorTaskToolbarProps> = ({
    setEditorStateTask,
    editorStateTask,
}) => {
    const { HeadingBlockListName, HeadingBlockListType } = useMemo(() => ({
        HeadingBlockListName: Object.values(HeadingBlockList),
        HeadingBlockListType: Object.keys(HeadingBlockList),
    }), []);

    const levelHeadingRef = useRef(1);

    const toggleBlockType = (type: DraftBlockType) => {
        setEditorStateTask(RichUtils.toggleBlockType(editorStateTask, type));
    }

    const toggleInlineStyle = (inlineStyle: TInlineStyleTaskEditor) => {
        setEditorStateTask(RichUtils.toggleInlineStyle(editorStateTask, inlineStyle));
    }

    const hasInlineStyle = (inlineStyle: TInlineStyleTaskEditor) => {
        const currentStyle = editorStateTask.getCurrentInlineStyle();
        return currentStyle.has(inlineStyle);
    }

    const changeLevelHeading = (enlarge: boolean) => {
        if (!enlarge && levelHeadingRef.current !== HeadingBlockListType.length) 
            levelHeadingRef.current = levelHeadingRef.current + 1
        else if (enlarge && levelHeadingRef.current !== 1) 
            levelHeadingRef.current = levelHeadingRef.current - 1
        toggleBlockType(HeadingBlockListName[levelHeadingRef.current]);
    }

    return <div className="pre-bg w-100 p-2 rounded-2 mt-3 mb-2">
        <ChangeLevelHeadingBtn
        name="Enlarge"
        typeHeading="enlarge" 
        changeLevelHeading={changeLevelHeading}
        levelHeading={levelHeadingRef.current} />
        <ChangeLevelHeadingBtn
        name="Reduce"
        typeHeading="reduce" 
        changeLevelHeading={changeLevelHeading}
        levelHeading={levelHeadingRef.current} />
        {Array.from(Object.keys(INLINE_STYLE_TASK_EDITOR)).map(inlineStyle => {
            return <ToggleInlineStyleBtn
            key={inlineStyle}
            name={inlineStyle}
            hasInlineStyle={hasInlineStyle} 
            toggleInlineStyle={toggleInlineStyle}
            typeStyle={inlineStyle as TInlineStyleTaskEditor} />
        })}
        <ButtonSetBlockList toggleBlockType={toggleBlockType} />
        <ButtonSetBlockNumberList toggleBlockType={toggleBlockType}/>
    </div>
}