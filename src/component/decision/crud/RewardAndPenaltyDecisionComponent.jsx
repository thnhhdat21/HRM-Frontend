import React, { useEffect, useState } from 'react';
import { getDecision, updateRewardAndPenalty } from '../../../service/DecisionService';
import { getListRewardOrPenalty } from '../../../service/RewardAndPenaltyService';
import { responseData } from '../../../util/ResponseUtil';
import { DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD } from '../../../util/DecisionUtil';
import { toast } from 'react-toastify';
import { compareDates } from '../../../util/TimeUtil';

const RewardAndPenaltyDecisionComponent = ({ decisionId, typeOpen, type, listEmployeeSelect, updateDecision }) => {
    const createModal = "create_reward_penalty_decision-create";
    const editModal = "create_reward_penalty_decision-edit";
    const [listRewardOrPenalty, setListRewardOrPenalty] = useState([])
    const [values, setValues] = useState({
        decisionId: "",
        code: "",
        date: "",
        employeeId: "",
        rewardAndPenaltyId: "",
        amount: "",
        type: type
    })

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                decisionId: "",
                code: "",
                date: "",
                employeeId: "",
                rewardAndPenaltyId: "",
                amount: "",
                type: type
            })
        } else if (typeOpen.at(-1) === editModal) {
            getDecision(decisionId).then((response) => {
                if (response.data.code === 1000) {
                    const decision = response.data.data;
                    setValues({
                        decisionId: decision.decisionId,
                        code: decision.code,
                        date: decision.date,
                        employeeId: decision.employeeId,
                        rewardAndPenaltyId: decision.rewardAndPenaltyId,
                        amount: decision.amount,
                        type: decision.type
                    })
                }
            })
        }
    }, [typeOpen])

    useEffect(() => {
        if (Number(type) === DECISION_TYPE_REWARD)
            getListRewardOrPenalty(DECISION_TYPE_REWARD).then((response) => {
                responseData(response, setListRewardOrPenalty)
            })
        else if (Number(type) === DECISION_TYPE_PENALTY)
            getListRewardOrPenalty(DECISION_TYPE_PENALTY).then((response) => {
                responseData(response, setListRewardOrPenalty)
            })
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClearGenerate = (name) => {
        setValues({ ...values, [name]: '' })

    }

    const onChangeInputAllowance = (event) => {
        const id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const amount = selectedOption.getAttribute("data-amount");
        setValues({ ...values, ["rewardAndPenaltyId"]: id, ["amount"]: amount })
    };

    const handleClearAllowance = () => {
        setValues({ ...values, ["rewardAndPenaltyId"]: "", ["amount"]: "" })
    };

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
        } else if (value.rewardAndPenaltyId === "") {
            toast.error("Yêu cầu chọn chế độ!")
            return false;
        } else if (value.amount === "" || Number(value.amount) <= 0) {
            toast.error("Yêu cầu nhập số tiền!")
            return false;
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = checkValidator(values)
        if (isCorrect) {
            updateRewardAndPenalty(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm quyết định thành công")
                    if (updateDecision !== null)
                        updateDecision()
                    document.querySelector('#create_reward_penalty_decision [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    return (
        <>
            <div class="modal fade" id="create_reward_penalty_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">{Number(type) === DECISION_TYPE_REWARD ? "Quyết định khen thưởng" : "Kỷ luật nội bộ"} </h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body ">
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
                                        <input type="date" class="form-control" placeholder='Ngày quyết định' name='date' value={values.date} onChange={onChangeInput} />
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
                                    <div class="mb-63">
                                        <label class="form-label">{Number(type) === DECISION_TYPE_REWARD ? "Khen thưởng " : "Kỷ luật"}</label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.rewardAndPenaltyId)} name='rewardAndPenaltyId' onChange={(e) => { onChangeInputAllowance(e) }} >
                                                <option value={""} hidden>Chọn chế độ</option>
                                                {
                                                    listRewardOrPenalty.length > 0 && listRewardOrPenalty.map((item, index) => (
                                                        <option key={index} value={item.id} data-amount={item.amount} data-unit={item.unit}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                            {values.rewardAndPenaltyId && (
                                                <div className="x-selected" onClick={() => handleClearAllowance()}>
                                                    <i className="ti ti-x"></i>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Số tiền </label>
                                        <input type="email" class="form-control" placeholder='Số tiền' name='amount' value={values.amount} onChange={onChangeInput} />
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

export default RewardAndPenaltyDecisionComponent;

