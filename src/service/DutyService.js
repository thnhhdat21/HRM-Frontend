import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/duty";

export const getListDuty = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-duty`)
}