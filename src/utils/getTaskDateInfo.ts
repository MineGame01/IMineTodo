export class GetTaskDateInfo {
    dataTask: Date;
    taskDayMonth: number;
    taskMinutes: number;
    taskYear: number;
    taskMounth: string;
    taskHours: number;
    monthsList = [
        "January", "February", "March", 
        "April", "May", "June", "July", 
        "August", "September", "October", 
        "November", "December"
    ];

    constructor(millisecondsTask: string) {
        this.dataTask = new Date(millisecondsTask);
        this.taskDayMonth = this.dataTask.getDate();
        this.taskMinutes = this.dataTask.getMinutes();
        this.taskHours = this.dataTask.getHours();
        this.taskYear = this.dataTask.getFullYear();
        this.taskMounth = this.monthsList[this.dataTask.getMonth()];
        this.monthsList = [
            "January", "February", "March", 
            "April", "May", "June", "July", 
            "August", "September", "October", 
            "November", "December"
        ];
    }
}