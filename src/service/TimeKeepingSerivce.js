import axios from "axios";

const REST_API_BASE_URL = "/time-keeping";

export const getListTimeKeeping = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "yearMonth": values.yearMonth,
    }
    return axios.post(`${REST_API_BASE_URL}/get-timekeeping-by-department`, requestBody)
}
export const getCountTimeKeeping = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "yearMonth": values.yearMonth,
    }
    return axios.post(`${REST_API_BASE_URL}/get-count-timekeeping`, requestBody)
}

export const closingTimeKeeping = (yearMonth) => {
    const formData = new FormData();
    formData.append("yearMonth", yearMonth)
    return axios.post(`${REST_API_BASE_URL}/closing-timekeeping`, formData)
}

export const timeSheetState = (yearMonth) => {
    const formData = new FormData();
    formData.append("yearMonth", yearMonth)
    return axios.post(`${REST_API_BASE_URL}/time-sheet-state`, formData)
}

export const getWorkingDay = (values) => {
    const requestBody = {
        "employeeId": values.employeeId,
        "workingDay": values.workingDay,
    }
    return axios.post(`${REST_API_BASE_URL}/get-working-day`, requestBody)
}
