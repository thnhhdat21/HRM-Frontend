import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/allowance";

export const createAllowance = (list) => {
    const newList = list.map(({ id, ...rest }) => rest);
    return axios.post(`${REST_API_BASE_URL}/create-allowance`, newList)
}

export const getListAllownace = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list-allowance`)
}

export const updateAllowance = (id, name, amount, unit) => {
    const requestBody = {
        "id": id,
        "name": name,
        "amount": amount,
        "unit": unit
    }
    return axios.post(`${REST_API_BASE_URL}/update-allowance`, requestBody)
}

export const deleteAllowance = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-allowance`, formData)
}

export const getAllowanceByContractType = (contractTypeId) => {
    const formData = new FormData();
    formData.append("contractTypeId", contractTypeId)
    return axios.post(`${REST_API_BASE_URL}/get-allowance-by-contract-type`, formData)
} 
