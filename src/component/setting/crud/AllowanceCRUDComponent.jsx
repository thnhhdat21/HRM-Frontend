import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createAllowance, updateAllowance } from '../../../service/Manage/ManageAllowanceService';
import { toast } from 'react-toastify';
import { responseUpdate } from '../../../util/ResponseUtil';
import { getListAllownace } from '../../../service/AllowanceService';


const AllowanceCRUDComponent = ({ selected, setListAllowance, typeOpen }) => {
    const modalEdit = "crud_allowance-edit"
    const modalCreate = "crud_allowance-create"
    const [valuesEdit, setValuesEdit] = useState({
        name: "",
        amount: "",
        unit: ""
    })
    const [rows, setRows] = useState([{ id: Date.now(), name: "", amount: "", unit: "" }]);

    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit && selected) {
            setValuesEdit({
                name: selected.name || "",
                amount: selected.amount || "",
                unit: selected.unit || "",
            });
        } else if (typeOpen.at(-1) === modalCreate) {
            setRows([{ id: Date.now(), name: "", amount: "", unit: "" }])
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
        setRows([...rows, { id: Date.now(), name: "", amount: "", unit: "" }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleUpdateAllowance = () => {
        var isCorrect = true;
        isCorrect = validator(isCorrect, valuesEdit.name, valuesEdit.amount, valuesEdit.unit)
        if (isCorrect) {
            updateAllowance(selected.id, valuesEdit.name, valuesEdit.amount, valuesEdit.unit).then((response) => {
                responseUpdate(response, "Cập nhật thành công", setListAllowance, getListAllownace)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_allowance [data-bs-dismiss="modal"]')?.click();

                }
            })
        }
    }

    const handleCreateAllowance = () => {
        var isCorrect = true;
        rows.forEach(element => {
            isCorrect = validator(isCorrect, element.name, element.amount, element.unit)
            if (!isCorrect)
                return
        });
        if (isCorrect) {
            createAllowance(rows).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListAllowance, getListAllownace)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_allowance [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const validator = (isCorrect, name, amount, unit) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            isCorrect = false;
        } else if (Number(amount) === 0) {
            toast.error("Vui lòng nhập số tiền")
            isCorrect = false;
        } else if (Number(amount) < 0) {
            toast.error("Số tiền không hợp lệ")
            isCorrect = false;
        } else if (unit.trim().length <= 0) {
            toast.error("Vui lòng nhập đơn vị")
            isCorrect = false;
        }
        return isCorrect
    }

    return (
        <>
            <div class="modal fade" id="crud_allowance">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">{typeOpen.at(-1) === modalEdit ? "Cập nhật" : "Tạo mới"} loại phụ cấp</h4>
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
                                            typeOpen.at(-1) === modalEdit ? (
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <div class="mb-3">
                                                            <label class="form-label">Tên phụ cấp</label>
                                                            <input type="text" class="form-control" name='name' value={valuesEdit.name || ""} onChange={onChangeInputEdit} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="mb-3">
                                                            <label class="form-label">Số tiền</label>
                                                            <input type="number" class="form-control" name='amount' value={valuesEdit.amount || ""} onChange={onChangeInputEdit} />
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="mb-3">
                                                            <label class="form-label">Đơn vị </label>
                                                            <input type="text" class="form-control" name='unit' value={valuesEdit.unit || ""} onChange={onChangeInputEdit} />
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
                                                                            <th>Tên phụ cấp</th>
                                                                            <th>Số tiền</th>
                                                                            <th>Đơn vị</th>
                                                                            <th style={{ width: "5%" }}></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {rows.map((row, index) => (
                                                                            <tr key={row.id}>
                                                                                <td><input type="text" className="form-control" name='name' value={row.name} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input type="number" className="form-control" name='amount' value={row.amount} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                <td><input type="text" className="form-control" name='unit' value={row.unit} onChange={(e) => onChangeInputCreate(index, e)} /></td>
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
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === modalEdit ? handleUpdateAllowance : handleCreateAllowance}>{typeOpen.at(-1) === modalEdit ? "CẬP NHẬT" : "TẠO MỚI"} </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

export default AllowanceCRUDComponent;

