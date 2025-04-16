import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createAssetUnit, getListAssetUnit, updateAssetUnit } from '../../../service/AssetUnitService';
import { responseUpdate } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const UnitAssetCRUDComponent = ({ typeOpen, typeNav, selected, setListUnit }) => {
    const [values, setValues] = useState({
        name: "",
    })

    const [rows, setRows] = useState([{ id: uuidv4(), name: "" }]);

    useEffect(() => {
        if (typeNav === "unit") {
            if (typeOpen.at(-1) === "edit") {
                setValues({
                    name: selected.name || "",
                })
            } else if (typeOpen.at(-1) === "open") {
                setRows([{ id: uuidv4(), name: "" }])
            }
        }

    }, [typeOpen, selected])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
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
        setRows([...rows, { id: uuidv4(), name: "", des: "" }]);
    };

    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleUpdateAssetUnit = () => {
        var isCorrect = true;
        isCorrect = checkValidator(values.name)
        if (isCorrect) {
            updateAssetUnit(selected.id, values.name).then((response) => {
                responseUpdate(response, "Cập nhật thành công", setListUnit, getListAssetUnit)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_unit_asset [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const handleCreateAssetUnit = () => {
        var isCorrect = true;
        for (const element of rows) {
            if (!checkValidator(element.name)) {
                isCorrect = false;
                break;
            }
        }
        if (isCorrect) {
            createAssetUnit(rows).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListUnit, getListAssetUnit)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_unit_asset [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }
    const checkValidator = (name) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            return false;
        }
        return true
    }
    return (
        <>
            <div class="modal fade" id="crud_unit_asset">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới Đơn vị</h4>
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
                                            typeOpen.at(-1) === "edit" ?
                                                (
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <label class="form-label">Đơn vị <span class="text-danger">
                                                                    *</span></label>
                                                                <input type="text" class="form-control" name='name' value={values.name} onChange={onChangeInput} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="mb-3">
                                                                    <table class="table table-add table-crud">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Đơn vị</th>
                                                                                <th style={{ width: "5%" }}></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {rows.map((row, index) => (
                                                                                <tr key={row.id}>
                                                                                    <td><input type="text" className="form-control" name='name' value={row.name} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                                    <td >
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
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === "edit" ? handleUpdateAssetUnit : handleCreateAssetUnit}>{typeOpen.at(-1) === "edit" ? "CẬP NHẬT" : "THÊM MỚI"} </div>
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

export default UnitAssetCRUDComponent;

