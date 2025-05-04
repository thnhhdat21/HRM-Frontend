import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncError, useLocation, useNavigate } from 'react-router-dom';
import { updateSubTitleHeader, updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { LETTER_STATE_CHECKED, LETTER_STATE_WAITING, LETTER_TYPE_END_WORK, LETTER_TYPE_INOUT, LETTER_TYPE_LEAVE, LETTER_TYPE_OVERTIME, LETTER_TYPE_WORKTIME, LetterState, LetterType } from '../../../util/LetterUtil';
import { deleteLetter, getLetter, noApprovalLetter } from '../../../service/LetterService';
import { responseData } from '../../../util/ResponseUtil';
import { getWorkProfile } from '../../../service/ContractService';
import { getLetterReasonDetail } from '../../../service/LetterReasonService';
import { convertDate } from '../../../util/TimeUtil';
import LeaveLetterComponent from './LeaveLetterComponent';
import OvertimeLetterComponent from './OvertimeLetterComponent';
import WorkTimeLetterComponent from './WorkTimeLetterComponent';
import CheckinLetterComponent from './CheckinLetterComponent';
import EndJobLetterComponent from './EndJobLetterComponent';
import ApproveOrDeleteComponent from '../../common/ApproveOrDeleteComponent';
import { APPROVE, DELETE, NO_APPROVE } from '../../../util/ApproveOrDeleteUtil';
import { toast } from 'react-toastify';

const DetailLetterComponent = () => {
    const location = useLocation();
    const letterId = Number(location.state?.letterId || 0)
    const letterType = Number(location.state?.letterType || 0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [employee, setEmployee] = useState({})
    const [letter, setLetter] = useState({})
    const [letterReason, setLetterReason] = useState({})
    const [typeApproveOrDelete, setTypeApproveOrDelete] = useState("")
    useEffect(() => {
        if (letterType !== 0) {
            dispatch(updateTitleHeader({ title: LetterType.get(letterType).name, subTitle: "" }));
        }
    }, [letterType]);
    useEffect(() => {
        if (employee && employee.employeeName) {
            dispatch(updateSubTitleHeader(employee.employeeName));
        }
    }, [employee]);


    useEffect(() => {
        getLetter(letterId).then((response) => {
            responseData(response, setLetter)
            if (response.data.code === 1000) {
                getWorkProfile(response.data.data.employeeId).then((response) => {
                    if (response.data.code === 1000) {
                        const employee = response.data.data
                        setEmployee(employee)
                    }
                })
                getLetterReasonDetail(response.data.data.letterReasonId).then((response) => {
                    if (response.data.code === 1000) {
                        setLetterReason(response.data.data)
                    }
                })
            }
        })
    }, [])

    const updateLetter = () => {
        getLetter(letterId).then((response) => {
            responseData(response, setLetter)
        })
    }

    const handleApproveAndDelete = async (e) => {
        var response = null
        var title = "";
        if (typeApproveOrDelete === DELETE) {
            response = await deleteLetter(letterId)
            title = "Xóa thành công!"
        } else if (typeApproveOrDelete === NO_APPROVE) {
            response = await noApprovalLetter(letterId)
        }
        // else if (typeApproveOrDelete === APPROVE) {
        //     response = await letterLetter(selected.letterId)
        //     title = "Đã duyệt quyết định!"
        // }
        if (response.data.code === 1000) {
            if (title !== "")
                toast.success(title);
            document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            if (typeApproveOrDelete === DELETE) {
                navigate("/manage-letter/letter")
            }
        } else if (response.data.code > 1000)
            toast.error(response.data.message)
        else
            toast.error("Bảo trì hệ thống")
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
                        {Number(letter.letterState) !== LETTER_STATE_CHECKED && (
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                {
                                    Number(letter.letterState) === LETTER_STATE_WAITING && (
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
                                                onClick={() => setTypeApproveOrDelete(NO_APPROVE)}>
                                                <i className='ti ti-x' style={{ fontSize: "20px" }} />
                                                <span style={{ whiteSpace: 'nowrap' }}>Không</span>
                                            </div>
                                        </>

                                    )
                                }
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${LetterType.get(letterType).modal} `}
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
                                                    <label class="form-label">Họ và tên </label>
                                                    <span className='ms-3'>{employee.employeeName}</span>
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
                                                    <label class="form-label">Phòng ban</label>
                                                    <span>{employee.department}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Vị trí</label>
                                                    <span>{employee.jobPosition}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Chức vụ</label>
                                                    <span>{employee.duty}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Loại đơn từ</label>
                                                    <span>{letterType && LetterType.get(letterType).name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Lý do</label>
                                                    <span>{letterReason.reason}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Trạng thái</label>
                                                    <p class={`badge ${letter.letterState ? LetterState.get(letter.letterState).bg : ""}`}>{letter.letterState ? LetterState.get(letter.letterState).name : ""}</p>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <div class="mb-3 d-flex flex-column info-detail">
                                                        <label class="form-label">Mô tả</label>
                                                        <span>{letter.description}</span>
                                                    </div>
                                                </div>
                                                {letterType === LETTER_TYPE_END_WORK && (
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Ngày thôi việc</label>
                                                            <span>{convertDate(letter.dateRegis)}</span>
                                                        </div>
                                                    </div>

                                                )}
                                            </div>

                                            {(letterType === LETTER_TYPE_WORKTIME ||
                                                letterType === LETTER_TYPE_LEAVE ||
                                                letterType === LETTER_TYPE_OVERTIME
                                            ) && (
                                                    <div class="row mt-2">
                                                        <div class="mb-3">
                                                            <label class="form-label">Chi tiết</label>
                                                            <div class="card-body p-0">
                                                                <div class="custom-datatable-filter table-responsive">
                                                                    <div class="table-container">
                                                                        <table class="table" id='myTable'>
                                                                            <thead class="thead-light">
                                                                                <tr>
                                                                                    <th>Bắt đầu</th>
                                                                                    <th>Kết thúc</th>
                                                                                    {letterType === LETTER_TYPE_WORKTIME ? (
                                                                                        <>
                                                                                            <th>Đi muộn</th>
                                                                                            <th>Về sớm</th>
                                                                                        </>
                                                                                    ) : (
                                                                                        <th>Tổng thời gian</th>
                                                                                    )}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr data-id='1'>
                                                                                    <td>
                                                                                        <span>{letter.timeStart || (letterType === LETTER_TYPE_LEAVE && letter.dateStart) || (letterType === LETTER_TYPE_WORKTIME && convertDate(letter.dateStart))}</span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span>{letter.timeEnd || (letterType === LETTER_TYPE_LEAVE && letter.dateEnd) || (letterType === LETTER_TYPE_WORKTIME && convertDate(letter.dateEnd))}</span>
                                                                                    </td>
                                                                                    {letterType === LETTER_TYPE_WORKTIME ? (
                                                                                        <>
                                                                                            <td>
                                                                                                <span>{letter.goLate}</span>
                                                                                            </td>
                                                                                            <td>
                                                                                                <span>{letter.backEarly}</span>
                                                                                            </td>
                                                                                        </>
                                                                                    ) : (
                                                                                        <td>
                                                                                            <span>{letter.total}</span>
                                                                                        </td>
                                                                                    )}

                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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

            <ApproveOrDeleteComponent handleClick={handleApproveAndDelete} type={typeApproveOrDelete} />

            {letterType === LETTER_TYPE_LEAVE &&
                <LeaveLetterComponent
                    letterId={letterId}
                    typeOpen={["create_leave_letter-edit"]}
                    type={letterType}
                    updateLetter={updateLetter}
                />
            }
            {
                letterType === LETTER_TYPE_OVERTIME &&
                <OvertimeLetterComponent
                    letterId={letterId}
                    typeOpen={["create_overtime_letter-edit"]}
                    type={letterType}
                    updateLetter={updateLetter}
                />
            }
            {
                letterType === LETTER_TYPE_WORKTIME &&
                <WorkTimeLetterComponent
                    letterId={letterId}
                    typeOpen={["create_worktime_letter-edit"]}
                    type={letterType}
                    updateLetter={updateLetter}
                />
            }

            {
                letterType === LETTER_TYPE_INOUT &&
                <CheckinLetterComponent
                    letterId={letterId}
                    typeOpen={["create_checkin_letter-edit"]}
                    type={letterType}
                    updateLetter={updateLetter}
                />
            }
            {
                letterType === LETTER_TYPE_END_WORK &&
                <EndJobLetterComponent
                    letterId={letterId}
                    typeOpen={["create_endjob_letter-edit"]}
                    type={letterType}
                    updateLetter={updateLetter}
                />
            }
        </>
    );
};

export default DetailLetterComponent;

