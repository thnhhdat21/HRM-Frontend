import axiosClient from "./config/AxiosClient";
const REST_API_BASE_URL = "/letter";

export const deleteLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axiosClient.post(`${REST_API_BASE_URL}/delete-letter`, formData)
}

export const updateLeaveLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        employeeId: values.employeeId,
        letterReasonId: values.letterReasonId,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        total: values.total,
        description: values.description
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-leave-letter`, requestBody)
}

export const updateOverTimeLetter = (values) => {
    const requestBody = {
        dateRegis: values.dateRegis,
        letterId: values.letterId,
        employeeId: values.employeeId,
        letterReasonId: values.letterReasonId,
        timeStart: values.timeStart.length === 5 ? values.timeStart + ":00" : values.timeStart,
        timeEnd: values.timeEnd.length === 5 ? values.timeEnd + ":00" : values.timeEnd,
        total: values.total,
        isNextDay: values.isNextDay,
        description: values.description
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-overtime-letter`, requestBody)
}


export const updateWorkTimeLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        // employeeId: values.employeeId,
        employeeId: 2,
        letterReasonId: values.letterReasonId,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        description: values.description
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-worktime-letter`, requestBody)
}

export const updateInOutAndEndWorkLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        employeeId: values.employeeId,
        letterReasonId: values.letterReasonId,
        dateRegis: values.dateRegis,
        description: values.description,
        type: values.type
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-inout-endwork-letter`, requestBody)
}

export const getLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-letter-by-id`, formData)
}