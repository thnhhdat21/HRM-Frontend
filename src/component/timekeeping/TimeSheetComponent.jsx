import React, { useEffect, useRef, useState } from 'react';
import './css/timekeeping-style.css'
import TimeKeepingDetailComponent from './crud/TimeKeepingDetailComponent';
import useDoubleClickDetail from '../../hooks/useDoubleClickDetail';
import { generateDays } from '../../util/TimeUtil';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customLocale from '../../util/month-locale';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { updatePageIndexFilter, updateYearMonthFilter } from '../../redux/slice/SearchFilterSlice';
import { closingTimeKeeping, getCountTimeKeeping, getListTimeKeeping, timeSheetState } from '../../service/TimeKeepingSerivce';
import { responseData } from '../../util/ResponseUtil';
import { LETTER_TYPE_LEAVE, LETTER_TYPE_OVERTIME } from '../../util/LetterUtil';
import DeparmentFilterComponent from '../employee/component/DeparmentFilterComponent';
import { toast } from 'react-toastify';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { CLOSING } from '../../util/ApproveOrDeleteUtil';

const TimeSheetComponent = () => {
    const dispatch = useDispatch();
    const [monthValue, setMonthValue] = useState(dayjs());
    const [open, setOpen] = useState(false);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const tableRef = useRef(null)
    const infoWorkDay = useRef(null)
    const { xdb, ydb, showMenudb } = useDoubleClickDetail(tableRef, infoWorkDay, 600, 400);
    const timeSheetFilter = useSelector((state) => state.searchFilter);
    const [selected, setSelected] = useState({})
    const [totalDecision, setTotalDecision] = useState(0)
    const [typeOpen, setTypeOpen] = useState([])
    const [sheetState, setSheetState] = useState(null)
    const [timeKeeping, setTimeKeeping] = useState([])

    useEffect(() => {
        if (monthValue) {
            setDaysInMonth(generateDays(monthValue.month() + 1))
            const formattedMonthDisplay = monthValue.format('MM/YYYY');
            const fommattedMonthValue = monthValue.format('YYYY-MM')
            dispatch(updateTitleHeader({ title: "Bảng công tháng " + formattedMonthDisplay, subTitle: "" }))
            dispatch(updateYearMonthFilter(fommattedMonthValue))
        }
    }, [monthValue])

    useEffect(() => {
        if (timeSheetFilter.yearMonth) {
            timeSheetState(timeSheetFilter.yearMonth).then((response) => {
                responseData(response, setSheetState)
            })
        }
    }, [timeSheetFilter.yearMonth])

    useEffect(() => {
        if (timeSheetFilter.yearMonth) {
            getListTimeKeeping(timeSheetFilter).then((response) => {
                responseData(response, setTimeKeeping)
            })
        }
    }, [timeSheetFilter])


    useEffect(() => {
        if (timeSheetFilter.yearMonth) {
            getCountTimeKeeping(timeSheetFilter).then((response) => {
                if (response.data.code === 1000) {
                    setTotalDecision(response.data.data)
                }
            })
        }
    }, [
        timeSheetFilter.name,
        JSON.stringify(timeSheetFilter.department || []),
        JSON.stringify(timeSheetFilter.jobPosition || []),
        JSON.stringify(timeSheetFilter.duty || []),
        timeSheetFilter.dateJoin || '',
        timeSheetFilter.yearMonth
    ])


    const handleIconClick = () => {
        setOpen(true);
    };

    const handleMonthChange = (date) => {
        if (date) {
            setMonthValue(date);
        }
        setOpen(false); // Đóng popup sau khi chọn
    };

    const handleClosed = () => {
        closingTimeKeeping(timeSheetFilter.yearMonth).then((response) => {
            if (response.data.code === 1000) {
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
                toast.success("Chốt bảng công thành công!")
                setSheetState(true)
            }
        })
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header  flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ align-items-center justify-content-between ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <span className='active-category-list'>Bảng chấm công</span>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                {
                                    sheetState === false && (
                                        <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#approve_delete_component"
                                        >
                                            <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                            <span style={{ whiteSpace: 'nowrap' }}>Chốt</span>
                                        </div>
                                    )
                                }
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", position: "relative" }}
                                    onClick={handleIconClick} >
                                    <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>{monthValue ? monthValue.format('MM/YYYY') : 'Tháng'} </span>
                                    <div style={{ position: 'absolute', top: 0, left: "80px", opacity: 0, pointerEvents: 'none' }}>
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
                                <div className="d-flex flex-column align-items-center nav-item department-filter"
                                    style={{ fontSize: "13px", marginLeft: "15px", fontWeight: 500 }}
                                    data-bs-toggle="modal" data-bs-target="#department-filter"
                                    onClick={() => setTypeOpen([...typeOpen, "departmentFilter"])}
                                >
                                    <i className='fe fe-layers' />
                                    <span>Phòng ban</span>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive height-my-table">
                            <div class="table-container sticky-table">
                                <table class="table table-bordered" id='myTable'>
                                    <thead class="thead-light">
                                        <tr>
                                            <th rowSpan="2" className='table-manv'>Mã NV</th>
                                            <th rowSpan="2" className='table-hovaten'>Họ và tên</th>
                                            <th rowSpan="2" className='table-phongban'>Phòng ban</th>
                                            <th rowSpan="2" className='table-vitri'>Vị trí</th>
                                            {daysInMonth.map((d, index) => (
                                                <th key={index}>{d.weekday}</th>
                                            ))}
                                            <th colSpan="2">Đi muộn</th>
                                            <th colSpan="3">Nghỉ phép</th>
                                            <th rowSpan="2">Số <br />Công</th>
                                            <th>Làm thêm</th>
                                        </tr>
                                        <tr>
                                            {daysInMonth.map((d, index) => (
                                                <th style={{ fontSize: "12px" }} key={index}>{d.day}</th>
                                            ))}
                                            <th>Số buổi</th>
                                            <th>Tiền phạt</th>
                                            <th>Đầu kỳ</th>
                                            <th>Đã dùng</th>
                                            <th>Phép tồn</th>
                                            <th>Số giờ</th>
                                        </tr>
                                    </thead>
                                    <tbody ref={tableRef}>
                                        {timeKeeping.length > 0 && timeKeeping.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.employeeCode}</td>
                                                <td>{item.employeeName}</td>
                                                <td>{item.department}</td>
                                                <td>{item.jobPosition}</td>
                                                {item.timeKeeping.length > 0 && item.timeKeeping.map((dayWorking, index) => {
                                                    var value = dayWorking.workDay
                                                    var symbol = dayWorking.symbolLetter
                                                    const dateWorking = new Date(dayWorking.dateWorking)
                                                    const isLastWeek = dateWorking.getDay() === 0 || dateWorking.getDay() === 6
                                                    if ((isLastWeek) && value === 0) {
                                                        value = "N"
                                                    }
                                                    if (dayWorking.late) {
                                                        symbol = '\u2212'
                                                    }
                                                    if (dayWorking.symbolLetter) {
                                                        const result = dayWorking.symbolLetter.split(",").map(item => {
                                                            const [symbol, type] = item.split("-");
                                                            return { symbol, type: parseInt(type) };
                                                        });
                                                        result.forEach(item => {
                                                            if (dayWorking.workDay > 0 && item.type === LETTER_TYPE_OVERTIME) {
                                                                symbol = '\u002B'
                                                            } else if (dayWorking.workDay === 0 && item.type === LETTER_TYPE_LEAVE) {
                                                                symbol = ""
                                                                value = item.symbol
                                                            }
                                                        })
                                                    }
                                                    return (
                                                        <td className='item-working' style={{ textAlign: 'center', backgroundColor: isLastWeek ? "#f5f5f5" : "" }} key={index}
                                                            onDoubleClick={() => setSelected({
                                                                employeeId: item.employeeId,
                                                                employeeName: item.employeeName,
                                                                employeeCode: item.employeeCode,
                                                                department: item.department,
                                                                jobPosition: item.jobPosition,
                                                                dateWorking: dayWorking.dateWorking,
                                                            })}
                                                        >
                                                            <div style={{ position: "relative", display: 'inline-block', zIndex: 1 }}>
                                                                <span>{value}</span>
                                                                {symbol && (
                                                                    <span style={{
                                                                        position: 'absolute',
                                                                        top: '0px',
                                                                        right: '-5px',
                                                                        fontSize: '10px',
                                                                        fontWeight: 600
                                                                    }}>
                                                                        {symbol}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    )
                                                })}

                                                {item.timeKeeping.length > 0 && (
                                                    <>
                                                        <td>{item.totalLateDay}</td>
                                                        <td>{item.totalLateDay * 50}</td>
                                                        <td>{item.onLeaveTotal}</td>
                                                        <td>{item.onLeaveUsed}</td>
                                                        <td>{item.onLeaveTotal - item.onLeaveUsed}</td>
                                                        <td>{item.totalWorkDay}</td>
                                                        <td>{item.overTimeTotal}</td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row pageable-center">
                            <div className="col-sm-12 col-md-5">
                                <div>Hiển thị {(() => {
                                    const start = (timeSheetFilter.pageIndex - 1) * 12 + 1;
                                    const end = Math.min(timeSheetFilter.pageIndex * 12, totalDecision);
                                    return `${start} - ${end}`;
                                })()} trong {totalDecision} bản ghi</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate mg-top-0">
                                    <ul className="pagination">
                                        <li className={`page-item previous disabled my-center ${timeSheetFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(timeSheetFilter.pageIndex - 1)) }}>
                                            <i className="ti ti-chevron-left"></i>
                                        </li>
                                        <li className="page-item active "><a className="page-link">{timeSheetFilter.pageIndex}</a></li>
                                        <li className={`page-item next disabled my-center  ${((timeSheetFilter.pageIndex - 1) * 12 + 12) >= totalDecision ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(timeSheetFilter.pageIndex + 1)) }}>
                                            <i className="ti ti-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TimeKeepingDetailComponent x={xdb} y={ydb} showMenu={showMenudb} selected={selected} ref={infoWorkDay} />
            <DeparmentFilterComponent typeOpen={typeOpen} />
            <ApproveOrDeleteComponent handleClick={handleClosed} type={CLOSING} />
        </>
    );
};

export default TimeSheetComponent;

