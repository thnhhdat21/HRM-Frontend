import React, { useEffect, useRef, useState } from 'react';
import '../css/crud-style.css';
import OptionDeparmentParent from '../component/OptionDeparmentParent';
import { createDepartment, getDepartmentDetail, getListDepartment, updateDepartment } from '../../../service/DepartmentService';
import { toast } from 'react-toastify';


const DepartmentCRUDComponent = ({ setListDepartment, typeOpen, setTypeOpen, listDepartment, listBusinessBlock, selectedId }) => {
    const [selectedValue, setSelectedValue] = useState("Chọn phòng ban");
    const [selectedParentId, setSelectedParentId] = useState("");
    const [selectedBusinessId, setSlectedBusinessId] = useState("");
    const [departmentLevel, setDepartmentLevel] = useState("");

    const modalRef = useRef(null);

    const [values, setValues] = useState({
        name: "",
        code: "",
    })
    useEffect(() => {
        if (typeOpen === "edit-crud_department") {
            getDepartmentDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const department = response.data.data;
                    setValues({
                        id: department.id || "",
                        name: department.name || "",
                        code: department.code || "",
                    });
                    setDepartmentLevel(department.departmentLevel || "");
                    setSlectedBusinessId(department.businessBlockId || "");
                    setSelectedParentId(department.parentId || "");
                    if (department.parentId) {
                        infoEditParentId(department.parentId);
                    } else {
                        setSelectedValue("Chọn phòng ban")
                    }
                } else {
                    toast.error(response.data.message)
                }
            })
        } else if (typeOpen === "create") {
            setValues({
                id: "",
                name: "",
                code: "",
            });
            setDepartmentLevel("")
            setSlectedBusinessId("")
            setSelectedParentId("")
            setSelectedValue("Chọn phòng ban")
        }
        setTypeOpen("")
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleChangeParent = (e) => {
        const select = document.getElementById("selected-deparment-parent");
        const selectedOption = select.options[select.selectedIndex];
        setSelectedValue(selectedOption.textContent.replace(/^-+/g, "").trim())
        setSelectedParentId(e.target.value)
    };

    const infoEditParentId = (parentId) => {
        const select = document.getElementById("selected-deparment-parent");
        const selectedOption = select.querySelector(`option[value="${parentId}"]`);
        setSelectedValue(selectedOption.textContent.replace(/^-+/g, "").trim())
    }

    const handleClear = (state, type) => {
        if ("parent".includes(type)) {
            setSelectedValue("Chọn phòng ban");
            setSelectedParentId(null);
        } else {
            state("");
        }
    };
    const handleChangeBusiness = (e) => {
        setSlectedBusinessId(e.target.value)
    };

    const handleChangeLvel = (e) => {
        setDepartmentLevel(e.target.value)
    };


    const handleSubmitUpdate = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        updateDepartment(values.id, values.name, values.code, departmentLevel, selectedParentId, selectedBusinessId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Cập nhật thành công")
                getListDepartment().then((response) => {
                    if (response.data.code === 1000) {
                        setListDepartment(response.data.data)
                    } else
                        toast.error(response.data.message);
                })
                document.querySelector('#crud_department [data-bs-dismiss="modal"]')?.click();
            } else {
                toast.error(response.data.message);
            }
        })
    }

    const handleSubmitCreate = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        createDepartment(values.name, values.code, departmentLevel, selectedParentId, selectedBusinessId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Tạo mới thành công")
                getListDepartment().then((response) => {
                    if (response.data.code === 1000) {
                        setListDepartment(response.data.data)
                    } else
                        toast.error(response.data.message);
                })
                document.querySelector('#crud_department [data-bs-dismiss="modal"]')?.click();
            } else {
                toast.error(response.data.message);
            }
        })
    }


    return (
        <>
            <div class="modal fade" id="crud_department" ref={modalRef}>
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới phòng ban</h4>
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
                                                    <label class="form-label">Cấu trúc</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={departmentLevel} onChange={handleChangeLvel}>
                                                            <option value={""} hidden>Chọn cấu trúc</option>
                                                            <option value={"Công ty"}>Công ty</option>
                                                            <option value={"Khối nghiệp vụ"}>Khối nghiệp vụ</option>
                                                            <option value={"Phòng ban"}>Phòng ban</option>
                                                        </select>
                                                        {departmentLevel && (
                                                            <div className="x-selected" onClick={() => handleClear(setDepartmentLevel)}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Mã</label>
                                                    <input type="text" class="form-control" value={values.code || ""} name='code' onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên phòng ban</label>
                                                    <input type="text" class="form-control" value={values.name || ""} name='name' onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Thuộc phòng ban</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" id='selected-deparment-parent' value={99999} onChange={(e) => handleChangeParent(e)}>
                                                            <option value={99999} hidden>{selectedValue}</option>
                                                            {listDepartment && listDepartment.map((item) => <OptionDeparmentParent explorer={item} />)}
                                                        </select>
                                                        {selectedParentId && (
                                                            <div className="x-selected" onClick={() => handleClear(setSelectedValue, "parent")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Khối nghiệp vụ</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={selectedBusinessId} onChange={handleChangeBusiness}>
                                                            <option value="" hidden>Chọn khối nghiệp vụ</option>
                                                            {listBusinessBlock && listBusinessBlock.map((item, index) => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                        {selectedBusinessId && (
                                                            <div className="x-selected" onClick={() => handleClear(setSlectedBusinessId)}>
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
                                        <div type="submit" class="btn btn-primary" onClick={values.id ? handleSubmitUpdate : handleSubmitCreate}>{values.id ? "CẬP NHẬT" : "THÊM MỚI"} </div>
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

export default DepartmentCRUDComponent;

