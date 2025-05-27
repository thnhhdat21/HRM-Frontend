import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/salary-table";

export const getListSalaryTable = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-salary-table`)
}

export const getListSalaryTableLevelDepartment = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-salary-table-department`)
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-salary-detail`, requestBody)
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-salary-detail`, requestBody)
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-tax`, requestBody)
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
//     return axiosClient.post(`${REST_API_BASE_URL}/get-count-on-leave`, requestBody)
// }

