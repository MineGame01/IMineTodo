import React, { HTMLAttributes } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdBrightnessAuto } from "react-icons/md";
import { ThemeModeType } from "../../providers/ThemeProvider";
import { IconBaseProps } from "react-icons";

interface IThemeIconsProps {
    mode: ThemeModeType,
    options?: IconBaseProps,
    className?: HTMLAttributes<SVGElement>["className"],
}

export const ThemeIcons: React.FC<IThemeIconsProps> = ({
    mode,
    options,
    className
}) => {
    const props = {
        className,
    }

    return <>
        {mode === "auto" && <MdBrightnessAuto {...props} {...options} />}
        {mode === "light" && <MdOutlineLightMode {...props} {...options} />}
        {mode === "dark" && <MdOutlineDarkMode {...props} {...options} />}
    </>
}