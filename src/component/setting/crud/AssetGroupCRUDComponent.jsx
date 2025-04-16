import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createAssetGroup, getListAssetGroup, updateAssetGroup } from '../../../service/AssetGroupService';
import { responseUpdate } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';


const AssetGroupCRUDComponent = ({ typeOpen, typeNav, selected, listGroup, setListGroup }) => {
    const [values, setValues] = useState({
        name: "",
        parentId: ""
    })

    useEffect(() => {
        if (typeNav === "group") {
            if (typeOpen.at(-1) === "edit") {
                setValues({
                    name: selected.name || "",
                    parentId: selected.parentId || ""
                })
            } else if (typeOpen.at(-1) === "open") {
                setValues({
                    name: "",
                    parentId: ""
                })
            }
        }

    }, [typeOpen, selected])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClear = (name) => {
        setValues({ ...values, [name]: '' })
    }

    const handleUpdateAssetGroup = () => {
        var isCorrect = true;
        isCorrect = checkValidator(isCorrect, values.name)
        if (isCorrect) {
            updateAssetGroup(selected.id, values.name, values.parentId).then((response) => {
                responseUpdate(response, "Cập nhật thành công", setListGroup, getListAssetGroup)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_asset_group [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const handleCreateAssetGroup = () => {
        var isCorrect = true;
        isCorrect = checkValidator(isCorrect, values.name)
        if (isCorrect) {
            createAssetGroup(values.name, values.parentId).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListGroup, getListAssetGroup)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_asset_group [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const checkValidator = (isCorrect, name) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            isCorrect = false;
        }
        return isCorrect
    }

    return (
        <>
            <div class="modal fade" id="crud_asset_group">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới nhóm tài sản</h4>
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
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm tài sản <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" name='name' value={values.name} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm tài sản cha </label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.parentId} name='parentId' onChange={onChangeInput}>
                                                            <option value={""} hidden>Chọn nhóm tài sản cha</option>
                                                            {
                                                                listGroup.length > 0 && listGroup.map((item, index) => (
                                                                    <option value={item.id} >{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {values.parentId && (
                                                            <div className="x-selected" onClick={() => handleClear("parentId")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === "edit" ? handleUpdateAssetGroup : handleCreateAssetGroup}>{typeOpen.at(-1) === "edit" ? "CẬP NHẬT" : "THÊM MỚI"} </div>
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

export default AssetGroupCRUDComponent;

