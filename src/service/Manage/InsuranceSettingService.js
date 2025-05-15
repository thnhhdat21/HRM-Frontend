import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/insurance-setting";

export const getInsuranceSetting = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-setting`)
}

export const updateInsuranceSetting = (values, hasUpdate) => {
    const requestBody = {
        "id": values.id,
        "singedContract": values.singedContract,
        "returnedLeaveTmp": values.returnedLeaveTmp,
        "leaveTmp": values.leaveTmp,
        "unpaidLeave": values.unpaidLeave,
        "hasUpdate": hasUpdate
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-setting`, requestBody)
}