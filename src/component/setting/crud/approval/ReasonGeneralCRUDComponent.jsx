import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getApprovalReasonDetail } from '../../../../service/ApprovalReasonService';
import { toast } from 'react-toastify';
import { type } from '@testing-library/user-event/dist/type';

const ReasonGeneralCRUDComponent = ({ selectedId, typeOpen, reasonType, handleUpdate, handleCreate }) => {
    const [rows, setRows] = useState([{
        id: uuidv4(),
        reason: "",
        type: reasonType,
        workDayEnabled: reasonType !== 6 ? true : false,
        des: ""
    }]);

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
            reason: "",
            type: reasonType,
            workDayEnabled: reasonType !== 6 ? true : false,
            des: ""
        }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };


    const [values, setValues] = useState({})

    useEffect(() => {
        if (typeOpen.at(-1) === "edit") {
            getApprovalReasonDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const approvalReason = response.data.data
                    setValues({
                        reason: approvalReason.reason,
                        type: reasonType,
                        workDayEnabled: reasonType !== 6 ? true : false,
                        des: approvalReason.des
                    })
                }
            })

        } else if (typeOpen.at(-1) === "open") {
            setRows([{
                id: uuidv4(),
                reason: "",
                type: reasonType,
                workDayEnabled: reasonType !== 6 ? true : false,
                des: ""
            }])
        }
    }, [typeOpen])

    const onChangeUpdate = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const checkValitor = (values) => {
        if (values.reason.trim().length === 0 || values.reason === null) {
            toast.error("Yêu cầu nhập lý do!")
            return false;
        }
        return true
    }

    return (
        <>
            <div class="modal fade" id="crud_general_reason">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới</h4>
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
                                        {
                                            typeOpen.at(-1) === "edit" ? (
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="mb-3">
                                                            <label class="form-label">Lý do</label>
                                                            <input type="text" class="form-control" name='reason' value={values.reason} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="mb-3">
                                                            <label class="form-label">Mô tả</label>
                                                            <input type="text" class="form-control" name='des' value={values.des} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <table class="table table-add table-leave">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Lý do</th>
                                                                            <th>Mô tả</th>
                                                                            <th style={{ width: "5%" }}></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {rows.map((row, index) => (
                                                                            <tr key={row.id}>
                                                                                <td><input type="text" className="form-control" name='reason' value={row.reason} onChange={(e) => onChangeInputCreate(index, e)} /></td>
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
                                            )
                                        }

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={(e) => typeOpen.at(-1) === "edit" ? handleUpdate(e, values, checkValitor) : handleCreate(e, rows, checkValitor)}>CẬP NHẬT </button>
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

export default ReasonGeneralCRUDComponent;

