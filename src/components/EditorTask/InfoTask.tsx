import React from "react";
import styleCSS from "./index.module.scss";
import { formatTime } from "../../utils/formatTime";
import { GetTaskDateInfo } from "../../utils/getTaskDateInfo";

interface IShowDateTaskProps {
    taskData: GetTaskDateInfo,
    taskContentLength: number | string,
}

export const InfoTask: React.FC<IShowDateTaskProps> = ({
    taskData,
    taskContentLength,
}) => {
    const dataNow = new Date();
    const { taskDayMonth, taskMounth, taskHours, taskMinutes, taskYear } = taskData;
    
    return <div>
        <div className="d-inline">
            <span>{taskDayMonth} </span> 
            <span>{taskMounth} </span> 
            <span>{formatTime(taskHours, taskMinutes)}</span>
            {taskYear !== dataNow.getFullYear() && <span>{taskYear}</span>}
        </div> 
        <span className={styleCSS.verticalBorder}></span> 
        <span>Length: {taskContentLength}</span>
    </div>
}