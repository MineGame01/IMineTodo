import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconListSelection } from "../Icons";

interface IButtonToggleSelectionTaskProps {
    onSelectionTask: React.MouseEventHandler<HTMLButtonElement>,
    isSelectedTask: boolean;
}

export const ButtonToggleSelectionTask: React.FC<IButtonToggleSelectionTaskProps> = ({ 
    onSelectionTask,
    isSelectedTask 
}) => {
    return <>
        <Tooltip id="task-list-control-panel-selection-btn" />
        <Button
        classNameStyle={isSelectedTask ? "btn-primary" : "btn-default"}
        data-tooltip-id="task-list-control-panel-selection-btn"
        data-tooltip-content="Selection Task"
        onClick={onSelectionTask}>
            <IconListSelection />
        </Button>
    </>
}