import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/education";

export const getEducationProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-education-profile-employee`, formData)
}

export const updateEducationProfile = (list) => {
    const updatedList = list.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null,
        toMonth: item.toMonth + "-01",
        fromMonth: item.fromMonth + "-01",
    }));
    return axiosClient.post(`${REST_API_BASE_URL}/update-education-profile-employee`, updatedList)
}