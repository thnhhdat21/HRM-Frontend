import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-letter";

export const getListLetter = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-letter`, requestBody)
}

export const getCountLetter = (values) => {
    const requestBody = {
        "name": values.name,
        "type": values.type,
        "status": values.status,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-letter`, requestBody)
}

export const noApprovalLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axiosClient.post(`${REST_API_BASE_URL}/no-approve-letter`, formData)
}

export const approvalLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axiosClient.post(`${REST_API_BASE_URL}/approve-letter`, formData)
}

