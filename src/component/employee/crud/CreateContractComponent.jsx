import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { responseData } from '../../../util/ResponseUtil';
import { getListJobPosition } from '../../../service/JobPositionService';
import { getListDepartmentChild } from '../../../service/DepartmentService';
import { countContractAppendix, createContract } from '../../../service/Manage/ManageContractService';
import { getResumeProfile } from '../../../service/EmployeeService';
import { checkValidatorAllowanceContract, checkValidatorContract, CONTRACT_CREATE_APPENDIX, CONTRACT_CREATE_NEW } from '../../../util/ContractUtil';
import { getContractProfileByEmloyeeId } from '../../../service/ContractService';
import { getListContractType } from '../../../service/ContractTypeService';
import { getAllowanceByContractType, getListAllownace } from '../../../service/AllowanceService';

const CreateContractComponent = ({ employeeId, typeOpen, updateListContract }) => {
    const modalId = "create-contract"
    const TYPE_CREATE_NEW = "#create-contract";
    const TYPE_CREATE_APPDIX = "#create-contract-appdix"

    const [listDepartment, setListDepartment] = useState([])
    const [listJobposition, setLisJobPosition] = useState([])
    const [listAllowance, setListAllowance] = useState([])
    const [listContractType, setLisContractType] = useState([])
    const [hasFetched, setHasFetched] = useState(false);
    const [contractDetail, setContractDetail] = useState({
        employeeName: "",
        employeeCode: "",
        contractCode: "",
        contractType: 0,
        department: 0,
        jobPosition: 0,
        contractMethod: null,
        salaryGross: 0,
        dateStart: "",
        dateEnd: "",
        dateSign: ""
    })
    const [allowances, setAllowances] = useState({})

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
        if (typeOpen.at(-1) === TYPE_CREATE_APPDIX) {
            const fetchAll = async () => {
                const response = await getContractProfileByEmloyeeId(employeeId)
                if (response.data.code === 1000) {
                    const contractProfile = response.data.data
                    const responseCount = await countContractAppendix(contractProfile.contractId)
                    if (responseCount.data.code === 1000) {
                        const count = responseCount.data.data
                        setContractDetail({
                            employeeId: employeeId,
                            contractCode: contractProfile.contractCode + "_" + (count + 1),
                            employeeCode: contractProfile.employeeCode,
                            employeeName: contractProfile.employeeName,
                            contractType: "",
                            department: "",
                            jobPosition: "",
                            contractMethod: null,
                            salaryGross: "",
                            dateStart: "",
                            dateEnd: "",
                            dateSign: "",
                            parent: contractProfile.contractId,
                            createType: CONTRACT_CREATE_APPENDIX
                        })
                    }
                    setAllowances([])
                }
            }
            fetchAll()
        } else if (typeOpen.at(-1) === TYPE_CREATE_NEW) {
            const fetchAll = async () => {
                const response = await getResumeProfile(employeeId)
                if (response.data.code === 1000) {
                    const employeeResponse = response.data.data
                    setContractDetail({
                        employeeId: employeeId,
                        contractCode: "",
                        employeeCode: employeeResponse.employeeCode,
                        employeeName: employeeResponse.fullName,
                        contractType: "",
                        department: "",
                        jobPosition: "",
                        contractMethod: null,
                        salaryGross: "",
                        dateStart: "",
                        dateEnd: "",
                        dateSign: "",
                        createType: CONTRACT_CREATE_NEW
                    })
                }
                setAllowances([])
            }
            fetchAll()
        }

        if (!hasFetched && (typeOpen.at(-1) === TYPE_CREATE_NEW || typeOpen.at(-1) === TYPE_CREATE_APPDIX)) {
            setHasFetched(true)
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

    }, [typeOpen])

    const onChangeInputAmountAndUnit = (index, event) => {
        const { name, value } = event.target;
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value, isUpdate: 'update' } : row
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
                i === index ? { ...row, allowanceId: id, amount: amount, unit: unit, isUpdate: 'update' } : row
            )
        );
    };

    const handleClearGenerate = (name) => {
        setContractDetail({ ...contractDetail, [name]: "" })
    };


    const handleClearAllowance = (index) => {
        setAllowances(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, allowanceId: '', amount: '', unit: '' } : row
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
                    i === index ? { ...allowance, isUpdate: "delete" } : allowance
                )
            );
        } else {
            setAllowances(allowances.filter(allowance => allowance.id !== id));
        }
    };

    const handleUpdateContract = async (e) => {
        e.preventDefault()
        const isCorrectInfo = checkValidatorContract(contractDetail);
        if (!isCorrectInfo) {
            return;
        }

        var isCorrect = true;
        for (const element of allowances) {
            if (element.isUpdate !== "delete") {
                if (!checkValidatorAllowanceContract(element)) {
                    isCorrect = false;
                    break;
                }
            }
        }

        if (isCorrect && isCorrectInfo) {
            let response = ""
            response = await createContract(contractDetail, allowances)
            if (response.data.code === 1000) {
                updateListContract()
                toast.success("Cập nhật thành công")
                document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
            } else if (response.data.code > 1000) {
                toast.info(response.data.message)
            } else if (response.data.code < 1000) {
                toast.error("Bảo trì hệ thống")
            }
        }
    }

    return (
        <>
            <div className="modal fade" id={modalId} >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">{typeOpen.at(-1) === TYPE_CREATE_NEW ? "Tạo mới hợp đồng" : "Thêm phụ lục hợp đồng"}</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active">
                                    <div className="modal-body pb-0 overflow-modal-crud">
                                        <div className="col-md-12" style={{ fontSize: "20px" }}>
                                            <i className='ti ti-chevron-down text-danger' /> <label className="form-label text-danger" >Thông tin chung</label>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-7">
                                                <div className="mb-3">
                                                    <label className="form-label">Nhân sự </label>
                                                    <input type="text" className="form-control readonly-input" value={(contractDetail.employeeCode + "-" + contractDetail.employeeName) || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <label className="form-label">Mã hợp đồng </label>
                                                    <input type="text" className={`form-control  ${typeOpen.at(-1) === TYPE_CREATE_NEW ? "" : "readonly-input"}`} name='contractCode' value={contractDetail.contractCode || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Loại hợp đồng </label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" value={Number(contractDetail.contractType)} name='contractType' onChange={onChangeContractType}>
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

                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phòng ban </label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" value={Number(contractDetail.department)} name='department' onChange={onChangeInput}>
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
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Nơi làm việc </label>
                                                    <input type="text" className="form-control readonly-input" value={"Công ty giải pháp phần mềm TDSoftware"} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Vị trí </label>
                                                    <div className="select-wrapper-department">
                                                        <select className="select-crud" value={Number(contractDetail.jobPosition)} name='jobPosition' onChange={onChangeInput}>
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
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Hình thức </label>
                                                    <input type="email" className="form-control" name='method' value={contractDetail.method || ""} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Hiệu lực từ ngày </label>
                                                    <input type="date" className="form-control " name='dateStart' value={contractDetail.dateStart || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Đến ngày </label>
                                                    <input type="date" className="form-control " name='dateEnd' value={contractDetail.dateEnd || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Ngày ký </label>
                                                    <input type="date" className="form-control " name='dateSign' value={contractDetail.dateSign || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Người ký </label>
                                                    <input type="text" className="form-control readonly-input" value={(contractDetail.employeeCode + "-" + contractDetail.employeeName)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ fontSize: "20px" }}>
                                            <i className='ti ti-chevron-down text-danger' /> <label className="form-label text-danger" >Lương và phụ cấp mới</label>
                                        </div>

                                        <div className='row' style={{ marginLeft: "15px" }}>
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <label className="form-label">Mức lương </label>
                                                    <input type="number" className="form-control " name='salaryGross' value={contractDetail.salaryGross || ""} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row' style={{ marginLeft: "15px" }}>
                                            <div className="col-md-10">
                                                <div className="mb-3">
                                                    <table className="table borderless table-create-profile">
                                                        <tbody>
                                                            <tr>
                                                                <th style={{ width: "50%" }}>Phụ cấp</th>
                                                                <th style={{ width: "30%" }}>Số tiền</th>
                                                                <th style={{ width: "30%" }}>Đơn vị</th>
                                                                <th ></th>
                                                            </tr>
                                                            {
                                                                allowances.length > 0 && allowances.filter((item) => item.isUpdate !== "delete").map((item, index) => (
                                                                    <tr>
                                                                        <td>
                                                                            <div className="select-wrapper-department">
                                                                                <select className="select-crud" value={item.allowanceId} name='allowanceId' onChange={(e) => { onChangeInputAllowance(index, e) }}>
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
                                                                            <select className="select-crud" value={item.unit || ""} name='unit' onChange={(e) => onChangeInputAmountAndUnit(index, e)}>
                                                                                <option value={""} hidden>Đơn vị</option>
                                                                                <option value={"Ngày"} >Ngày</option>
                                                                                <option value={"Tháng"} >Tháng</option>
                                                                                <option value={"Năm"} >Năm</option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <div className="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={() => removeRow(index, item.id)}>
                                                                                <i className="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <div className="mb-2 circle" style={{ cursor: "pointer" }}>
                                                    <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRow} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary" onClick={handleUpdateContract}>CẬP NHẬT </button>
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

export default CreateContractComponent;

