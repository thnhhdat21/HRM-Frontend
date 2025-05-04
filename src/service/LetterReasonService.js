import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/letter-reason";

export const getListLetterReason = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axios.post(`${REST_API_BASE_URL}/get-letter-reason`, formData)
}

export const createLetterReason = (list) => {
    return axios.post(`${REST_API_BASE_URL}/create-letter-reason`, list)
}

export const updateLetterReason = (id, values) => {
    const requestBody = {
        "id": id,
        "reason": values.reason || null,
        "symbol": values.symbol || null,
        "maximum": values.maximum || null,
        "unit": values.unit || null,
        "workDayEnabled": values.workDayEnabled || null,
        "goLate": values.goLate || null,
        "backEarly": values.backEarly || null,
        "type": values.type || null,
        "des": values.des || null
    }
    return axios.post(`${REST_API_BASE_URL}/update-letter-reason`, requestBody)
}

export const deleteLetterReason = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-letter-reason`, formData)
}

export const getLetterReasonDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-letter-reason-detail`, formData)
}