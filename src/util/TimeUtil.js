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

export const calculatorTimeNoBreak = (timeIn, timeOut, nextDayEnabled) => {
    console.log(nextDayEnabled)
    const timeInMinutes = Number(timeIn.split(":")[0]) * 60 + Number(timeIn.split(":")[1])
    const timeOutMinutes = Number(timeOut.split(":")[0]) * 60 + Number(timeOut.split(":")[1])
    const timeNextDay = JSON.parse(nextDayEnabled) === true ? 24 * 60 : 0

    const totalTimeResponse = ((timeOutMinutes - timeInMinutes) + timeNextDay) / 60;
    return totalTimeResponse
}

export const convertDate = (dateStr) => {
    if (!dateStr)
        return;
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
};

export function convertDateTime(input) {
    const [datePart, timePart] = input.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    return `${day}/${month}/${year} ${hour}:${minute}`;
}


export function calculateWorkingTime(startDateStr) {
    const startDate = new Date(startDateStr);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }
    if (months === 0 && years === 0) {
        let days = currentDate.getDate() - startDate.getDate()
        return `${days} Ngày`
    }
    return `${years}/${months} (Năm/Tháng)`
}

// Hàm so sánh hai ngày
export function compareDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1) || isNaN(d2)) {
        return null; // Trả về null nếu đầu vào không hợp lệ
    }

    if (d1 > d2) return 1;     // date1 > date2
    if (d1 < d2) return -1;    // date1 < date2
    return 0;                  // date1 = date2
}

export const compareDateTimes = (dateStr1, dateInput2) => {
    const date1 = new Date(dateStr1.replace(" ", "T"));
    const date2 = dateInput2 instanceof Date
        ? dateInput2
        : new Date(dateInput2.replace(" ", "T"));

    if (isNaN(date1) || isNaN(date2)) {
        throw new Error("Invalid date format!");
    }

    if (date1 > date2) {
        return 1;
    } else if (date1 < date2) {
        return -1;
    } else {
        return 0;
    }
};

export const getListDateTime = () => {
    const today = new Date();
    const timePoints = ["08:30", "12:00", "13:00", "17:30"];
    const tempOptions = [];

    for (let i = 0; i < 15; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();

        const dateString = `${day}/${month}/${year}`;

        timePoints.forEach((time, index) => {
            tempOptions.push({
                id: index,
                value: `${year}-${month}-${day} ${time}:00`,  // Chuẩn để submit
                name: `${dateString} ${time}`,                // Hiển thị cho người dùng
            });
        });
    }
    return tempOptions
}

export const generateDays = (monthInput) => {
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const now = new Date();
    const currentYear = now.getFullYear(); // lấy năm hiện tại

    const month = monthInput - 1; // Trừ 1 vì JavaScript Date tháng là 0-11

    let days = [];
    let date = new Date(currentYear, month, 1); // Tạo từ ngày 1 của tháng nhập vào

    while (date.getMonth() === month) {
        days.push({
            day: date.getDate(),
            weekday: weekdays[date.getDay()]
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
};




