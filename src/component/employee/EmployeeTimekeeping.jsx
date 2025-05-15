import React, { useEffect, useState } from 'react';
import "./css/profile.css"
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customLocale from '../../util/month-locale';
import { employeeCheckIn, employeeCheckOut, getTimeSheetEmployee } from '../../service/EmployeeService';
import { responseData } from '../../util/ResponseUtil';
import { convertDateInTimeSheet, formatTimeToVietnamese, getDayOnWeek } from '../../util/TimeUtil';
import { LETTER_TYPE_INOUT, LetterState } from '../../util/LetterUtil';
import CheckinLetterComponent from '../letter/crud/CheckinLetterComponent';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';

const EmployeeTimekeeping = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Bảng công tháng", subTitle: "" }))
    const [open, setOpen] = useState(false);
    const [monthValue, setMonthValue] = useState(dayjs());
    const [timeSheet, setTimeSheet] = useState(null)
    const [typeOpen, setTypeOpen] = useState([])
    const [typeSave, setTypeSave] = useState(0)
    const [dateRegisInOut, setDateRegisInOut] = useState("");
    const currentHour = new Date().getHours();
    const handleIconClick = () => {
        setOpen(true);
    };
    const handleMonthChange = (date) => {
        if (date) {
            setMonthValue(date);
        }
        setOpen(false); // Đóng popup sau khi chọn
    };

    useEffect(() => {
        if (monthValue) {
            const fommattedMonthValue = monthValue.format('YYYY-MM')
            getTimeSheetEmployee(fommattedMonthValue).then((response) => {
                responseData(response, setTimeSheet)
            })
        }
    }, [monthValue])

    const handleClickDropMenu = (id, typeSave, dateWorking) => {
        setTypeOpen(prevList => [...prevList, id + "-create"])
        setTypeSave(typeSave)
        setDateRegisInOut(dateWorking)
    }

    const updateTimeKeeping = () => {
        const fommattedMonthValue = monthValue.format('YYYY-MM')
        getTimeSheetEmployee(fommattedMonthValue).then((response) => {
            responseData(response, setTimeSheet)
        })
    }

    const handleClickCheckin = (e) => {
        e.preventDefault()
        employeeCheckIn().then((response) => {
            if (response.data.code === 1000) {
                updateTimeKeeping()
            }
        })
    }

    const handleClickCheckout = (e) => {
        e.preventDefault()
        employeeCheckOut().then((response) => {
            if (response.data.code === 1000) {
                updateTimeKeeping()
            }
        })
    }

    return (
        <>
            <div className='page-wrapper'>
                <div style={{ margin: "20px 10px 0 10px" }}>
                    <div className="row">
                        <div className="col-xl-8 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Bảng công chi tiết tháng</h6>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex align-items-center" style={{ paddingRight: "10px" }}>
                                            {/* {currentHour >= 5 && currentHour < 10 && ( */}
                                            <button type="submit" className="btn btn-primary" onClick={handleClickCheckin}>CHECK IN</button>
                                            {/* )} */}
                                            {/* {currentHour >= 15 && ( */}
                                            <button type="submit" className="btn btn-primary" onClick={handleClickCheckout}>CHECK OUT</button>
                                            {/* // )} */}

                                        </div>
                                        <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "13px", position: "relative" }}
                                            onClick={handleIconClick} >
                                            <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                            <span style={{ margin: 0, fontWeight: 500, whiteSpace: 'nowrap' }}>{monthValue ? monthValue.format('MM/YYYY') : 'Tháng'} </span>
                                            <div style={{ position: 'absolute', top: 0, right: "90px", opacity: 0, pointerEvents: 'none' }}>
                                                <DatePicker
                                                    open={open}
                                                    onOpenChange={setOpen}
                                                    picker="month"
                                                    value={monthValue}
                                                    onChange={handleMonthChange}
                                                    format="MM/YYYY"
                                                    locale={customLocale}
                                                    allowClear={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div style={{ padding: "16px" }}>
                                        <table className="table borderless table-timekeeping-employee">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "10%" }}>Ngày</th>
                                                    <th>Thời gian</th>
                                                    <th>Công/Diễn giải</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    timeSheet && timeSheet.employeeTimeSheets.length > 0 &&
                                                    timeSheet.employeeTimeSheets.map((item, index) => {
                                                        const dateWorking = new Date(item.dateWorking)
                                                        const isLastWeek = dateWorking.getDay() === 0 || dateWorking.getDay() === 6
                                                        return (
                                                            <tr key={index}>
                                                                <td className={`${isLastWeek ? "weekend" : ""}`}>
                                                                    <div className={`timekeeping-items `}>
                                                                        <span>{getDayOnWeek(dateWorking)}</span>
                                                                        <span>{convertDateInTimeSheet(item.dateWorking)}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='time-checked ' style={{ paddingBottom: "10px" }}>
                                                                        <span className={`${item.timeIn ? "" : "hidden"}`}>{item.timeIn}</span>
                                                                        <span className={`${item.timeOut ? "" : "hidden"}`}>{item.timeOut}</span>
                                                                    </div>

                                                                    <div className={`${item.workDay ? "" : "hidden"} registered-time`}>
                                                                        <span>Đăng ký: |</span>
                                                                        <span><strong>X</strong></span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={`work-time ${isLastWeek && item.workDay === 0 ? "hidden" : ""}`}>
                                                                        <span>Công làm việc:</span>
                                                                        <span className='strong-timekeeping'>{item.workDay}</span>
                                                                    </div>
                                                                    <div className={`go-late ${item.timeLate ? "" : "hidden"}`}>
                                                                        <span>Đi muộn:</span>
                                                                        <span className='strong-timekeeping'>{formatTimeToVietnamese(item.timeLate)}</span>
                                                                    </div>
                                                                    {
                                                                        item.late && item.letterState == 0 && (
                                                                            <div className={`explain ${item.late ? "" : "hidden"}`} style={{ cursor: 'pointer' }}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#create_checkin_letter"
                                                                                onClick={() => handleClickDropMenu("create_checkin_letter", LETTER_TYPE_INOUT, item.dateWorking)}

                                                                            >
                                                                                <i className='fa fa-tag' />
                                                                                <span className='strong-timekeeping'> Giải trình đi muộn</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.letterState != 0 && (
                                                                            <div style={{ padding: "5px" }}>
                                                                                <span className={`badge ${item.letterState ? LetterState.get(Number(item.letterState)).bg : ""}`}>{item.letterState ? LetterState.get(Number(item.letterState)).name : ""}</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 d-flex" style={{ maxHeight: "200px" }}>
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                        <h6>Tổng công</h6>
                                    </div>
                                </div>
                                <div className="card-body schedule-timeline activity-timeline">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-fill ps-3 timeline-flow content-history">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p className="fw-medium text-gray-9 mb-1">Công thực tế</p>
                                                <span className='strong-timekeeping text-black'>{timeSheet && timeSheet.workDayReal}</span>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between mt-2'>
                                                <p className="fw-medium text-gray-9 mb-1">Công tính lương</p>
                                                <span className='strong-timekeeping text-black'>{timeSheet && timeSheet.totalWorkDay}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <CheckinLetterComponent
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateTimeKeeping}
                dateRegis={dateRegisInOut}
            />
        </>
    );
};

export default EmployeeTimekeeping;