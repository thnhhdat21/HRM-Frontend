import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/reward-penalty";

export const createRewardOrPenalty = (list, type) => {
    const newList = list.map(({ id, ...rest }) => ({ ...rest, type: type }));
    return axios.post(`${REST_API_BASE_URL}/create-new`, newList)
}

export const getListRewardOrPenalty = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axios.post(`${REST_API_BASE_URL}/get-list`, formData)
}

export const updateRewardOrPenalty = (id, name, amount, des) => {
    const requestBody = {
        "id": id,
        "name": name,
        "amount": amount,
        "des": des
    }
    return axios.post(`${REST_API_BASE_URL}/update`, requestBody)
}

export const deleteRewardOrPenalty = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete`, formData)
}
