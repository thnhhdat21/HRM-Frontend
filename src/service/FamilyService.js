import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/family";

export const getFamilyOfEmployee = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-family-profile-employee`, formData)
}


export const updateFamilyOfEmployee = (list) => {
    const updatedList = list.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
    }));
    return axiosClient.post(`${REST_API_BASE_URL}/update-family-profile-employee`, updatedList)
}


