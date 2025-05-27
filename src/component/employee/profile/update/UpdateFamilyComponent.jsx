import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { updateFamilyOfEmployee } from '../../../../service/FamilyService';

const UpdateFamilyComponent = ({ employeeId, family, openModal, updateFamily }) => {
    const modalId = "update-family"
    const [rows, setRows] = useState([{
        id: uuidv4(),
        employeeId: employeeId,
        fullName: "",
        relationShip: "",
        dateOfBirth: "",
        identityCard: "",
        issueDateCCCD: "",
        placeCCCD: "",
        phoneNumber: "",
        dependent: 0,
        taxCode: "",
        isUpdate: ""
    }]);

    useEffect(() => {
        if (openModal.at(-1) === `#${modalId}`)
            setRows(family.map(item => ({ ...item, employeeId, isUpdate: "" })));
    }, [openModal])

    const onChangeInputCreate = (index, event) => {
        const { name, value } = event.target;
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value, isUpdate: "update" } : row
            )
        );
    }

    const addRow = () => {
        setRows([...rows, {
            id: uuidv4(),
            employeeId: employeeId,
            fullName: "",
            relationShip: "",
            dateOfBirth: "",
            identityCard: "",
            issueDateCCCD: "",
            placeCCCD: "",
            phoneNumber: "",
            dependent: false,
            taxCode: "",
            isUpdate: ""
        }]);
    };

    const removeRow = (id) => {
        if (typeof id === 'number' && !isNaN(id)) {
            setRows(prevRows =>
                prevRows.map((row, i) =>
                    row.id === id ? { ...row, isUpdate: "delete" } : row
                )
            );
        } else {
            setRows(rows.filter(row => row.id !== id));
        }
    };

    const checkValidator = (values) => {
        if (values.relationShip.trim().length === 0 || values.relationShip === null) {
            toast.error("Yêu cầu chọn mối quan hệ!")
            return false;
        } else if (values.fullName.trim().length === 0 || values.fullName === null) {
            toast.error("Yêu cầu nhập họ và tên!")
            return false;
        } else if (values.dateOfBirth.trim().length === 0 || values.dateOfBirth === null) {
            toast.error("Yêu cầu nhập ngày sinh!")
            return false;
        } else if (values.identityCard.trim().length === 0 || values.identityCard === null) {
            toast.error("Yêu cầu nhập thông tin CMT/Căn cước!")
            return false;
        } else if (values.issueDateCCCD.trim().length === 0 || values.issueDateCCCD === null) {
            toast.error("Yêu cầu nhập thông tin ngày cấp CMT/Căn cước")
            return false;
        } else if (values.placeCCCD.trim().length === 0 || values.placeCCCD === null) {
            toast.error("Yêu cầu nhập thông tin nơi cấp CMT/Căn cước!")
            return false;
        } else if (values.phoneNumber.trim().length === 0 || values.phoneNumber === null) {
            toast.error("Yêu cầu nhập thông tin số điện thoại!")
            return false;
        }
        else if (values.taxCode.trim().length === 0 || values.taxCode === null) {
            toast.error("Yêu cầu nhập thông tin mã số thuế!")
            return false;
        }
        return true
    }

    const handleUpdateFamily = (e) => {
        e.preventDefault()
        var isCorrect = true;
        for (const element of rows) {
            if (element.isUpdate !== "delete") {
                if (!checkValidator(element)) {
                    isCorrect = false;
                    break;
                }
            }
        }
        if (isCorrect) {
            updateFamilyOfEmployee(rows).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công!")
                    if (updateFamily !== null)
                        updateFamily()
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }

    return (
        <>
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog modal-dialog-centered modal-lg modal-update-family">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Cập nhật thông tin gia đình</h4>
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
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <table className="table table-add table-leave">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "5%" }}>Mối QH</th>
                                                                <th style={{ width: "15%" }}>Họ và tên</th>
                                                                <th>Ngày sinh</th>
                                                                <th style={{ width: "15%" }}>CMT/Căn cước</th>
                                                                <th>Ngày cấp</th>
                                                                <th >Nơi cấp</th>
                                                                <th>Điện thoại</th>
                                                                <th>Phụ thuộc</th>
                                                                <th>Mã số thuế</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rows.filter((item) => item.isUpdate !== "delete").map((row, index) => (
                                                                <tr key={row.id}>
                                                                    <td>
                                                                        <select className="form-control" value={row.relationShip} name='relationShip' onChange={(e) => onChangeInputCreate(index, e)}>
                                                                            <option value="" selected hidden>Chọn</option>
                                                                            <option value={"Ông"}>Ông</option>
                                                                            <option value={"Bà"}>Bà</option>
                                                                            <option value={"Bố"}>Bố</option>
                                                                            <option value={"Mẹ"}>Mẹ</option>
                                                                            <option value={"Anh"}>Anh</option>
                                                                            <option value={"Chị"}>Chị</option>
                                                                            <option value={"Em"}>Em</option>
                                                                            <option value={"Con"}>Con</option>
                                                                        </select>
                                                                    </td>
                                                                    <td><input type="text" className="form-control" name='fullName' value={row.fullName} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="date" className="form-control" name='dateOfBirth' value={row.dateOfBirth} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='identityCard' value={row.identityCard} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="date" className="form-control" name='issueDateCCCD' value={row.issueDateCCCD} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='placeCCCD' value={row.placeCCCD} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td><input type="text" className="form-control" name='phoneNumber' value={row.phoneNumber} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td>
                                                                        <select className="form-control" value={row.dependent} name='dependent' onChange={(e) => onChangeInputCreate(index, e)}>
                                                                            <option value="" selected hidden>Chọn</option>
                                                                            <option value={true}>Có</option>
                                                                            <option value={false}>Không</option>
                                                                        </select>
                                                                    </td>
                                                                    <td><input type="text" className="form-control" name='taxCode' value={row.taxCode} onChange={(e) => onChangeInputCreate(index, e)} /></td>
                                                                    <td>
                                                                        <div className="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={(e) => removeRow(row.id)}>
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
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary" onClick={handleUpdateFamily}>CẬP NHẬT </button>
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

export default UpdateFamilyComponent;

