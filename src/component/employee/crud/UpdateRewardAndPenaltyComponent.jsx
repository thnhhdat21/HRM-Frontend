import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getListRewardOrPenalty } from '../../../service/RewardAndPenaltyService';
import { responseData } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { updateDecisionRewardAndPenaltyEmployee } from '../../../service/DecisionService';
import { DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD } from '../../../util/DecisionUtil';

const UpdateRewardAndPenaltyComponent = ({ employeeId, openModal, typeOpen }) => {
    const modalId = "update-reward-penalty"
    const [listRewardOrPenalty, setListRewardOrPenalty] = useState([])
    const [rows, setRows] = useState([{
        id: uuidv4(),
        employeeId: employeeId,
        code: "",
        date: "",
        rewardAndPenaltyId: "",
        amount: ""
    }])

    useEffect(() => {
        if (openModal.at(-1) === `#${modalId}`)
            setRows([{
                id: uuidv4(),
                employeeId: employeeId,
                code: "",
                date: "",
                rewardAndPenaltyId: "",
                amount: ""
            }]);
    }, [openModal])

    useEffect(() => {
        if (typeOpen.at(-1) === DECISION_TYPE_REWARD)
            getListRewardOrPenalty(DECISION_TYPE_REWARD).then((response) => {
                responseData(response, setListRewardOrPenalty)
            })
        else if (typeOpen.at(-1) === DECISION_TYPE_PENALTY)
            getListRewardOrPenalty(DECISION_TYPE_PENALTY).then((response) => {
                responseData(response, setListRewardOrPenalty)
            })
    }, [typeOpen])

    const onChangeInputCreate = (index, event) => {
        const { name, value } = event.target;
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value } : row
            )
        );
    }

    const addRow = () => {
        setRows([...rows, {
            id: uuidv4(),
            employeeId: employeeId,
            code: "",
            date: "",
            rewardAndPenaltyId: "",
            amount: ""
        }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const onChangeInputAllowance = (index, event) => {
        const id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const amount = selectedOption.getAttribute("data-amount");

        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["rewardAndPenaltyId"]: id, ["amount"]: amount } : row
            )
        );
    };

    const handleClearAllowance = (index) => {
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["rewardAndPenaltyId"]: '', ["amount"]: '' } : row
            )
        );
    };

    const hanldeClickUpdateReward = (e) => {
        e.preventDefault()
        var isCorrect = true;
        for (const element of rows) {
            if (element.isUpdate !== "delete") {
                if (!checkValidator(element)) {
                    isCorrect = false;
                    break;
                }
            }
        }
        if (isCorrect) {
            updateDecisionRewardAndPenaltyEmployee(rows).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Thêm phúc lợi thành công")
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }

    }

    const checkValidator = (value) => {
        if (value.code === "") {
            toast.error("Yêu cầu nhập số quyết định!")
            return false;
        }
        else if (value.date === "") {
            toast.error("Yêu cầu chọn ngày!")
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

    return (
        <>
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">{typeOpen.at(-1) === DECISION_TYPE_REWARD ? "Chế độ phúc lợi" : "Kỷ luật nội bộ"}</h4>
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
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <table className="table table-add table-leave">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "20%" }}>Số quyết định</th>
                                                                <th style={{ width: "20%" }}>Ngày thưởng</th>
                                                                <th style={{ width: "30%" }}>{typeOpen.at(-1) === DECISION_TYPE_REWARD ? "Tên phúc lợi" : "Tên kỷ luật"}</th>
                                                                <th>Số tiền</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {rows.map((row, index) => (
                                                                <tr key={row.id}>
                                                                    <td><input placeholder='Tên phúc lợi...' type="text" className="form-control" name='code' value={row.code} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="date" className="form-control" name='date' value={row.date} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td>
                                                                        <div className="select-wrapper-department">
                                                                            <select className="select-crud" value={row.rewardAndPenaltyId} name='rewardAndPenaltyId' onChange={(e) => { onChangeInputAllowance(index, e) }}>
                                                                                <option value={""} hidden>Chọn phúc lợi</option>
                                                                                {
                                                                                    listRewardOrPenalty.length > 0 && listRewardOrPenalty.map((item, index) => (
                                                                                        <option value={item.id} data-amount={item.amount} data-unit={item.unit}>{item.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                            {row.rewardAndPenaltyId && (
                                                                                <div className="x-selected" onClick={() => handleClearAllowance(index)}>
                                                                                    <i className="ti ti-x"></i>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td><input type="text" className="form-control" name='amount' value={row.amount} onChange={(e) => onChangeInputCreate(index, e)} /></td>

                                                                    <td>
                                                                        <div className="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={(e) => removeRow(row.id)}>
                                                                            <i className="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <div className="mb-2 circle" style={{ cursor: "pointer" }}>
                                                <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRow} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary" onClick={hanldeClickUpdateReward}>CẬP NHẬT </button>
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

export default UpdateRewardAndPenaltyComponent;

