const DECISION_STATE_WATTING = 1
const DECISION_STATE_CHECKED = 2
const DECISION_STATE_NO_CHECKED = 3


const DECISION_TYPE_REWARD = 1
const DECISION_TYPE_TRANSFER = 2
const DECISION_TYPE_PENALTY = 3
const DECISION_TYPE_APPOINT = 4
const DECISION_TYPE_SALARY = 5
const DECISION_TYPE_TERMINATION = 6


export const DecisionType = new Map([
    [1, { name: "Quyết định khen thưởng", modal: "create_reward_penalty_decision" }],
    [2, { name: "Quyết định điều chuyể", modal: "create_tranfer_appointment_decision" }],
    [3, { name: "Quyết định kỷ luật nội bộ", modal: "create_reward_penalty_decision" }],
    [4, { name: "Quyết định bổ nhiệm", modal: "create_tranfer_appointment_decision" }],
    [5, { name: "Quyết định điều chỉnh lương", modal: "create_salary_decision" }],
    [6, { name: "Quyết định chấm dứt HĐLĐ", modal: "create_terminate_decision" }],
]);

// create_tranfer_decision
// create_appointment_decision
export const DecisiontState = new Map([
    [1, { name: "Chờ duyệt", bg: "bg-warning" }],
    [2, { name: "Đã duyệt", bg: "bg-success" }],
    [3, { name: "Không duyệt", bg: "bg-danger" }],
]);

export {
    DECISION_STATE_WATTING,
    DECISION_STATE_CHECKED,
    DECISION_STATE_NO_CHECKED,
    DECISION_TYPE_REWARD,
    DECISION_TYPE_TRANSFER,
    DECISION_TYPE_PENALTY,
    DECISION_TYPE_APPOINT,
    DECISION_TYPE_SALARY,
    DECISION_TYPE_TERMINATION,
}
