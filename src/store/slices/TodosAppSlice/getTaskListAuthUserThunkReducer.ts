import { ReducerCreators } from "@reduxjs/toolkit";
import { TState } from "../../store";
import { ITask, ITodosAppSliceInitialState } from "./types";
import { supabaseKey, supabaseUrl } from "../../../supabase";

export const getTaskListAuthUserThunkReducer = (create: ReducerCreators<ITodosAppSliceInitialState>) => {
    return create.asyncThunk(async (arg: { userId: string, accessToken: string }) => {
        const { userId, accessToken } = arg;

        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/get_user_fields`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                apiKey: supabaseKey,
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                fields: ["task_list"],
                user_id: userId,
            })
        });
        const data = await response.json() as ITask[] | [] | null;
        return data;
    }, {
        options: {
            condition: (arg, api) => {
                const state = api.getState() as TState;
                const status = state.root.todosApp.status;
                if (status !== "pending") return true
                else return false
            }
        },
        pending(state) {
            state.status = "pending";
        },
        fulfilled(state, action) {
            state.status = "completed";

            const taskListAuthUser = action.payload;
            
            if (taskListAuthUser) {
                const newTaskList: ITask[] = [];
                taskListAuthUser.forEach((taskAuthUser, index) => {
                    const findTaskLocalStorage = state.taskList.find(task => task.id === taskAuthUser.id);
                    if (findTaskLocalStorage) {
                        const updateDataTaskLocalStore = findTaskLocalStorage.updateData;
                        const updateDataTaskAuthUser = taskAuthUser.updateData;
    
                        if (new Date(updateDataTaskAuthUser).getTime() > new Date(updateDataTaskLocalStore).getTime()) {
                            newTaskList[index] = taskAuthUser;
                        } else {
                            newTaskList[index] = findTaskLocalStorage;
                        }
    
                    } else {
                        newTaskList[index] = taskAuthUser;
                    }
                });
                state.taskList = newTaskList;
            }
        },
        rejected(state, action) {
            state.status = "reject";
            state.error = `Download TaskList is failed! ${action.error.message ?? "Unknown error!"}`;
        },
    })
}