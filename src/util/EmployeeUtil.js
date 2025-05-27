import { toast } from "react-toastify";

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
const PROFILE_CONTRACT = 4;
const PROFILE_SALARY = 5;

export {
    PROFILE_RESUME,
    PROFILE_WORK,
    PROFILE_CONTRACT,
    PROFILE_SALARY,
}


export const checkValidatorResume = (values) => {
    if (values.fullName.trim().length === 0 || values.fullName === null) {
        toast.error("Yêu cầu nhập họ và tên!")
        return false;
    } else if (values.nation.trim().length === 0 || values.nation === null) {
        toast.error("Yêu cầu nhập quốc tịch!")
        return false;
    } else if (values.phoneNumber.trim().length === 0 || values.phoneNumber === null) {
        toast.error("Yêu cầu nhập số điện thoại!")
        return false;
    } else if (values.identityCard.trim().length === 0 || values.identityCard === null) {
        toast.error("Yêu cầu nhập CMT/Căn cước/Hộ chiếu!")
        return false;
    } else if (values.issueDateCCCD.trim().length === 0 || values.issueDateCCCD === null) {
        toast.error("Yêu cầu nhập ngày cấp CMT/Căn cước/Hộ chiếu!")
        return false;
    } else if (values.placeCCCD.trim().length === 0 || values.placeCCCD === null) {
        toast.error("Yêu cầu nhập nơi cấp CMT/Căn cước/Hộ chiếu!")
        return false;
    } else if (values.taxCode.trim().length === 0 || values.taxCode === null) {
        toast.error("Yêu cầu nhập mã số thuế")
        return false;
    }
    return true
}
