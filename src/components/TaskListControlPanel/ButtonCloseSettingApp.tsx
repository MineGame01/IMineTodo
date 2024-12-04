import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";

export const ButtonCloseSettingApp: React.FC = () => {
    return <>
        <Tooltip id="task-list-control-panel-close-setting-btn" />
        <Button 
        name="Close Setting" 
        classNameStyle="btn-close" 
        data-tooltip-id="task-list-control-panel-close-setting-btn"
        data-tooltip-content="Close Setting"
        data-bs-dismiss="offcanvas"/>
    </>
}