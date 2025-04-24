import axios from "axios";
import { API_URL_PREFIX } from "./constant/URLConstant";

const REST_API_BASE_URL = API_URL_PREFIX + "/decision";

export const updateDecisionRewardAndPenalty = (list) => {
    const newList = list.map(({ id, ...rest }) => ({ ...rest }));
    return axios.post(`${REST_API_BASE_URL}/reward-and-penalty-decision`, newList)
}


