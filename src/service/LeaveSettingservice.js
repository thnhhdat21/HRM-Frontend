import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/leave-setting";

export const getLeaveSetting = () => {
    return axios.post(`${REST_API_BASE_URL}/get-setting`)
}

export const updateLeaveSetting = (values) => {
    const requestBody = {
        "id": values.id,
        "annualLeaveDays": values.annualLeaveDays,
        "leaveCycleStart": values.leaveCycleStart,
        "leaveCycleEnd": values.leaveCycleEnd,
        "leaveCycleUnit": values.leaveCycleUnit,
        "accrualMethod": values.accrualMethod,
        "receiveNewLeaveDate": values.receiveNewLeaveDate,
        "seniorLeaveEnabled": values.seniorLeaveEnabled,
        "seniorYears": values.seniorYears,
    }
    return axios.post(`${REST_API_BASE_URL}/update-setting`, requestBody)
}