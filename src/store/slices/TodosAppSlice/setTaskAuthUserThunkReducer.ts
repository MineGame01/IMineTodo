import { ReducerCreators } from "@reduxjs/toolkit";
import { TState } from "../../store";
import { ITodosAppSliceInitialState } from "./types";
import { supabaseKey, supabaseUrl } from "../../../supabase";

export const setTaskAuthUserThunkReducer = (create: ReducerCreators<ITodosAppSliceInitialState>) => {
    return create.asyncThunk( async (_unuse, { getState }) => {
        const state = getState() as TState;
        const accessToken = state.root.auth.accessToken;

        if (accessToken) {
            await fetch(`${supabaseUrl}/rest/v1/rpc/update_user_fields`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apiKey: supabaseKey,
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    updates: {
                        task_list: state.root.todosApp.taskList
                    },
                    user_id: state.root.auth.uid
                }),
            });
        }
    }, {
        options: {
            condition: (_unused, api) => {
                const state = api.getState() as TState;
                const status = state.root.todosApp.status;
                const idAuthUser = state.root.auth.uid;
                if (status !== "pending" && idAuthUser) return true
                else return false
            }
        },
        pending(state) {
            state.status = "pending";
        },
        fulfilled(state) {
            state.status = "completed";
        },
        rejected(state, action) {
            state.status = "reject";
            state.error = `Push New Task is failed! ${action.error.message ?? "Unknown error!"}`;
        },
    })
}