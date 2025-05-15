import React, { useEffect, useState } from 'react';
import { getListDepartmentChild } from '../../../service/DepartmentService';
import { responseData } from '../../../util/ResponseUtil';
import { getListJobPosition } from '../../../service/JobPositionService';
import { v4 as uuidv4 } from 'uuid';
import { getListContractType } from '../../../service/ContractTypeService';
import { getAllowanceByContractType, getListAllownace } from '../../../service/AllowanceService';

const CreateNewContractComponent = ({
    isCreateContract,
    setIsCreateContract,
    contractDetail,
    setContractDetail,
    allowances,
    setAllowances
}) => {

    const [listDepartment, setListDepartment] = useState([])
    const [listJobposition, setLisJobPosition] = useState([])
    const [listAllowance, setListAllowance] = useState([])
    const [listContractType, setLisContractType] = useState([])
    const [isFirst, setIsFirst] = useState(true);
    const onChangeInput = (e) => {
        setContractDetail({ ...contractDetail, [e.target.name]: e.target.value })
    }

    const onChangeContractType = (e) => {
        setContractDetail({ ...contractDetail, [e.target.name]: e.target.value })
        getAllowanceByContractType(e.target.value).then((response) => {
            if (response.data.code === 1000) {
                const list = response.data.data
                const updatedData = list.map(item => ({
                    ...item,
                    allowanceId: item.id,
                    id: undefined
                }));
                setAllowances(updatedData)
            }
        })
    }

    useEffect(() => {
        if (isFirst && isCreateContract) {
            setIsFirst(false)
            getListDepartmentChild().then((response) => {
                responseData(response, setListDepartment)
            })

            getListJobPosition().then((response) => {
                responseData(response, setLisJobPosition)
            })

            getListAllownace().then((response) => {
                responseData(response, setListAllowance)
            })

            getListContractType().then((response) => {
                responseData(response, setLisContractType)
            })
        }
    }, [isCreateContract])

    const onChangeInputAmountAndUnit = (index, event) => {
        const { name, value } = event.target;
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value, ["isUpdate"]: 'update' } : row
            )
        );
    };

    const onChangeInputAllowance = (index, event) => {
        const id = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const amount = selectedOption.getAttribute("data-amount");
        const unit = selectedOption.getAttribute("data-unit");

        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: id, ["amount"]: amount, ["unit"]: unit, ["isUpdate"]: 'update' } : row
            )
        );
    };

    const handleClearGenerate = (name) => {
        setContractDetail({ ...contractDetail, [name]: "" })
    };

    const handleClearAllowance = (index) => {
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, ["allowanceId"]: '', ["amount"]: '', ["unit"]: '' } : row
            )
        );
    };

    const addRow = () => {
        setAllowances([...allowances, { id: uuidv4(), allowanceId: "", amount: "", unit: "", isUpdate: 'update' }]);
    };

    const removeRow = (index, id) => {
        if (typeof id === 'number' && !isNaN(id)) {
            setAllowances(prevRows =>
                prevRows.map((allowance, i) =>
                    i === index ? { ...allowance, ["isUpdate"]: "delete" } : allowance
                )
            );
        } else {
            setAllowances(allowances.filter(allowance => allowance.id !== id));
        }
    };

    return (
        <>
            <div class="tab-pane fade " id="create-employee-contract">
                <div class="row mt-2">
                    <div class="col-md-12" style={{ fontSize: "20px" }} onClick={() => setIsCreateContract(!isCreateContract)}>
                        <i className={`${isCreateContract ? "ti ti-chevron-down" : "ti ti-chevron-up"}  text-danger`} /> <label class="form-label text-danger" style={{ cursor: 'pointer' }}>Thông tin hợp đồng</label>
                    </div>
                </div>
                <div className={`${isCreateContract ? "" : "hidden"}`}>
                    <div class="row mt-2">
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label class="form-label">Mã hợp đồng </label>
                                <input type="text" class={`form-control`} name='contractCode' value={contractDetail.contractCode || ""} onChange={onChangeInput} />
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="mb-3">
                                <label class="form-label">Loại hợp đồng </label>
                                <div className="select-wrapper-department">
                                    <select class="select-crud" value={Number(contractDetail.contractType)} name='contractType' onChange={onChangeContractType}>
                                        <option value={""} hidden>Chọn loại hợp đồng</option>
                                        {
                                            listContractType.length > 0 && listContractType.map((item, index) => (
                                                <option value={item.id} >{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {contractDetail.contractType && (
                                        <div className="x-selected" onClick={() => handleClearGenerate("contractType")}>
                                            <i className="ti ti-x"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Phòng ban </label>
                                <div className="select-wrapper-department">
                                    <select class="select-crud" value={Number(contractDetail.department)} name='department' onChange={onChangeInput}>
                                        <option value={""} hidden>Chọn phòng ban</option>
                                        {
                                            listDepartment.length > 0 && listDepartment.map((item, index) => (
                                                <option value={item.id} >{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {contractDetail.department && (
                                        <div className="x-selected" onClick={() => handleClearGenerate("department")}>
                                            <i className="ti ti-x"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Nơi làm việc </label>
                                <input type="text" class="form-control readonly-input" value={"Công ty giải pháp phần mềm TDSoftware"} />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Vị trí </label>
                                <div className="select-wrapper-department">
                                    <select class="select-crud" value={Number(contractDetail.jobPosition)} name='jobPosition' onChange={onChangeInput}>
                                        <option value={""} hidden>Chọn phòng ban</option>
                                        {
                                            listJobposition.length > 0 && listJobposition.map((item, index) => (
                                                <option value={item.id} >{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {contractDetail.jobPosition && (
                                        <div className="x-selected" onClick={() => handleClearGenerate("jobPosition")}>
                                            <i className="ti ti-x"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Hình thức </label>
                                <input type="email" class="form-control" name='method' value={contractDetail.method || ""} />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Hiệu lực từ ngày </label>
                                <input type="date" class="form-control " name='dateStart' value={contractDetail.dateStart || ""} onChange={onChangeInput} />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Đến ngày </label>
                                <input type="date" class="form-control " name='dateEnd' value={contractDetail.dateEnd || ""} onChange={onChangeInput} />
                            </div>
                        </div>
                    </div>

                    <div class="row mt-2">
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label class="form-label">Ngày ký </label>
                                <input type="date" class="form-control " name='dateSign' value={contractDetail.dateSign || ""} onChange={onChangeInput} />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12" style={{ fontSize: "20px" }}>
                        <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Lương và phụ cấp mới</label>
                    </div>

                    <div className='row' style={{ marginLeft: "15px" }}>
                        <div class="col-md-3">
                            <div class="mb-3">
                                <label class="form-label">Mức lương </label>
                                <input type="number" class="form-control " name='salaryGross' value={contractDetail.salaryGross || ""} onChange={onChangeInput} />
                            </div>
                        </div>
                    </div>

                    <div className='row' style={{ marginLeft: "15px" }}>
                        <div class="col-md-8">
                            <div class="mb-3">
                                <table class="table borderless table-create-profile">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: "50%" }}>Phụ cấp</th>
                                            <th style={{ width: "30%" }}>Số tiền</th>
                                            <th style={{ width: "30%" }}>Đơn vị</th>
                                            <th ></th>
                                        </tr>
                                        {
                                            allowances.length > 0 && allowances.filter((item) => item.isUpdate != "delete").map((item, index) => (
                                                <tr>
                                                    <td>
                                                        <div className="select-wrapper-department">
                                                            <select class="select-crud" value={item.allowanceId} name='allowanceId' onChange={(e) => { onChangeInputAllowance(index, e) }}>
                                                                <option value={""} hidden>Chọn phụ cấp</option>
                                                                {
                                                                    listAllowance.length > 0 && listAllowance.map((item, index) => (
                                                                        <option value={item.id} data-amount={item.amount} data-unit={item.unit}>{item.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                            {item.allowanceId && (
                                                                <div className="x-selected" onClick={() => handleClearAllowance(index)}>
                                                                    <i className="ti ti-x"></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td><input type="text" className="form-control" name='amount' value={item.amount || ""} onChange={(e) => onChangeInputAmountAndUnit(index, e)} /></td>
                                                    <td>
                                                        <select class="select-crud" value={item.unit || ""} name='unit' onChange={(e) => onChangeInputAmountAndUnit(index, e)}>
                                                            <option value={""} hidden>Đơn vị</option>
                                                            <option value={"Ngày"} >Ngày</option>
                                                            <option value={"Tháng"} >Tháng</option>
                                                            <option value={"Năm"} >Năm</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(index, item.id)}>
                                                            <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start">
                            <div class="mb-2 circle" style={{ cursor: "pointer" }}>
                                <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRow} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewContractComponent;

