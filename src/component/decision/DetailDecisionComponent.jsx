import React, { useEffect, useState } from 'react';
import AcceptDecisionComponent from './crud/AcceptDecisionComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteDecision, getDecision, noApprovalDecision } from '../../service/DecisionService';
import { responseData } from '../../util/ResponseUtil';
import { convertDate } from '../../util/TimeUtil';
import { getListEmployeeSelect, getResumeProfile } from '../../service/EmployeeService';
import { DECISION_STATE_CHECKED, DECISION_STATE_NO_CHECKED, DECISION_STATE_WATTING, DECISION_TYPE_APPOINT, DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD, DECISION_TYPE_SALARY, DECISION_TYPE_TERMINATION, DECISION_TYPE_TRANSFER, DecisiontState, DecisionType } from '../../util/DecisionUtil';
import { getListAccount } from '../../service/AccountService';
import { getListAllownace } from '../../service/AllowanceService';
import { getListDepartmentChild } from '../../service/DepartmentService';
import { getListJobPosition } from '../../service/JobPositionService';
import { getListRewardOrPenalty } from '../../service/RewardAndPenaltyService';
import { useDispatch } from 'react-redux';
import { updateSubTitleHeader, updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import EndContractDecisionComponent from './crud/EndContractDecisionComponent';
import SalaryDecisionComponent from './crud/SalaryDecisionComponent';
import TranferAndAppointmentDecisionComponent from './crud/TranferAndAppointmentDecisionComponent';
import RewardAndPenaltyDecisionComponent from './crud/RewardAndPenaltyDecisionComponent';
import { toast } from 'react-toastify';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';

const DetailDecisionComponent = () => {
    const location = useLocation();
    const decisionId = location.state?.decisionId || 0;
    const decisionType = location.state?.decisionType || 0;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [allowances, setAllowance] = useState(new Map);
    const [department, setDepartment] = useState(new Map);
    const [jobPosition, setJobPosition] = useState(new Map);
    const [rewardAndPenalty, setRewardAndPenalty] = useState(new Map);
    const [decision, setDecision] = useState({});
    const [employee, setEmployee] = useState({})
    const [listEmployeeSelect, setListEmployeeSelect] = useState([])
    const [typeApproveOrDelete, setTypeApproveOrDelete] = useState(0)
    const [handleClickNav, setHandleClickNav] = useState(null)
    if (employee) {
    }

    useEffect(() => {
        if (decisionType)
            dispatch(updateTitleHeader({ title: DecisionType.get(decisionType).name, subTitle: "" }))
    }, [decisionType]);

    useEffect(() => {
        if (employee && employee.employeeName) {
            dispatch(updateSubTitleHeader(employee.employeeName));
        }
    }, [employee]);

    useEffect(() => {
        getDecision(decisionId).then((response) => {
            responseData(response, setDecision)
            if (response.data.code === 1000) {
                getResumeProfile(response.data.data.employeeId).then((response) => {
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

        getListEmployeeSelect().then((response) =>
            responseData(response, setListEmployeeSelect)
        )

    }, [decisionId])

    const updateDecision = () => {
        getDecision(decisionId).then((response) => {
            responseData(response, setDecision)
            if (response.data.code === 1000) {
                getResumeProfile(response.data.data.employeeId).then((response) => {
                    if (response.data.code === 1000) {
                        const employee = response.data.data
                        setEmployee(employee)
                    }
                })
            }
        })
    }

    const handleDeleteDecision = () => {
        deleteDecision(decisionId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Xóa thành công!");
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
                navigate("/manage-employee/decision")
            } else if (response.data.code > 1000)
                toast.error(response.data.message)
            else
                toast.error("Bảo trì hệ thống")
        });
    }

    const handleNoAprove = () => {
        noApprovalDecision(decisionId).then((response) => {
            if (response.data.code === 1000) {
                updateDecision()
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            } else if (response.data.code > 1000)
                toast.error(response.data.message)
            else
                toast.error("Bảo trì hệ thống")
        });

    }

    return (
        <>
            <div className='page-wrapper'>
                <div class="p-categoty-list">
                    <div className='d-flex align-items-center justify-content-between category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                        <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <ul class="nav ">
                                <li class="nav-item" role="presentation" className='nav-profile'>
                                    <button class={`nav-link nav-link-profile active`}>
                                        Chi tiết thông tin
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {Number(decision.state) !== DECISION_STATE_CHECKED && (
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                {
                                    Number(decision.state) === DECISION_STATE_WATTING && (
                                        <>
                                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                                data-bs-toggle="modal" data-bs-target="#approve_delete_component"
                                                onClick={() => { setTypeApproveOrDelete(APPROVE) }}>
                                                <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                                <span >Duyệt</span>
                                            </div>
                                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#approve_delete_component"
                                                onClick={() => { setTypeApproveOrDelete(NO_APPROVE); setHandleClickNav(() => handleNoAprove); }}>
                                                <i className='ti ti-x' style={{ fontSize: "20px" }} />
                                                <span style={{ whiteSpace: 'nowrap' }}>Không</span>
                                            </div>
                                        </>

                                    )
                                }
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${DecisionType.get(decisionType).modal} `}
                                >
                                    <i className='ti ti-edit' style={{ fontSize: "20px" }} />
                                    <span >Sửa</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#approve_delete_component"
                                    onClick={() => { setTypeApproveOrDelete(DELETE); setHandleClickNav(() => handleDeleteDecision); }}
                                >
                                    <i className='ti ti-trash' style={{ fontSize: "20px" }} />
                                    <span >Xóa</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ margin: "0 10px" }}>
                    <div class="row">
                        <div class="col-xl-8 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Thông tin chung</h6>
                                </div>
                                <div class="card-body p-0">
                                    <div style={{ padding: "16px" }}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Số quyết định </label>
                                                    <span >{decision.code}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Ngày quyết định </label>
                                                    <span>{convertDate(decision.date) || convertDate(decision.dateDecision)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Họ và tên </label>
                                                    <span >{employee.fullName}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Mã nhân viên </label>
                                                    <span>{employee.employeeCode}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Loại quyết định</label>
                                                    <span>{decisionType && DecisionType.get(decisionType).name}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Trạng thái</label>
                                                    <p class={`badge ${decision.state ? DecisiontState.get(Number(decision.state)).bg : ""}`}>{decision.state ? DecisiontState.get(Number(decision.state)).name : ""}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Lý do</label>
                                                    <span>{decision.reason || (decision.rewardAndPenaltyId && rewardAndPenalty.get(decision.rewardAndPenaltyId).name)}</span>
                                                </div>
                                            </div>

                                            {
                                                (Number(decisionType) === DECISION_TYPE_PENALTY || Number(decisionType) === DECISION_TYPE_REWARD) && (
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Số tiền</label>
                                                            <span>{Number(decision.amount).toLocaleString('vi-VN') + ' VNĐ'}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {
                                            (Number(decisionType) === DECISION_TYPE_APPOINT || Number(decisionType) === DECISION_TYPE_TRANSFER) && (
                                                <div class="row mt-2">
                                                    <div class="mb-3">
                                                        <label class="form-label">Chi tiết</label>
                                                        <div class="card-body p-0">
                                                            <div class="custom-datatable-filter table-responsive">
                                                                <div class="table-container">
                                                                    <table class="table" id='myTable'>
                                                                        <thead class="thead-light">
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
                                                                                    <span>{decision.departmentOldId && department.get(decision.departmentOldId).name}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{decision.jobPositionOldId && jobPosition.get(decision.jobPositionOldId).name}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{decision.departmentNewId && department.get(decision.departmentNewId).name}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>{decision.jobPositionNewId && jobPosition.get(decision.jobPositionNewId).name}</span>
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
                                                <div class="row mt-2">
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Ngày có hiệu lực</label>
                                                            <span className='text-danger'>{convertDate(decision.dateActive)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mt-2">

                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Lương mới</label>
                                                            <span className='ms-3 text-danger'>{Number(decision.amountNew).toLocaleString('vi-VN') + ' VNĐ'}</span>


                                                            <label class="form-label">Lương cũ</label>
                                                            <span className='ms-3'>{Number(decision.amountOld).toLocaleString('vi-VN') + ' VNĐ'}</span>
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
                        <div class="col-xl-4 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header">
                                    <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                        <h6>Lịch sử hoạt động</h6>
                                    </div>
                                </div>
                                <div class="card-body schedule-timeline activity-timeline">
                                    <div class="d-flex align-items-start">
                                        <div class="avatar avatar-md avatar-rounded bg-success flex-shrink-0 dots-history">
                                        </div>
                                        <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                            <span>14: 58 13/10/2023</span>
                                            <p class="fw-medium text-gray-9 mb-1"><a href="https://smarthr.dreamstechnologies.com/html/template/activity.html">Nguyễn Thành Đạt - TD01 đã tạo đơn</a></p>
                                        </div>
                                    </div>

                                    <div class="d-flex align-items-start">
                                        <div class="avatar avatar-md avatar-rounded bg-warning flex-shrink-0 dots-history">
                                        </div>
                                        <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                            <span></span>
                                            <p class="fw-medium text-gray-9 mb-1"><a href="https://smarthr.dreamstechnologies.com/html/template/activity.html">Đang chờ duyệt đơn</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <ApproveOrDeleteComponent handleClick={handleClickNav} type={typeApproveOrDelete} />

            {
                (Number(decisionType) === DECISION_TYPE_PENALTY || Number(decisionType) === DECISION_TYPE_REWARD) && (
                    <RewardAndPenaltyDecisionComponent
                        decisionId={decisionId}
                        typeOpen={["create_reward_penalty_decision-edit"]}
                        type={decisionType}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}

                    />)
            }
            {
                (Number(decisionType) === DECISION_TYPE_APPOINT || Number(decisionType) === DECISION_TYPE_TRANSFER) && (
                    <TranferAndAppointmentDecisionComponent
                        decisionId={decisionId}
                        typeOpen={["create_tranfer_appointment_decision-edit"]}
                        type={decisionType}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}
                    />)
            }

            {
                decisionType === DECISION_TYPE_SALARY && (
                    <SalaryDecisionComponent
                        decisionId={decisionId}
                        typeOpen={["create_salary_decision-edit"]}
                        type={decisionType}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}

                    />
                )
            }

            {
                decisionType === DECISION_TYPE_TERMINATION && (
                    <EndContractDecisionComponent
                        decisionId={decisionId}
                        typeOpen={["create_terminate_decision-edit"]}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}
                    />
                )
            }

        </>
    );
};

export default DetailDecisionComponent;

