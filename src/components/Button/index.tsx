import React, { ButtonHTMLAttributes } from "react";

export interface IButtonDefaultProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classNameStyle?: string,
}

export const Button: React.FC<IButtonDefaultProps> = ({
    classNameStyle, 
    ...props
}) => {
    return <button {...props} className={`${classNameStyle ?? ""} btn`}>
        { props.children }
    </button>
}