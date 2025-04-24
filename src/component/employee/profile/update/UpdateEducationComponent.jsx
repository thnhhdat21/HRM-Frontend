import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { updateFamilyOfEmployee } from '../../../../service/FamilyService';
import { updateEducationProfile } from '../../../../service/EducationService';

const UpdateEducationComponent = ({ employeeId, education, openModal, updateEducation }) => {
    const modalId = "update-education";
    const [rows, setRows] = useState([{
        id: uuidv4(),
        employeeId: employeeId,
        toMonth: "",
        fromMonth: "",
        level: "",
        placeTraining: "",
        major: "",
        methodTraining: "",
        isUpdate: ""
    }]);

    useEffect(() => {
        if (openModal.at(-1) === `#${modalId}`)
            setRows(education.map(item => ({ ...item, employeeId, isUpdate: "" })));
    }, [openModal])

    const onChangeInputCreate = (index, event) => {
        const { name, value } = event.target;
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value, ["isUpdate"]: "update" } : row
            )
        );
    }

    const addRow = () => {
        setRows([...rows, {
            id: uuidv4(),
            employeeId: employeeId,
            toMonth: "",
            fromMonth: "",
            level: "",
            placeTraining: "",
            major: "",
            methodTraining: "",
            isUpdate: ""
        }]);
    };

    const removeRow = (index, id) => {
        if (typeof id === 'number' && !isNaN(id)) {
            setRows(prevRows =>
                prevRows.map((row, i) =>
                    row.id === id ? { ...row, ["isUpdate"]: "delete" } : row
                )
            );
        } else {
            setRows(rows.filter(row => row.id !== id));
        }

    };

    const checkValidator = (values) => {
        if (values.toMonth.trim().length === 0 || values.toMonth === null) {
            toast.error("Yêu cầu nhập thông tin tháng bắt đầu!")
            return false;
        } else if (values.fromMonth.trim().length === 0 || values.fromMonth === null) {
            toast.error("Yêu cầu nhập thông tin tháng kết thúc!")
            return false;
        } else if (values.level.trim().length === 0 || values.level === null) {
            toast.error("Yêu cầu nhập thông tin trình độ học vấn!")
            return false;
        } else if (values.placeTraining.trim().length === 0 || values.placeTraining === null) {
            toast.error("Yêu cầu nhập thông tin nơi đào tạo!")
            return false;
        } else if (values.major.trim().length === 0 || values.major === null) {
            toast.error("Yêu cầu nhập thông tin chuyên ngành")
            return false;
        } else if (values.methodTraining.trim().length === 0 || values.methodTraining === null) {
            toast.error("Yêu cầu nhập thông tin hình thức đào tạo!")
            return false;
        }
        return true
    }

    const handleUpdateFamily = (e) => {
        e.preventDefault()
        var isCorrect = true;
        for (const element of rows) {
            if (!checkValidator(element)) {
                isCorrect = false;
                break;
            }
        }
        if (isCorrect) {
            updateEducationProfile(rows).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công!")
                    if (updateEducation !== null)
                        updateEducation()
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }
    return (
        <>
            <div class="modal fade" id={modalId}>
                <div class="modal-dialog modal-dialog-centered modal-lg modal-update-job-history">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Cập nhật Trình độ học vấn</h4>
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
                                                    <table class="table table-add table-leave">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "10%" }}>Từ tháng</th>
                                                                <th style={{ width: "10%" }}>Đến Tháng</th>
                                                                <th style={{ width: "10%" }}>Trình độ học vấn</th>
                                                                <th >Nơi đào tạo</th>
                                                                <th>Chuyên ngành</th>
                                                                <th style={{ width: "10%" }}>Hình thức đào tạo</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rows.filter((item) => item.isUpdate != "delete").map((row, index) => (
                                                                <tr key={row.id}>
                                                                    <td><input type="month" className="form-control" name='toMonth' value={row.toMonth} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="month" className="form-control" name='fromMonth' value={row.fromMonth} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='level' value={row.level} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='placeTraining' value={row.placeTraining} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='major' value={row.major} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='methodTraining' value={row.methodTraining} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td>
                                                                        <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={(e) => removeRow(row.id)}>
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
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={handleUpdateFamily}>CẬP NHẬT </button>
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

export default UpdateEducationComponent;

