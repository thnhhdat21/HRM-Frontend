import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/contract-type";


export const getListContractType = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list`)
}

export const createContractType = (name, type, insurance, method, term, unit, allowances) => {
    const requestBody = {
        "name": name,
        "type": type,
        "method": method,
        "term": term,
        "unit": unit,
        "insurance": insurance,
        "allowances": allowances,
    }
    return axios.post(`${REST_API_BASE_URL}/create-contract-type`, requestBody)
}


export const getContracTypeDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-contract-type`, formData)
}


export const updateContractType = (id, name, type, insurance, method, term, unit, allowances, updateAllowance) => {
    const requestBody = {
        "id": id,
        "name": name,
        "type": type,
        "method": method,
        "term": term,
        "unit": unit,
        "insurance": insurance,
        "allowances": allowances,
        "updateAllowance": updateAllowance
    }
    return axios.post(`${REST_API_BASE_URL}/update-contract-type`, requestBody)
}

export const deleteContractType = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-contract-type`, formData)
}
