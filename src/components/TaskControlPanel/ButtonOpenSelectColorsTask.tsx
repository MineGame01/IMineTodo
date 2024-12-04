import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconColorPalette } from "../Icons";

export const ButtonOpenSelectColorsTask: React.FC = () => {
    return <>
        <Tooltip id="task-control-panel-select-color-task-btn" />
        <Button
        name="Select Color Task"
        classNameStyle="btn-default"
        aria-expanded="false" 
        data-tooltip-content="Select Color Task"
        data-tooltip-id="task-control-panel-select-color-task-btn"
        data-tooltip-place="bottom"
        data-bs-toggle="dropdown">
            <IconColorPalette />
        </Button>
    </>
}