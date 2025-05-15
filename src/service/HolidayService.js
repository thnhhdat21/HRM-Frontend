import axios from "axios";

const REST_API_BASE_URL = "/holiday";

export const getListHoliday = (filter) => {
    const requestBody = {
        year: filter.year,
        type: filter.type,
        pageIndex: filter.pageIndex
    }
    return axios.post(`${REST_API_BASE_URL}/get-list-holiday`, requestBody)
}

export const updateHoliday = (values) => {
    const requestBody = {
        id: values.id,
        reason: values.reason,
        type: values.type,
        date: values.date,
        description: values.description
    }
    return axios.post(`${REST_API_BASE_URL}/update-holiday`, requestBody)
}

export const deleteHoliday = (holidayId) => {
    const formData = new FormData();
    formData.append("holidayId", holidayId)
    return axios.post(`${REST_API_BASE_URL}/delete-holiday`, formData)
}
