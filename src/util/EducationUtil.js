import { toast } from "react-toastify";

export const checkValidatorEducation = (values) => {
    if (values.toMonth.trim().length === 0 || values.toMonth === null) {
        toast.error("Yêu cầu nhập thông tin tháng bắt đầu!")
        return false;
    } else if (values.fromMonth.trim().length === 0 || values.fromMonth === null) {
        toast.error("Yêu cầu nhập thông tin tháng kết thúc!")
        return false;
    } else if (values.level.trim().length === 0 || values.level === null) {
        toast.error("Yêu cầu nhập thông tin trình độ học vấn!")
        return false;
    } else if (values.placeTraining.trim().length === 0 || values.placeTraining === null) {
        toast.error("Yêu cầu nhập thông tin nơi đào tạo!")
        return false;
    } else if (values.major.trim().length === 0 || values.major === null) {
        toast.error("Yêu cầu nhập thông tin chuyên ngành")
        return false;
    } else if (values.methodTraining.trim().length === 0 || values.methodTraining === null) {
        toast.error("Yêu cầu nhập thông tin hình thức đào tạo!")
        return false;
    }
    return true
}
