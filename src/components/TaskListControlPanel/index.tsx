import React from "react";
import { useThemeChange, useThemeMode } from "../../hooks/ThemeHooks";
import { CountsSelectedTasks } from "./CountsSelectedTasks";
import { ButtonToggleSelectionTask } from "./ButtonToggleSelectionTask";
import { ButtonDeleteSelectsTask } from "./ButtonDeleteSelectsTask";
import { ButtonSelectAllTask } from "./ButtonSelectAllTask";
import { ButtonOpenSettingApp } from "./ButtonOpenSettingApp";
import { OffcanvasSettingApp } from "./OffcanvasSettingApp";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { deleteTask, selectTaskList, setTaskAuthUserThunk } from "../../store/slices/TodosAppSlice";

interface ITaskListControlPanelProps {
    isSelectedTask: boolean,
    selectsTask: string[],
    setSelectsTask: React.Dispatch<string[]>,
    setIsSelectedTask: React.Dispatch<boolean>,
}

export const TaskListControlPanel: React.FC<ITaskListControlPanelProps> = ({
    isSelectedTask,
    selectsTask,
    setSelectsTask,
    setIsSelectedTask,
}) => {
    const themeMode = useThemeMode();
    const themeChange = useThemeChange();

    const taskList = useAppSelector(selectTaskList);
    const dispatch = useAppDispatch();

    const handleSetIsSelectedTask = () => {
        if (isSelectedTask) {
            setSelectsTask([]);
        }
        setIsSelectedTask(!isSelectedTask);
    }

    const handleSelectAllTask = () => {
        if (selectsTask.length === taskList.length) {
            setSelectsTask([]);
        } else {
            const selects: string[] = [];
            for (const task of taskList) {
                selects.push(task.id);
            }
            setSelectsTask(selects);
        }
    }

    const handleDeleteSelectsTask = () => {
        selectsTask.forEach(idTask => {
            dispatch(deleteTask({ idTask }));
        });
        void dispatch(setTaskAuthUserThunk());
        setSelectsTask([]);
    }
    
    return <div className="p-2 z-1 pre-bg">  
        <div className="row g-1">
            <div 
            style={{ transition: "background 0.2s ease" }}
            className={`col-auto d-flex rounded-1 ${isSelectedTask ? "bg-primary" : " "}`}>
                <ButtonToggleSelectionTask 
                onSelectionTask={handleSetIsSelectedTask} 
                isSelectedTask={isSelectedTask}/>
                {isSelectedTask ? 
                    <ButtonDeleteSelectsTask 
                    isSelectedTask={isSelectedTask} 
                    onDeleteSelectsTask={handleDeleteSelectsTask} /> : null
                }
            </div>
            <div className="col-auto mx-auto d-flex align-items-center">
                <CountsSelectedTasks isSelectionTask={isSelectedTask} selectsTaskLength={selectsTask.length} />
            </div>
            {isSelectedTask && <div className="col-auto">
                <ButtonSelectAllTask 
                taskListLength={taskList.length}
                selectsTaskLength={selectsTask.length}
                onSelectAllTask={handleSelectAllTask}/>
            </div>}
            {!isSelectedTask && <div className="col-auto d-flex align-items-center">
                <ButtonOpenSettingApp />
            </div>} 
            <OffcanvasSettingApp themeMode={themeMode} themeChange={themeChange} />
        </div>
    </div>
}