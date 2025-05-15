import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-contract";

export const getContractDetail = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-contract-detail`, formData)
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
    return axiosClient.post(`${REST_API_BASE_URL}/update-contract`, responseBody)
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
    return axiosClient.post(`${REST_API_BASE_URL}/create-contract`, responseBody)
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-contract`, requestBody)
}

export const endContract = (values) => {
    const requestBody = {
        contractId: values.contractId,
        dateLiquidation: values.dateLiquidation,
        reasonLiquidation: values.reasonLiquidation
    }
    return axiosClient.post(`${REST_API_BASE_URL}/end-contract`, requestBody)
}

export const countContractAppendix = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axiosClient.post(`${REST_API_BASE_URL}/count-contract-appendix`, formData)
}

export const getCountContractType = (values) => {
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-contract-type`, requestBody)
}


// History
export const getContractHistory = (contractId) => {
    const formData = new FormData();
    formData.append("contractId", contractId)
    return axiosClient.post(`contract-history/get-contract-history`, formData)
}