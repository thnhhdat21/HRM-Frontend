import React, { useEffect, useState } from 'react';
import { getContractHistory, getContractProfileByContractId, getContractProfileByEmloyeeId, getListContractOfEmployee } from '../../../../service/ContractService';
import { CONTRACT_STATE_WAITING, CONTRACT_STEATE_CHECKED, ContractState, ContractStatus } from '../../../../util/ContractUtil';
import { convertDate } from '../../../../util/TimeUtil';
import { PROFILE_CONTRACT } from '../../../../util/EmployeeUtil';
import UpdateContractComponent from '../update/UpdateContractComponent';
import { toast } from 'react-toastify';

const EmployeeContractComponent = ({ employeeId, navId }) => {
    const modalId = "#update-contract-profile";
    const modalIdEdit = "#update-contract-profile-edit";
    const modalIdCreate = "#update-contract-profile-create";

    const [contract, setContract] = useState({})
    const [contractHistory, setContractHistory] = useState({})
    const [listContractOfEmployee, setListContractOfEmployee] = useState([])
    const [hasFetched, setHasFetched] = useState(false);
    const [openModal, setOpenModal] = useState([])
    const [pagePrev, setPagePrev] = useState([])
    console.log(listContractOfEmployee)
    useEffect(() => {
        if (Number(navId) === PROFILE_CONTRACT && !hasFetched) {
            setHasFetched(true)
            const fetchAll = async () => {
                const contractProfile = await getContractProfileByEmloyeeId(employeeId)
                if (contractProfile.data.code === 1000) {
                    const contractHistory = await getContractHistory(contractProfile.data.data.contractId)
                    const contractListOfEmployee = await getListContractOfEmployee(employeeId)
                    if (contractHistory.data.code === 1000)
                        setContractHistory(contractHistory.data.data)
                    if (contractListOfEmployee.data.code === 1000) {
                        setListContractOfEmployee(contractListOfEmployee.data.data)
                    }
                    setContract(contractProfile.data.data)
                } else if (contractProfile.data.code > 1000) {
                    toast.info(contractProfile.data.message)
                }
            }
            fetchAll();
        }
    }, [navId])

    const handleOpenModal = (modalId) => {
        setOpenModal([...openModal, modalId]);
    };

    const updateContractProfile = async (e) => {
        const contractProfile = await getContractProfileByEmloyeeId(employeeId)
        if (contractProfile.data.code === 1000) {
            const contractHistory = await getContractHistory(contractProfile.data.data.contractId)
            if (contractHistory.data.code === 1000) {
                setContractHistory(contractHistory.data.data)
            }
            if (openModal.at(-1) === "open") {
                getListContractOfEmployee(employeeId).then((response) => {
                    if (response.data.code === 1000) {
                        setListContractOfEmployee(response.data.data)
                    }
                })
            }
            setContract(contractProfile.data.data)
        }
    }

    const handleClickAppendix = async (id) => {
        setPagePrev([...pagePrev, contract.contractId])
        const responseContract = await getContractProfileByContractId(id)
        if (responseContract.data.code === 1000) {
            const contractHistory = await getContractHistory(responseContract.data.data.contractId)
            if (contractHistory.data.code === 1000) {
                setContractHistory(contractHistory.data.data)
            } else {
                setContractHistory([])
            }
            setContract(responseContract.data.data)
        }
    }

    const handleButtonBack = async () => {
        const contractProfile = await getContractProfileByContractId(pagePrev.at(-1))
        if (contractProfile.data.code === 1000) {
            const contractHistory = await getContractHistory(contractProfile.data.data.contractId)
            if (contractHistory.data.code === 1000) {
                setContractHistory(contractHistory.data.data)
            }
            getListContractOfEmployee(employeeId).then((response) => {
                if (response.data.code === 1000) {
                    setListContractOfEmployee(response.data.data)
                }
            })
            setPagePrev(prev => prev.slice(0, -1))
            setContract(contractProfile.data.data)
        }
    }
    return (
        <>
            <div class="tab-pane fade " id="profile-contract" style={{ margin: "60px 10px 0 10px" }}>
                <div class="row">
                    <div class="col-xl-8">
                        <div class="card flex-fill">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <div class="d-flex align-items-center justify-content-between flex-wrap button-header">
                                    <i className="ti ti-arrow-left ti-icon"
                                        onClick={handleButtonBack}
                                        style={{ fontSize: "20px", marginRight: "10px", display: pagePrev.length > 0 ? "" : 'none' }}></i>
                                    <h6>Thông tin chung</h6>
                                </div>

                                <div style={{ marginRight: "10px" }}>
                                    <div class="d-flex align-items-center justify-content-between flex-wrap button-header">
                                        {
                                            contract.state === CONTRACT_STATE_WAITING &&
                                            <i className='ti ti-edit ti-icon'
                                                data-bs-toggle="modal"
                                                data-bs-target={modalId}
                                                style={{ fontSize: "25px" }}
                                                onClick={() => handleOpenModal(modalIdEdit)}
                                            />
                                        }
                                        {
                                            contract.state === CONTRACT_STEATE_CHECKED &&
                                            <button type="button"
                                                class="btn btn-outline-light border btn-add"
                                                data-bs-toggle="modal"
                                                data-bs-target={modalId}
                                                style={{ display: Number(contract.parent) !== 0 ? 'none' : "", marginLeft: "20px" }}
                                                onClick={() => handleOpenModal(modalIdCreate)}
                                            ><i className='ti ti-plus' style={{ fontSize: "20px" }} />
                                            </button>
                                        }
                                    </div>

                                    {/* Người duyệt */}
                                    {/* <div>
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal"><i className='ti ti-x' style={{ fontSize: "13px" }} /> Không duyệt</button>
                                        <button type="submit" class="btn btn-primary"><i className='ti ti-check' style={{ fontSize: "15px" }} /> Duyệt </button>
                                    </div> */}

                                    {/* Người Ký */}
                                    {/* <div style={{ display:  }}>
                                        <button type="submit" class="btn btn-primary"><i className='fas fa-pen-nib' style={{ fontSize: "13px" }} /> Xác nhận </button>
                                    </div> */}
                                </div>
                            </div>
                            <div class="card-body p-0">

                                <div style={{ padding: "16px" }}>
                                    <div class="row">
                                        <label class="form-label" style={{ fontSize: "15px" }}>Thông tin hợp đồng</label>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Mã HĐ</label>
                                                <span>{contract.contractCode}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Tên nhân sự</label>
                                                <span className='ms-3'>{contract.employeeName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Tên hợp đồng</label>
                                                <span>{contract.contractType}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Phòng ban</label>
                                                <span>{contract.department}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Vị trí</label>
                                                <span>{contract.jobPosition}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Chức vụ</label>
                                                <span>{contract.duty}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Nơi làm việc</label>
                                                <span>Công ty giải pháp phần mềm TDSoftware</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Hình thức hợp đồng</label>
                                                <span>{contract.method}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Hiệu lực từ ngày</label>
                                                <span>{convertDate(contract.dateStart)}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Tình trạng</label>
                                                <p class={`badge ${contract.contractStatus ? ContractStatus.get(contract.contractStatus).bg : ""}`}>{contract.contractStatus ? ContractStatus.get(contract.contractStatus).name : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-12">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Mô tả</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <label class="form-label" style={{ fontSize: "15px" }}>Lương và phụ cấp</label>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Lương cở bản gross</label>
                                                <span className='ms-3'>{Number(contract.salaryGross).toLocaleString('vi-VN') + ' VNĐ'}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Phụ cấp</label>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <th>Tên phụ cấp</th>
                                                            <th>Số tiền</th>
                                                        </tr>
                                                        {
                                                            contract.allowances && contract.allowances.length > 0 && contract.allowances.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.amount !== 0 ? Number(item.amount).toLocaleString("vi-VN") + " / " : ""} {item.unit}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card flex-fill">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <h5>Danh sách hợp đồng</h5>
                            </div>
                            <div class="card-body p-0">
                                <div style={{ padding: "16px", paddingTop: "0px" }}>
                                    <div class="row mt-2">
                                        <table class="table borderless profile-details contract-append">
                                            <tbody>
                                                <tr>
                                                    <th>Mã hợp đồng</th>
                                                    <th>Tên hợp đồng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Tình trạng</th>
                                                    <th>Ngày ký</th>
                                                    <th>Ngày có hiệu lực</th>
                                                </tr>
                                                {listContractOfEmployee.length > 0 && listContractOfEmployee.map((item, index) => (
                                                    <tr onDoubleClick={(e) => handleClickAppendix(item.id)}>
                                                        <td>{item.code}</td>
                                                        <td>{item.name}</td>
                                                        <td><span class={`badge ${item.status ? ContractStatus.get(item.status).bg : ""}`}>{item.status ? ContractStatus.get(item.status).name : ""}</span></td>
                                                        <td><span class={`badge ${item.state ? ContractState.get(item.state).bg : ""}`}>{item.state ? ContractState.get(item.state).name : ""}</span></td>
                                                        <td>{item.dateSign}</td>
                                                        <td>{item.dateStart}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header">
                                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Lịch sử hoạt động</h6>
                                </div>
                            </div>
                            <div class="card-body schedule-timeline activity-timeline">
                                {contractHistory.length > 0 && contractHistory.map((item, index) => (
                                    <div class="d-flex align-items-start">
                                        <div class={`avatar avatar-md avatar-rounded ${item.state ? ContractState.get(item.state).bg : ""} flex-shrink-0 dots-history`}>
                                        </div>
                                        <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                            <span>{item.createdAt} - {item.state ? ContractState.get(item.state).textType : ""} {item.createdBy}</span>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p class="fw-medium text-gray-9 mb-1">{item.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <UpdateContractComponent
                employeeId={employeeId}
                contractId={contract.contractId}
                openModal={openModal}
                updateContractProfile={updateContractProfile}
                count={listContractOfEmployee.length} />
        </>
    );
};

export default EmployeeContractComponent;