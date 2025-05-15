import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createDuty, updateDuty } from '../../../service/Manage/ManageDutyService';
import { toast } from 'react-toastify';
import { getListDuty } from '../../../service/DutyService';


const DutyCRUDComponent = ({ selectedDuty, typeOpen, setListDuty }) => {
    const modalEdit = "crud_duty-edit"
    const modalCreate = "crud_duty-create"
    const [valuesEdit, setValuesEdit] = useState({
        name: "",
        des: ""
    })
    const [rows, setRows] = useState([{ id: Date.now(), name: "", des: "" }]);

    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit && selectedDuty) {
            setValuesEdit({
                name: selectedDuty.name || "",
                des: selectedDuty.description || ""
            });
        } else if (typeOpen.at(-1) === modalCreate) {
            setRows([{ id: Date.now(), name: "", des: "" }])
        }
    }, [typeOpen]);

    const onChangeInputEdit = (e) => {
        setValuesEdit({ ...valuesEdit, [e.target.name]: e.target.value })
    }

    const handleUpdateDuty = () => {
        updateDuty(selectedDuty.id, valuesEdit.name, valuesEdit.des).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Cập nhật chức vụ thành công")
                document.querySelector('#crud_duty [data-bs-dismiss="modal"]')?.click();
                setListDuty(prev =>
                    prev.map(item => item.id === response.data.data.id ? response.data.data : item)
                );
            }
            else if (response.data.code > 1000)
                toast.error(response.data.message)
            else
                toast.error("Bảo trì hệ thống")
        })
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
        setRows([...rows, { id: Date.now(), name: "", des: "" }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };
    const handleCreateDuty = () => {
        createDuty(rows).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Thêm mới chức vụ thành công")
                getListDuty().then((response) => {
                    if (response.data.code === 1000) {
                        setListDuty(response.data.data)
                    }
                })
                document.querySelector('#crud_duty [data-bs-dismiss="modal"]')?.click();
            }
            else if (response.data.code > 1000)
                toast.error(response.data.message)
            else
                toast.error("Bảo trì hệ thống")
        })
    }
    return (
        <>
            <div class="modal fade" id="crud_duty">
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới chức vụ</h4>
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
                                        {typeOpen.at(-1) === modalEdit ? (
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên chức vụ <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" placeholder='Nhập tên chức vụ' name='name' value={valuesEdit.name || ""} onChange={onChangeInputEdit} />
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mô tả</label>
                                                        <input type="text" class="form-control" placeholder='Nhập mô tả' name='des' value={valuesEdit.des || ""} onChange={onChangeInputEdit} />
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
                                                                        <th>Tên chức vụ</th>
                                                                        <th>Mô tả</th>
                                                                        <th style={{ width: "5%" }}></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rows.map((row, index) => (
                                                                        <tr key={row.id}>
                                                                            <td><input type="text" className="form-control" name='name' value={row.name} onChange={(e) => onChangeInputCreate(index, e)} /></td>
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
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === modalCreate ? handleCreateDuty : handleUpdateDuty}  >{typeOpen.at(-1) === modalCreate ? "THÊM MỚI" : "CẬP NHẬT"} </div>
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

export default DutyCRUDComponent;

