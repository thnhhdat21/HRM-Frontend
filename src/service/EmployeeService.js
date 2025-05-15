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
        "dateOfBirth": '2025-10-01',
        "gender": true,
        "marriageStatus": true,
        "nation": values.nation,
        "phoneNumber": values.phoneNumber,
        "placeOfBirth": values.placeOfBirth,
        "religion": values.religion,
        "ethnic": values.ethnic,
        "identityCard": values.identityCard,
        "issueDateCCCD": '2025-10-01',
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

export const getTimeSheetEmployee = (yearMonth) => {
    const requestBody = {
        employeeId: 444,
        yearMonth: yearMonth
    }
    return axiosClient.post(`${REST_API_BASE_URL}/get-employee-timekeeping`, requestBody)
}

export const employeeCheckIn = () => {
    const formData = new FormData();
    formData.append("employeeId", 444)
    return axiosClient.post(`${REST_API_BASE_URL}/check-in`, formData)
}

export const employeeCheckOut = () => {
    const formData = new FormData();
    formData.append("employeeId", 444)
    return axiosClient.post(`${REST_API_BASE_URL}/check-out`, formData)
}

export const getListLeaveLetter = () => {
    const formData = new FormData();
    formData.append("employeeId", 2)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-leave-letter`, formData)
}

export const getListOverTimeLetter = () => {
    const formData = new FormData();
    formData.append("employeeId", 2)
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-overtime-letter`, formData)
}


export const createEmployee = (valuesResume, valuesEducation, valuesFamily, contractCreate, insuranceRequest) => {
    const request = {
        resumeRequest: valuesResume,
        educationRequest: valuesEducation,
        familyRequest: valuesFamily,
        contractRequest: contractCreate,
        insuranceRequest: insuranceRequest
    }
    const formData = new FormData();
    formData.append("fullEmployeeRequest", new Blob([JSON.stringify(request)], { type: "application/json" }));
    formData.append(
        "avatar",
        valuesResume.avatar instanceof File || valuesResume.avatar instanceof Blob
            ? valuesResume.avatar
            : new Blob([]) // gửi blob rỗng nếu không hợp lệ
    );

    formData.append(
        "backIdentityCard",
        valuesResume.backIdentityCard instanceof File || valuesResume.backIdentityCard instanceof Blob
            ? valuesResume.backIdentityCard
            : new Blob([]) // gửi blob rỗng nếu không hợp lệ
    );
    formData.append(
        "fontIdentityCard",
        valuesResume.fontIdentityCard instanceof File || valuesResume.fontIdentityCard instanceof Blob
            ? valuesResume.fontIdentityCard
            : new Blob([]) // gửi blob rỗng nếu không hợp lệ
    );

    return axiosClient.post(`${REST_API_BASE_URL}/create-employee`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
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
