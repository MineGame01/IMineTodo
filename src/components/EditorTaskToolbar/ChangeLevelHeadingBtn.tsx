import React from "react";
import { Button, IButtonDefaultProps } from "../Button";
import { MdTextDecrease, MdTextIncrease } from "react-icons/md";
import { Tooltip } from "react-tooltip";

interface IChangeLevelHeadingBtnProps extends IButtonDefaultProps {
    typeHeading: "enlarge" | "reduce",
    levelHeading: number,
    changeLevelHeading: (enlarge: boolean) => void,
}

export const ChangeLevelHeadingBtn: React.FC<IChangeLevelHeadingBtnProps> = ({
    typeHeading,
    levelHeading,
    changeLevelHeading,
}) => {
    return <>
        <Tooltip id="editor-task-tools-change-level-heading-btn" />
        <Button
        classNameStyle="btn-default"
        aria-label={"Heading " + typeHeading}
        data-tooltip-id="editor-task-tools-change-level-heading-btn"
        data-tooltip-content={"Heading " + typeHeading}
        disabled={typeHeading === "enlarge" ? (levelHeading === 1) : (levelHeading === 6)}
        onClick={() => { changeLevelHeading(typeHeading === "enlarge"); }}>
            {typeHeading === "enlarge" ? 
                <MdTextIncrease size="25" /> : 
                <MdTextDecrease size="25" />
            }
        </Button>
    </>
}