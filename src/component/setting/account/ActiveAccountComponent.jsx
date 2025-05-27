import { useState } from 'react';
import { generateSecureRandomPassword } from '../../../util/AccountUtil';
import { toast } from 'react-toastify';
import { activeAccount } from '../../../service/Manage/ManageAccountService';


const ActiveAccountComponent = ({ selected, update }) => {
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
                update()
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
            <div className="modal fade" id="active_account">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Kích hoạt tài khoản</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active">
                                    <div className="modal-body pb-0 ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Tên đăng nhập</label>
                                                    <input type="email" className="form-control readonly-input" value={selected && selected.username} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Nhóm người dùng</label>
                                                    <input type="email" className="form-control readonly-input" value={selected && selected.role} readOnly />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input className="form-check-input" checked={passRandom} type="checkbox" onChange={() => setPassRandom(!passRandom)} style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Để mật khẩu ngẫu nhiên</span>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Mật khẩu</label>
                                                    <input name='password' onChange={onChangeInput} type="password" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Xác nhận lại mật khẩu </label>
                                                    <input name='rePassword' onChange={onChangeInput} type="password" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" className="btn btn-primary" onClick={handleClickActive}>CẬP NHẬT </div>
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

