import { useEffect, useState } from 'react';
import { LETTER_STATE_CHECKED, LETTER_STATE_WAITING, LETTER_TYPE_END_WORK, LETTER_TYPE_LEAVE, LETTER_TYPE_OVERTIME, LETTER_TYPE_WORKTIME, LetterState, LetterType } from '../../util/LetterUtil';
import { getLetter } from '../../service/LetterService';
import { responseData } from '../../util/ResponseUtil';
import { convertDate } from '../../util/TimeUtil';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';
import { getEmployeeJobPosition } from '../../service/EmployeeService';
import { getLetterReasonDetail } from '../../service/LetterReasonService';

const DetailLetterComponent = ({ letterId, letterType, typeOpen, setTypeApproveOrDelete, setTypeOpen, isManage }) => {
    const [employee, setEmployee] = useState({})
    const [letter, setLetter] = useState({})
    const [letterReason, setLetterReason] = useState({})
    const modalLetter = letterType ? LetterType.get(letterType).modal : "";


    useEffect(() => {
        if (typeOpen.at(-1) === "letter_detail") {
            getLetter(letterId).then((response) => {
                responseData(response, setLetter)
                if (response.data.code === 1000) {
                    getEmployeeJobPosition(response.data.data.employeeId).then((response) => {
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
        }
    }, [typeOpen])

    return (
        <>
            <div className="modal fade" id="letter_detail">
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
                                {isManage && Number(letter.letterState) !== LETTER_STATE_CHECKED && (
                                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
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
                                            data-bs-target={`#${modalLetter} `}
                                            onClick={() => setTypeOpen(prevList => [...prevList, modalLetter + "-edit"])}

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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Họ và tên </label>
                                            <span className='ms-3'>{employee.fullName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Mã nhân viên </label>
                                            <span>{employee.code}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Phòng ban</label>
                                            <span>{employee.department}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Vị trí</label>
                                            <span>{employee.jobPosition}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Chức vụ</label>
                                            <span>{employee.duty}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Loại đơn từ</label>
                                            <span>{letterType && LetterType.get(letterType).name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Lý do</label>
                                            <span>{letterReason.reason}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3 d-flex flex-column info-detail">
                                            <label className="form-label">Trạng thái</label>
                                            <p className={`badge ${letter.letterState ? LetterState.get(letter.letterState).bg : ""}`}>{letter.letterState ? LetterState.get(letter.letterState).name : ""}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <div className="mb-3 d-flex flex-column info-detail">
                                                <label className="form-label">Mô tả</label>
                                                <span>{letter.description}</span>
                                            </div>
                                        </div>
                                        {letterType === LETTER_TYPE_END_WORK && (
                                            <div className="col-md-6">
                                                <div className="mb-3 d-flex flex-column info-detail">
                                                    <label className="form-label">Ngày thôi việc</label>
                                                    <span>{convertDate(letter.dateRegis)}</span>
                                                </div>
                                            </div>

                                        )}
                                    </div>

                                    {(letterType === LETTER_TYPE_WORKTIME ||
                                        letterType === LETTER_TYPE_LEAVE ||
                                        letterType === LETTER_TYPE_OVERTIME
                                    ) && (
                                            <div className="row mt-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Chi tiết</label>
                                                    <div className="card-body p-0">
                                                        <div className="custom-datatable-filter table-responsive">
                                                            <div className="table-container">
                                                                <table className="table" id='myTable'>
                                                                    <thead className="thead-light">
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
            </div>
        </>
    );
};

export default DetailLetterComponent;

