import React, { useEffect, useState } from 'react';
import { createRewardOrPenalty, updateRewardOrPenalty } from '../../../service/Manage/ManageRewardAndPenaltyService';
import { responseUpdateType } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { DECISION_TYPE_REWARD } from '../../../util/DecisionUtil';
import { getListRewardOrPenalty } from '../../../service/RewardAndPenaltyService';


const RewardCRUDComponent = ({ selected, typeOpen, setListReward }) => {
    const modalEdit = "crud_reward-edit"
    const modalCreate = "crud_reward-create"
    const [valuesEdit, setValuesEdit] = useState({
        name: "",
        amount: "",
        des: ""
    })

    const [rows, setRows] = useState([{ id: Date.now(), name: "", amount: "", des: "" }]);

    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit && selected) {
            setValuesEdit({
                name: selected.name || "",
                amount: selected.amount || "",
                des: selected.description || ""
            });
        } else if (typeOpen.at(-1) === modalCreate) {
            setRows([{ id: Date.now(), name: "", amount: "", des: "" }])
        }
    }, [typeOpen]);

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
            <div className="modal fade" id="crud_reward">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">{typeOpen.at(-1) === modalEdit ? "Chỉnh sửa" : "Tạo mới"} chế độ phúc lợi</h4>
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
                                        {typeOpen.at(-1) === modalEdit ? (
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Tên phúc lợi </label>
                                                        <input type="text" className="form-control" name='name' value={valuesEdit.name || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Số tiền </label>
                                                        <input type="number" className="form-control" name='amount' value={valuesEdit.amount || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="mb-3">
                                                        <label className="form-label">Mô tả</label>
                                                        <input type="text" className="form-control" name='des' value={valuesEdit.des || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <table className="table table-add table-leave">
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
                                                                            <td><input placeholder='Tên phúc lợi...' type="text" className="form-control" name='name' value={row.name} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td><input placeholder='Số tiền...' type="number" className="form-control" name='amount' value={row.amount} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td><input placeholder='Mô tả...' type="text" className="form-control" name='des' value={row.des} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td>
                                                                                <div className="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(row.id)}>
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
                                            </>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" className="btn btn-primary" onClick={typeOpen.at(-1) === modalEdit ? handleUpdateReward : handleCreateReward} > {typeOpen.at(-1) === modalEdit ? "CẬP NHẬT" : "THÊM MỚI"}</div>
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

