import { ReducerCreators } from "@reduxjs/toolkit";
import { ITodosAppSliceInitialState, TTitleTask, TIdTask, TEditorStateTask, TColorTask } from "./types";

export const updateTaskReducer = (create: ReducerCreators<ITodosAppSliceInitialState>) => {
    return create.preparedReducer(({
        idTask,
        title,
        editorState,
        color,
    }: {
        idTask: TIdTask, 
        title?: TTitleTask, 
        editorState?: TEditorStateTask,
        color?: TColorTask
    }) => {
        const date = new Date();
        return {
            payload: {
                idTask,
                title,
                editorState,
                color,
                updateData: date.toJSON(),
            }
        }
    }, (state, action) => {
        const { idTask, title, editorState, updateData, color } = action.payload;
        state.taskList.forEach(task => {
            if (task.id === idTask) {
                task.content.title = title ?? task.content.title;
                task.content.editorState = editorState ?? task.content.editorState;
                task.updateData = updateData;
                task.color = color ?? task.color
            }
        });
        state.lastEditTaskList = updateData;
    });
}