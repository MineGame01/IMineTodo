import React from "react";
import StyleCSS from "./index.module.scss";
import { Task } from "../Task";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { selectTaskList } from "../../store/slices/TodosAppSlice";
import { editTask } from "../../store/slices/EditorTaskSlice";
import { ITask, TIdTask } from "../../store/slices/TodosAppSlice/types";

interface ITaskListProps {
    isSearchTaskMode: boolean,
    isSelectedTask: boolean,
    searchTaskList: ITask[],
    selectsTask: string[],
    selectTask: (idTask: TIdTask) => void,
}

export const TaskList: React.FC<ITaskListProps> = ({ 
    isSearchTaskMode, 
    searchTaskList, 
    isSelectedTask,
    selectsTask,
    selectTask,
}) => {
    const taskList = useAppSelector(selectTaskList);
    const dispatch = useAppDispatch();

    const taskListIf = isSearchTaskMode ? searchTaskList : taskList;

    if (taskList.length === 0) {
        return <article className="pre-bg h-100">
            <h3 className="text-center">Task list empty!</h3>
        </article>
    }

    return <article className="container pre-bg h-100">
        <div className="grid overflow-auto mt-0" style={{ height: "80vh" }} >
            {taskListIf.map((task, index) => (
                <div
                style={{ 
                    opacity: "0", 
                    animationDelay: String(0.1 * index) + "s",
                }}
                className={`g-col mt-2 ${StyleCSS.smoothDropAnimation}`} 
                key={task.id} >
                    <Task
                    onSelect={() => { selectTask(task.id) }}
                    onOpen={() => { dispatch(editTask({ id: task.id })) }}
                    title={task.content.title}
                    createData={task.createData}
                    color={task.color}
                    status={task.status}
                    isSelect={selectsTask.includes(task.id)}
                    isSelectedTask={isSelectedTask}/>
                </div>
            ))}
        </div>
    </article>
}