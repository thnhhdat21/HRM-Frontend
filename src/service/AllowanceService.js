import axiosClient from "./config/AxiosClient";
const REST_API_BASE_URL = "/allowance";

export const getListAllownace = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-allowance`)
}

export const getAllowanceByContractType = (contractTypeId) => {
    const formData = new FormData();
    formData.append("contractTypeId", contractTypeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-allowance-by-contract-type`, formData)
}

