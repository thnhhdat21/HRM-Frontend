import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { changePassword, getAccountDetail, updatePermissionAccount } from '../../../service/AccountService';
import {
    MANAGE_EMPLOYEE, WATCH_EMPLOYEE, CREATE_EMPLOYEE,
    MANAGE_PAYROLL, WATCH_PAYROLL, CREATE_PAYROLL,
    MANAGE_TIMEKEEPING, WATCH_TIMEKEEPING, CREATE_TIMEKEEPING,
    MANAGE_APPROVAL, WATCH_APPROVAL, CREATE_APPROVAL,
    MANAGE_ASSET, WATCH_ASSET, CREATE_ASSET,
    getSelectedPermission,
    PermissionType,
    permissions,
    permissionCreate
} from '../../../util/PermissionUtil';
import { getStatus } from '../../../util/AccountUtil';
import { toast } from 'react-toastify';


const AccountEditComponent = ({ selected, listGroup, setUpdate, openModal, setOpenModal }) => {
    const [accountDetail, setAccountDetail] = useState(null)
    const [isChecked, setIsChecked] = useState({});
    const [permissionError, setPermissionError] = useState({});
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedRole, setSelectedRole] = useState("");
    const [checkChangePass, setCheckChangePass] = useState(false);
    const [checkChangePermission, setCheckChangePermission] = useState(false);
    const [prevPermission, setPrevPermission] = useState({});

    const [values, setValues] = useState({
        password: "",
        rePassword: ""
    })

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (openModal == "open") {
            if (selected) {
                setCheckChangePass(false)
                setCheckChangePermission(false)
                setSelectedRole({})
                setIsChecked({})
                setSelectedValue({})
                setValues({
                    password: "",
                    rePassword: ""
                })
                getAccountDetail(selected.id).then((response) => {
                    if (response.data.code === 1000) {
                        var account = response.data.data;
                        setAccountDetail(account)
                        if (account.permissions.includes("admin")) {
                            setSelectedRole("admin")
                        } else if (account.permissions.includes("default")) {
                            setSelectedRole("default")
                        } else {
                            setSelectedRole(account.roleId)
                            setPrevPermission(account.permissions)
                            const permissionsList = account.permissions.split(",").map(num => parseInt(num.trim()));
                            permissionsList.forEach(permission => {
                                setIsChecked(prevState => ({
                                    ...prevState,
                                    ["manage-" + getSelectedPermission(permission).split("-")[1]]: true
                                }));

                                setSelectedValue(prevState => ({
                                    ...prevState,
                                    [getSelectedPermission(permission)]: getSelectedPermission(permission).includes("create") ? "true" : permission
                                }));
                            })
                        }
                    }
                })
            }
        }
        setOpenModal("")
    }, [openModal])

    const handleCheckboxChange = (key) => {
        setIsChecked((prev) => ({ ...prev, [key]: !prev[key] }))
    };

    const handleChange = (event, key) => {
        setSelectedValue((prev) => ({ ...prev, [key]: event.target.value }));
        setPermissionError((prev) => ({ ...prev, [key.split("-")[1]]: false }))
    };

    const handleClear = (permission) => {
        setPermissionError((prev) => ({ ...prev, [permission.split("-")[1]]: false }))
        setSelectedValue((prev) => {
            const newValues = { ...prev };
            delete newValues[permission];
            return newValues;
        });
    };

    const handleSubmitClick = async () => {
        let hasUpdate = false;
        if (checkChangePass) {
            if (values.password.trim().length === 0) {
                return toast.error("Mật khẩu chưa nhập");
            } else if (values.rePassword.trim().length === 0) {
                return toast.error("Nhập lại mật khẩu chưa nhập");
            } else if (values.rePassword.trim() !== values.password.trim()) {
                return toast.error("Mật khẩu không trùng khớp");
            }
            try {
                const response = await changePassword(accountDetail.id, values.password);
                if (response.data.code === 1000) {
                    hasUpdate = true;
                } else if (response.data.code > 1000) {
                    toast.error(response.data.message);
                    return;
                } else {
                    toast.error("Bảo trì hệ thống");
                    return;
                }
            } catch (error) {
                toast.error("Lỗi hệ thống, thử lại sau!");
            }
        }

        if (checkChangePermission) {
            let listPermission = "";
            if (Object.values(isChecked).some(value => value === true)) {
                let perrmissionCorrect = true;
                for (const [manage, watch, create] of permissions) {
                    if (isChecked[manage]) {
                        if (PermissionType(selectedValue[manage]) > PermissionType(selectedValue[watch])) {
                            setPermissionError((prev) => ({ ...prev, [manage.split("-")[1]]: true }));
                            perrmissionCorrect = false;
                        }
                        if (selectedValue[create] === 'true') {
                            listPermission += selectedValue[manage] + "," + selectedValue[watch] + "," + permissionCreate[selectedValue[watch]] + ",";
                        } else {
                            listPermission += selectedValue[manage] + "," + selectedValue[watch] + ",";
                        }
                    }
                }
                if (!perrmissionCorrect) return;
                listPermission = listPermission
                    .split(",")
                    .filter(item => item && item !== "undefined")
                    .join(",");

                const isSamePermissions = JSON.stringify(listPermission.split(",").map(Number)) === JSON.stringify(prevPermission.split(",").map(Number));
                if (!isSamePermissions) {
                    await updatePermissionAccount(accountDetail.id, listPermission).then((response) => {
                        if (response.data.code === 1000) {
                            hasUpdate = true;
                        } else if (response.data.code > 1000) {
                            toast.error(response.data.message);
                            return;
                        }
                    });
                }
            }
        }
        if (hasUpdate) {
            setUpdate(prev => prev + 1);
            toast.success("Cập nhật thành công");
        }
        document.querySelector('#edit_account [data-bs-dismiss="modal"]').click();
    };

    return (
        <>
            <div class="modal fade" id="edit_account">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Sửa tài khoản</h4>
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
                                            <div class="col-md-8">
                                                <div class="mb-3">
                                                    <label class="form-label">Hồ sơ nhân sự</label>
                                                    <input type="email" class="form-control readonly-input" value={accountDetail && accountDetail.name} />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Tài khoản</label>
                                                    <input type="email" class="form-control  readonly-input" value={accountDetail && accountDetail.username} />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Phòng ban <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control  readonly-input" value={accountDetail && accountDetail.department} />
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="mb-3">
                                                    <label class="form-label">Email</label>
                                                    <input type="text" class="form-control readonly-input" value={accountDetail && accountDetail.email} />
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày sinh</label>
                                                    <input type="text" class="form-control readonly-input" value={accountDetail && accountDetail.dateOfBirth} />

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Điện thoại</label>
                                                    <input type="text" class="form-control readonly-input" value={accountDetail && accountDetail.phoneNumber} />

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Trạng thái <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control readonly-input" value={accountDetail && getStatus(accountDetail.status)} />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" checked={checkChangePass} style={{ width: "18.4px", height: "18.4px" }} onChange={() => setCheckChangePass(!checkChangePass)} />
                                                <span style={{ marginLeft: "20px" }}>Thay đổi mật khẩu</span>
                                            </div>
                                            <div className={`row permission-row  ${!checkChangePass ? "blurred" : ""}`}>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mật khẩu <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" name='password' onChange={onChangeInput} value={values.password || ""} />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Xác nhận lại mật khẩu <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" name='rePassword' onChange={onChangeInput} value={values.rePassword || ""} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm người dùng <span class="text-danger">
                                                        *</span></label>
                                                    <div className="select-wrapper-department">
                                                        <select className='select-crud' value={selectedRole} disabled style={{ backgroundColor: "#e9ecef" }}>
                                                            <option value={"admin"} >Quản trị hệ thống</option>
                                                            <option value={"default"}>Nhóm mặc định</option>
                                                            {listGroup && listGroup.map((item, index) => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} checked={checkChangePermission} onChange={() => setCheckChangePermission(!checkChangePermission)} />
                                                <span style={{ marginLeft: "20px" }}>Tùy chỉnh quyền</span>
                                            </div>
                                            <div class="col-md-12">
                                                <div className={`card permission-row  ${!checkChangePermission ? "blurred" : ""}`}>
                                                    <div className="card-body p-0">
                                                        <div className="custom-datatable-filter table-responsive">
                                                            <div className="table-container">
                                                                <table className="table table-permission" id='myTable'>
                                                                    <thead className="thead-light">
                                                                        <tr>
                                                                            <th>
                                                                            </th>
                                                                            <th>Đối tượng</th>
                                                                            <th>Quản lý</th>
                                                                            <th>Xem</th>
                                                                            <th>Tạo mới</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="form-check form-check-md">
                                                                                    <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_EMPLOYEE] || false}
                                                                                        onChange={() => handleCheckboxChange(MANAGE_EMPLOYEE)} />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>NHÂN SỰ</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr className={`permission-row ${!isChecked[MANAGE_EMPLOYEE] ? "blurred" : ""}`}>
                                                                            <td>
                                                                            </td>
                                                                            <td><span>Hồ sơ nhân sự</span></td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["employee"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[MANAGE_EMPLOYEE] || ""} onChange={(e) => handleChange(e, MANAGE_EMPLOYEE)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="1">Quản lý công ty</option>
                                                                                            <option value="2">Quản lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[MANAGE_EMPLOYEE] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(MANAGE_EMPLOYEE)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["employee"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[WATCH_EMPLOYEE] || ""} onChange={(e) => handleChange(e, WATCH_EMPLOYEE)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="3">Xem công ty</option>
                                                                                            <option value="4">Xem lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[WATCH_EMPLOYEE] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(WATCH_EMPLOYEE)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select id="roleSelect2" value={selectedValue[CREATE_EMPLOYEE] || ""} onChange={(e) => handleChange(e, CREATE_EMPLOYEE)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="true">Tạo mới</option>
                                                                                            <option value="false">Không tạo mới</option>
                                                                                        </select>
                                                                                        {selectedValue[CREATE_EMPLOYEE] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(CREATE_EMPLOYEE)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>


                                                                        <tr>
                                                                            <td>
                                                                                <div className="form-check form-check-md">
                                                                                    <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_PAYROLL] || false}
                                                                                        onChange={() => handleCheckboxChange(MANAGE_PAYROLL)} />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>BẢNG LƯƠNG</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr className={`permission-row ${!isChecked[MANAGE_PAYROLL] ? "blurred" : ""}`}>
                                                                            <td>
                                                                            </td>
                                                                            <td><span>Bảng lương</span></td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["payroll"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[MANAGE_PAYROLL] || ""} onChange={(e) => handleChange(e, MANAGE_PAYROLL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="7">Quản lý công ty</option>
                                                                                            <option value="8">Quản lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[MANAGE_PAYROLL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(MANAGE_PAYROLL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>

                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["payroll"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[WATCH_PAYROLL] || ""} onChange={(e) => handleChange(e, WATCH_PAYROLL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="9">Xem công ty</option>
                                                                                            <option value="10">Xem phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[WATCH_PAYROLL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(WATCH_PAYROLL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select id="roleSelect2" value={selectedValue[CREATE_PAYROLL] || ""} onChange={(e) => handleChange(e, CREATE_PAYROLL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="true">Tạo mới</option>
                                                                                            <option value="false">Không tạo mới</option>
                                                                                        </select>
                                                                                        {selectedValue[CREATE_PAYROLL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(CREATE_PAYROLL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div className="form-check form-check-md">
                                                                                    <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_TIMEKEEPING] || false}
                                                                                        onChange={() => handleCheckboxChange(MANAGE_TIMEKEEPING)} />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>CHẤM CÔNG</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr className={`permission-row ${!isChecked[MANAGE_TIMEKEEPING] ? "blurred" : ""}`}>
                                                                            <td>
                                                                            </td>
                                                                            <td><span>Chấm công</span></td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["timekeeping"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[MANAGE_TIMEKEEPING] || ""} onChange={(e) => handleChange(e, MANAGE_TIMEKEEPING)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="13">Quản lý công ty</option>
                                                                                            <option value="14">Quản lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[MANAGE_TIMEKEEPING] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(MANAGE_TIMEKEEPING)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["timekeeping"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[WATCH_TIMEKEEPING] || ""} onChange={(e) => handleChange(e, WATCH_TIMEKEEPING)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="15">Xem công ty</option>
                                                                                            <option value="16">Xem phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[WATCH_TIMEKEEPING] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(WATCH_TIMEKEEPING)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select id="roleSelect2" value={selectedValue[CREATE_TIMEKEEPING] || ""} onChange={(e) => handleChange(e, CREATE_TIMEKEEPING)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="true">Tạo mới</option>
                                                                                            <option value="false">Không tạo mới</option>
                                                                                        </select>
                                                                                        {selectedValue[CREATE_TIMEKEEPING] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(CREATE_TIMEKEEPING)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>



                                                                        <tr>
                                                                            <td>
                                                                                <div className="form-check form-check-md">
                                                                                    <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_APPROVAL] || false}
                                                                                        onChange={() => handleCheckboxChange(MANAGE_APPROVAL)} />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>ĐƠN TỪ</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr className={`permission-row ${!isChecked[MANAGE_APPROVAL] ? "blurred" : ""}`}>
                                                                            <td>
                                                                            </td>
                                                                            <td><span>Đơn từ</span></td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["approval"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[MANAGE_APPROVAL] || ""} onChange={(e) => handleChange(e, MANAGE_APPROVAL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="19">Quản lý công ty</option>
                                                                                            <option value="20">Quản lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[MANAGE_APPROVAL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(MANAGE_APPROVAL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["approval"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[WATCH_APPROVAL] || ""} onChange={(e) => handleChange(e, WATCH_APPROVAL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="21">Xem công ty</option>
                                                                                            <option value="22">Xem phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[WATCH_APPROVAL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(WATCH_APPROVAL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select id="roleSelect2" value={selectedValue[CREATE_APPROVAL] || ""} onChange={(e) => handleChange(e, CREATE_APPROVAL)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="true">Tạo mới</option>
                                                                                            <option value="false">Không tạo mới</option>
                                                                                        </select>
                                                                                        {selectedValue[CREATE_APPROVAL] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(CREATE_APPROVAL)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>


                                                                        <tr>
                                                                            <td>
                                                                                <div className="form-check form-check-md">
                                                                                    <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_ASSET] || false}
                                                                                        onChange={() => handleCheckboxChange(MANAGE_ASSET)} />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>TÀI SẢN</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr className={`permission-row ${!isChecked[MANAGE_ASSET] ? "blurred" : ""}`}>
                                                                            <td>
                                                                            </td>
                                                                            <td><span>Tài sản</span></td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["asset"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[MANAGE_ASSET] || ""} onChange={(e) => handleChange(e, MANAGE_ASSET)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="25">Quản lý công ty</option>
                                                                                            <option value="26">Quản lý phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[MANAGE_ASSET] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(MANAGE_ASSET)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select className={`${permissionError["asset"] ? "error-border" : ""}`} id="roleSelect2" value={selectedValue[WATCH_ASSET] || ""} onChange={(e) => handleChange(e, WATCH_ASSET)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="27">Xem công ty</option>
                                                                                            <option value="28">Xem phòng ban</option>
                                                                                        </select>
                                                                                        {selectedValue[WATCH_ASSET] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(WATCH_ASSET)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="selected-container">
                                                                                    <div className="select-wrapper">
                                                                                        <select id="roleSelect2" value={selectedValue[CREATE_ASSET] || ""} onChange={(e) => handleChange(e, CREATE_ASSET)}>
                                                                                            <option value="" hidden>Chọn quyền</option>
                                                                                            <option value="true">Tạo mới</option>
                                                                                            <option value="false">Không tạo mới</option>
                                                                                        </select>
                                                                                        {selectedValue[CREATE_ASSET] && (
                                                                                            <div className="x-selected" onClick={() => handleClear(CREATE_ASSET)}>
                                                                                                <i className="ti ti-x"></i>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={handleSubmitClick}>CẬP NHẬT</div>
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

export default AccountEditComponent;

