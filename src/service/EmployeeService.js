import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/employee";

export const getResumeProfile = (employeeId) => {
    const formData = new FormData();
    formData.append("employeeId", employeeId)
    return axios.post(`${REST_API_BASE_URL}/get-resume-profile-employee`, formData)
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
        "avatar": isUpdateAvatar ? values.avatar : null
    }
    return axios.post(`${REST_API_BASE_URL}/update-resume-profile-employee`, requestBody, {
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
    return axios.post(`${REST_API_BASE_URL}/update-identity-card`, requestBody, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })


}