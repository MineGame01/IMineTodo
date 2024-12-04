import { ITask } from "../store/slices/TodosAppSlice/types";

export const getTaskListLocalStorage = () => {
    return JSON.parse(localStorage.getItem("taskList") ?? "[]") as ITask[] | [];
}

export const setTaskListLocalStorage = (taskList: ITask[]) => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}