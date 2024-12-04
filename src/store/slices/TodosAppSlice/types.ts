import { RawDraftContentState } from "draft-js";
import { TRequestStatusType } from "../../../types/global";

export interface IColorsTaskType {
    blue: "#0dcaf0",
    purple: "#6610f2",
    red: "red",
    grey: "grey"
};

export type TKeysColorsTaskType = keyof IColorsTaskType;
export type TValuesColorsTaskType = IColorsTaskType[keyof IColorsTaskType];

export const ColorsTask: TKeysColorsTaskType[] = ["blue", "purple", "red", "grey"];
export const ColorsTaskType: TValuesColorsTaskType[] = ["#0dcaf0", "#6610f2", "grey", "red"];

export interface ITask {
    id: string,
    status: "none",
    color: TKeysColorsTaskType,
    createData: string,
    updateData: string,
    content: {
        title: string,
        editorState: RawDraftContentState,
    }
}

type getType<T, V extends keyof T> = Pick<T, V>[keyof Pick<T, V>];

export type TIdTask = getType<ITask, "id">;
export type TStatusTask = getType<ITask, "status">;
export type TColorTask = getType<ITask, "color">;
export type TCreateDataTask = getType<ITask, "createData">;
export type TUpdateDataTask = getType<ITask, "updateData">;
export type TTitleTask = getType<ITask, "content">["title"];
export type TEditorStateTask = getType<ITask, "content">["editorState"];

export interface ITodosAppSliceInitialState {
    taskList: ITask[],
    status: TRequestStatusType,
    error: string | null,
    lastEditTaskList: null | string,
}

export type TTaskList = getType<ITodosAppSliceInitialState, "taskList">;
export type TTodosAppStatus = getType<ITodosAppSliceInitialState, "status">;
export type TTodosAppError = getType<ITodosAppSliceInitialState, "error">;
export type TLastEditTaskList = getType<ITodosAppSliceInitialState, "lastEditTaskList">;
