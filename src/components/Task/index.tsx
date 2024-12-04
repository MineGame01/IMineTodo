import React from "react";
import { transformDataToTime } from "../../utils/transformDataToTime";
import { getColorTask } from "../../utils/getColorTask";
import { Button } from "../Button";
import { Input } from "../Forms/Input";
import { TColorTask, TCreateDataTask, TStatusTask, TTitleTask } from "../../store/slices/TodosAppSlice/types";

interface ITaskProps {
    onSelect: React.MouseEventHandler,
    onOpen: React.MouseEventHandler,
    title: TTitleTask,
    createData: TCreateDataTask,
    color: TColorTask,
    isSelectedTask: boolean,
    status?: TStatusTask,
    isSelect: boolean,
}

export const Task: React.FC<ITaskProps> = ({
    onSelect,
    onOpen,
    title,
    createData,
    color,
    isSelectedTask,
    isSelect
}) => {
    const colorTask = getColorTask(color);

    return <div style={{
        transform: isSelectedTask ? "scale(95%)" : "",
        transition: "transform 0.2s ease"
    }}>
        <Button 
        name={title} 
        classNameStyle={`btn-default w-100 p-4 rounded-4 text-start ${isSelect ? "active" : ""}`}
        style={{ borderLeft: "4px solid " + colorTask }}
        onClick={isSelectedTask ? onSelect : onOpen}>
            <div className="position-relative">
                <div>{ title } </div>
                <div className="text-secondary">{transformDataToTime(createData)}</div>
            </div>
            {isSelectedTask ?
                <Input 
                style={{ transform: "translate(-100%, -50%)" }}
                tabIndex={-1}
                classNameStyle="position-absolute end-0 top-50"
                type="radio"
                readOnly
                checked={ isSelect }/> : null
            }
        </Button>
    </div>
}