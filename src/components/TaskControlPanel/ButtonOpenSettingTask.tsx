import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconThreePoints } from "../Icons";

export const ButtonOpenSettingTask: React.FC = () => {
    return <>
        <Tooltip id="task-control-panel-setting-task-btn" />
        <Button
        name="Setting Task" 
        classNameStyle="btn-default"
        aria-expanded="false"
        data-tooltip-id="task-control-panel-setting-task-btn"
        data-tooltip-content="Setting Task"
        data-tooltip-place="bottom-end"
        data-bs-toggle="dropdown">
            <IconThreePoints />
        </Button>
    </>
}