import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconSetting } from "../Icons";

export const ButtonOpenSettingApp: React.FC = () => {
    return <>
        <Tooltip id="task-list-control-panel-setting-btn" className="z-2" />
        <Button
        name="Setting App" 
        classNameStyle="btn-default"
        aria-controls="offcanvasSettingApp"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasSettingApp"
        data-tooltip-content="Setting App"
        data-tooltip-id="task-list-control-panel-setting-btn">
            <IconSetting />
        </Button>
    </>
}