import React from "react";
import StyleCSS from "./scss/CountsSelectedTasks.module.scss";

interface ICountsSelectedTasks {
    isSelectionTask: boolean,
    selectsTaskLength: number,
}

export const CountsSelectedTasks: React.FC<ICountsSelectedTasks> = (props) => {
    return <div>
        {props.isSelectionTask ? 
            <strong className={StyleCSS.smoothDropAnimation}>
                {props.selectsTaskLength === 0 ? 
                    "Select Task" : "Selected Task: " + String(props.selectsTaskLength)
                }
            </strong> : null
        }
    </div>
}