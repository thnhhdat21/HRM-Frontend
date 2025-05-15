import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/duty";

export const createDuty = (list) => {
    const newList = list.map(({ id, ...rest }) => rest);
    return axiosClient.post(`${REST_API_BASE_URL}/add-duty`, newList)
}

export const updateDuty = (id, name, des) => {
    const formData = new FormData();
    formData.append("id", id)
    formData.append("name", name)
    formData.append("des", des)
    return axiosClient.post(`${REST_API_BASE_URL}/update-duty`, formData)
}

export const deleteDuty = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-duty`, formData)
}
