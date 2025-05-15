import React, { useState } from 'react';
import '../css/crud-style.css';
import {
    MANAGE_EMPLOYEE, WATCH_EMPLOYEE, CREATE_EMPLOYEE,
    MANAGE_PAYROLL, WATCH_PAYROLL, CREATE_PAYROLL,
    MANAGE_TIMEKEEPING, WATCH_TIMEKEEPING, CREATE_TIMEKEEPING,
    MANAGE_APPROVAL, WATCH_APPROVAL, CREATE_APPROVAL,
    MANAGE_ASSET, WATCH_ASSET, CREATE_ASSET,
    PermissionType,
    permissions,
    permissionCreate
} from '../../../util/PermissionUtil';
import { createRole } from '../../../service/RoleService';
import { toast } from 'react-toastify';


const GroupCRUDComponent = () => {
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedRole, setSelectedRole] = useState({});
    const [isChecked, setIsChecked] = useState({});
    const [permissionError, setPermissionError] = useState({});

    const [values, setValues] = useState({
        name: "",
        code: "",
        desc: ""
    })

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (key) => {
        setSelectedRole(null)
        setIsChecked((prev) => ({ ...prev, [key]: !prev[key] }))
    };

    const handleChange = (event, key) => {
        setSelectedValue((prev) => ({ ...prev, [key]: event.target.value }));
        setPermissionError((prev) => ({ ...prev, [key.split("-")[1]]: false }))
    };

    const handleChangeRole = (event) => {
        setIsChecked((prev) =>
            Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
        );
        setSelectedRole((prev) => (prev === event.target.value ? null : event.target.value));
    };

    const handleClear = (permission) => {
        setPermissionError((prev) => ({ ...prev, [permission.split("-")[1]]: false }))
        setSelectedValue((prev) => {
            const newValues = { ...prev };
            delete newValues[permission];
            return newValues;
        });
    };

    const handleSubmitCreateGroup = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        var listPermission = ""
        if (Object.values(isChecked).some(value => value === true)) {
            var perrmissionCorrect = true;
            for (const [manage, watch, create] of permissions) {
                if (isChecked[manage]) {
                    if (PermissionType(selectedValue[manage]) > PermissionType(selectedValue[watch])) {
                        setPermissionError((prev) => ({ ...prev, [manage.split("-")[1]]: true }))
                        perrmissionCorrect = false
                    }
                    if (selectedValue[create] === 'true') {
                        listPermission += selectedValue[manage] + "," + selectedValue[watch] + "," + permissionCreate[selectedValue[watch]] + ","
                    } else {
                        listPermission += selectedValue[manage] + "," + selectedValue[watch] + ","
                    }
                }
            }
            if (!perrmissionCorrect) {
                return
            }
            listPermission = listPermission
                .split(",")
                .filter(item => item && item !== "undefined")
                .join(",");
        }
        createRole(values.name, values.code, values.desc, listPermission === "" ? selectedRole : listPermission)
            .then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Tạo nhóm mới thành công")

                } else {
                    toast.error(response.data.message)
                }
            })
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div className="my-auto mb-2">
                            <h2 className="mb-1">Tạo mới nhóm</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Tên nhóm<span className="text-danger">
                                    *</span></label>
                                <input type="email" className="form-control" name='name' onChange={onChangeInput} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Mã nhóm<span className="text-danger">
                                    *</span></label>
                                <input type="email" className="form-control" name='code' onChange={onChangeInput} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <input type="email" className="form-control" name='desc' onChange={onChangeInput} />
                            </div>
                        </div>
                    </div>
                    <div className='checkbox-permisstion'>
                        <input className="form-check-input" checked={selectedRole === "admin"} type="checkbox" value={"admin"} onChange={(e) => handleChangeRole(e)} style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Cho phép quản trị hệ thống</span>
                    </div>

                    <div className='checkbox-permisstion'>
                        <input className="form-check-input" checked={selectedRole === "default"} type="checkbox" value={"default"} onChange={(e) => handleChangeRole(e)} style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Nhóm mặc định</span>
                    </div>


                    <div className="card">
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
                                                        <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_EMPLOYEE]}
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
                                                        <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_PAYROLL]}
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
                                                        <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_TIMEKEEPING]}
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
                                                        <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_APPROVAL]}
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
                                                        <input className="form-check-input" type="checkbox" checked={isChecked[MANAGE_ASSET]}
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" className="btn btn-primary" onClick={() => handleSubmitCreateGroup()}>CẬP NHẬT</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupCRUDComponent;

