import { toast } from "react-toastify";

const BHXH = 1;
const BHYT = 2;
const BHTN = 3;
const BHTNLD_BNN = 4;

const InsuranceTypeDir = [
    "", "Bảo hiểm xã hội", "Bảo hiểm y tế", "Bảo hiểm thất nghiệp", "Bảo hiểm TNLD_BNN"
]

export {
    BHXH, BHYT, BHTN, BHTNLD_BNN, InsuranceTypeDir
}

export const checkValidatorInsurance = (values) => {
    if (values.insuranceNumber === null || values.insuranceNumber.trim().length === 0) {
        toast.error("Yêu cầu nhập số sổ bảo hiểm!")
        return false;
    } else if (values.insuranceCard === null || values.insuranceCard.trim().length === 0) {
        toast.error("Yêu cầu nhập số thẻ BHYT!")
        return false;
    }
    return true;
}