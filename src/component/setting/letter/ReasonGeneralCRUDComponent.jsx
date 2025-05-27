import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { getLetterReasonDetail } from '../../../service/LetterReasonService';

const ReasonGeneralCRUDComponent = ({ selectedId, typeOpen, reasonType, handleUpdate, handleCreate }) => {
    const modalCreate = "crud_general_reason-create"
    const modalEdit = "crud_general_reason-edit"
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
        if (typeOpen.at(-1) === modalEdit) {
            getLetterReasonDetail(selectedId).then((response) => {
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

        } else if (typeOpen.at(-1) === modalCreate) {
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
            <div className="modal fade" id="crud_general_reason">
                <div className="modal-dialog modal-dialog-centered modal-lg">
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
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Lý do</label>
                                                            <input type="text" className="form-control" name='reason' value={values.reason} onChange={onChangeUpdate} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
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
                                                                            <th>Mô tả</th>
                                                                            <th style={{ width: "5%" }}></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {rows.map((row, index) => (
                                                                            <tr key={row.id}>
                                                                                <td><input placeholder='Lý do...' type="text" className="form-control" name='reason' value={row.reason} onChange={(e) => onChangeInputCreate(index, e)} /></td>
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

export default ReasonGeneralCRUDComponent;

