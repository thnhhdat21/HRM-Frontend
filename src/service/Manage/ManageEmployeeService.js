import axiosClient from "../config/AxiosClient";

const REST_API_BASE_URL = "/manage-employee";

export const getListEmployee = (values) => {
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-list-employee`, requestBody)
}

export const getCountEmployee = (values) => {
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
    return axiosClient.post(`${REST_API_BASE_URL}/get-count-employee-type`, requestBody)
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
