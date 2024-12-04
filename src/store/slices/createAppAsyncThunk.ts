import { createAsyncThunk } from "@reduxjs/toolkit";
import { TDispatch, TState } from "../store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: TState,
    dispatch: TDispatch
}>()