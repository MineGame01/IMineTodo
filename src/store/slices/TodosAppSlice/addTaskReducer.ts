import { nanoid, ReducerCreators } from "@reduxjs/toolkit";
import { convertToRaw, EditorState } from "draft-js";
import { ITodosAppSliceInitialState, TTitleTask } from "./types";

export const addTaskReducer = (create: ReducerCreators<ITodosAppSliceInitialState>) => {
    return create.preparedReducer((title: TTitleTask = "No title") => {
        const createData = new Date().toJSON();
        const id = nanoid();

        return ({
            payload: {
                id,
                title,
                createData,
            }
        });
    }, (state, action) => {
        const { id, title, createData } = action.payload;
        state.taskList.unshift({
            id: id,
            status: "none",
            color: "grey",
            createData: createData,
            updateData: createData,
            content: {
                title: title,
                editorState: convertToRaw(EditorState.createEmpty().getCurrentContent()),
            }
        });
        
        state.lastEditTaskList = createData;
    });
}