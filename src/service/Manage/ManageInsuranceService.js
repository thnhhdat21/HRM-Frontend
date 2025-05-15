import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-insurance";

export const getListInsurance = (values) => {
    const requestBody = {
        "name": values.name,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "yearMonth": values.yearMonth
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-insurance`, requestBody)
}


export const getCountInsurance = (values) => {
    const requestBody = {
        "name": values.name,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "yearMonth": values.yearMonth
    }
    return axiosClient.post(`${REST_API_BASE_URL}/count-insurance`, requestBody)
}