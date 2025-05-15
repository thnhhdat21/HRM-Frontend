import axios from "axios";

const REST_API_BASE_URL = "/decision";

export const getListDecision = (values) => {
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
    return axios.post(`${REST_API_BASE_URL}/get-list-decision`, requestBody)
}


export const getCountDecision = (values) => {
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
    return axios.post(`${REST_API_BASE_URL}/count-decision`, requestBody)
}


export const deleteDecision = (decisionId) => {
    const formData = new FormData();
    formData.append("decisionId", decisionId)
    return axios.post(`${REST_API_BASE_URL}/delete-decision`, formData)
}


export const updateRewardAndPenalty = (values) => {
    const requestBody = {
        decisionId: values.decisionId,
        code: values.code,
        date: values.date,
        employeeId: values.employeeId,
        rewardAndPenaltyId: values.rewardAndPenaltyId,
        amount: values.amount,
        type: values.type
    }
    return axios.post(`${REST_API_BASE_URL}/reward-and-penalty-decision`, requestBody)
}

export const updateTransferAndAppoint = (values) => {
    const requestBody = {
        decisionId: values.decisionId,
        code: values.code,
        employeeId: values.employeeId,
        reason: values.reason,
        date: values.date,
        departmentNewId: values.departmentNewId,
        jobPositionNewId: values.jobPositionNewId,
        type: values.type
    }
    return axios.post(`${REST_API_BASE_URL}/transfer-and-appointment-decision`, requestBody)
}

export const updateTerminationDecision = (values) => {
    const requestBody = {
        decisionId: values.decisionId,
        code: values.code,
        date: values.date,
        employeeId: values.employeeId,
        reason: values.reason,
    }
    return axios.post(`${REST_API_BASE_URL}/termination-decision`, requestBody)
}

export const updateSalaryAppoint = (values, allowances) => {
    const updatedList = allowances.map(item => ({
        ...item,
        id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
    }));
    const requestBody = {
        decisionId: values.decisionId,
        code: values.code,
        dateDecision: values.dateDecision,
        employeeId: values.employeeId,
        reason: values.reason,
        dateActive: values.dateActive,
        amountNew: values.amountNew,
        allowances: updatedList
    }
    return axios.post(`${REST_API_BASE_URL}/salary-decision`, requestBody)
}

export const getDecision = (decisionId) => {
    const formData = new FormData();
    formData.append("decisionId", decisionId)
    return axios.post(`${REST_API_BASE_URL}/get-decision-by-id`, formData)
}


export const noApprovalDecision = (decisionId) => {
    const formData = new FormData();
    formData.append("decisionId", decisionId)
    return axios.post(`${REST_API_BASE_URL}/no-approve-decision`, formData)
}

export const approvalDecision = (decisionId) => {
    const formData = new FormData();
    formData.append("decisionId", decisionId)
    return axios.post(`${REST_API_BASE_URL}/approve-decision`, formData)
}


export const updateDecisionRewardAndPenaltyEmployee = (list) => {
    const newList = list.map(({ id, ...rest }) => ({ ...rest }));
    return axios.post(`${REST_API_BASE_URL}/reward-and-penalty-decision-employees`, newList)
}


