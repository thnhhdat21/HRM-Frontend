import { toast } from "react-toastify"

export const checkValidatorTimeKeeping = (values, selectedItem) => {
    const code = values.code
    const name = values.name
    const timeIn = values.timeIn
    const timeOut = values.timeOut
    const nextDayEnabled = values.nextDayEnabled
    const breakStartTime = values.breakStartTime
    const breakEndTime = values.breakEndTime
    const totalWorkDay = values.totalWorkDay
    const checkinFirst = values.checkinFirst
    const checkoutLater = values.checkoutLater
    console.log(nextDayEnabled)
    if (code.trim().length <= 0) {
        toast.error("Vui lòng nhập mã ca")
        return false;
    } else if (name.trim().length <= 0) {
        toast.error("Vui lòng nhập tên ca")
        return false;
    } else if (timeIn.trim().length <= 0) {
        toast.error("Vui lòng nhập thời gian vào")
        return false;
    } else if (timeIn.trim().length < 4) {
        toast.error("Thời gian vào không hợp lệ")
        return false;
    } else if (timeOut.trim().length <= 0) {
        toast.error("Vui lòng nhập thời gian ra")
        return false;
    } else if (timeOut.trim().length < 4) {
        toast.error("Thời gian ra không hợp lệ")
        return false;
    } else if (compareTime(timeIn, timeOut) === 1 && JSON.parse(nextDayEnabled) === false) {
        toast.error("Thời gian vào không được lớn hơn thời gian ra")
        return false;
    } else if (nextDayEnabled === "") {
        toast.error("Vui lòng chọn qua ngày hoặc không")
        return false;
    } else if (breakStartTime.trim().length > 0 || breakEndTime.trim().length > 0) {
        if (breakStartTime.trim().length <= 0) {
            toast.error("Vui lòng nhập thời gian bắt đầu nghỉ")
            return false;
        } else if (breakStartTime.trim().length < 4) {
            toast.error("Thời gian bắt đầu nghỉ không hợp lệ")
            return false;
        } else if (breakEndTime.trim().length <= 0) {
            toast.error("Vui lòng nhập thời gian kết thúc nghỉ")
            return false;
        } else if (breakEndTime.trim().length < 4) {
            toast.error("Thời gian kết thúc nghỉ không hợp lệ")
            return false;
        } else if (compareTime(breakStartTime, breakEndTime) === 1) {
            toast.error("Thời gian bắt đầu nghỉ không được lớn hơn thời gian kết thúc")
            return false;
        } else if (compareTime(breakStartTime, timeIn) === -1 && JSON.parse(nextDayEnabled) === false) {
            toast.error("Thời gian bắt đầu nghỉ không được nhỏ hơn thời gian vào")
            return false;
        } else if (compareTime(breakStartTime, timeOut) === 1 && JSON.parse(nextDayEnabled) === false) {
            toast.error("Thời gian bắt đầu nghỉ không được lớn hơn thời gian ra")
            return false;
        } else if (compareTime(breakEndTime, timeOut) === 1 && JSON.parse(nextDayEnabled) === false) {
            toast.error("Thời gian kết thúc nghỉ không được lớn hơn thời gian ra")
            return false;
        } else if (compareTime(breakEndTime, timeIn) === -1 && JSON.parse(nextDayEnabled) === false) {
            toast.error("Thời gian kết thúc nghỉ không được nhỏ hơn thời gian vào")
            return false;
        } else if ((JSON.parse(nextDayEnabled) === true && compareTime(breakStartTime, timeIn) === -1) || (JSON.parse(nextDayEnabled) === true && compareTime(breakEndTime, timeIn) === -1)) {
            toast.error("Thời gian nghỉ không hợp lệ")
            return false;
        }
    }
    if (Number(totalWorkDay) <= 0) {
        toast.error("Tổng công không hợp lệ")
        return false;
    } else if (checkinFirst.trim().length <= 0) {
        toast.error("Vui lòng nhập thời gian checkin trước")
        return false;
    } else if (checkinFirst.trim().length < 4) {
        toast.error("Thời gian checkin trước không hợp lệ")
        return false;
    } else if (checkoutLater.trim().length <= 0) {
        toast.error("Vui lòng nhập thời gian checkout sau")
        return false;
    } else if (checkoutLater.trim().length < 4) {
        toast.error("Thời gian checkout sau không hợp lệ")
        return false;
    } else if (values.autoCheckoutForPosition) {
        if (selectedItem.length <= 0) {
            toast.error("Chưa chọn vị trí nào tương ứng")
            return false;
        }
    }
    return true
}


// Trả về -1 nếu time1 < time2, 0 nếu bằng nhau, 1 nếu time1 > time2
function compareTime(time1, time2) {
    const [h1, m1] = time1.split(":").map(Number);
    const [h2, m2] = time2.split(":").map(Number);

    const minutes1 = h1 * 60 + m1;
    const minutes2 = h2 * 60 + m2;

    if (minutes1 < minutes2) return -1;
    if (minutes1 > minutes2) return 1;
    return 0;
}
