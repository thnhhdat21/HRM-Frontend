import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/duty";

export const createDuty = (list) => {
    const newList = list.map(({ id, ...rest }) => rest);
    return axios.post(`${REST_API_BASE_URL}/add-duty`, newList)
}

export const getListDuty = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list-duty`)
}

export const updateDuty = (id, name, des) => {
    const formData = new FormData();
    formData.append("id", id)
    formData.append("name", name)
    formData.append("des", des)
    return axios.post(`${REST_API_BASE_URL}/update-duty`, formData)
}

export const deleteDuty = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-duty`, formData)
}
