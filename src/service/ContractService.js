import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/contract";

export const getWorkProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-work-profile-employee`, formData)
}

export const getWorkProcess = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-work-process-profile`, formData)
}

export const getContractProfileByEmloyeeId = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-contract-profile-by-employee-id`, formData)
}

export const getContractProfileByContractId = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-contract-profile-by-contract-id`, formData)
}


export const getListContractOfEmployee = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-contract-of-employee`, formData)
}

// History
export const getContractHistory = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axiosClient.post(`contract-history/get-contract-history`, formData)
}