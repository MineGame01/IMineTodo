import React, { useState } from "react";
import { TaskControlPanel } from "../../components/TaskControlPanel";
import { EditorTask } from "../../components/EditorTask";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { selectEditingTask, setTaskAuthUserThunk, updateTask } from "../../store/slices/TodosAppSlice";
import taskNotFoundPng from "./taskNotFound.png";
import { Button } from "../../components/Button";
import { isMobile } from "react-device-detect";
import { editTask } from "../../store/slices/EditorTaskSlice";
import { TColorTask } from "../../store/slices/TodosAppSlice/types";

export const EditorTaskPage: React.FC = () => {
    const editingTask = useAppSelector(selectEditingTask);
    const dispatch = useAppDispatch();

    const [isEditingTask, setIsEditingTask] = useState(false);
    const [titleEditingTask, setTitleEditingTask] = useState(editingTask?.content.title ?? "");
    const [editorState, setEditorState] = useState<EditorState | null>(editingTask ? EditorState.createWithContent(convertFromRaw(editingTask.content.editorState)) : null);
    const [colorEditingTask, setColorEditingTask] = useState<TColorTask>(editingTask?.color ?? "grey");

    const handleUpdateTask = () => {
        if (editingTask) {
            if (editorState) {
                dispatch(updateTask({
                    idTask: editingTask.id,
                    title: titleEditingTask,
                    editorState: convertToRaw(editorState.getCurrentContent()),
                    color: colorEditingTask,
                }));
                void dispatch(setTaskAuthUserThunk());
            }
            if (!titleEditingTask) setTitleEditingTask(editingTask.content.title);
            setIsEditingTask(false);
        }
    }

    if (editingTask && editorState) {
        return <div>
            <TaskControlPanel
            isEditingTask={isEditingTask}
            colorEditingTask={colorEditingTask}
            setColorEditingTask={setColorEditingTask}
            onUpdateTask={handleUpdateTask} />
            <div className="container mt-3">
                <EditorTask
                titleEditingTask={titleEditingTask} 
                editorStateTask={editorState} 
                setEditorStateTask={setEditorState}
                setTitleEditingTask={setTitleEditingTask} 
                setIsEditingTask={setIsEditingTask}
                isEditingTask={isEditingTask}
                createDataEditingTask={editingTask.createData} />
            </div>
        </div>
    } else {
        return <div className="h-100">
            {isMobile && <Button 
            name="Back"
            classNameStyle="btn-default m-1"
            onClick={() => { dispatch(editTask({ id: null })) }}>
                Back
            </Button>}
            <div className="d-flex justify-content-center align-items-center h-100">
                <img src={taskNotFoundPng} alt="taskNotFound" width="250" />
            </div>
        </div>
    }
}