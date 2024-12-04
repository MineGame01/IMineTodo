export const formatTime = (hours: number, minutes: number) => {
    const hoursString = String(hours);
    const minutesString = String(minutes);

    const formatHours = hoursString.length < 2 ? (`0${hoursString}`) : hoursString;
    const formatMinutes = minutesString.length < 2 ? (`0${minutesString}`) : minutesString;
    return `${formatHours}:${formatMinutes}`;
}