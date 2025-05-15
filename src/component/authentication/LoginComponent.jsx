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
                    Cookies.set("permissions", data.account.permissions)
                    toast.success("Đăng nhập thành công")
                    navigate("/personal/home")
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
            <div class="main-wrapper">
                <div class="container-fuild">
                    <div class="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
                        <div class="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                            <div class="col-md-4 mx-auto vh-100">
                                <div class="vh-100">
                                    <div class="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                                        <div class=" mx-auto mb-5 text-center">
                                            <img src="/assets/logo/logo.png" class="img-fluid" alt="Img" style={{ width: "300px" }} />
                                        </div>
                                        <form class="">
                                            <div class="text-center mb-3">
                                                <h2 class="mb-2">Đăng nhập</h2>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email</label>
                                                <div class="input-group">
                                                    <input type="text" name='username' value={values.username} onChange={onChange} class="form-control border-end-0" />
                                                    <span class="input-group-text border-start-0">
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Mật khẩu</label>
                                                <div class="pass-group">
                                                    <input type="password" name='password' value={values.password} onChange={onChange} class="pass-input form-control" />
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary w-100"
                                                    style={{ backgroundColor: "#e50213" }} onClick={handleClickLogin}>Đăng nhập</button>
                                            </div>
                                        </form>
                                        <div class="mt-5 pb-4 text-center">
                                            <p class="mb-0 text-gray-9">Copyright &copy; 2024 - TDSoftware</p>
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

