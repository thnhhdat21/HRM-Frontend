import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/insurance-setting";

export const getInsuranceSetting = () => {
    return axios.post(`${REST_API_BASE_URL}/get-setting`)
}

export const updateInsuranceSetting = (values, hasUpdate) => {
    const requestBody = {
        "id": values.id,
        "closingDateIncrease": values.closingDateIncrease,
        "singedContract": values.singedContract,
        "returnedFromMaternity": values.returnedFromMaternity,
        "returnedFromUnpaidLeave": values.returnedFromUnpaidLeave,
        "increasedContribution": values.increasedContribution,
        "closingDateDecrease": values.closingDateDecrease,
        "contractTerminated": values.contractTerminated,
        "maternityLeave": values.maternityLeave,
        "decreasedContribution": values.decreasedContribution,
        "unpaidLeave": values.unpaidLeave,
        "maxUnpaidLeaveDay": values.maxUnpaidLeaveDay,
        "hasUpdate": hasUpdate
    }
    return axios.post(`${REST_API_BASE_URL}/update-setting`, requestBody)
}