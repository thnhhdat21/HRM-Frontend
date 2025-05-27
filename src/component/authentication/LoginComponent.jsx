import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { isValidEmail } from '../../util/StringUtil';
import { login } from '../../service/AuthenService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginComponent = ({ }) => {
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const validator = (values) => {
        if (values.username.trim() === "") {
            toast.error("Yêu cầu nhập email!")
            return false;
        } else if (!isValidEmail(values.username)) {
            toast.error("Email không đúng định dạng")
            return false;
        } else if (values.password.trim() === "") {
            toast.error("Yêu cầu nhập mật khẩu!")
            return false;
        } else if (values.password.trim() < 8) {
            toast.error("Yêu cầu mật khẩu phải có 8 kí tự trở lên!")
            return false;
        }
        return true;
    }

    const handleClickLogin = (e) => {
        e.preventDefault()
        const isCorrect = validator(values);
        if (isCorrect) {
            login(values).then((response) => {
                if (response.data.code === 1000) {
                    let data = response.data.data
                    Cookies.set("token", data.accessToken)
                    Cookies.set("refreshToken", data.refreshToken)
                    Cookies.set("employeeId", data.account.employeeId)
                    Cookies.set("employeeName", data.account.employeeName)
                    Cookies.set("jobPosition", data.account.jobPosition)
                    Cookies.set("permissions", data.account.permissions)
                    toast.success("Đăng nhập thành công")
                    setTimeout(() => {
                        navigate("/personal/home")
                    }, 500);
                } else if (response.data.code > 1000) {
                    toast.error(response.data.message)
                } else {
                    toast.error("Thông tin đăng nhập không chính xác")
                }
            })
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                className="toast-login"
            />
            <div className="main-wrapper">
                <div className="container-fuild">
                    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
                        <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                            <div className="col-md-4 mx-auto vh-100">
                                <div className="vh-100">
                                    <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                                        <div className=" mx-auto mb-5 text-center">
                                            <img src="/assets/logo/logo.png" className="img-fluid" alt="Img" style={{ width: "300px" }} />
                                        </div>
                                        <form className="">
                                            <div className="text-center mb-3">
                                                <h2 className="mb-2">Đăng nhập</h2>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <div className="input-group">
                                                    <input type="text" name='username' autoComplete="username" value={values.username} onChange={onChange} className="form-control border-end-0" />
                                                    <span className="input-group-text border-start-0">
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mật khẩu</label>
                                                <div className="pass-group">
                                                    <input type="password" autoComplete="current-password" name='password' value={values.password} onChange={onChange} className="pass-input form-control" />
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <button type="submit" className="btn btn-primary w-100"
                                                    style={{ backgroundColor: "#e50213" }} onClick={handleClickLogin}>Đăng nhập</button>
                                            </div>
                                        </form>
                                        <div className="mt-5 pb-4 text-center">
                                            <p className="mb-0 text-gray-9">Copyright &copy; 2024 - TDSoftware</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;

