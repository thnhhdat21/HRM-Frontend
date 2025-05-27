import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { getLetterReasonDetail } from '../../../service/LetterReasonService';
const ReasonLeaveCRUDComponent = ({ selectedId, typeOpen, reasonType, handleUpdate, handleCreate }) => {
    const modalCreate = "create_leave_reason-create"
    const modalEdit = "create_leave_reason-edit"
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
        if (typeOpen.at(-1) === modalEdit) {
            getLetterReasonDetail(selectedId).then((response) => {
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

        } else if (typeOpen.at(-1) === modalCreate) {
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
            <div className="modal fade" id="create_leave_reason">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">{typeOpen.at(-1) === modalEdit ? "Chỉnh sửa" : "Tạo mới"}</h4>
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
                                        {
                                            typeOpen.at(-1) === modalEdit ? (
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="mb-3">
                                                            <label className="form-label">Lý do</label>
                                                            <input placeholder='Lý do nghỉ...' type="text" className="form-control" name='reason' value={values.reason} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1-5">
                                                        <div className="mb-3">
                                                            <label className="form-label">Ký hiệu </label>
                                                            <input placeholder='Ký hiệu...' type="text" className="form-control" name='symbol' value={values.symbol} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <div className="mb-3">
                                                            <label className="form-label">Tối đa </label>
                                                            <input placeholder='Tối đa...' type="text" className="form-control" name='maximum' value={values.maximum} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="mb-3">
                                                            <label className="form-label">Đơn vị</label>
                                                            <select name='unit' value={values.unit} onChange={onChangeUpdate}>
                                                                <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                                <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1-5">
                                                        <div className="mb-3">
                                                            <label className="form-label">Tính công</label>
                                                            <select name='workDayEnabled' value={values.workDayEnabled} onChange={onChangeUpdate}>
                                                                <option value={true}>Có</option>
                                                                <option value={false}>Không</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md">
                                                        <div className="mb-3">
                                                            <label className="form-label">Mô tả</label>
                                                            <input placeholder='Mô tả...' type="text" className="form-control" name='des' value={values.des} onChange={onChangeUpdate} />
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
                                                                                <td><input placeholder='Lý do nghỉ...' type="text" className="form-control" name='reason' value={row.reason} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input placeholder='Ký hiệu...' type="text" className="form-control" name='symbol' value={row.symbol} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input placeholder='Tối đa...' type="number" className="form-control" name='maximum' value={row.maximum} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td>
                                                                                    <select name='unit' value={row.unit} onChange={(e) => onChangeInputCreate(index, e)}>
                                                                                        <option value={""} hidden>Chọn</option>
                                                                                        <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                                        <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                                                        <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                                                    </select>
                                                                                </td>
                                                                                <td>
                                                                                    <select name='workDayEnabled' value={row.workDayEnabled} onChange={(e) => onChangeInputCreate(index, e)}>
                                                                                        <option value={true}>Có</option>
                                                                                        <option value={false}>Không</option>
                                                                                    </select>
                                                                                </td>

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
                                            )
                                        }
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary" onClick={(e) => typeOpen.at(-1) === modalEdit ? handleUpdate(e, values, checkValitor) : handleCreate(e, rows, checkValitor)}>CẬP NHẬT </button>
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

