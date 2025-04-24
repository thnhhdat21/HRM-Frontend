import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/family";

export const getFamilyOfEmployee = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-family-profile-employee`, formData)
}


export const updateFamilyOfEmployee = (list) => {
    const updatedList = list.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
    }));
    return axios.post(`${REST_API_BASE_URL}/update-family-profile-employee`, updatedList)
}


