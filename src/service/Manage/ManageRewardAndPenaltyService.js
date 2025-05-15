import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/admin/reward-penalty";

export const createRewardOrPenalty = (list, type) => {
    const newList = list.map(({ id, ...rest }) => ({ ...rest, type: type }));
    return axiosClient.post(`${REST_API_BASE_URL}/create-new`, newList)
}

export const updateRewardOrPenalty = (id, name, amount, des) => {
    const requestBody = {
        "id": id,
        "name": name,
        "amount": amount,
        "des": des
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update`, requestBody)
}

export const deleteRewardOrPenalty = (id) => {
    const formData = new FormData();
    formData.append("id", id)
    return axiosClient.post(`${REST_API_BASE_URL}/delete`, formData)
}
