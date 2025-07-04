import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { formatTime } from '../../../util/TimeUtil';
import { getLetterReasonDetail } from '../../../service/LetterReasonService';

const ReasonWorktimeCRUDComponent = ({ selectedId, typeOpen, reasonType, handleUpdate, handleCreate }) => {
    const modalCreate = "crud_worktime_reason-create"
    const modalEdit = "crud_worktime_reason-edit"
    const [rows, setRows] = useState([{
        id: uuidv4(),
        reason: "",
        maximum: "",
        type: reasonType,
        unit: "",
        workDayEnabled: true,
        goLate: "",
        backEarly: "",
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

    const onChangeCreateTime = (index, event) => {
        const { name, value } = event.target;
        const formatted = formatTime(value);
        const total = handleCreateTotalTime(index, value, name)
        if (total.trim().length !== 0) {
            setRows(prevRows =>
                prevRows.map((row, i) =>
                    i === index ? { ...row, [name]: formatted, totalTime: total } : row
                )
            );
        } else {
            setRows(prevRows =>
                prevRows.map((row, i) =>
                    i === index ? { ...row, [name]: formatted } : row
                )
            );
        }
    }

    const handleCreateTotalTime = (index, value, name) => {
        const type = "goLatebackEarly"
        const time1 = value;
        const time2 = rows.at(index)[type.replace(name, "")]
        if (time1.trim().length >= 4 && time2.trim().length >= 4) {
            return calculatorTime(formatTime(time1), time2);
        }
        return ""
    }

    const addRow = () => {
        setRows([...rows, {
            id: uuidv4(),
            reason: "",
            maximum: "",
            type: reasonType,
            unit: "",
            workDayEnabled: true,
            goLate: "",
            backEarly: "",
            des: ""
        }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };


    const [values, setValues] = useState({})

    const calculatorTime = (goLate, backEarly) => {
        const goLateMinutes = Number(goLate.split(":")[0]) * 60 + Number(goLate.split(":")[1])
        const backEarlyMinutes = Number(backEarly.split(":")[0]) * 60 + Number(backEarly.split(":")[1])

        const totalMinutes = goLateMinutes + backEarlyMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        return formatted;
    }

    const checkTime = (time) => {
        const timeMinutes = Number(time.split(":")[0]) * 60 + Number(time.split(":")[1])
        if (timeMinutes > 120) {
            toast.error("Thời gian đi sớm về muộn tối đa là 2 giờ!")
            return true;
        }
        return false;
    }

    useEffect(() => {
        if (values.backEarly && values.backEarly.length > 4) {
            const total = calculatorTime(values.goLate, values.backEarly)
            setValues({ ...values, totalTime: total })
        }
    }, [values.goLate, values.backEarly])

    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit) {
            getLetterReasonDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const approvalReason = response.data.data
                    setValues({
                        reason: approvalReason.reason,
                        maximum: approvalReason.maximum,
                        type: reasonType,
                        unit: approvalReason.unit,
                        workDayEnabled: approvalReason.workDayEnabled,
                        goLate: approvalReason.goLate,
                        backEarly: approvalReason.backEarly,
                        des: approvalReason.des
                    })
                }
            })

        } else if (typeOpen.at(-1) === modalCreate) {
            setRows([{
                id: uuidv4(),
                reason: "",
                maximum: "",
                type: reasonType,
                unit: "",
                workDayEnabled: true,
                goLate: "",
                backEarly: "",
                des: ""
            }])
        }
    }, [typeOpen])

    const onChangeUpdate = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onChangeUpdateTime = (e) => {
        const name = e.target.name;
        const formatted = formatTime(e.target.value);

        setValues(prev => ({
            ...prev,
            [name]: formatted,
        }));
    };

    const checkValitor = (values) => {
        if (values.reason.trim().length === 0 || values.reason === null) {
            toast.error("Yêu cầu nhập lý do!")
            return false;
        } else if (values.maximum === "" || values.maximum <= 0) {
            toast.error("Ngày tối đa chưa chính xác!")
            return false;
        } else if (values.unit.trim().length === 0 || values.unit === null) {
            toast.error("Yêu cầu chọn đơn vị")
            return false;
        } else if (values.goLate.trim().length === 0) {
            toast.error("Yêu cầu nhập thời gian đi muộn")
            return false;
        } else if (checkTime(values.goLate)) {
            return false;
        } else if (values.backEarly.trim().length === 0) {
            toast.error("Yêu cầu nhập thời gian về sớm")
            return false;
        } else if (checkTime(values.backEarly)) {
            return false;
        }
        return true
    }

    return (
        <>
            <div className="modal fade" id="crud_worktime_reason">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-update-job-history">
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
                                        {typeOpen.at(-1) === modalEdit ? (
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="mb-3">
                                                        <label className="form-label">Lý do</label>
                                                        <input type="text" className="form-control" name='reason' value={values.reason} onChange={onChangeUpdate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="mb-3">
                                                        <label className="form-label">Tối đa </label>
                                                        <input type="text" className="form-control" name='maximum' value={values.maximum} onChange={onChangeUpdate} />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="mb-3">
                                                        <label className="form-label">Đơn vị</label>
                                                        <select name='unit' value={values.unit} onChange={onChangeUpdate}>
                                                            <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                            <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                            <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                            <option value={"Tháng / Năm"}>Tháng / Năm</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="mb-3">
                                                        <label className="form-label">Đi muộn</label>
                                                        <div className="input-icon-end position-relative time-input-custom">
                                                            <input type="text" className="form-control" placeholder="--:--" name='goLate' maxLength={4} value={values.goLate} onChange={onChangeUpdateTime} />
                                                            <span className="input-icon-addon">
                                                                <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="mb-3">
                                                        <label className="form-label">Về sớm</label>
                                                        <div className="input-icon-end position-relative time-input-custom">
                                                            <input type="text" className="form-control" placeholder="--:--" name='backEarly' maxLength={4} value={values.backEarly} onChange={onChangeUpdateTime} />
                                                            <span className="input-icon-addon">
                                                                <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="mb-3">
                                                        <label className="form-label">Tổng</label>
                                                        <div className="input-icon-end position-relative time-input-custom">
                                                            <input type="text" className="form-control readonly-input" placeholder="--:--" value={values.totalTime} />
                                                            <span className="input-icon-addon">
                                                                <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="mb-3">
                                                        <label className="form-label">Mô tả</label>
                                                        <input type="text" className="form-control" name='des' value={values.des} onChange={onChangeUpdate} />
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
                                                                        <th style={{ width: "10%" }}>Tối đa</th>
                                                                        <th style={{ width: "15%" }}>Đơn vị</th>
                                                                        <th style={{ width: "10%" }}>Đi muộn</th>
                                                                        <th style={{ width: "10%" }}>Về sớm</th>
                                                                        <th style={{ width: "10%" }}>Tổng</th>
                                                                        <th>Mô tả</th>
                                                                        <th style={{ width: "5%" }}></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rows.map((row, index) => (
                                                                        <tr key={row.id}>
                                                                            <td><input placeholder='Lý do...' type="text" className="form-control" name='reason' value={row.reason} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td><input placeholder='Tối đa...' type="number" className="form-control" name='maximum' value={row.maximum} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                            <td>
                                                                                <select name='unit' value={row.unit} onChange={(e) => onChangeInputCreate(index, e)}>
                                                                                    <option value={""} hidden>Chọn</option>
                                                                                    <option value={"Ngày / Tuần"}>Ngày / Tuần</option>
                                                                                    <option value={"Ngày / Tháng"}>Ngày / Tháng</option>
                                                                                    <option value={"Ngày / Năm"}>Ngày / Năm</option>
                                                                                    <option value={"Tháng / Năm"}>Tháng / Năm</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-icon-end position-relative time-input-custom">
                                                                                    <input type="text" className="form-control" placeholder="--:--" name='goLate' maxLength={4} value={row.goLate} onChange={(e) => onChangeCreateTime(index, e)} />
                                                                                    <span className="input-icon-addon">
                                                                                        <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-icon-end position-relative time-input-custom">
                                                                                    <input type="text" className="form-control" placeholder="--:--" name='backEarly' maxLength={4} value={row.backEarly} onChange={(e) => onChangeCreateTime(index, e)} />
                                                                                    <span className="input-icon-addon">
                                                                                        <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="input-icon-end position-relative time-input-custom">
                                                                                    <input type="text" className="form-control readonly-input" placeholder="--:--" value={row.totalTime} />
                                                                                    <span className="input-icon-addon">
                                                                                        <i className="ti ti-clock-hour-3 text-gray-7"></i>
                                                                                    </span>
                                                                                </div>
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
                                        )}
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

export default ReasonWorktimeCRUDComponent;

