import { useEffect, useState } from 'react';
import { getDecision } from '../../service/DecisionService';
import { responseData } from '../../util/ResponseUtil';
import { convertDate } from '../../util/TimeUtil';
import { getEmployeeNameAndCode } from '../../service/EmployeeService';
import { DECISION_STATE_CHECKED, DECISION_STATE_WATTING, DECISION_TYPE_APPOINT, DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD, DECISION_TYPE_SALARY, DECISION_TYPE_TERMINATION, DECISION_TYPE_TRANSFER, DecisiontState, DecisionType } from '../../util/DecisionUtil';
import { getListDepartmentChild } from '../../service/DepartmentService';
import { getListJobPosition } from '../../service/JobPositionService';
import { getListRewardOrPenalty } from '../../service/RewardAndPenaltyService';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';
import { getListAllownace } from '../../service/AllowanceService';

const DetailDecisionComponent = ({ decisionId, decisionType, typeOpen, setTypeApproveOrDelete, setTypeOpen, isManage }) => {
    const [allowances, setAllowance] = useState(new Map);
    const [department, setDepartment] = useState(new Map);
    const [jobPosition, setJobPosition] = useState(new Map);
    const [rewardAndPenalty, setRewardAndPenalty] = useState(new Map);
    const [decision, setDecision] = useState({});
    const [employee, setEmployee] = useState({})
    const modalDecision = decisionType ? DecisionType.get(decisionType).modal : "";

    useEffect(() => {
        if (typeOpen.at(-1) === "decision_detail") {
            getDecision(decisionId).then((response) => {
                responseData(response, setDecision)
                if (response.data.code === 1000) {
                    getEmployeeNameAndCode(response.data.data.employeeId).then((response) => {
                        if (response.data.code === 1000) {
                            const employee = response.data.data
                            setEmployee(employee)
                        }
                    })
                }
            })

            if (decisionType === DECISION_TYPE_SALARY) {
                getListAllownace().then((response) => {
                    if (response.data.code === 1000) {
                        const list = response.data.data
                        const allowanceMap = new Map();
                        list.forEach(item => {
                            allowanceMap.set(item.id, item);
                        });
                        setAllowance(allowanceMap);
                    }
                })
            } else if (decisionType === DECISION_TYPE_APPOINT || decisionType === DECISION_TYPE_TRANSFER) {
                getListDepartmentChild().then((response) => {
                    if (response.data.code === 1000) {
                        const list = response.data.data
                        const deparment = new Map();
                        list.forEach(item => {
                            deparment.set(item.id, item);
                        });
                        setDepartment(deparment);
                    }
                })
                getListJobPosition().then((response) => {
                    if (response.data.code === 1000) {
                        const list = response.data.data
                        const jobPosition = new Map();
                        list.forEach(item => {
                            jobPosition.set(item.id, item);
                        });
                        setJobPosition(jobPosition);
                    }
                })

            } else if (decisionType === DECISION_TYPE_PENALTY || decisionType === DECISION_TYPE_REWARD) {
                getListRewardOrPenalty(decisionType).then((response) => {
                    if (response.data.code === 1000) {
                        const list = response.data.data
                        const rewardOrPenalty = new Map();
                        list.forEach(item => {
                            rewardOrPenalty.set(item.id, item);
                        });
                        setRewardAndPenalty(rewardOrPenalty);
                    }
                })
            }
        }

    }, [typeOpen])

    return (
        <>
            <div className="modal fade" id="decision_detail">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Thông tin chung</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <div className="p-categoty-list decision-detail">
                            <div className='d-flex align-items-center justify-content-between category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                                <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                </div>
                                {isManage && Number(decision.state) !== DECISION_STATE_CHECKED && (
                                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                        {
                                            Number(decision.state) === DECISION_STATE_WATTING && (
                                                <>
                                                    <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                                        data-bs-toggle="modal" data-bs-target="#approve_delete_component"
                                                        onClick={() => setTypeApproveOrDelete(APPROVE)}>
                                                        <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                                        <span >Duyệt</span>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#approve_delete_component"
                                                        onClick={() => setTypeApproveOrDelete(NO_APPROVE)}>
                                                        <i className='ti ti-x' style={{ fontSize: "20px" }} />
                                                        <span style={{ whiteSpace: 'nowrap' }}>Không</span>
                                                    </div>
                                                </>

                                            )
                                        }
                                        <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                            data-bs-toggle="modal"
                                            data-bs-target={`#${modalDecision} `}
                                            onClick={() => setTypeOpen(prevList => [...prevList, modalDecision + "-edit"])}
                                        >
                                            <i className='ti ti-edit' style={{ fontSize: "20px" }} />
                                            <span >Sửa</span>
                                        </div>
                                        <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#approve_delete_component"
                                            onClick={() => setTypeApproveOrDelete(DELETE)}
                                        >
                                            <i className='ti ti-trash' style={{ fontSize: "20px" }} />
                                            <span >Xóa</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-body overflow-modal-crud" style={{ paddingLeft: "30px", paddingTop: 0 }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Số quyết định </label>
                                        <span >{decision.code}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Ngày quyết định </label>
                                        <span>{convertDate(decision.date) || convertDate(decision.dateDecision)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Họ và tên </label>
                                        <span >{employee.employeeName}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Mã nhân viên </label>
                                        <span>{employee.employeeCode}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Loại quyết định</label>
                                        <span>{decisionType && DecisionType.get(decisionType).name}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Trạng thái</label>
                                        <p className={`badge ${decision.state ? DecisiontState.get(Number(decision.state)).bg : ""}`}>{decision.state ? DecisiontState.get(Number(decision.state)).name : ""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="mb-3 d-flex flex-column info-detail">
                                        <label className="form-label">Lý do</label>
                                        <span>{decision.reason || (decision.rewardAndPenaltyId && rewardAndPenalty.get(decision.rewardAndPenaltyId).name)}</span>
                                    </div>
                                </div>

                                {
                                    (Number(decisionType) === DECISION_TYPE_PENALTY || Number(decisionType) === DECISION_TYPE_REWARD) && (
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Số tiền</label>
                                                <span>{Number(decision.amount).toLocaleString('vi-VN') + ' VNĐ'}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                (Number(decisionType) === DECISION_TYPE_APPOINT || Number(decisionType) === DECISION_TYPE_TRANSFER) && (
                                    <div className="row mt-2">
                                        <div className="mb-3">
                                            <label className="form-label">Chi tiết</label>
                                            <div className="card-body p-0">
                                                <div className="custom-datatable-filter table-responsive">
                                                    <div className="table-container">
                                                        <table className="table" id='myTable'>
                                                            <thead className="thead-light">
                                                                <tr>
                                                                    <th>Phòng ban cũ</th>
                                                                    <th>Vị trí cũ</th>
                                                                    <th>Phòng ban mới</th>
                                                                    <th>Vị trí mới</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr >
                                                                    <td>
                                                                        <span>{department.has(decision.departmentOldId) && department.get(decision.departmentOldId).name}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span>{jobPosition.has(decision.jobPositionOldId) && jobPosition.get(decision.jobPositionOldId).name}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span>{department.has(decision.departmentNewId) && department.get(decision.departmentNewId).name}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span>{jobPosition.has(decision.jobPositionNewId) && jobPosition.get(decision.jobPositionNewId).name}</span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {decisionType === DECISION_TYPE_SALARY && (
                                <>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Ngày có hiệu lực</label>
                                                <span className='text-danger'>{convertDate(decision.dateActive)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">

                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Lương mới</label>
                                                <span className='ms-3 text-danger'>{Number(decision.amountNew).toLocaleString('vi-VN') + ' VNĐ'}</span>


                                                <label className="form-label">Lương cũ</label>
                                                <span className='ms-3'>{Number(decision.amountOld).toLocaleString('vi-VN') + ' VNĐ'}</span>
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
                                                            decision.allowances && decision.allowances.length > 0 && decision.allowances.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{item.allowanceId && allowances.get(item.allowanceId).name}</td>
                                                                    <td>{item.amount !== 0 ? Number(item.amount).toLocaleString("vi-VN") + " / " : ""} {item.unit}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailDecisionComponent;

