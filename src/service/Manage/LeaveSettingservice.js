import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/leave-setting";

export const getLeaveSetting = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-setting`)
}

export const updateLeaveSetting = (values) => {
    const requestBody = {
        "id": values.id,
        "annualLeaveDays": values.annualLeaveDays,
        "seniorLeaveEnabled": values.seniorLeaveEnabled,
        "seniorYears": values.seniorYears,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-setting`, requestBody)
}