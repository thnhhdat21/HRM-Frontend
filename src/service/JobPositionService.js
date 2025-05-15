import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/job-position";

export const getListJobPosition = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-job-position`)
}