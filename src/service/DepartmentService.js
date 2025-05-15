import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/department";

export const getListDepartmentChild = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-department-child`)
}