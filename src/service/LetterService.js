import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/letter";

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
    return axios.post(`${REST_API_BASE_URL}/get-list-letter`, requestBody)
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
    return axios.post(`${REST_API_BASE_URL}/get-count-letter`, requestBody)
}

export const deleteLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axios.post(`${REST_API_BASE_URL}/delete-letter`, formData)
}

export const updateLeaveLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        // employeeId: values.employeeId,
        employeeId: 2,
        letterReasonId: values.letterReasonId,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        total: values.total,
        description: values.description
    }
    return axios.post(`${REST_API_BASE_URL}/update-leave-letter`, requestBody)
}

export const updateOverTimeLetter = (values) => {
    const requestBody = {
        dateRegis: values.dateRegis,
        letterId: values.letterId,
        // employeeId: values.employeeId,
        employeeId: 442,
        letterReasonId: values.letterReasonId,
        timeStart: values.timeStart,
        timeEnd: values.timeEnd,
        total: values.total,
        isNextDay: values.isNextDay,
        description: values.description
    }
    return axios.post(`${REST_API_BASE_URL}/update-overtime-letter`, requestBody)
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
    return axios.post(`${REST_API_BASE_URL}/update-worktime-letter`, requestBody)
}

export const updateTerminationLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        code: values.code,
        date: values.date,
        employeeId: values.employeeId,
        letterReasonId: values.letterReasonId,
        description: values.description
    }
    return axios.post(`${REST_API_BASE_URL}/update-inout-endwork-letter`, requestBody)
}



export const updateInOutAndEndWorkLetter = (values) => {
    const requestBody = {
        letterId: values.letterId,
        // employeeId: values.employeeId,
        employeeId: 2,
        letterReasonId: values.letterReasonId,
        dateRegis: values.dateRegis,
        description: values.description
    }
    return axios.post(`${REST_API_BASE_URL}/update-inout-endwork-letter`, requestBody)
}

export const getLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axios.post(`${REST_API_BASE_URL}/get-letter-by-id`, formData)
}

export const noApprovalLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axios.post(`${REST_API_BASE_URL}/no-approve-letter`, formData)
}

export const approvalLetter = (letterId) => {
    const formData = new FormData();
    formData.append("letterId", letterId)
    return axios.post(`${REST_API_BASE_URL}/approve-letter`, formData)
}

