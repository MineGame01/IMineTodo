import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconChecklist } from "../Icons";

interface IButtonSelectAllTaskProps {
    onSelectAllTask: React.MouseEventHandler<HTMLButtonElement>,
    taskListLength: number,
    selectsTaskLength: number,
}

export const ButtonSelectAllTask: React.FC<IButtonSelectAllTaskProps> = ({
    onSelectAllTask,
    taskListLength,
    selectsTaskLength,
}) => {
    return <>
        <Tooltip id="task-list-control-panel-select-all-task-btn" className="z-2" />
        <Button
        name="Select All Task" 
        data-tooltip-id="task-list-control-panel-select-all-task-btn"
        data-tooltip-content="Select All Task"
        onClick={onSelectAllTask}
        disabled={taskListLength === 0}
        classNameStyle={selectsTaskLength === taskListLength ? "btn-primary" : "btn-default"}>
            <IconChecklist />
        </Button>
    </>
}