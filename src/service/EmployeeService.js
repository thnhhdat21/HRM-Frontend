import axiosClient from "./config/AxiosClient";

const REST_API_BASE_URL = "/employee";

export const getResumeProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-resume-profile-employee`, formData)
}

export const updateResumeProfile = (values, isUpdateAvatar) => {
    const requestBody = {
        "id": values.id,
        "fullName": values.fullName,
        "dateOfBirth": values.dateOfBirth,
        "gender": values.gender,
        "type": values.type,
        "marriageStatus": values.marriageStatus,
        "nation": values.nation,
        "phoneNumber": values.phoneNumber,
        "placeOfBirth": values.placeOfBirth,
        "religion": values.religion,
        "ethnic": values.ethnic,
        "identityCard": values.identityCard,
        "issueDateCCCD": values.issueDateCCCD,
        "placeCCCD": values.placeCCCD,
        "homeTown": values.homeTown,
        "permanentAddress": values.permanentAddress,
        "currentAddress": values.currentAddress,
        "taxCode": values.taxCode,
        "bankAccountName": values.bankAccountName,
        "accountBank": values.accountBank,
        "bankName": values.bankName,
        "email": values.email,
        "dateJoin": values.dateJoin,
        "avatar": isUpdateAvatar ? values.avatar : null
    }
    console.log(requestBody)
    return axiosClient.post(`${REST_API_BASE_URL}/update-resume-profile-employee`, requestBody, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateIdentityCard = (employeeId, fontIdCard, backIdCard) => {
    const requestBody = {
        "employeeId": employeeId,
        "fontIdCard": fontIdCard,
        "backIdCard": backIdCard
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-identity-card`, requestBody, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const getListEmployeeSelect = () => {
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-employee`)
}


export const getTimeSheetEmployee = (employeeId, yearMonth) => {
    const requestBody = {
        employeeId: employeeId,
        yearMonth: yearMonth
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-employee-timekeeping`, requestBody)
}

export const employeeCheckIn = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/check-in`, formData)
}

export const employeeCheckOut = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/check-out`, formData)
}

export const getListLeaveLetter = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-leave-letter`, formData)
}

export const getListOverTimeLetter = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-overtime-letter`, formData)
}


export const updateInsuranceNumber = (values) => {
    const requestBody = {
        employeeId: values.employeeId,
        insuranceNumber: values.insuranceNumber,
        insuranceCard: values.insuranceCard
    }
    return axiosClient.post(`${REST_API_BASE_URL}/update-insurance`, requestBody)
}

export const getInsuranceNumber = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-insurance-number`, formData)
}

export const getListSalaryEmployee = (employeeId, year) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    formData.append("year", year)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-salary-employee`, formData)
}


export const getSalaryDetailEmployee = (salaryDetailId) => {
    const formData = new FormData();
    formData.append("salaryDetailId", salaryDetailId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-salary-detail-employee`, formData)
}


export const getSalaryAllowanceEmployee = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-salary-allowance-employee`, formData)
}


export const getEmployeeNameAndCode = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-employee-name-code`, formData)
}

export const getEmployeeJobPosition = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axiosClient.post(`${REST_API_BASE_URL}/get-employee-job-position`, formData)
}
