import React from "react";
import { Button } from "../Button";
import { IconList } from "../Icons";
import { DraftBlockType } from "draft-js";
import { Tooltip } from "react-tooltip";

interface ButtonSetBlockListProps {
    toggleBlockType: (block: DraftBlockType) => void,
}

export const ButtonSetBlockList: React.FC<ButtonSetBlockListProps> = ({
    toggleBlockType,
}) => {
    return <>
        <Tooltip id="editor-task-tools-set-block-list-btn" />
        <Button 
        aria-label="List"
        data-tooltip-id="editor-task-tools-set-block-list-btn"
        data-tooltip-content="List"
        classNameStyle="btn-default" 
        onClick={() => { toggleBlockType("unordered-list-item") }}>
            <IconList />
        </Button>
    </>
}