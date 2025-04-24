export const EmployeeStatus = new Map([
    [1, { name: "Đang làm việc", textType: "badge-success" }],
    [2, { name: "Nghỉ tạm thời", textType: "badge-warning" }],
    [3, { name: "nghỉ việc", textType: "badge-danger" }],
]);

export const EmployeeType = new Map([
    [1, { name: "Thử việc", textType: "badge-warning" }],
    [2, { name: "Chính thức", textType: "badge-success" }],
]);

const PROFILE_RESUME = 1;
const PROFILE_WORK = 2;
const PROFILE_INSURANCE = 3;
const PROFILE_CONTRACT = 4;
const PROFILE_SALARY = 5;
const PROFILE_RECEIVE = 6;
const PROFILE_END_JOD = 7;
const PROFILE_ASSET = 8;
const PROFILE_ATTACK = 2;

export {
    PROFILE_RESUME,
    PROFILE_WORK,
    PROFILE_INSURANCE,
    PROFILE_CONTRACT,
    PROFILE_SALARY,
    PROFILE_RECEIVE,
    PROFILE_END_JOD,
    PROFILE_ASSET,
    PROFILE_ATTACK
}