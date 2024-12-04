import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconDelete } from "../Icons";

interface IButtonDeleteSelectsTaskProps {
    isSelectedTask: boolean,
    onDeleteSelectsTask: React.MouseEventHandler<HTMLButtonElement>,
}

export const ButtonDeleteSelectsTask: React.FC<IButtonDeleteSelectsTaskProps> = ({ 
    isSelectedTask,
    onDeleteSelectsTask,
 }) => {
    return <>
        <Tooltip id="task-list-control-panel-delete-selects-task-btn" className="z-2" />
        <Button
        name="Delete Selects Task"
        data-tooltip-id="task-list-control-panel-delete-selects-task-btn"
        data-tooltip-content="Delete Selects Task"
        classNameStyle={isSelectedTask ? "btn-primary" : "btn-default"}
        onClick={onDeleteSelectsTask}>
            <IconDelete />
        </Button>
    </>
}