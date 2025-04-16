import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createBusinessBlock, updateBusinessBlock } from '../../../service/BusinessBlockService';
import { toast } from 'react-toastify';


const BusinessBlockCRUDComponent = ({ setListBusinessBlock, typeOpen, businessBlock }) => {
    const [values, setValues] = useState({
        name: "",
        code: "",
    })

    useEffect(() => {
        if (typeOpen === "edit-crud_business_block") {
            setValues({
                id: businessBlock.id || "",
                name: businessBlock.name || "",
                code: businessBlock.code || "",
            });
        } else {
            setValues({
                name: "",
                code: "",
            });
        }
    }, [typeOpen, businessBlock])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCreateBusinessBlock = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        createBusinessBlock(values.name, values.code).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Tạo khối nghiệp vụ thành công")
                document.querySelector('#crud_business_block [data-bs-dismiss="modal"]')?.click();
                setListBusinessBlock(prev => [...prev, response.data.data])
            } else {
                toast.error(response.data.message)
            }
        })
    }

    const handleUpdateBusinessBlock = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        updateBusinessBlock(values.id, values.name, values.code).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Cập nhật nghiệp vụ thành công")
                document.querySelector('#crud_business_block [data-bs-dismiss="modal"]')?.click();
                setListBusinessBlock(prev =>
                    prev.map(item => item.id === response.data.data.id ? response.data.data : item)
                );
            } else {
                toast.error(response.data.message)
            }
        })
    }
    return (
        <>
            <div class="modal fade" id="crud_business_block">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">{typeOpen === "edit" ? "Cập nhật khối nghiệp vụ" : "Tạo mới khối nghiệp vụ"} </h4>
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
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên nghiệp vụ<span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" name='name' onChange={onChangeInput} value={values.name || ""} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Mã<span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" name='code' onChange={onChangeInput} value={values.code || ""} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={() => { typeOpen === "create" ? handleCreateBusinessBlock() : handleUpdateBusinessBlock() }}> {typeOpen === "create" ? "THÊM MỚI" : "CẬP NHẬT"} </div>
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

export default BusinessBlockCRUDComponent;

