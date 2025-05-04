import React, { useEffect, useState } from 'react';
import { getListAllownace } from '../../../service/AllowanceService';
import { responseData } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { getWorkProfile } from '../../../service/ContractService';
import { compareDates } from '../../../util/TimeUtil';
import { v4 as uuidv4 } from 'uuid';
import { getDecision, updateSalaryAppoint } from '../../../service/DecisionService';

const SalaryDecisionComponent = ({ decisionId, typeOpen, type, listEmployeeSelect, updateDecision }) => {
    const createModal = "create_salary_decision-create";
    const editModal = "create_salary_decision-edit";
    const [listAllowance, setListAllowance] = useState([])
    const [isFirst, setIsFirst] = useState(false)
    const [allowances, setAllowances] = useState({})
    const [salaryOld, setSalaryOld] = useState(0)
    const [values, setValues] = useState({
        decisionId: "",
        code: "",
        dateDecision: "",
        employeeId: "",
        reason: "",
        dateActive: "",
        amountNew: ""
    })

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                decisionId: "",
                code: "",
                dateDecision: "",
                employeeId: "",
                reason: "",
                dateActive: "",
                amountNew: ""
            })
            setAllowances([])
        } else if (typeOpen.at(-1) === editModal) {
            getDecision(decisionId).then((response) => {
                if (response.data.code === 1000) {
                    const decision = response.data.data;
                    setValues({
                        decisionId: decision.decisionId,
                        code: decision.code,
                        dateDecision: decision.dateDecision,
                        employeeId: decision.employeeId,
                        reason: decision.reason,
                        dateActive: decision.dateActive,
                        amountNew: decision.amountNew
                    })
                    setSalaryOld(decision.amountOld)
                    setAllowances(decision.allowances)
                }
            })
        }

        if (!isFirst) {
            setIsFirst(true)
            getListAllownace().then((response) => {
                responseData(response, setListAllowance)
            })
        }
    }, [typeOpen])

    useEffect(() => {
        if (values.employeeId) {
            getWorkProfile(values.employeeId).then((response) => {
                if (response.data.code === 1000) {
                    const profile = response.data.data
                    setSalaryOld(profile.salaryGross)
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

    const addRow = () => {
        setAllowances([...allowances, { id: uuidv4(), allowanceId: "", amount: "", unit: "", isUpdate: 'update' }]);
    };

    const removeRow = (index, id) => {
        if (typeof id === 'number' && !isNaN(id)) {
            setAllowances(prevRows =>
                prevRows.map((allowance, i) =>
                    i === index ? { ...allowance, ["isUpdate"]: "delete" } : allowance
                )
            );
        } else {
            setAllowances(allowances.filter(allowance => allowance.id !== id));
        }
    };

    const onChangeInputAllowance = (index, event) => {
        const id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const amount = selectedOption.getAttribute("data-amount");
        const unit = selectedOption.getAttribute("data-unit");

        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: id, ["amount"]: amount, ["unit"]: unit, ["isUpdate"]: 'update' } : row
            )
        );
    };

    const handleClearAllowance = (index) => {
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: '', ["amount"]: '', ["unit"]: '' } : row
            )
        );
    };

    const onChangeInputAmountAndUnit = (index, event) => {
        const { name, value } = event.target;
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value, ["isUpdate"]: 'update' } : row
            )
        );
    };

    const checkValidator = (value) => {
        if (value.code === "") {
            toast.error("Yêu cầu nhập số quyết định!")
            return false;
        }
        else if (value.dateDecision === "") {
            toast.error("Yêu cầu chọn ngày!")
            return false;
        } else if (compareDates(value.dateDecision, new Date().toISOString().split('T')[0]) === -1) {
            toast.error("Ngày chọn không hợp lệ!")
            return false;
        } else if (value.employeeId === "") {
            toast.error("Yêu cầu chọn nhân sự!")
            return false;
        } else if (value.reason === "") {
            toast.error("Yêu cầu nhập lý do!")
            return false;
        } else if (value.dateActive === "") {
            toast.error("Yêu cầu chọn ngày!")
            return false;
        } else if (compareDates(value.dateActive, new Date().toISOString().split('T')[0]) === -1) {
            toast.error("Ngày chọn không hợp lệ!")
            return false;
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = checkValidator(values)

        if (isCorrect) {
            updateSalaryAppoint(values, allowances).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm quyết định thành công")
                    if (updateDecision !== null)
                        updateDecision()
                    document.querySelector('#create_salary_decision [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    return (
        <>
            <div class="modal fade" id="create_salary_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Quyết định tăng lương</h4>
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
                                        <input type="text" class="form-control" placeholder='Số quyết định' name='code' value={values.code} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày quyết định </label>
                                        <input type="date" class="form-control" name='dateDecision' value={values.dateDecision} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
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
                                        <label class="form-label">Lý do</label>
                                        <input type="email" class="form-control" placeholder='Lý do điều chỉnh lương' name='reason' value={values.reason} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Từ ngày </label>
                                        <input type="date" class="form-control " name='dateActive' value={values.dateActive} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tiền lương cũ </label>
                                        <input type="text" class="form-control readonly-input" value={salaryOld} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tiền lương mới </label>
                                        <input type="text" class="form-control " placeholder='Tiền lương mới' name='amountNew' value={values.amountNew} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className='row' style={{ marginLeft: "15px" }}>
                                <div class="col-md-10">
                                    <div class="mb-3">
                                        <table class="table borderless table-create-profile">
                                            <tbody>
                                                <tr>
                                                    <th style={{ width: "50%" }}>Phụ cấp</th>
                                                    <th style={{ width: "30%" }}>Số tiền</th>
                                                    <th style={{ width: "30%" }}>Đơn vị</th>
                                                    <th ></th>
                                                </tr>
                                                {
                                                    allowances.length > 0 && allowances.filter((item) => item.isUpdate != "delete").map((item, index) => (
                                                        <tr>
                                                            <td>
                                                                <div className="select-wrapper-department">
                                                                    <select class="select-crud" value={item.allowanceId} name='allowanceId' onChange={(e) => { onChangeInputAllowance(index, e) }}>
                                                                        <option value={""} hidden>Chọn phụ cấp</option>
                                                                        {
                                                                            listAllowance.length > 0 && listAllowance.map((item, index) => (
                                                                                <option key={index} value={item.id} data-amount={item.amount} data-unit={item.unit}>{item.name}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                    {item.allowanceId && (
                                                                        <div className="x-selected" onClick={() => handleClearAllowance(index)}>
                                                                            <i className="ti ti-x"></i>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td><input type="text" className="form-control" name='amount' value={item.amount || ""} onChange={(e) => onChangeInputAmountAndUnit(index, e)} /></td>
                                                            <td>
                                                                <select class="select-crud" value={item.unit || ""} name='unit' onChange={(e) => onChangeInputAmountAndUnit(index, e)}>
                                                                    <option value={""} hidden>Đơn vị</option>
                                                                    <option value={"Ngày"} >Ngày</option>
                                                                    <option value={"Tháng"} >Tháng</option>
                                                                    <option value={"Năm"} >Năm</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(index, item.id)}>
                                                                    <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-start">
                                    <div class="mb-2 circle" style={{ cursor: "pointer" }}>
                                        <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRow} />
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

export default SalaryDecisionComponent;

