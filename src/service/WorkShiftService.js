import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/work-shift";

export const getListWorkShift = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list`)
}


export const createWorkShift = (values, listJos) => {
    const requestBody = {
        "code": values.code,
        "name": values.name,
        "timeIn": values.timeIn,
        "timeOut": values.timeOut,
        "nextDayEnabled": values.nextDayEnabled,
        "breakStartTime": values.breakStartTime,
        "breakEndTime": values.breakEndTime,
        "totalTime": values.totalTime,
        "totalWorkDay": values.totalWorkDay,
        "checkinFirst": values.checkinFirst,
        "checkoutLater": values.checkoutLater,
        "autoTimeKeeping": values.autoTimeKeeping,
        "autoCheckoutForPosition": values.autoCheckoutForPosition,
        "jobPositions": listJos,
    }
    return axios.post(`${REST_API_BASE_URL}/create-work-shift`, requestBody)
}

export const updateWorkShift = (id, values) => {
    const requestBody = {
        "id": id,
        "code": values.code,
        "name": values.name,
        "timeIn": values.timeIn,
        "timeOut": values.timeOut,
        "nextDayEnabled": values.nextDayEnabled,
        "breakStartTime": values.breakStartTime,
        "breakEndTime": values.breakEndTime,
        "totalTime": values.totalTime,
        "totalWorkDay": values.totalWorkDay,
        "checkinFirst": values.checkinFirst,
        "checkoutLater": values.checkoutLater,
        "autoTimeKeeping": values.autoTimeKeeping,
        "autoCheckoutForPosition": values.autoCheckoutForPosition
    }
    return axios.post(`${REST_API_BASE_URL}/update-work-shift`, requestBody)
}

export const updateJobPositionInWS = (id, listJos) => {
    const requestBody = {
        "id": id,
        "jobPositionId": listJos,
    }
    return axios.post(`${REST_API_BASE_URL}/update-job-position`, requestBody)
}

export const deleteWorkShift = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-work-shift`, formData)
}

export const getWorkShiftDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-detail`, formData)
}
