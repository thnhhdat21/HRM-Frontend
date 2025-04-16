export const formatTime = (input) => {
    const raw = input.replace(/\D/g, '');

    if (raw.length < 4) return raw;

    const padded = raw.padStart(4, '0');
    let hours = parseInt(padded.slice(0, 2), 10);
    let minutes = parseInt(padded.slice(2, 4), 10);

    if (hours > 23) hours = 23;
    if (minutes > 59) minutes = 59;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const calculatorTime = (timeIn, timeOut, breakStartTime, breakEndTime, nextDayEnabled) => {
    const timeInMinutes = Number(timeIn.split(":")[0]) * 60 + Number(timeIn.split(":")[1])
    const timeOutMinutes = Number(timeOut.split(":")[0]) * 60 + Number(timeOut.split(":")[1])
    const timeNextDay = JSON.parse(nextDayEnabled) === true ? 24 * 60 : 0
    let breakStartTimeMinutes = 0
    let breakEndTimeMinutes = 0
    if (breakStartTime && breakEndTime) {
        breakStartTimeMinutes = Number(breakStartTime.split(":")[0]) * 60 + Number(breakStartTime.split(":")[1])
        breakEndTimeMinutes = Number(breakEndTime.split(":")[0]) * 60 + Number(breakEndTime.split(":")[1])
    }
    // console.log(timeOutMinutes)
    // console.log(timeInMinutes)
    // console.log(breakEndTimeMinutes)
    // console.log(breakStartTimeMinutes)
    // console.log(timeNextDay)

    const totalTimeResponse = ((timeOutMinutes - timeInMinutes) - (breakEndTimeMinutes - breakStartTimeMinutes) + timeNextDay) / 60;
    return totalTimeResponse
}