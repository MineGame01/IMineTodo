import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import TodosAppSlice from "./slices/TodosAppSlice";
import SettingAppSlice from "./slices/SettingAppSlice";
import EditorTaskSlice from "./slices/EditorTaskSlice";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
    todosApp: TodosAppSlice,
    settingApp: SettingAppSlice,
    editorTask: EditorTaskSlice,
    auth: AuthSlice,
})

export const store = configureStore({
    reducer: {
        root: rootReducer,
    }
});

export type TStore = typeof store;
export type TState = ReturnType<TStore["getState"]>;
export type TDispatch = TStore["dispatch"];
export type TThunk = ThunkAction<void, TState, unknown, Action>;