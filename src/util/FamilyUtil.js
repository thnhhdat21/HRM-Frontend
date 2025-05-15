import { toast } from "react-toastify";

export const checkValidatorFamily = (values) => {
    if (values.relationShip.trim().length === 0 || values.relationShip === null) {
        toast.error("Yêu cầu chọn mối quan hệ!")
        return false;
    } else if (values.fullName.trim().length === 0 || values.fullName === null) {
        toast.error("Yêu cầu nhập họ và tên!")
        return false;
    } else if (values.dateOfBirth.trim().length === 0 || values.dateOfBirth === null) {
        toast.error("Yêu cầu nhập ngày sinh!")
        return false;
    } else if (values.identityCard.trim().length === 0 || values.identityCard === null) {
        toast.error("Yêu cầu nhập thông tin CMT/Căn cước!")
        return false;
    } else if (values.issueDateCCCD.trim().length === 0 || values.issueDateCCCD === null) {
        toast.error("Yêu cầu nhập thông tin ngày cấp CMT/Căn cước")
        return false;
    } else if (values.placeCCCD.trim().length === 0 || values.placeCCCD === null) {
        toast.error("Yêu cầu nhập thông tin nơi cấp CMT/Căn cước!")
        return false;
    } else if (values.phoneNumber.trim().length === 0 || values.phoneNumber === null) {
        toast.error("Yêu cầu nhập thông tin số điện thoại!")
        return false;
    }
    else if (values.taxCode.trim().length === 0 || values.taxCode === null) {
        toast.error("Yêu cầu nhập thông tin mã số thuế!")
        return false;
    }
    return true
}