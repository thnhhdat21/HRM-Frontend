import { useEffect, useRef, useState } from 'react';
import OptionDeparmentParent from '../component/OptionDeparmentParent';
import { createDepartment, getDepartmentDetail, getListDepartment, updateDepartment } from '../../../service/Manage/ManageDepartmentService';
import { toast } from 'react-toastify';
import { responseData } from '../../../util/ResponseUtil';


const DepartmentCRUDComponent = ({ setListDepartment, typeOpen, listDepartment, listBusinessBlock, selectedId }) => {
    const modalEdit = "crud_department-edit"
    const modalCreate = "crud_department-create"
    const [selectedValue, setSelectedValue] = useState("Chọn phòng ban");
    const modalRef = useRef(null);
    const [values, setValues] = useState({
        name: "",
        code: "",
        level: "",
        businessBlockId: "",
        parentId: "",
    })
    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit) {
            getDepartmentDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const department = response.data.data;
                    setValues({
                        id: department.id || "",
                        name: department.name || "",
                        code: department.code || "",
                        level: department.departmentLevel || "",
                        businessBlockId: department.businessBlockId || "",
                        parentId: department.parentId || ""
                    });
                    if (department.parentId) {
                        infoEditParentId(department.parentId);
                    } else {
                        setSelectedValue("Chọn phòng ban")
                    }
                } else {
                    toast.error(response.data.message)
                }
            })
        } else if (typeOpen.at(-1) === modalCreate) {
            setValues({
                id: "",
                name: "",
                code: "",
                level: "",
                businessBlockId: "",
                parentId: "",
            });
            setSelectedValue("Chọn phòng ban")
        }
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleChangeParent = (e) => {
        const select = document.getElementById("selected-deparment-parent");
        const selectedOption = select.options[select.selectedIndex];
        setSelectedValue(selectedOption.textContent.replace(/^-+/g, "").trim())
        setValues({ ...values, ["parentId"]: e.target.value })
    };

    const infoEditParentId = (parentId) => {
        const select = document.getElementById("selected-deparment-parent");
        const selectedOption = select.querySelector(`option[value="${parentId}"]`);
        setSelectedValue(selectedOption.textContent.replace(/^-+/g, "").trim())
    }

    const handleClear = (name, type) => {
        if ("parent".includes(type)) {
            setSelectedValue("Chọn phòng ban");
            setValues({ ...values, ["parentId"]: "" })
        } else {
            setValues({ ...values, [name]: "" })
        }
    };

    const handleSubmitUpdate = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        updateDepartment(values.id, values.name, values.code, values.level, values.parentId, values.businessBlockId).then((response) => {
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
        createDepartment(values.name, values.code, values.level, values.parentId, values.businessBlockId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Thêm mới phòng ban thành công")
                getListDepartment().then((response) => {
                    responseData(response, setListDepartment)
                })
                document.querySelector('#crud_department [data-bs-dismiss="modal"]')?.click();
            }
        })
    }

    return (
        <>
            <div className="modal fade" id="crud_department" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Tạo mới phòng ban</h4>
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
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Cấu trúc</label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" value={values.level} name='level' onChange={onChangeInput}>
                                                            <option value={""} hidden>Chọn cấu trúc</option>
                                                            <option value={1}>Công ty</option>
                                                            <option value={2}>Ban giám đốc</option>
                                                            <option value={3}>Khối nghiệp vụ</option>
                                                            <option value={4}>Phòng ban</option>
                                                        </select>
                                                        {values.level && (
                                                            <div className="x-selected" onClick={() => handleClear("level")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Mã</label>
                                                    <input type="text" className="form-control" value={values.code || ""} name='code' onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Tên phòng ban</label>
                                                    <input type="text" className="form-control" value={values.name || ""} name='name' onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Thuộc phòng ban</label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" id='selected-deparment-parent' value={99999} onChange={(e) => handleChangeParent(e)}>
                                                            <option value={99999} hidden>{selectedValue}</option>
                                                            {listDepartment && listDepartment.map((item) => <OptionDeparmentParent explorer={item} />)}
                                                        </select>
                                                        {values.parentId && (
                                                            <div className="x-selected" onClick={() => handleClear(setSelectedValue, "parent")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Khối nghiệp vụ</label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" value={values.businessBlockId} name='businessBlockId' onChange={onChangeInput}>
                                                            <option value="" hidden>Chọn khối nghiệp vụ</option>
                                                            {listBusinessBlock && listBusinessBlock.map((item, index) => (
                                                                <option value={item.id}>{item.name}</option>
                                                            ))}
                                                        </select>
                                                        {values.businessBlockId && (
                                                            <div className="x-selected" onClick={() => handleClear("businessBlockId")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" className="btn btn-primary" onClick={values.id ? handleSubmitUpdate : handleSubmitCreate}>{values.id ? "CẬP NHẬT" : "THÊM MỚI"} </div>
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

