import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/education";

export const getEducationProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-education-profile-employee`, formData)
}

export const updateEducationProfile = (list) => {
    const updatedList = list.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null,
        toMonth: item.toMonth + "-01",
        fromMonth: item.fromMonth + "-01",
    }));
    return axios.post(`${REST_API_BASE_URL}/update-education-profile-employee`, updatedList)
}
