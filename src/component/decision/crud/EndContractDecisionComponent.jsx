import React, { useEffect, useState } from 'react';
import { getDecision, updateTerminationDecision } from '../../../service/DecisionService';
import { toast } from 'react-toastify';
import { compareDates } from '../../../util/TimeUtil';

const EndContractDecisionComponent = ({ decisionId, typeOpen, listEmployeeSelect, updateDecision }) => {
    const createModal = "create_terminate_decision-create";
    const editModal = "create_terminate_decision-edit";
    const [values, setValues] = useState({
        decisionId: "",
        code: "",
        date: "",
        employeeId: "",
        reason: "",
    })

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                decisionId: "",
                code: "",
                date: "",
                employeeId: "",
                reason: "",
            })
        } else if (typeOpen.at(-1) === editModal) {
            getDecision(decisionId).then((response) => {
                if (response.data.code === 1000) {
                    const decision = response.data.data;
                    setValues({
                        decisionId: decision.id,
                        code: decision.code,
                        date: decision.date,
                        employeeId: decision.employeeId,
                        reason: decision.reason
                    })
                }
            })
        }
    }, [typeOpen])

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
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = checkValidator(values)
        if (isCorrect) {
            updateTerminationDecision(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm quyết định thành công")
                    if (updateDecision !== null)
                        updateDecision()
                    document.querySelector('#create_terminate_decision [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }


    return (
        <>
            <div className="modal fade" id="create_terminate_decision">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Quyết định chấm dứt hợp đồng</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body overflow-modal-crud">
                            <div className="row ">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Số quyết định </label>
                                        <input type="text" className="form-control" placeholder='Số quyết định' name='code' value={values.code} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Ngày quyết định </label>
                                        <input type="date" className="form-control" name='date' value={values.date} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Nhân viên chấm dứt hợp đồng </label>
                                        <div className="select-wrapper-department">
                                            <select className="select-crud" value={Number(values.employeeId)} name='employeeId' onChange={onChangeInput}>
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

                            <div className="row mt-2">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Lý do chấm dứt hợp đồng lao động</label>
                                        <input type="email" className="form-control" placeholder='Lý do chấm dứt hợp đồng lao động' name='reason' value={values.reason} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" className="btn btn-primary" onClick={handleClickUpdate}>CẬP NHẬT </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EndContractDecisionComponent;

