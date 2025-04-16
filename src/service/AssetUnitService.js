import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/asset-unit";


export const getListAssetUnit = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list`)
}

export const createAssetUnit = (list) => {
    const newList = list.map(({ id, ...rest }) => rest);
    return axios.post(`${REST_API_BASE_URL}/create-asset-unit`, newList)
}

export const updateAssetUnit = (id, name) => {
    const requestBody = {
        "id": id,
        "name": name,
    }
    return axios.post(`${REST_API_BASE_URL}/update-asset-unit`, requestBody)
}

export const deleteAssetUnit = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-asset-unit`, formData)
}
