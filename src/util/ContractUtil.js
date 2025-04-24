import { toast } from "react-toastify";
import { compareDates } from "./TimeUtil";

export const ContractStatus = new Map([
    [1, { name: "Đang hiệu lực", bg: "badge-success" }],
    [2, { name: "Chưa hiệu lực", bg: "badge-warning" }],
    [3, { name: "Đã thanh lý", bg: "badge-danger" }],
]);

export const ContractState = new Map([
    [1, { name: "Chờ duyệt", bg: "bg-warning" }],
    [2, { name: "Đã duyệt", bg: "bg-success" }],
]);


const CONTRACT_STATE_WAITING = 1
const CONTRACT_STEATE_CHECKED = 2

const CONTRACT_CREATE_NEW = 1;
const CONTRACT_CREATE_APPENDIX = 2;
export { CONTRACT_CREATE_APPENDIX, CONTRACT_CREATE_NEW, CONTRACT_STATE_WAITING, CONTRACT_STEATE_CHECKED }



export const checkValidatorContract = (contractDetail) => {
    if (contractDetail.contractType === 0 || contractDetail.contractType === "") {
        toast.error("Yêu cầu chọn thông tin loại hợp đồng!")
        return false;
    } else if (contractDetail.department === 0 || contractDetail.department === "") {
        toast.error("Yêu cầu chọn thông tin phòng ban!")
        return false;
    } else if (contractDetail.jobPosition === 0 || contractDetail.jobPosition === "") {
        toast.error("Yêu cầu chọn thông tin vị trí!")
        return false;
    } else if (contractDetail.dateStart === "") {
        toast.error("Yêu cầu nhập thông tin ngày có hiệu lực!")
        return false;
    } else if (contractDetail.dateEnd && (contractDetail.dateEnd.toString().trim().length === 0 || contractDetail.dateEnd === "")) {
        toast.error("Yêu cầu nhập thông tin ngày hết hiệu lực")
        return false;
    } else if (contractDetail.dateEnd && (compareDates(contractDetail.dateStart, contractDetail.dateEnd) === 1)) {
        toast.error("Ngày bắt đầu và kết thúc không hợp lệ")
        return false;
    }
    else if (contractDetail.dateSign === "") {
        toast.error("Yêu cầu nhập thông tin ngày ký!")
        return false;
    } else if (compareDates(contractDetail.dateStart, contractDetail.dateSign) === 1 ||
        (contractDetail.dateEnd && (compareDates(contractDetail.dateSign, contractDetail.dateEnd) === 1))) {
        toast.error("Ngày ký không hợp lệ!")
        return false;
    }
    else if (contractDetail.salaryGross === 0 || contractDetail.salaryGross === "") {
        toast.error("Yêu cầu nhập thông tin tiền lương!")
        return false;
    }
    return true
}

export const checkValidatorAllowanceContract = (value) => {
    if (value.allowanceId === "") {
        toast.error("Yêu cầu nhập số tiền phụ cấp!")
        return false;
    } else if (value.amount === 0 || value.amount === "") {
        toast.error("Yêu cầu nhập số tiền phụ cấp!")
        return false;
    } else if (value.amount === "") {
        toast.error("Yêu cầu nhập số tiền phụ cấp!")
        return false;
    }
    return true;
}