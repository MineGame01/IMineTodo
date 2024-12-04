import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTask } from "./TodosAppSlice";

interface IEditorTaskSliceInitialState {
    idEditingTask: string | null,
}

const initialState: IEditorTaskSliceInitialState = {
    idEditingTask: null,
}

const EditorTaskSlice = createSlice({
    name: "editorTask",
    initialState,
    reducers: {
        editTask: (state, action: PayloadAction<{ id: string | null }>) => {
            const { id } = action.payload;
            state.idEditingTask = id;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTask, (state, action) => {
            const { id } = action.payload;
            state.idEditingTask = id;
        })
    }
});

export default EditorTaskSlice.reducer;
export const { editTask } = EditorTaskSlice.actions;