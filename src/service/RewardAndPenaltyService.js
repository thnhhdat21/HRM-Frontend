import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/reward-penalty";

export const getListRewardOrPenalty = (type) => {
    const formData = new FormData();
    formData.append("type", type)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list`, formData)
}
