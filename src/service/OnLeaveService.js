import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/on-leave";

export const getOnLeaveProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-on-leave-profile-employee`, formData)
}

export const updateOnLeaveProfile = (values) => {
    const requestBody = {
        "employeeId": values.employeeId,
        "regulaDay": values.regulaDay,
        "seniorDay": values.seniorDay,
        "usedDay": values.usedDay
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-on-leave-profile-employee`, requestBody)
}
