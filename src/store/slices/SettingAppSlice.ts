import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPreview } from "../../utils/previewLocalStorage";

export type TNumberBoolean = 1 | 0;

interface ISettingAppSliceInitialState {
    preview: TNumberBoolean,
}

export const checkTypeNumber = (value: string | null): TNumberBoolean | null => {
    if (value === "0" || value === "1") {
        return Number(value) as TNumberBoolean;
    } else return null
}

const initialState: ISettingAppSliceInitialState = {
    preview: getPreview(),
}

const SettingAppSlice = createSlice({
    name: "settingApp",
    initialState,
    reducers: {
        setPreview: {
            reducer(state, action: PayloadAction<{ value: TNumberBoolean }>) {
                state.preview = action.payload.value
            },
            prepare(value: TNumberBoolean) {
                localStorage.setItem("preview", String(value));
                return {
                    payload: { value }
                }
            }
        }
    }
});

export default SettingAppSlice.reducer;
export const { setPreview } = SettingAppSlice.actions;