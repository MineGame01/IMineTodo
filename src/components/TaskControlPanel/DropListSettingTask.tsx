import React from "react";
import { Button } from "../Button";
import { IconDelete } from "../Icons";

interface IDropListSettingTask {
    isEditingTask: boolean,
    onDeleteTask: React.MouseEventHandler<HTMLButtonElement>,
}

export const DropListSettingTask: React.FC<IDropListSettingTask> = ({
    isEditingTask,
    onDeleteTask,
}) => {
    return <ul className="dropdown-menu">
        <li>
            <Button
            name="Delete" 
            content="Delete"
            classNameStyle="dropdown-item"
            disabled={isEditingTask} 
            onClick={onDeleteTask}>
                <IconDelete /> Delete
            </Button>
        </li>
    </ul>
}