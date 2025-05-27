import Cookies from "js-cookie"

export const logoutUtil = () => {
    Cookies.remove("employeeId")
    Cookies.remove("token")
    Cookies.remove("refreshToken")
    Cookies.remove("permissions")
    Cookies.remove("jobPosition")
}