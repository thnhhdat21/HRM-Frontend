import React, { useEffect, useState } from 'react';
import '../../css/crud-style.css'
import { getApprovalReasonDetail } from '../../../../service/ApprovalReasonService';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const ReasonLeaveCRUDComponent = ({ selectedId, typeOpen, reasonType, handleUpdate, handleCreate }) => {
    const [rows, setRows] = useState([{
        id: uuidv4(),
        reason: "",
        symbol: "",
        maximum: "",
        type: reasonType,
        unit: "",
        workDayEnabled: true,
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
            symbol: "",
            maximum: "",
            type: reasonType,
            unit: "",
            workDayEnabled: true,
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
                        symbol: approvalReason.symbol,
                        maximum: approvalReason.maximum,
                        type: reasonType,
                        unit: approvalReason.unit,
                        workDayEnabled: approvalReason.workDayEnabled,
                        des: approvalReason.des
                    })
                }
            })

        } else if (typeOpen.at(-1) === "open") {
            setRows([{
                id: uuidv4(),
                reason: "",
                symbol: "",
                maximum: "",
                type: reasonType,
                unit: "",
                workDayEnabled: true,
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
        } else if (values.symbol.trim().length === 0 || values.symbol === null) {
            toast.error("Yêu cầu nhập ký hiệu!")
            return false;
        } else if (values.maximum === "" || values.maximum <= 0) {
            toast.error("Ngày tối đa chưa chính xác!")
            return false;
        } else if (values.unit.trim().length === 0 || values.unit === null) {
            toast.error("Yêu cầu chọn đơn vị")
            return false;
        }
        return true
    }

    return (
        <>
            <div class="modal fade" id="create_leave_reason">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
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
                                                    <div class="col-md-3">
                                                        <div class="mb-3">
                                                            <label class="form-label">Lý do</label>
                                                            <input type="text" class="form-control" name='reason' value={values.reason} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-1-5">
                                                        <div class="mb-3">
                                                            <label class="form-label">Ký hiệu </label>
                                                            <input type="text" class="form-control" name='symbol' value={values.symbol} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <div class="mb-3">
                                                            <label class="form-label">Tối đa </label>
                                                            <input type="text" class="form-control" name='maximum' value={values.maximum} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <div class="mb-3">
                                                            <label class="form-label">Đơn vị</label>
                                                            <select name='unit' value={values.unit} onChange={onChangeUpdate}>
                                                                <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                                <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-1-5">
                                                        <div class="mb-3">
                                                            <label class="form-label">Tính công</label>
                                                            <select name='workDayEnabled' value={values.workDayEnabled} onChange={onChangeUpdate}>
                                                                <option value={true}>Có</option>
                                                                <option value={false}>Không</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md">
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
                                                                            <th style={{ width: "10%" }}>Ký hiệu</th>
                                                                            <th style={{ width: "10%" }}>Tối đa</th>
                                                                            <th style={{ width: "15%" }}>Đơn vị</th>
                                                                            <th style={{ width: "10%" }}>Tính công</th>
                                                                            <th>Mô tả</th>
                                                                            <th style={{ width: "5%" }}></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {rows.map((row, index) => (
                                                                            <tr key={row.id}>
                                                                                <td><input type="text" className="form-control" name='reason' value={row.reason} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input type="text" className="form-control" name='symbol' value={row.symbol} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input type="number" className="form-control" name='maximum' value={row.maximum} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td>
                                                                                    <select name='unit' value={values.unit} onChange={(e) => onChangeInputCreate(index, e)}>
                                                                                        <option value={""} hidden>Chọn</option>
                                                                                        <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                                        <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                                                        <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td>
                                                                                    <select name='workDayEnabled' value={values.workDayEnabled} onChange={(e) => onChangeInputCreate(index, e)}>
                                                                                        <option value={true}>Có</option>
                                                                                        <option value={false}>Không</option>
                                                                                    </select>
                                                                                </td>

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

export default ReasonLeaveCRUDComponent;

