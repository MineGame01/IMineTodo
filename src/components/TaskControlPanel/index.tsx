import React from "react";
import { getColorTask } from "../../utils/getColorTask";
import { deleteTask, selectEditingTask, setTaskAuthUserThunk } from "../../store/slices/TodosAppSlice";
import { ButtonEndTaskEditing } from "./ButtonEndTaskEditing";
import { ButtonOpenSelectColorsTask } from "./ButtonOpenSelectColorsTask";
import { DropListColorsTask } from "./DropListColorsTask";
import { ButtonOpenSettingTask } from "./ButtonOpenSettingTask";
import { DropListSettingTask } from "./DropListSettingTask";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { editTask } from "../../store/slices/EditorTaskSlice";
import { TColorTask } from "../../store/slices/TodosAppSlice/types";

interface ITaskControlPanelProps {
    isEditingTask: boolean,
    colorEditingTask: TColorTask,
    setColorEditingTask: React.Dispatch<TColorTask>,
    onUpdateTask: React.MouseEventHandler<HTMLButtonElement>,
}

export const TaskControlPanel: React.FC<ITaskControlPanelProps> = ({ 
    isEditingTask,
    onUpdateTask,
    setColorEditingTask,
    colorEditingTask,
}) => {
    const dispatch = useAppDispatch();
    const editingTask = useAppSelector(selectEditingTask);
    
    const handleChangePageToHome = () => {
        dispatch(editTask({ id: null }))
    }

    const handleChangeColorTask = (e: React.MouseEvent<HTMLButtonElement>, color: TColorTask) => {
        setColorEditingTask(color);
    }

    const handleDeleteTask = () => {
        if (editingTask) {
            dispatch(editTask({ id: null }))
            dispatch(deleteTask({ idTask: editingTask.id }));
            void dispatch(setTaskAuthUserThunk());
        }
    }

    return <ul 
    style={{
        borderBottom: "4px solid " + getColorTask(colorEditingTask)
    }}
    className="pre-bg nav p-2">
        <li className="nav-item">
            <ButtonEndTaskEditing 
            isEditingTask={isEditingTask} 
            onClick={isEditingTask ? onUpdateTask : handleChangePageToHome} />
        </li>
        <li className="nav-item ms-auto"></li>
        <li 
        style={{ display: isEditingTask ? "block" : "none" }}
        className="nav-item dropdown">
            <ButtonOpenSelectColorsTask />
            <DropListColorsTask
            colorEditingTask={colorEditingTask} 
            onChangeColorTask={handleChangeColorTask} />
        </li>
        <li 
        className="nav-item dropdown" 
        style={{ display: isEditingTask ? "none" : "block" }}>
            <ButtonOpenSettingTask />
            <DropListSettingTask isEditingTask={isEditingTask} onDeleteTask={handleDeleteTask} />
        </li>
    </ul>
}