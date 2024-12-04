export const monthsList = [
    "January", "February", "March", 
    "April", "May", "June", "July", 
    "August", "September", "October", 
    "November", "December"
];

export const transformDataToTime = (data: string) => {
    let res;
    const dataTask = new Date(data);
    const dataNow = new Date();
    const taskHours = String(dataTask.getHours());
    const taskMinutes = String(dataTask.getMinutes());

    const taskTime = (taskHours.length !== 2 ? ("0" + taskHours) : taskHours) + ":" + 
        (taskMinutes.length !== 2 ? ("0" + taskMinutes) : taskMinutes)
    const taskDayMonth = String(dataTask.getDate());
    const taskMonth = monthsList[dataTask.getMonth()];
    const taskYear = String(dataTask.getFullYear());
    
    if (taskDayMonth === String(dataNow.getDate())) res = taskTime;
    else if (taskYear === String(dataNow.getFullYear())) res = `${taskDayMonth} ${taskMonth}`;
    else res = `${taskDayMonth} ${taskMonth} ${taskYear}`

    return res;
}