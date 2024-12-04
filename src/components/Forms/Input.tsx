import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export interface IInputDefaultProps extends InputHTMLAttributes<HTMLInputElement> {
    type: HTMLInputTypeAttribute,
    classNameStyle?: string,
}

export const Input = forwardRef<HTMLInputElement, IInputDefaultProps>(({classNameStyle, ...props}, ref) => {
    return <input 
    {...props} 
    ref={ref}
    className={`${classNameStyle ?? ""} ${props.type === "radio" ? "form-check-input" : "form-control"}`} />
})