import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/file";

export const getFile = (fileName) => {
    const formData = new FormData();
    formData.append("fileName", fileName)
    return axiosClient.post(`${REST_API_BASE_URL}/get-file`, formData, {
        responseType: 'blob'
    })
}