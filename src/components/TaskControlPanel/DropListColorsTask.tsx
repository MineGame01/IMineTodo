import React from "react";
import { Button } from "../Button";
import { ColorsTask, TColorTask } from "../../store/slices/TodosAppSlice/types";

interface IDropListColorsTaskProps {
    colorEditingTask: TColorTask,
    onChangeColorTask: (event: React.MouseEvent<HTMLButtonElement>, color: TColorTask) => void,
}

export const DropListColorsTask: React.FC<IDropListColorsTaskProps> = ({
    colorEditingTask,
    onChangeColorTask
}) => {
    return <ul className="dropdown-menu">  
        {ColorsTask.map(color => (
            <li key={color}>
                <input 
                type="radio"
                aria-checked={colorEditingTask === color} 
                checked={colorEditingTask === color}
                className="btn-check" 
                name="colorTask" 
                id={color} />
                <Button
                name={color} 
                onClick={(e) => { onChangeColorTask(e, color) } }
                classNameStyle={`dropdown-item ${colorEditingTask === color ? "btn-primary" : "btn-default"}`} >
                    <label htmlFor={color}>
                        {color[0].toUpperCase() + color.slice(1)}
                    </label>
                </Button>
            </li>
        ))}
    </ul>
}