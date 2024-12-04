import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState, TThunk } from "../store";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { TRequestStatusType } from "../../types/global";
import { createAppAsyncThunk } from "./createAppAsyncThunk";
import { getTaskListAuthUserThunk } from "./TodosAppSlice";
import { supabase } from "../../supabase";

interface IAuthSliceInitialState {
    email: string | null,
    uid: string | null,
    accessToken: string | null,
    status: TRequestStatusType,
    error: string | null,
    // isAnonymous: boolean
}

const initialState: IAuthSliceInitialState = {
    email: null,
    uid: null,
    accessToken: null,
    status: "none",
    error: null,
    // isAnonymous: false,
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthError: (state, action: PayloadAction<{ error: string | AuthError | null }>) => {
            const { error } = action.payload;
            if (error instanceof AuthError) {
                switch (error.code) {
                    case "user_already_exists": {
                        state.error = "The user already exists";
                        return;
                    }
                    case "invalid_credentials": {
                        state.error = "Email or password is incorrect";
                        return;
                    }
                    case "unexpected_failure": {
                        state.error = "Please enter the captcha!";
                        return;
                    }
                    case "captcha_failed": {
                        state.error = "Please enter the captcha!";
                        return;
                    }
                    default: {
                        state.error = "Unknown error"
                        return;
                    }
                }
            } else if (typeof error === "string") {
                state.error = error
            }
        },
        clearAuthError: (state) => {
            state.error = null
        },
        // setAuthAnonymous: (state, action: PayloadAction<Pick<IAuthSliceInitialState, "isAnonymous">["isAnonymous"]>) => {
        //     state.isAnonymous = action.payload;
        // },
        updateAccessToken: (state, action: PayloadAction<Pick<IAuthSliceInitialState, "accessToken">>) => {
            state.accessToken = action.payload.accessToken;
        },
        authSet: (state, action: PayloadAction<Pick<IAuthSliceInitialState, "email" | "uid" | "accessToken">>) => {
            const { email, uid, accessToken } = action.payload;
            state.email = email;
            state.uid = uid;
            state.accessToken = accessToken;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizationThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(authorizationThunk.fulfilled, (state, action) => {
                const { authData, authError } = action.payload;

                if (authData.user && authData.session) {
                    const { email, id } = authData.user;
                    const { access_token } = authData.session;

                    state.email = email ?? null;
                    state.uid = id;
                    state.accessToken = access_token;

                    state.status = "completed"
                } else if (authError) {
                    state.status = "reject";
                }
            })
            .addCase(checkAuthSessionThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(checkAuthSessionThunk.fulfilled, (state, action) => {
                const { authData, sessionData } = action.payload;

                if (authData.user && sessionData.session) {
                    const { email, id } = authData.user;
                    const { access_token } = sessionData.session;

                    state.email = email ?? null;
                    state.uid = id;
                    state.accessToken = access_token

                    state.status = "completed";
                } else {
                    state.status = "reject";
                }
            })
    }
});

export default AuthSlice.reducer;
export const { authSet, setAuthError, clearAuthError, updateAccessToken } = AuthSlice.actions;

export const selectAccessToken = (state: TState) => {
    return state.root.auth.accessToken;
}

export const selectIdAuthUser = (state: TState) => {
    return state.root.auth.uid;
}

export const clearAuthErrorThunk = (timeout = 3000): TThunk => {
    let isPending = false;

    return (dispatch) => {
        if (!isPending) {
            isPending = true;
            setTimeout(() => {
                dispatch(clearAuthError());
                isPending = false;
            }, timeout);
        }
    }
}

export const authorizationThunk = createAppAsyncThunk(
    "auth/authorizationThunk",
    async (args: { email: string, password: string, captchaToken: string, reg?: boolean }, { dispatch }) => {
        const { email, password, captchaToken, reg } = args;

        let authData: { user: User | null, session: Session | null } | null = null;
        let authError: AuthError | null = null;

        if (reg) {
            const { data, error } = await supabase.auth.signUp({
                email, 
                password,
                options: { captchaToken }
            });
            authData = data;
            authError = error;
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({ 
                email,
                password,
                options: { captchaToken } 
            });
            authData = data;
            authError = error;
        }

        if (authData.user && authData.session) {
            const { id } = authData.user;
            const { access_token } = authData.session;

            void dispatch(getTaskListAuthUserThunk({
                userId: id,
                accessToken: access_token
            }));
        } else if (authError) {
            dispatch(setAuthError({ error: authError }));
            dispatch(clearAuthErrorThunk());
        }

        return ({
            authData,
            authError
        });
    },
    {
        condition: (_unused, thunkApi) => {
            const status = thunkApi.getState().root.auth.status;
            if (status !== "pending") return true
            else return false
        }
    }
);

export const checkAuthSessionThunk = createAppAsyncThunk(
    "auth/checkAuthSession",
    async (_unused, { dispatch }) => {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        const { data: sessionData, error: sesstionError } = await supabase.auth.getSession();

        if (authData.user && sessionData.session) {
            const { id } = authData.user;
            const { access_token } = sessionData.session;

            void dispatch(getTaskListAuthUserThunk({
                userId: id,
                accessToken: access_token
            }));
        } else if (authError || sesstionError) {
            dispatch(setAuthError({ error: (authError?.message ?? sesstionError?.message) ?? null }));
            dispatch(clearAuthErrorThunk());
        }

        return ({
            authData,
            sessionData
        })
    },
    {
        condition: (_unused, thunkApi) => {
            const status = thunkApi.getState().root.auth.status;
            if (status === "none") return true
            else return false
        }
    }
)