import React, { use, useEffect, useState } from 'react';
import '../css/crud-style.css';
import { generateSecureRandomPassword } from '../../../util/AccountUtil';
import { toast } from 'react-toastify';
import { activeAccount, getCountAccount } from '../../../service/Manage/ManageAccountService';


const ActiveAccountComponent = ({ selected, setCountAccout, setListAccount }) => {
    const [passRandom, setPassRandom] = useState(true);

    const [values, setValues] = useState({
        password: "",
        rePassword: ""
    })

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClickActive = () => {
        var passwordActive = ""
        passwordActive = generateSecureRandomPassword()
        if (!passRandom) {
            if (values.password.trim().length === 0) {
                toast.error("Mật khẩu chưa nhập")
                return;
            } else if (values.rePassword.trim().length === 0) {
                toast.error("Nhập lại mật khẩu chưa nhập")
                return;
            }
            else if (values.rePassword.trim() !== values.password.trim()) {
                toast.error("Mật khẩu không trùng khớp")
                return;
            }
            passwordActive = values.password
        }
        activeAccount(selected.employeeCode, passwordActive).then((response) => {
            if (response.data.code === 1000) {
                toast.success(response.data.message)
                getCountAccount().then((response) => {
                    if (response.data.code === 1000) {
                        setCountAccout(response.data.data)
                    }
                })
                setListAccount(prevList => prevList.filter(item => item.id !== selected.id));
                document.querySelector('#active_account [data-bs-dismiss="modal"]').click();
            } else if (response.data.code > 1000) {
                toast.error(response.data.message)
            } else {
                toast.error("Bảo trì hệ thống")
            }
        })
    }
    return (
        <>
            <div class="modal fade" id="active_account">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Kích hoạt tài khoản</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 ">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên đăng nhập</label>
                                                    <input type="email" class="form-control readonly-input" value={selected && selected.username} readOnly />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm người dùng</label>
                                                    <input type="email" class="form-control readonly-input" value={selected && selected.role} readOnly />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" checked={passRandom} type="checkbox" onChange={() => setPassRandom(!passRandom)} style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Để mật khẩu ngẫu nhiên</span>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input name='password' onChange={onChangeInput} type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Xác nhận lại mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input name='rePassword' onChange={onChangeInput} type="text" class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={handleClickActive}>CẬP NHẬT </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveAccountComponent;

