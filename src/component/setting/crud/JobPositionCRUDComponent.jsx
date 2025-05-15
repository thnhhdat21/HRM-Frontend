import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { getListDuty } from '../../../service/DutyService';
import { responseData, responseUpdate } from '../../../util/ResponseUtil';
import { getListRole } from '../../../service/RoleService';
import { createJobPosition, getJobPositionDetail, updateJobPosition } from '../../../service/Manage/ManageJobPositionService';
import { toast } from 'react-toastify';
import { getListJobPosition } from '../../../service/JobPositionService';


const JobPositionCRUDComponent = ({ selectedId, typeOpen, setListJobPostion }) => {
    const modalIdEdit = "crud_job_position-edit";
    const modalIdCreate = "crud_job_position-create";
    const [listDuty, setListDuty] = useState({})
    const [listRole, setListRole] = useState({})
    const [values, setValues] = useState({
        name: "",
        salaryFrom: "",
        salaryTo: "",
        des: "",
        dutyId: "",
        roleId: "",
    })

    useEffect(() => {
        if (typeOpen.at(-1) === modalIdCreate) {
            setValues({
                name: "",
                salaryFrom: "",
                salaryTo: "",
                des: "",
                dutyId: "",
                roleId: "",
            })
        } else if (typeOpen.at(-1) === modalIdEdit) {
            getJobPositionDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const jobDetail = response.data.data
                    setValues({
                        name: jobDetail.name,
                        salaryFrom: jobDetail.salaryFrom,
                        salaryTo: jobDetail.salaryTo,
                        des: jobDetail.des,
                        dutyId: jobDetail.dutyId,
                        roleId: jobDetail.roleId,
                    })
                }
            })
        }
    }, [typeOpen])


    useState(() => {
        getListDuty().then((response) => {
            responseData(response, setListDuty)
        })

        getListRole().then((response) => {
            responseData(response, setListRole)
        })
    }, [])



    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClear = (e) => {
        setValues({ ...values, [e.currentTarget.dataset.name]: "" });
    };

    const handleCreateJobPosition = () => {
        var isCorrect = true;
        isCorrect = checkValidator(isCorrect, values.name, values.salaryFrom, values.salaryTo, values.dutyId, values.roleId);
        if (isCorrect) {
            createJobPosition(values.name, values.dutyId, values.roleId, values.salaryFrom, values.salaryTo, values.des).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListJobPostion, getListJobPosition)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_job_position [data-bs-dismiss="modal"]').click();
                }
            })

        }
    }
    const hanldeUpdateJobPosition = () => {
        var isCorrect = true;
        isCorrect = checkValidator(isCorrect, values.name, values.salaryFrom, values.salaryTo, values.dutyId, values.roleId);
        if (isCorrect) {
            updateJobPosition(selectedId, values.name, values.dutyId, values.roleId, values.salaryFrom, values.salaryTo, values.des).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListJobPostion, getListJobPosition)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_job_position [data-bs-dismiss="modal"]').click();
                }
            })

        }
    }


    const checkValidator = (isCorrect, name, salaryFrom, salaryTo, dutyId, roleId) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            isCorrect = false;
        }
        else if (Number(dutyId) === 0) {
            toast.error("Vui lòng chọn chức vụ tương ứng")
            isCorrect = false;
        }
        else if (Number(roleId) === 0) {
            toast.error("Vui lòng chọn quyền")
            isCorrect = false;
        }
        else if (Number(salaryFrom) < 0 || Number(salaryTo) < 0) {
            toast.error("Vui lòng nhập mức lương")
            isCorrect = false
        }
        else if (Number(salaryTo) < 0 || Number(salaryFrom) >= Number(salaryTo)) {
            toast.error("Mức lương nhập không hợp lệ")
            isCorrect = false
        }
        return isCorrect
    }

    return (
        <>
            <div class="modal fade" id="crud_job_position">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới vị trí công việc</h4>
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
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên vị trí</label>
                                                    <input type="text" class="form-control" name='name' value={values.name || ""} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Chức vụ tương ứng</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.dutyId} name='dutyId' onChange={handleChange}>
                                                            <option value={""} hidden>Chọn Chức vụ</option>
                                                            {
                                                                listDuty.length > 0 && listDuty.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {values.dutyId && (
                                                            <div className="x-selected" data-name="dutyId" onClick={handleClear}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm quyền</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.roleId} name='roleId' onChange={handleChange}>
                                                            <option value={""} hidden>Chọn nhóm quyền</option>
                                                            {
                                                                listRole.length > 0 && listRole.map((item, index) => (
                                                                    <option value={item.id}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {values.roleId && (
                                                            <div className="x-selected" data-name="roleId" onClick={handleClear}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="form-label">Mức lương</label>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <input type="number" class="form-control" name='salaryFrom' value={values.salaryFrom || ""} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <input type="number" class="form-control" name='salaryTo' value={values.salaryTo || ""} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">mô tả </label>
                                                    <textarea type="text" class="form-control" name='des' value={values.des || ""} onChange={handleChange} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === modalIdCreate ? handleCreateJobPosition : hanldeUpdateJobPosition}>{typeOpen.at(-1) === modalIdCreate ? "THÊM MỚI" : "CẬP NHẬT"} </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

export default JobPositionCRUDComponent;

