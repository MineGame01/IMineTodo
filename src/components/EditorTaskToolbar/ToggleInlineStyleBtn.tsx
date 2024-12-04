import React from "react";
import { TInlineStyleTaskEditor } from "./config";
import { TfiMarkerAlt } from "react-icons/tfi";
import { MdFormatBold, MdFormatItalic } from "react-icons/md";
import { Button, IButtonDefaultProps } from "../Button";
import { Tooltip } from "react-tooltip";

interface IToggleInlineStyleBtnProps extends IButtonDefaultProps {
    typeStyle: TInlineStyleTaskEditor,
    hasInlineStyle: (inlineStyle: TInlineStyleTaskEditor) => boolean,
    toggleInlineStyle: (inlineStyle: TInlineStyleTaskEditor) => void,
}

export const ToggleInlineStyleBtn: React.FC<IToggleInlineStyleBtnProps> = ({
    typeStyle,
    hasInlineStyle,
    toggleInlineStyle,
}) => {
    const iconsType = {
        marker: <TfiMarkerAlt size="25" />,
        italic: <MdFormatItalic size="25" />,
        bold: <MdFormatBold size="25" />
    }
    const typeToUpperCase = typeStyle[0].toUpperCase() + typeStyle.slice(1);

    return <>
        <Tooltip id={`editor-task-tools-${typeStyle}-btn`} />
        <Button
        aria-label={typeToUpperCase}
        data-tooltip-id={`editor-task-tools-${typeStyle}-btn`}
        data-tooltip-content={typeToUpperCase}
        classNameStyle={hasInlineStyle(typeStyle) ? "btn-primary" : "btn-default"}
        onClick={() => { toggleInlineStyle(typeStyle); }}>
            { iconsType[typeStyle] }
        </Button>
    </>
}