import React from "react";
import { Button } from "../Button";
import { IconCloseCircle } from "../Icons";

interface IButtonClearInput {
    setSearchValue: React.Dispatch<string>,
    inputSearchRef: React.RefObject<HTMLInputElement>
}

export const ButtonClearInput: React.FC<IButtonClearInput> = ({
    setSearchValue,
    inputSearchRef,
}) => {
    return <Button
        name="Clear Input"
        classNameStyle="position-absolute end-0"
        type="button"
        onClick={() => {
            setSearchValue("");
            inputSearchRef.current?.focus();
        }}>
            <IconCloseCircle />
        </Button>
}