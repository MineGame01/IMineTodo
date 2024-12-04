import React from "react";
import { Tooltip } from "react-tooltip";
import { Button } from "../Button";
import { IconTextIncrease } from "../Icons";

interface IButtonHeadingEnlargeProps {
    levelHeading: number,
    changeLevelHeading: (enlarge: boolean) => void,
}

export const ButtonHeadingEnlarge: React.FC<IButtonHeadingEnlargeProps> = ({
    levelHeading,
    changeLevelHeading,
}) => {
    return <>
        <Tooltip id="editor-task-tools-buttun-heading-enlarge" />
        <Button
        classNameStyle="btn-default"
        aria-label="Heading Enlarge"
        data-tooltip-id="editor-task-tools-buttun-heading-enlarge"
        data-tooltip-content="Heading Enlarge"
        disabled={levelHeading === 1}
        onClick={() => { changeLevelHeading(true) }}>
            <IconTextIncrease />
        </Button>
    </>
}