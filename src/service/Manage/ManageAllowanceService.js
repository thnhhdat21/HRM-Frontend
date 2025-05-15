import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/allowance";

export const createAllowance = (list) => {
    const newList = list.map(({ id, ...rest }) => rest);
    return axiosClient.post(`${REST_API_BASE_URL}/create-allowance`, newList)
}

export const updateAllowance = (id, name, amount, unit) => {
    const requestBody = {
        "id": id,
        "name": name,
        "amount": amount,
        "unit": unit
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-allowance`, requestBody)
}

export const deleteAllowance = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-allowance`, formData)
}