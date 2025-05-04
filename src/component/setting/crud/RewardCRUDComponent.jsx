import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createRewardOrPenalty, getListRewardOrPenalty, updateRewardOrPenalty } from '../../../service/RewardAndPenaltyService';
import { responseUpdate, responseUpdateType } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { DECISION_TYPE_REWARD } from '../../../util/DecisionUtil';


const RewardCRUDComponent = ({ selected, typeOpen, setListReward }) => {

    const [valuesEdit, setValuesEdit] = useState({
        name: "",
        amount: "",
        des: ""
    })

    const [rows, setRows] = useState([{ id: Date.now(), name: "", amount: "", des: "" }]);

    useEffect(() => {
        if (typeOpen.at(-1) === "edit" && selected) {
            setValuesEdit({
                name: selected.name || "",
                amount: selected.amount || "",
                des: selected.description || ""
            });
        } else if (typeOpen.at(-1) === "open") {
            setRows([{ id: Date.now(), name: "", amount: "", des: "" }])
        }
    }, [typeOpen, selected]);

    const onChangeInputEdit = (e) => {
        setValuesEdit({ ...valuesEdit, [e.target.name]: e.target.value })
    }


    const onChangeInputCreate = (index, event) => {
        const { name, value } = event.target;
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value } : row
            )
        );
    };

    const addRow = () => {
        setRows([...rows, { id: Date.now(), name: "", amount: "", des: "" }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleUpdateReward = () => {
        var isCorrect = true;
        isCorrect = checkValidator(isCorrect, valuesEdit.name, valuesEdit.amount)
        if (isCorrect) {
            updateRewardOrPenalty(selected.id, valuesEdit.name, valuesEdit.amount, valuesEdit.des).then((response) => {
                responseUpdateType(response, "Cập nhật thành công", setListReward, getListRewardOrPenalty, DECISION_TYPE_REWARD)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_reward [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const handleCreateReward = () => {
        var isCorrect = true;
        rows.forEach(element => {
            isCorrect = checkValidator(isCorrect, element.name, element.amount)
            if (!isCorrect)
                return
        });
        if (isCorrect) {
            createRewardOrPenalty(rows, DECISION_TYPE_REWARD).then((response) => {
                responseUpdateType(response, "Thêm mới thành công", setListReward, getListRewardOrPenalty, DECISION_TYPE_REWARD)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_reward [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const checkValidator = (isCorrect, name, amount) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            isCorrect = false;
        } else if (Number(amount) === 0) {
            toast.error("Vui lòng nhập số tiền")
            isCorrect = false;
        } else if (Number(amount) < 0) {
            toast.error("Số tiền không hợp lệ")
            isCorrect = false;
        }
        return isCorrect
    }

    return (
        <>
            <div class="modal fade" id="crud_reward">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">{typeOpen.at(-1) === "edit" ? "Chỉnh sửa" : "Tạo mới"} chế độ phúc lợi</h4>
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
                                        {typeOpen.at(-1) === "edit" ? (
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên phúc lợi <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" name='name' value={valuesEdit.name || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Số tiền </label>
                                                        <input type="number" class="form-control" name='amount' value={valuesEdit.amount || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mô tả</label>
                                                        <input type="text" class="form-control" name='des' value={valuesEdit.des || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3">
                                                            <table class="table table-add">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Tên Phúc lợi</th>
                                                                        <th>Số tiền</th>
                                                                        <th>Mô tả</th>
                                                                        <th style={{ width: "5%" }}></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rows.map((row, index) => (
                                                                        <tr key={row.id}>
                                                                            <td><input type="text" className="form-control" name='name' value={row.name} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td><input type="number" className="form-control" name='amount' value={row.amount} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td><input type="text" className="form-control" name='des' value={row.des} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td>
                                                                                <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(row.id)}>
                                                                                    <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-start">
                                                    <div class="mb-2 circle" style={{ cursor: "pointer" }}>
                                                        <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRow} />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === "edit" ? handleUpdateReward : handleCreateReward} > {typeOpen.at(-1) === "edit" ? "CẬP NHẬT" : "THÊM MỚI"}</div>
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

export default RewardCRUDComponent;

