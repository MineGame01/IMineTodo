import React from "react";
import { Button } from "../../components/Button";
import { IconAdd } from "../../components/Icons";
import { addTask, setTaskAuthUserThunk, } from "../../store/slices/TodosAppSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import { Tooltip } from "react-tooltip";

export const ButtonAddTask: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleAddTask = () => {
        dispatch(addTask());
        void dispatch(setTaskAuthUserThunk());
    }

    const TOOLTIP_ID = "task-app-page-button-add-task";

    return <>
        <Tooltip id={TOOLTIP_ID} />
        <Button 
        data-tooltip-id={TOOLTIP_ID}
        data-tooltip-content="New Task"
        classNameStyle="btn-primary rounded-circle d-flex align-content-center p-2"
        onClick={handleAddTask}>
            <IconAdd size={44} />
        </Button>
    </>
}