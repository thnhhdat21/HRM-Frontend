import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/asset-group";


export const getListAssetGroup = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list`)
}

export const createAssetGroup = (name, parentId) => {
    const requestBody = {
        "name": name,
        "parentId": parentId
    }
    return axios.post(`${REST_API_BASE_URL}/create-asset-group`, requestBody)
}

export const updateAssetGroup = (id, name, parentId) => {
    const requestBody = {
        "id": id,
        "name": name,
        "parentId": parentId
    }
    return axios.post(`${REST_API_BASE_URL}/update-asset-group`, requestBody)
}

export const deleteAssetGroup = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-asset-group`, formData)
}
