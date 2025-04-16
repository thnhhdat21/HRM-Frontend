import React, { useEffect, useState } from 'react';
import '../css/crud-style.css';
import { createContractType, getContracTypeDetail, getListContractType, updateContractType } from '../../../service/ContractTypeService';
import { getListAllownace } from '../../../service/AllowanceService';
import { responseData, responseUpdate } from '../../../util/ResponseUtil';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { CONTRACT_HAS_NO_TERM, contractTypeSelect } from '../../../util/ContractTypeUtil';


const TypeContractCRUDComponent = ({ selectedId, setListContractType, typeOpen }) => {
    const [allowancePrev, setAllowancePrev] = useState("");
    const [selectedAllowance, setSelectedAllowance] = useState("");
    const [listAllowance, setListAllowance] = useState({});
    const [values, setValues] = useState({
        name: "",
        type: "",
        method: "",
        term: "",
        unit: "",
        insurance: ""
    })
    const [rows, setRows] = useState([{ id: uuidv4(), allowanceId: "", amount: "" }]);

    useState(() => {
        getListAllownace().then((response) => {
            responseData(response, setListAllowance)
        })
    }, [])

    useEffect(() => {
        if (typeOpen.at(-1) === "edit" && selectedId) {
            getContracTypeDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const contractTypeDettail = response.data.data
                    setAllowancePrev(contractTypeDettail.allowances)
                    setSelectedAllowance(contractTypeDettail.allowances.split(",").map(Number))
                    setValues({
                        name: contractTypeDettail.name || "",
                        type: contractTypeDettail.type || "",
                        method: contractTypeDettail.method || "",
                        term: contractTypeDettail.term || "",
                        unit: contractTypeDettail.unit || "",
                        insurance: contractTypeDettail.insurance || ""
                    });
                    if (listAllowance.length > 0 && contractTypeDettail.allowances.trim().length > 0) {
                        const newRows = listAllowance
                            .filter(item => contractTypeDettail.allowances.includes(item.id))
                            .map(item => ({
                                id: uuidv4(),
                                allowanceId: item.id + '',
                                amount: item.amount
                            }));
                        setRows(newRows);
                    } else {
                        setRows([{ id: uuidv4(), allowanceId: "", amount: "" }])
                    }
                }
            })
        } else if (typeOpen.at(-1) === "open") {
            setValues({
                name: "",
                type: "",
                method: "",
                term: "",
                unit: "",
                insurance: ""
            })
            setRows([{ id: uuidv4(), allowanceId: "", amount: "" }])
            setSelectedAllowance("")
            setAllowancePrev("")
        }
    }, [typeOpen, selectedId]);

    const onChangeInputGeneral = (e) => {
        const { name, value } = e.target;
        const updatedValues = { ...values, [name]: value };

        if (name === "type") {
            const selectedOption = e.target.selectedOptions[0];
            const insurance = selectedOption.getAttribute("data-insurance");
            updatedValues["insurance"] = insurance;
        }

        setValues(updatedValues);
    };


    const onChangeInputAllowance = (index, event) => {
        const id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const amount = selectedOption.getAttribute("data-amount");

        setSelectedAllowance((prevState) => [...prevState, Number(id)]);
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: id, ["amount"]: amount } : row
            )
        );
    };
    const handleClearGeneral = (name) => {
        setValues({ ...values, [name]: '' })
    }

    const handleClear = (index, id) => {
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: '', ["amount"]: '' } : row
            )
        );
        setSelectedAllowance((prevState) => prevState.filter((item) => item !== Number(id)));
    };

    const addRow = () => {
        setRows([...rows, { id: uuidv4(), allowanceId: "", amount: "" }]);
    };

    const removeRow = (id, allowanceId) => {
        setRows(rows.filter(row => row.id !== id));
        setSelectedAllowance((prevState) => prevState.filter((item) => item !== Number(allowanceId)));
    };

    const handleCreateContractType = () => {
        var isCorrect = true;
        isCorrect = validator(isCorrect, values.name, values.type, values.method, values.term, values.unit)
        if (isCorrect) {
            var allowanceIds = rows.map(item => item.allowanceId);
            if (allowanceIds.length === 0 && allowanceIds[0] == null && allowanceIds[0].trim().length === 0) {
                allowanceIds = null;
            } else {
                allowanceIds = allowanceIds
                    .filter(id => id !== '')
                    .map(Number)
                    .sort((a, b) => a - b)
            }
            createContractType(values.name, values.type, values.insurance, values.method, values.term, values.unit, allowanceIds).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListContractType, getListContractType)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_type_contract [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const handlUpdateContractType = () => {
        var isCorrect = true;
        isCorrect = validator(isCorrect, values.name, values.type, values.method, values.term, values.unit)
        if (isCorrect) {
            var allowanceIds = rows.map(item => item.allowanceId);
            if (allowanceIds.length === 0 && allowanceIds[0] == null && allowanceIds[0].trim().length === 0) {
                allowanceIds = null;
            } else {
                allowanceIds = allowanceIds
                    .filter(id => id !== '')
                    .map(Number)
                    .sort((a, b) => a - b)
            }
            const updateAllowance = JSON.stringify(allowancePrev.split(",").map(Number).sort((a, b) => a - b)) !== JSON.stringify(allowanceIds
                ? allowanceIds
                : [0]);
            updateContractType(selectedId, values.name, values.type, values.insurance, values.method, values.term, values.unit, allowanceIds, updateAllowance).then((response) => {
                responseUpdate(response, "Thêm mới thành công", setListContractType, getListContractType)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_type_contract [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }


    const validator = (isCorrect, name, type, method, term, unit) => {
        if (name.trim().length <= 0) {
            toast.error("Vui lòng nhập tên")
            isCorrect = false;
        } else if (type.trim().length <= 0) {
            toast.error("Vui lòng chọn loại hợp đồng")
            isCorrect = false;
        } else if (method.trim().length <= 0) {
            toast.error("Vui lòng chọn hình thức")
            isCorrect = false;
        } else if (type !== CONTRACT_HAS_NO_TERM) {
            if (Number(term) <= 0) {
                toast.error("Số giới hạn không hợp lệ")
                isCorrect = false;
            } else if (unit.trim().length <= 0) {
                toast.error("Vui lòng nhập đơn vị")
                isCorrect = false;
            }
        }
        return isCorrect
    }
    return (
        <>
            <div class="modal fade" id="crud_type_contract">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới loại hợp đồng lao động</h4>
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
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên hợp đồng</label>
                                                    <input type="email" class="form-control" name='name' value={values.name} onChange={onChangeInputGeneral} />
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="mb-3">
                                                    <label class="form-label">Loại hợp động</label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.type} name='type' onChange={onChangeInputGeneral}>
                                                            <option value={""} hidden>Chọn loại hợp đồng</option>
                                                            {
                                                                contractTypeSelect.map((item) => (
                                                                    <option value={item.name} data-insurance={item.insurance}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {values.unit && (
                                                            <div className="x-selected" onClick={() => handleClearGeneral("type")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Hình thức <span class="text-danger" >
                                                        *</span></label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.method} name='method' onChange={onChangeInputGeneral}>
                                                            <option value={""} hidden>Chọn hình thức</option>
                                                            <option value={"Toàn thời gian"}>Toàn thời gian</option>
                                                            <option value={"Bán thời gian"}>Bán thời gian</option>
                                                        </select>
                                                        {values.unit && (
                                                            <div className="x-selected" onClick={() => handleClearGeneral("method")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Thời hạn </label>
                                                    <input type="number" class="form-control" name='term' value={values.term} onChange={onChangeInputGeneral} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Đơn vị </label>
                                                    <div className="select-wrapper-department">
                                                        <select class="select-crud" value={values.unit} name='unit' onChange={onChangeInputGeneral}>
                                                            <option value={""} hidden>Chọn đơn vị</option>
                                                            <option value={"Ngày"}>Ngày</option>
                                                            <option value={"Tháng"}>Tháng</option>
                                                            <option value={"Năm"}>Năm</option>
                                                        </select>
                                                        {values.unit && (
                                                            <div className="x-selected" onClick={() => handleClearGeneral("unit")}>
                                                                <i className="ti ti-x"></i>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Phụ cấp</label>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <table class="table table-add">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "60%" }}>Tên phụ cấp</th>
                                                                    <th>Số tiền</th>
                                                                    <th style={{ width: "5%" }}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {rows.map((row, index) => (
                                                                    <tr key={row.id}>
                                                                        <td>
                                                                            <div className="select-wrapper-department">
                                                                                <select class="select-crud" value={row.allowanceId} onChange={(event) => onChangeInputAllowance(index, event)}>
                                                                                    <option value={""} hidden>Chọn phụ cấp</option>
                                                                                    {
                                                                                        listAllowance.length > 0 && listAllowance.map((item, index) => (
                                                                                            <option hidden={selectedAllowance.includes(item.id)} value={item.id} data-amount={item.amount}>{item.name}</option>
                                                                                        ))
                                                                                    }
                                                                                </select>
                                                                                {row.allowanceId && (
                                                                                    <div className="x-selected" onClick={() => handleClear(index, row.allowanceId)}>
                                                                                        <i className="ti ti-x"></i>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </td>
                                                                        <td><input type="number" className="form-control readonly-input" value={row.amount} readOnly /></td>
                                                                        <td>
                                                                            <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(row.id, row.allowanceId)}>
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
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === "edit" ? handlUpdateContractType : handleCreateContractType}>{typeOpen.at(-1) === "edit" ? "CẬP NHẬT" : "THÊM MỚI"} </div>
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

export default TypeContractCRUDComponent;

