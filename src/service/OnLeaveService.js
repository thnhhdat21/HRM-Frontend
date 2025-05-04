import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/on-leave";

export const getOnLeaveProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-on-leave-profile-employee`, formData)
}

export const updateOnLeaveProfile = (values) => {
    const requestBody = {
        "employeeId": values.employeeId,
        "totalDay": values.totalDay,
        "usedDay": values.usedDay
    }
    return axios.post(`${REST_API_BASE_URL}/update-on-leave-profile-employee`, requestBody)
}


export const getListOnleave = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "year": values.year,
    }
    return axios.post(`${REST_API_BASE_URL}/get-list-on-leave`, requestBody)
}

export const getCountEmployeeOnLeave = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "year": values.year,
    }
    return axios.post(`${REST_API_BASE_URL}/get-count-on-leave`, requestBody)
}

