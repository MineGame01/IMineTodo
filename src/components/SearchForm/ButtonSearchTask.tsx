import React from "react";
import { Button } from "../Button";
import { IconSearch } from "../Icons";

interface IButtonSeachTask {
    isSearchTaskMode: boolean
}

export const ButtonSeachTask: React.FC<IButtonSeachTask> = ({ isSearchTaskMode }) => {
    return <Button
        name="Search Task"
        disabled={!isSearchTaskMode}
        type="submit"
        classNameStyle="position-absolute btn border-0">
            <IconSearch />
        </Button>
}