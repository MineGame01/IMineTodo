import { TColorTask, TValuesColorsTaskType } from "../store/slices/TodosAppSlice/types";

export const getColorTask = (color: TColorTask) => {
    let colorTaskType: TValuesColorsTaskType;
    if (color === "blue") colorTaskType = "#0dcaf0"
    else if (color === "purple") colorTaskType = "#6610f2"
    else colorTaskType = color;
    return colorTaskType;
}