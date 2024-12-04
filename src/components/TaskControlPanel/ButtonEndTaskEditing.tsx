import React from "react";
import { Button } from "../Button";
import { Tooltip } from "react-tooltip";
import { FaSave } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

interface IButtonEndTaskEditing {
    isEditingTask: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

export const ButtonEndTaskEditing: React.FC<IButtonEndTaskEditing> = ({
    isEditingTask,
    onClick,
}) => {
    return <>
        <Tooltip id="task-control-panel-save-task-or-home-btn" />
        <Button 
        name={isEditingTask ? "Save Task" : "Close Task"} 
        classNameStyle="btn-default"
        data-tooltip-id="task-control-panel-save-task-or-home-btn"
        data-tooltip-content={isEditingTask ? "Save Task" : "Home"}
        data-tooltip-place="bottom-end"
        onClick={onClick}>
            {isEditingTask ? <FaSave size="20" /> : <BsArrowLeft size="20" />}
        </Button>
    </>
}