import React, { useEffect, useState } from 'react';
import { getWorkProfile } from '../../../service/ContractService';
import { getListDepartmentChild } from '../../../service/DepartmentService';
import { getListJobPosition } from '../../../service/JobPositionService';
import { responseData } from '../../../util/ResponseUtil';
import { getDecision, updateTransferAndAppoint } from '../../../service/DecisionService';
import { toast } from 'react-toastify';
import { compareDates } from '../../../util/TimeUtil';
import { DECISION_TYPE_TRANSFER } from '../../../util/DecisionUtil';

const TranferAndAppointmentDecisionComponent = ({ decisionId, typeOpen, type, listEmployeeSelect, updateDecision }) => {
    const createModal = "create_tranfer_appointment_decision-create";
    const editModal = "create_tranfer_appointment_decision-edit";
    const [listDepartment, setListDepartment] = useState([])
    const [listJobposition, setLisJobPosition] = useState([])
    const [isFirst, setIsFirst] = useState(false)
    const [values, setValues] = useState({
        decisionId: "",
        code: "",
        employeeId: "",
        reason: "",
        date: "",
        departmentNewId: "",
        jobPositionNewId: "",
        type: type
    })

    const [infoOld, setInfoOld] = useState({
        departmentNewOld: "",
        jobPositionNewOld: "",
    })

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                decisionId: "",
                code: "",
                employeeId: "",
                reason: "",
                date: "",
                departmentNewId: "",
                jobPositionNewId: "",
                type: type
            })
        } else if (typeOpen.at(-1) === editModal) {
            getDecision(decisionId).then((response) => {
                if (response.data.code === 1000) {
                    const decision = response.data.data;
                    setValues({
                        decisionId: decision.decisionId,
                        code: decision.code,
                        employeeId: decision.employeeId,
                        date: decision.date,
                        reason: decision.reason,
                        departmentNewId: decision.departmentNewId,
                        jobPositionNewId: decision.jobPositionNewId,
                        type: type
                    })
                    setInfoOld({
                        departmentNewOld: listDepartment.find(item => item.id === decision.departmentOldId),
                        jobPositionNewOld: listJobposition.find(item => item.id === decision.jobPositionNewOld),
                    })
                }
            })
        }

        if (!isFirst) {
            setIsFirst(true)
            getListDepartmentChild().then((response) => {
                responseData(response, setListDepartment)
            })

            getListJobPosition().then((response) => {
                responseData(response, setLisJobPosition)
            })
        }
    }, [typeOpen])

    useEffect(() => {
        if (values.employeeId) {
            getWorkProfile(values.employeeId).then((response) => {
                if (response.data.code === 1000) {
                    const profile = response.data.data
                    setInfoOld({
                        departmentNewOld: profile.department,
                        jobPositionNewOld: profile.jobPosition,
                    })
                }
            })
        }
    }, [values.employeeId])


    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClearGenerate = (name) => {
        setValues({ ...values, [name]: '' })

    }
    const checkValidator = (value) => {
        if (value.code === "") {
            toast.error("Yêu cầu nhập số quyết định!")
            return false;
        }
        else if (value.date === "") {
            toast.error("Yêu cầu chọn ngày!")
            return false;
        } else if (compareDates(value.date, new Date().toISOString().split('T')[0]) === -1) {
            toast.error("Ngày chọn không hợp lệ!")
            return false;
        } else if (value.employeeId === "") {
            toast.error("Yêu cầu chọn nhân sự!")
            return false;
        } else if (value.reason === "") {
            toast.error("Yêu cầu nhập lý do!")
            return false;
        } else if (value.departmentNewId === "") {
            toast.error("Yêu cầu chọn phòng ban!")
            return false;
        } else if (value.jobPositionNewId === "") {
            toast.error("Yêu cầu chọn vị trí!")
            return false;
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = checkValidator(values)
        if (isCorrect) {
            updateTransferAndAppoint(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm quyết định thành công")
                    if (updateDecision !== null)
                        updateDecision()
                    document.querySelector('#create_tranfer_appointment_decision [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }



    return (
        <>
            <div class="modal fade" id="create_tranfer_appointment_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg  modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2"> {type === DECISION_TYPE_TRANSFER ? "Quyết định điều chuyển phòng ban" : "Quyết định bổ nhiệm"} </h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row ">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Số quyết định </label>
                                        <input type="email" class="form-control" placeholder='Số quyết định' name='code' value={values.code} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày quyết định </label>
                                        <input type="date" class="form-control" name='date' value={values.date} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">Nhân viên </label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.employeeId)} name='employeeId' onChange={onChangeInput}>
                                                <option value={""} hidden>Chọn nhân sự</option>
                                                {
                                                    listEmployeeSelect.length > 0 && listEmployeeSelect.map((item, index) => (
                                                        <option key={index} value={item.employeeId} >{item.employeeName}</option>
                                                    ))
                                                }
                                            </select>
                                            {values.employeeId && (
                                                <div className="x-selected" onClick={() => handleClearGenerate("employeeId")}>
                                                    <i className="ti ti-x"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">{type === DECISION_TYPE_TRANSFER ? "Lý do điều chuyển" : "Lý do bổ nhiệm"} </label>
                                        <input type="email" class="form-control" placeholder='Lý do điều chuyển' value={values.reason} name='reason' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-4">
                                        <label class="form-label">Phòng ban cũ </label>
                                        <input type="text" class="form-control readonly-input" value={infoOld.departmentNewOld} placeholder='Phòng ban cũ' onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Vị trí cũ </label>
                                        <input type="text" class="form-control readonly-input" value={infoOld.jobPositionNewOld} placeholder='Vị trí cũ' onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Phòng ban mới </label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.departmentNewId)} name='departmentNewId' onChange={onChangeInput}>
                                                <option value={""} hidden>Chọn phòng ban mới</option>
                                                {
                                                    listDepartment.length > 0 && listDepartment.map((item, index) => (
                                                        <option key={index} value={item.id} >{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                            {values.departmentNewId && (
                                                <div className="x-selected" onClick={() => handleClearGenerate("departmentNewId")}>
                                                    <i className="ti ti-x"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Vị trí mới </label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.jobPositionNewId)} name='jobPositionNewId' onChange={onChangeInput}>
                                                <option value={""} hidden>Chọn vị trí mới</option>
                                                {
                                                    listJobposition.length > 0 && listJobposition.map((item, index) => (
                                                        <option key={index} value={item.id} >{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                            {values.jobPositionNewId && (
                                                <div className="x-selected" onClick={() => handleClearGenerate("jobPositionNewId")}>
                                                    <i className="ti ti-x"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" class="btn btn-primary" onClick={handleClickUpdate}>CẬP NHẬT </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TranferAndAppointmentDecisionComponent;

