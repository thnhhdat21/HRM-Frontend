import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/file";

export const getFile = (fileName) => {
    const formData = new FormData();
    formData.append("fileName", fileName)
    return axios.post(`${REST_API_BASE_URL}/get-file`, formData, {
        responseType: 'blob'
    })
}