import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-on-leave";

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
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-on-leave`, requestBody)
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-on-leave`, requestBody)
}

