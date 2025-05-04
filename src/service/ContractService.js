import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/contract";

export const getWorkProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-work-profile-employee`, formData)
}

export const getWorkProcess = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-work-process-profile`, formData)
}

export const getContractProfileByEmloyeeId = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-contract-profile-by-employee-id`, formData)
}

export const getContractProfileByContractId = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axios.post(`${REST_API_BASE_URL}/get-contract-profile-by-contract-id`, formData)
}

export const getContractDetail = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axios.post(`${REST_API_BASE_URL}/get-contract-detail`, formData)
}

export const updateContract = (values, allowances) => {
    const updatedList = allowances.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
    }));
    const responseBody = {
        contractId: values.contractId,
        contractType: values.contractType,
        department: values.department,
        jobPosition: values.jobPosition,
        contractMethod: values.contractMethod,
        salaryGross: values.salaryGross,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        dateSign: values.dateSign,
        allowances: updatedList
    }
    return axios.post(`${REST_API_BASE_URL}/update-contract`, responseBody)
}

export const createContract = (values, allowances) => {
    const updatedList = allowances.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
    }));
    const responseBody = {
        employeeId: values.employeeId,
        contractCode: values.contractCode,
        contractId: values.contractId,
        contractType: values.contractType,
        department: values.department,
        jobPosition: values.jobPosition,
        contractMethod: values.contractMethod,
        salaryGross: values.salaryGross,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        dateSign: values.dateSign,
        parent: values.parent,
        createType: values.createType,
        allowances: updatedList
    }
    return axios.post(`${REST_API_BASE_URL}/create-contract`, responseBody)
}

export const getListContractOfEmployee = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-list-contract-of-employee`, formData)
}

export const getListContract = (values) => {
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
    return axios.post(`${REST_API_BASE_URL}/get-list-contract`, requestBody)
}

export const endContract = (values) => {
    const requestBody = {
        contractId: values.contractId,
        dateLiquidation: values.dateLiquidation,
        reasonLiquidation: values.reasonLiquidation
    }
    return axios.post(`${REST_API_BASE_URL}/end-contract`, requestBody)
}

export const countContractAppendix = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axios.post(`${REST_API_BASE_URL}/count-contract-appendix`, formData)
}


// History
export const getContractHistory = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axios.post(`${API_URL_PREFIX}/contract-history/get-contract-history`, formData)
}




