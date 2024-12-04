import React from "react";
import { Editor, EditorState } from "draft-js";
import { INLINE_STYLE_TASK_EDITOR } from "../EditorTaskToolbar/config";
import { EditorTaskToolbar } from "../EditorTaskToolbar";
import { GetTaskDateInfo } from "../../utils/getTaskDateInfo";
import { InfoTask } from "./InfoTask";
import { Input } from "../Forms/Input";

interface IEditorTaskProps {
    titleEditingTask: string,
    isEditingTask: boolean,
    editorStateTask: EditorState,
    createDataEditingTask: string,
    setEditorStateTask: React.Dispatch<EditorState>,
    setTitleEditingTask: React.Dispatch<string>,
    setIsEditingTask: React.Dispatch<boolean>,
}

export const EditorTask: React.FC<IEditorTaskProps> = ({
    titleEditingTask,
    editorStateTask,
    setEditorStateTask,
    setTitleEditingTask,
    setIsEditingTask,
    isEditingTask,
    createDataEditingTask,
}) => {
    const taskDateInfo = new GetTaskDateInfo(createDataEditingTask);

    return (
        <div>
            {isEditingTask ? 
                <div>
                    <Input 
                    classNameStyle="form-control-lg"
                    type="text"
                    onChange={(e) => { setTitleEditingTask(e.target.value) }}
                    placeholder="Title"
                    value={ titleEditingTask }/>
                </div> 
                :
                <div className="h3">{ titleEditingTask }</div>
            }
            <div className="mt-2 opacity-50">
                <InfoTask 
                taskData={taskDateInfo}
                taskContentLength={editorStateTask.getCurrentContent().getPlainText("").length} />
            </div>
            {isEditingTask && <EditorTaskToolbar
            editorStateTask={editorStateTask} 
            setEditorStateTask={setEditorStateTask} />}
            <div>
                <Editor 
                onFocus={() => {
                    if (!isEditingTask) setIsEditingTask(true);
                }}
                customStyleMap={INLINE_STYLE_TASK_EDITOR}
                editorState={editorStateTask}
                placeholder="Content..."
                onChange={(editorState) => {
                    setEditorStateTask(editorState);
                }}/>
            </div>
        </div>
    )
}