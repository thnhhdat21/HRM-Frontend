import axios from "axios";

const REST_API_BASE_URL = "/salary-table";

export const getListSalaryTable = () => {
    return axios.post(`${REST_API_BASE_URL}/get-list-salary-table`)
}

export const getlistSalaryDetail = (values) => {
    const requestBody = {
        "name": values.name,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "salaryTableId": values.salaryTableId
    }
    return axios.post(`${REST_API_BASE_URL}/get-list-salary-detail`, requestBody)
}

export const getCountSalaryDetail = (values) => {
    const requestBody = {
        "name": values.name,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "salaryTableId": values.salaryTableId
    }
    return axios.post(`${REST_API_BASE_URL}/get-count-salary-detail`, requestBody)
}

export const getListTax = (values) => {
    const requestBody = {
        "name": values.name,
        "pageIndex": values.pageIndex,
        "department": values.department,
        "jobPosition": values.jobPosition,
        "duty": values.duty,
        "dateJoin": values.dateJoin,
        "year": values.year,
    }
    return axios.post(`${REST_API_BASE_URL}/get-list-tax`, requestBody)
}

// export const getCountEmployeeOnLeave = (values) => {
//     const requestBody = {
//         "name": values.name,
//         "type": values.type,
//         "status": values.status,
//         "pageIndex": values.pageIndex,
//         "department": values.department,
//         "jobPosition": values.jobPosition,
//         "duty": values.duty,
//         "dateJoin": values.dateJoin,
//         "year": values.year,
//     }
//     return axios.post(`${REST_API_BASE_URL}/get-count-on-leave`, requestBody)
// }

