import Cookies from "js-cookie";
import { logout } from "../../service/AuthenService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { logoutUtil } from "../../util/AuthenUtil";
import { PROFILE_RESUME } from "../../util/EmployeeUtil";
import { pathPermissionList } from "../../util/LeftMenuUtil";

const AvartarComponent = () => {
    const refreshToken = Cookies.get("refreshToken")
    const navigate = useNavigate()
    const roleString = Cookies.get('permissions');
    const employeeId = Cookies.get('employeeId');
    const employeeName = Cookies.get('employeeName');
    const jobPosition = Cookies.get('jobPosition');
    let roles = new Set();
    let isAdmin = false;
    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isAdmin = roles.has('ADMIN')
    }
    const handleClickLogout = (e) => {
        e.preventDefault()
        logout(refreshToken).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Đăng xuất")
                logoutUtil()
                setTimeout(() => {
                    navigate("/");
                }, 500);
            }
        })
    }

    const handleClickNavigate = (url) => {
        navigate(url, { state: { employeeId: employeeId, employeeName: employeeName, navItem: PROFILE_RESUME } });
    }

    return (
        <>
            <div className="dropdown profile-dropdown">
                <a href="#" className="dropdown-toggle d-flex align-items-center"
                    data-bs-toggle="dropdown">
                    <span className="avatar avatar-sm online">
                        <img src="/assets/logo/logo-small.png" alt="Img" className="img-fluid rounded-circle" />
                    </span>
                </a>
                <div className="dropdown-menu shadow-none">
                    <div className="card mb-0">
                        <div className="card-header" style={{ padding: "10px 10px" }}>
                            <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-2">
                                <span className="avatar avatar-lg me-2 avatar-rounded">
                                    <img src="/assets/logo/logo-small.png" alt="img" />
                                </span>
                            </div>
                            <div className="text-center">
                                <h5 className="mb-0">{employeeName} </h5>
                                <p className="fs-12 fw-medium mb-0">{jobPosition}</p>
                            </div>
                        </div>
                        <div className="card-body" style={{ padding: "5px 20px" }}>
                            <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                onClick={() => navigate("/personal/home")}>
                                <i className="ti ti-home me-1" />Trang chủ
                            </a>
                            <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                onClick={() => handleClickNavigate('/profile-employee')}>
                                <i className="ti ti-user-circle me-1" />Thông tin hồ sơ
                            </a>
                            {isAdmin && (
                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                    onClick={() => navigate("/settings/account")}>
                                    <i className="ti ti-settings me-1" />
                                    Cài đặt
                                </a>
                            )}

                            {(() => {
                                const item = pathPermissionList.find(item =>
                                    item.permissions && item.permissions.some(role => roles.has(role))
                                );
                                return item && (
                                    <Link to={item.path} className="dropdown-item d-inline-flex align-items-center p-0 py-2">
                                        <i className="ti ti-circle-arrow-up me-1" />Quản lý
                                    </Link>
                                );
                            })()}

                        </div>
                        <div className="card-footer" style={{ padding: "0px 20px" }}>
                            <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                onClick={handleClickLogout}>
                                <i className="ti ti-login me-2"></i>Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvartarComponent;

