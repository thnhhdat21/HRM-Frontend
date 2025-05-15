import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/contract-type";

export const getListContractType = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list`)
}
