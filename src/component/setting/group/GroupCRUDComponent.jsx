import { useState } from 'react';
import { createRole } from '../../../service/Manage/ManageRoleService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { checkPermission, checkPermissionIsEmpty, clearPermissionError, CREATE_CONTRACT, CREATE_DECISION, CREATE_EMPLOYEE, DECISION, EMPLOYEE, LETTER, MANAGE_CONTRACT, MANAGE_DECISION, MANAGE_EMPLOYEE, MANAGE_LETTER, MANAGE_TIMESHEET, REPORT, SALARY, TIMESHEET, WATCH_CONTRACT, WATCH_DECISION, WATCH_EMPLOYEE, WATCH_INSURANCE, WATCH_LETTER, WATCH_REPORT, WATCH_SALARY, WATCH_TIMESHEET } from '../../../util/PermissionUtil';
import { useNavigate } from 'react-router-dom';

const GroupCRUDComponent = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Tạo mới nhóm người dùng", subTitle: "" }))
    const [selectedRole, setSelectedRole] = useState(null);
    const [isCheckedPer, setIsCheckedPer] = useState({});
    const [values, setValues] = useState({
        name: "",
        code: "",
        desc: ""
    })

    const navigate = useNavigate()

    const [permissions, setPermission] = useState({})
    const [permissionsError, setPermissionError] = useState({})

    const handleChangeRole = (event) => {
        setSelectedRole((prev) => (prev === event.target.value ? null : event.target.value));
    };

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangePermission = (e) => {
        clearPermissionError(e.target.name, onChangePermissionError)
        setPermission({ ...permissions, [e.target.name]: Number(e.target.value) })
    }

    const onChangePermissionError = (per, isError) => {
        setPermissionError(prev => ({ ...prev, [per]: isError }))
    }

    const handleClearPermission = (permission) => {
        setPermission({ ...permissions, [permission]: "" })
    }

    const handleCheckboxChange = (key) => {
        setIsCheckedPer((prev) => ({ ...prev, [key]: !prev[key] }))
    };

    const checkValidator = (values) => {
        if (values.name === "" || values.name.trim() === "") {
            toast.error("Yêu cầu nhập tên nhóm!")
            return false;
        } else if (values.code === "" || values.code.trim() === "") {
            toast.error("Yêu cầu nhập mã nhóm!")
            return false;
        } else if (selectedRole === null) {
            toast.error("Yêu cầu chọn quyền!")
            return false;
        }
        return true;
    }

    const handleClickCreate = (e) => {
        e.preventDefault()
        const isCorrectValues = checkValidator(values)
        if (!isCorrectValues) {
            return;
        }
        var isCorrectPermission = true;
        var permission;
        if (selectedRole === "custom") {
            const allValues = new Set(Object.values(permissions));
            const isEmpty = checkPermissionIsEmpty(allValues)
            if (isEmpty) {
                toast.error("Quyền không hợp lệ")
                return;
            }
            isCorrectPermission = checkPermission(permissions, onChangePermissionError, isCheckedPer)
            permission = Array.from(allValues).filter((item) => item !== 99).join(',');
        } else {
            permission = selectedRole
        }

        if (isCorrectPermission) {
            createRole(values.name, values.code, values.desc, permission).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm nhóm người dùng thành công!")
                    return navigate("/settings/group")
                } else if (response.data.code > 1000) {
                    toast.error(response.data.message)
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
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
                        <span> Nhóm quản trị hệ thống</span>
                    </div>

                    <div className='checkbox-permisstion'>
                        <input className="form-check-input" checked={selectedRole === "default"} type="checkbox" value={"default"} onChange={(e) => handleChangeRole(e)} style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Nhóm mặc định</span>
                    </div>

                    <div className='checkbox-permisstion'>
                        <input className="form-check-input" checked={selectedRole === "custom"} type="checkbox" value={"custom"} onChange={(e) => handleChangeRole(e)} style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Tùy chỉnh</span>
                    </div>

                    <div className="card">
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                <div className={`table-container ${selectedRole === "custom" ? "" : "blurred"} `}>
                                    <table className="table table-permission " id='myTable'>
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
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[EMPLOYEE]}
                                                            onChange={() => handleCheckboxChange(EMPLOYEE)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>NHÂN SỰ</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[EMPLOYEE] ? "blurred" : ""}`}>
                                                <td ></td>
                                                <td >Hồ sơ nhân sự</td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[MANAGE_EMPLOYEE] ? "error-border" : ""}`} value={permissions[MANAGE_EMPLOYEE]} name={MANAGE_EMPLOYEE} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="1">Quản lý</option>
                                                                <option value="99">Không quản lý</option>
                                                            </select>
                                                            {
                                                                permissions[MANAGE_EMPLOYEE] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(MANAGE_EMPLOYEE)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[WATCH_EMPLOYEE] ? "error-border" : ""}`} value={permissions[WATCH_EMPLOYEE]} name={WATCH_EMPLOYEE} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="3">Xem công ty</option>
                                                                <option value="4">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_EMPLOYEE] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_EMPLOYEE)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[CREATE_EMPLOYEE] ? "error-border" : ""}`} value={permissions[CREATE_EMPLOYEE]} name={CREATE_EMPLOYEE} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="3">Tạo mới</option>
                                                                <option value="99">Không tạo mới</option>
                                                            </select>
                                                            {
                                                                permissions[CREATE_EMPLOYEE] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(CREATE_EMPLOYEE)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[EMPLOYEE] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Hợp đồng</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[MANAGE_CONTRACT] ? "error-border" : ""}`} value={permissions[MANAGE_CONTRACT]} name={MANAGE_CONTRACT} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="8">Quản lý</option>
                                                                <option value="99">Không quản lý</option>
                                                            </select>
                                                            {
                                                                permissions[MANAGE_CONTRACT] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(MANAGE_CONTRACT)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[WATCH_CONTRACT] ? "error-border" : ""}`} value={permissions[WATCH_CONTRACT]} name={WATCH_CONTRACT} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="9">Xem công ty</option>
                                                                <option value="10">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_CONTRACT] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_CONTRACT)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[CREATE_CONTRACT] ? "error-border" : ""}`} value={permissions[CREATE_CONTRACT]} name={CREATE_CONTRACT} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="12">Tạo mới</option>
                                                                <option value="99">Không tạo mới</option>
                                                            </select>
                                                            {
                                                                permissions[CREATE_CONTRACT] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(CREATE_CONTRACT)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[EMPLOYEE] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Bảo hiểm</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select disabled></select>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select value={permissions[WATCH_INSURANCE]} name={WATCH_INSURANCE} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="21">Xem công ty</option>
                                                                <option value="22">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_INSURANCE] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_INSURANCE)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="form-check form-check-md">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[DECISION]}
                                                            onChange={() => handleCheckboxChange(DECISION)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>QUYẾT ĐỊNH</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[DECISION] ? "blurred" : ""}`}>

                                                <td></td>
                                                <td><span>Quyết định</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[MANAGE_DECISION] ? "error-border" : ""}`} value={permissions[MANAGE_DECISION]} name={MANAGE_DECISION} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="13">Quản lý</option>
                                                                <option value="99">Không quản lý</option>
                                                            </select>
                                                            {
                                                                permissions[MANAGE_DECISION] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(MANAGE_DECISION)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[WATCH_DECISION] ? "error-border" : ""}`} value={permissions[WATCH_DECISION]} name={WATCH_DECISION} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="14">Xem công ty</option>
                                                                <option value="15">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_DECISION] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_DECISION)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[CREATE_DECISION] ? "error-border" : ""}`} value={permissions[CREATE_DECISION]} name={CREATE_DECISION} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="17">Tạo mới</option>
                                                                <option value="99">Không tạo mới</option>
                                                            </select>
                                                            {
                                                                permissions[CREATE_DECISION] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(CREATE_DECISION)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="form-check form-check-md">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[LETTER]}
                                                            onChange={() => handleCheckboxChange(LETTER)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>ĐƠN TỪ</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[LETTER] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Đơn từ</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[MANAGE_LETTER] ? "error-border" : ""}`} value={permissions[MANAGE_LETTER]} name={MANAGE_LETTER} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="25">Quản lý công ty</option>
                                                                <option value="26">Quản lý phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[MANAGE_LETTER] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(MANAGE_LETTER)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[WATCH_LETTER] ? "error-border" : ""}`} value={permissions[WATCH_LETTER]} name={WATCH_LETTER} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="28">Xem công ty</option>
                                                                <option value="29">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_LETTER] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_LETTER)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select disabled></select>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="form-check form-check-md">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[TIMESHEET]}
                                                            onChange={() => handleCheckboxChange(TIMESHEET)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>CHẤM CÔNG</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[TIMESHEET] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Chấm công</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[MANAGE_TIMESHEET] ? "error-border" : ""}`} value={permissions[MANAGE_TIMESHEET]} name={MANAGE_TIMESHEET} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="18">Quản lý</option>
                                                                <option value="99">Không quản lý</option>
                                                            </select>
                                                            {
                                                                permissions[MANAGE_TIMESHEET] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(MANAGE_TIMESHEET)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select className={`${permissionsError[WATCH_TIMESHEET] ? "error-border" : ""}`} value={permissions[WATCH_TIMESHEET]} name={WATCH_TIMESHEET} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="19">Xem công ty</option>
                                                                <option value="20">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_TIMESHEET] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_TIMESHEET)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="form-check form-check-md">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[SALARY]}
                                                            onChange={() => handleCheckboxChange(SALARY)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>BẢNG LƯƠNG</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[SALARY] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Bảng lương</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select value={permissions[WATCH_SALARY]} name={WATCH_SALARY} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="23">Xem công ty</option>
                                                                <option value="24">Xem phòng ban</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_SALARY] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_SALARY)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>



                                            <tr>
                                                <td>
                                                    <div className="form-check form-check-md">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckedPer[REPORT]}
                                                            onChange={() => handleCheckboxChange(REPORT)} />
                                                    </div>
                                                </td>
                                                <td colSpan={4}><span className='tittle'>BÁO CÁO - THỐNG KÊ</span></td>
                                            </tr>
                                            <tr className={`permission-row ${!isCheckedPer[REPORT] ? "blurred" : ""}`}>
                                                <td></td>
                                                <td><span>Bảng lương</span></td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="select-wrapper">
                                                            <select value={permissions[WATCH_REPORT] || ""} name={WATCH_REPORT} onChange={onChangePermission}>
                                                                <option value="" hidden>Chọn quyền</option>
                                                                <option value="32">Xem báo cáo</option>
                                                            </select>
                                                            {
                                                                permissions[WATCH_REPORT] &&
                                                                <div className="x-selected" onClick={() => handleClearPermission(WATCH_REPORT)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="selected-container">
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select disabled></select>
                                                            </div>
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
                        <button type="submit" className="btn btn-primary" onClick={handleClickCreate}>CẬP NHẬT</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupCRUDComponent;

