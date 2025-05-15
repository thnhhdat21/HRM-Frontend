import React, { useEffect, useState } from 'react';
import "../css/timekeeping-style.css"
import { convertDate } from '../../../util/TimeUtil';
import { getWorkingDay } from '../../../service/TimeKeepingSerivce';
import { toast } from 'react-toastify';
import { getLetter } from '../../../service/LetterService';
import { LETTER_TYPE_END_WORK, LETTER_TYPE_INOUT, LETTER_TYPE_LEAVE, LETTER_TYPE_OVERTIME, LETTER_TYPE_WORKTIME, LetterState, LetterType } from '../../../util/LetterUtil';

const TimeKeepingDetailComponent = ({ x, y, showMenu, selected, ref }) => {
    const WORK = 1;
    const LETTER = 2;
    const [showMenuTwo, setShowMenuTwo] = useState(false) // kiểm tra thứ 7 chủ nhật
    const [type, setType] = useState(WORK)
    const [first, setFirst] = useState(true)
    const [letter, setLetter] = useState([])
    const style = () => {
        return {
            width: '600px',
            maxHeight: '440px',
            minHeight: '400px',
            borderRadius: 10,
            padding: 20,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu && showMenuTwo ? 'flex' : 'none',
            zIndex: 9999,
        }
    }
    const [workingDay, setWorkingDay] = useState({})
    useEffect(() => {
        if (selected.employeeId) {
            const values = {
                employeeId: selected.employeeId,
                workingDay: selected.dateWorking
            }
            getWorkingDay(values).then((response) => {
                if (response.data.code === 1000) {
                    setWorkingDay(response.data.data)
                    setShowMenuTwo(true)
                } else if (response.data.code > 1000) {
                    setShowMenuTwo(false)
                    toast.info(response.data.message)
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }
    }, [selected])

    useEffect(() => {
        setFirst(showMenu && showMenuTwo)
        if (!(showMenu && showMenuTwo)) {
            setType(WORK)
            setLetter([])
        }
    }, [showMenu, showMenuTwo])

    useEffect(() => {
        if (type === LETTER && workingDay.letterIds && first) {
            setFirst(false)
            const fetch = async () => {
                var listLetter = []
                for (const item of workingDay.letterIds) {
                    const response = await getLetter(item)
                    if (response.data.code === 1000) {
                        listLetter.push(response.data.data)
                    }
                }
                if (listLetter.length > 0) {
                    setLetter(listLetter)
                }
            }
            fetch()
        }
    }, [type])
    return (
        <>
            <div ref={ref} class="menu" id="detail_timekeeping" style={style()}>
                <div class="modal-content" style={{ padding: "15px" }}>
                    <div class="modal-header no-border">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title me-2">{selected.employeeName}, ngày {convertDate(selected.dateWorking)}</h4>
                        </div>
                        <button type="button" class="btn-close custom-btn-close" onClick={() => setShowMenuTwo(false)}>
                            <i class="ti ti-x"></i>
                        </button>
                    </div>
                    <div class="card-header flex-wrap row-gap-3 p-categoty-list header-timekeeping-detail">
                        <div className='d-flex category-list-employ align-items-center ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500, borderBottom: "1px solid #E9EDF4" }}>
                            <span style={{ cursor: 'pointer' }} className={`${type === WORK ? "active-category-list" : ""} `} onClick={() => setType(WORK)}>Bảng chấm công</span>
                            <span style={{ cursor: 'pointer' }} className={`${type === LETTER ? "active-category-list" : ""} `} onClick={() => setType(LETTER)}>Đơn từ</span>
                        </div>
                    </div>

                    {type === WORK && (
                        <div class="modal-body ">
                            <div class="row ">
                                <div class="col-md-12">
                                    <label class="form-label">Công làm việc trong ngày: </label>
                                    <span>&ensp;{workingDay.workDay}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <label class="form-label">Thông tin nhân sự: </label>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Mã nhân viên: &ensp; {selected.employeeCode}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Vị trí: &ensp; {selected.jobPosition}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12 mb-2">
                                    <span>Phòng ban: &ensp; {selected.department}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <label class="form-label">Ca làm việc: </label>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Tên ca: &ensp; Ca hành chính  </span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Mã ca: &ensp; HC   </span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Thời gian: &ensp; 8:00 - 17:30</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Check-in: &ensp; {workingDay.checkin}</span>
                                    <span>&ensp;&ensp;Muộn: &ensp; {workingDay.timeLate}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Check-out: &ensp; {workingDay.checkout}</span>
                                    <span>&ensp;&ensp;Sớm: &ensp; {workingDay.timeEarly}</span>
                                </div>
                            </div>
                            <div class="row ">
                                <div class="col-md-12">
                                    <span>Tiền phạt do đi muộn: &ensp; {workingDay.late && "50.000"}</span>
                                </div>
                            </div>
                        </div>
                    )
                    }

                    {type === LETTER && (
                        <div class="modal-body overflow-timekeeping-detail">
                            {
                                letter.length > 0 && letter.map((item, index) => {
                                    const letterType = Number(item.letterType)
                                    const letterState = Number(item.letterState)
                                    if ((letterType != LETTER_TYPE_END_WORK
                                    ))
                                        return (
                                            <>
                                                <div class="row mt-2">
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Loại đơn từ</label>
                                                            <span>{letterType && LetterType.get(letterType).name}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Lý do</label>
                                                            <span>{item.letterReason}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="mb-3 d-flex flex-column info-detail">
                                                            <label class="form-label">Trạng thái</label>
                                                            <p class={`badge ${letterState ? LetterState.get(letterState).bg : ""}`}>{letterState ? LetterState.get(letterState).name : ""}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    letterType !== LETTER_TYPE_INOUT && (
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
                                                                                            <span>{item.timeStart || (letterType === LETTER_TYPE_LEAVE && item.dateStart) || (letterType === LETTER_TYPE_WORKTIME && convertDate(item.dateStart))}</span>
                                                                                        </td>
                                                                                        <td>
                                                                                            <span>{item.timeEnd || (letterType === LETTER_TYPE_LEAVE && item.dateEnd) || (letterType === LETTER_TYPE_WORKTIME && convertDate(item.dateEnd))}</span>
                                                                                        </td>
                                                                                        {letterType === LETTER_TYPE_WORKTIME ? (
                                                                                            <>
                                                                                                <td>
                                                                                                    <span>{item.goLate}</span>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <span>{item.backEarly}</span>
                                                                                                </td>
                                                                                            </>
                                                                                        ) : (
                                                                                            <td>
                                                                                                <span>{item.total}</span>
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
                                                    )
                                                }

                                                {
                                                    letter.length > 0 && (
                                                        <div className='border-bottom'></div>
                                                    )
                                                }
                                            </>
                                        )
                                })
                            }
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default TimeKeepingDetailComponent;

