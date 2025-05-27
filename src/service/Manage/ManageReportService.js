import axiosClient from "../config/AxiosClient";
const REST_API_BASE_URL = "/manage-report";

export const reportCountEmployeeAPI = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/report-count-employee`)
}

export const reportSalaryDepartmentAPI = (yearMonth) => {
    const formData = new FormData();
    formData.append("yearMonth", yearMonth)
    return axiosClient.post(`${REST_API_BASE_URL}/report-salary-department`, formData)
}