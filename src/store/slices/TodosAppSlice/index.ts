import { getTaskListLocalStorage } from "../../../utils/taskListLocalStorage";
import { TState } from "../../store";
import { createAppSlice } from "../../createAppSlice";
import { addTaskReducer } from "./addTaskReducer";
import { updateTaskReducer } from "./updateTaskReducer";
import { getTaskListAuthUserThunkReducer } from "./getTaskListAuthUserThunkReducer";
import { setTaskAuthUserThunkReducer } from "./setTaskAuthUserThunkReducer";
import { ITodosAppSliceInitialState, TIdTask, TTaskList, TTodosAppStatus } from "./types";
import { authSet } from "../AuthSlice";
import { createSelector } from "@reduxjs/toolkit";

const initialState: ITodosAppSliceInitialState = {
    taskList: getTaskListLocalStorage(),
    status: "none",
    error: null,
    lastEditTaskList: null,
}

const TodosAppSlice = createAppSlice({
    name: "todosApp",
    initialState,
    reducers: (create) => {
        return {
            // Reducers
            setStatus: create.reducer<TTodosAppStatus>((state, action) => {
                state.status = action.payload;
            }),
            importTaskList: create.reducer<{ importTaskList: TTaskList }>((state, action) => {
                state.taskList = [...state.taskList, ...action.payload.importTaskList];
            }),
            addTask: addTaskReducer(create),
            deleteTask: create.reducer<{ idTask: TIdTask }>((state, action) => {
                state.taskList = state.taskList.filter(task => task.id !== action.payload.idTask);
            }),
            updateTask: updateTaskReducer(create),

            // Thunks
            getTaskListAuthUserThunk: getTaskListAuthUserThunkReducer(create),
            setTaskAuthUserThunk: setTaskAuthUserThunkReducer(create),
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authSet, (state, action) => {
            const { email, uid, accessToken } = action.payload;
            if (!email && !uid && !accessToken) {
                state.taskList = [];
            }
        })
    }
});

export const {
    addTask,
    deleteTask,
    updateTask,
    importTaskList,
    setStatus,
    getTaskListAuthUserThunk,
    setTaskAuthUserThunk
} = TodosAppSlice.actions;

export default TodosAppSlice.reducer;

export const selectTaskList = (state: TState) => state.root.todosApp.taskList;

export const selectEditingTask = createSelector(
    [
        selectTaskList,
        (state: TState) => state.root.editorTask.idEditingTask,
    ],
    (taskList, idEditingTask) => { 
        return taskList.find(task => task.id === idEditingTask);
    }
)