import { checkTypeNumber } from "../store/slices/SettingAppSlice"

export const getPreview = () => {
    return checkTypeNumber(localStorage.getItem("preview")) ?? 1
}