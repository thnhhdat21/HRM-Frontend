import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/department";

export const createDepartment = (name, code, level, parentId, businessBlockId) => {

    const requestBody = {
        "name": name,
        "code": code,
        "level": level,
        "parentId": parentId,
        "businessBlockId": businessBlockId,
    }
    return axios.post(`${REST_API_BASE_URL}/create-department`, requestBody)
}

export const getListDepartment = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list-department`)
}

export const getListDepartmentChild = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list-department-child`)
}

export const deleteDepartment = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/delete-department`, formData)
}

export const getDepartmentDetail = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axios.post(`${REST_API_BASE_URL}/get-department-detail`, formData)
}



export const updateDepartment = (id, name, code, level, parentId, businessBlockId) => {
    const requestBody = {
        "id": id,
        "name": name,
        "code": code,
        "level": level,
        "parentId": parentId,
        "businessBlockId": businessBlockId,
    }
    return axios.post(`${REST_API_BASE_URL}/update-department`, requestBody)
}