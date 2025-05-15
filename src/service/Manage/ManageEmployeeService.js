import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-employee";

export const getListEmployee = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-employee`, requestBody)
}

export const getCountEmployee = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-employee-type`, requestBody)
}

