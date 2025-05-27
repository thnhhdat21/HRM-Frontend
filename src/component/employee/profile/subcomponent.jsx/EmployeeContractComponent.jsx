import { useEffect, useState } from 'react';
import { getContractProfileByContractId, getContractProfileByEmloyeeId, getListContractOfEmployee } from '../../../../service/ContractService';
import { CONTRACT_STATUS_ACTIVE, ContractStatus } from '../../../../util/ContractUtil';
import { convertDate } from '../../../../util/TimeUtil';
import { PROFILE_CONTRACT } from '../../../../util/EmployeeUtil';
import UpdateContractComponent from '../update/UpdateContractComponent';
import { toast } from 'react-toastify';

const EmployeeContractComponent = ({ employeeId, navId }) => {
    const modalId = "#update-contract-profile";
    const modalIdCreate = "#update-contract-profile-create";

    const [contract, setContract] = useState({})
    const [listContractOfEmployee, setListContractOfEmployee] = useState([])
    const [hasFetched, setHasFetched] = useState(false);
    const [openModal, setOpenModal] = useState([])
    const [pagePrev, setPagePrev] = useState([])

    useEffect(() => {
        if (Number(navId) === PROFILE_CONTRACT && !hasFetched) {
            setHasFetched(true)
            const fetchAll = async () => {
                const contractProfile = await getContractProfileByEmloyeeId(employeeId)
                if (contractProfile.data.code === 1000) {
                    const contractListOfEmployee = await getListContractOfEmployee(employeeId)

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
            getListContractOfEmployee(employeeId).then((response) => {
                if (response.data.code === 1000) {
                    setListContractOfEmployee(response.data.data)
                }
            })
            setContract(contractProfile.data.data)
        }
    }

    const handleClickAppendix = async (id) => {
        setPagePrev([...pagePrev, contract.contractId])
        const responseContract = await getContractProfileByContractId(id)
        if (responseContract.data.code === 1000) {
            setContract(responseContract.data.data)
        }
    }

    const handleButtonBack = async () => {
        const contractProfile = await getContractProfileByContractId(pagePrev.at(-1))
        if (contractProfile.data.code === 1000) {
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
            <div className={` tab-pane fade ${navId === PROFILE_CONTRACT ? "show active" : ""} `} id="profile-contract" style={{ margin: "60px 10px 0 10px" }}>
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <div className="d-flex align-items-center justify-content-between flex-wrap button-header">
                                    <i className="ti ti-arrow-left ti-icon"
                                        onClick={handleButtonBack}
                                        style={{ fontSize: "20px", marginRight: "10px", display: pagePrev.length > 0 ? "" : 'none' }}></i>
                                    <h6>Thông tin chung</h6>
                                </div>

                                <div style={{ marginRight: "10px" }}>
                                    <div className="d-flex align-items-center justify-content-between flex-wrap button-header">

                                        {
                                            contract.status === CONTRACT_STATUS_ACTIVE &&
                                            <button type="button"
                                                className="btn btn-outline-light border btn-add"
                                                data-bs-toggle="modal"
                                                data-bs-target={modalId}
                                                style={{ display: Number(contract.parent) !== 0 ? 'none' : "", marginLeft: "20px" }}
                                                onClick={() => handleOpenModal(modalIdCreate)}
                                            ><i className='ti ti-plus' style={{ fontSize: "20px" }} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">

                                <div style={{ padding: "16px" }}>
                                    <div className="row">
                                        <label className="form-label" style={{ fontSize: "15px" }}>Thông tin hợp đồng</label>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Mã HĐ</label>
                                                <span>{contract.contractCode}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Tên nhân sự</label>
                                                <span className='ms-3'>{contract.employeeName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Tên hợp đồng</label>
                                                <span>{contract.contractType}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Phòng ban</label>
                                                <span>{contract.department}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Vị trí</label>
                                                <span>{contract.jobPosition}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Chức vụ</label>
                                                <span>{contract.duty}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Nơi làm việc</label>
                                                <span>Công ty giải pháp phần mềm TDSoftware</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Hình thức hợp đồng</label>
                                                <span>{contract.method}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Hiệu lực từ ngày</label>
                                                <span>{convertDate(contract.dateStart)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Tình trạng</label>
                                                <p className={`badge ${contract.contractStatus ? ContractStatus.get(contract.contractStatus).bg : ""}`}>{contract.contractStatus ? ContractStatus.get(contract.contractStatus).name : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-12">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Mô tả</label>
                                                <span>{contract.description}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <label className="form-label" style={{ fontSize: "15px" }}>Lương và phụ cấp</label>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Lương cở bản gross</label>
                                                <span className='ms-3'>{contract.salaryGross !== 0 && Number(contract.salaryGross).toLocaleString('vi-VN') + ' VNĐ'}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Phụ cấp</label>
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

                    </div>
                    <div className="col-xl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <h5>Danh sách hợp đồng</h5>
                            </div>
                            <div className="card-body p-0">
                                <div style={{ padding: "16px", paddingTop: "0px" }}>
                                    <div className="row mt-2">
                                        <table className="table borderless profile-details contract-append">
                                            <tbody>
                                                <tr>
                                                    <th>Mã hợp đồng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Ngày hiệu lực</th>
                                                </tr>
                                                {listContractOfEmployee.length > 0 && listContractOfEmployee.map((item, index) => (
                                                    <tr onDoubleClick={(e) => handleClickAppendix(item.id)}>
                                                        <td>{item.code}</td>
                                                        <td><span className={`badge ${item.status ? ContractStatus.get(item.status).bg : ""}`}>{item.status ? ContractStatus.get(item.status).name : ""}</span></td>
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
                </div>
            </div>
            <UpdateContractComponent
                employeeId={employeeId}
                contractId={contract.contractId}
                openModal={openModal}
                updateContractProfile={updateContractProfile}
            />
        </>
    );
};

export default EmployeeContractComponent;