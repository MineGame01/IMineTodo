import React from "react";
import { Button } from "../Button";
import { IconNumberList } from "../Icons";
import { DraftBlockType } from "draft-js";
import { Tooltip } from "react-tooltip";

interface ButtonSetBlockNumberListProps {
    toggleBlockType: (block: DraftBlockType) => void,
}

export const ButtonSetBlockNumberList: React.FC<ButtonSetBlockNumberListProps> = ({
    toggleBlockType
}) => {
    return <>
        <Tooltip id="editor-task-tools-set-block-number-list-btn" />
        <Button 
        aria-label="Number List"
        data-tooltip-id="editor-task-tools-set-block-number-list-btn"
        data-tooltip-content="Number List"
        classNameStyle="btn-default" 
        onClick={() => { toggleBlockType("ordered-list-item") }}>
            <IconNumberList />
        </Button>
    </>
}