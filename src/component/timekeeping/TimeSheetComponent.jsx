import React, { useRef } from 'react';
import './css/timekeeping-style.css'
import TimeKeepingDetailComponent from './crud/TimeKeepingDetailComponent';
import useDoubleClickDetail from '../../hooks/useDoubleClickDetail';

const TimeSheetComponent = () => {
    const tableRef = useRef(null)
    const { xdb, ydb, showMenudb } = useDoubleClickDetail(tableRef, 550, 220);

    const generateDays = () => {
        const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        let days = [];
        let date = new Date(2025, 2, 1); // Bắt đầu từ 1/3/2025

        while (date.getMonth() === 2) {
            days.push({ day: date.getDate(), weekday: weekdays[date.getDay()] });
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const daysInMonth = generateDays();

    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header  flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ align-items-center justify-content-between ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <span className='active-category-list'>Bảng chấm công</span>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                    <i className='fe fe-calendar' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Tháng</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Chốt</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-lock' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Chốt đơn</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-clock' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Lịch sử</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive">
                            <div class="table-container sticky-table">
                                <table class="table table-bordered" id='myTable'>
                                    <thead class="thead-light">
                                        <tr>
                                            <th rowSpan="2" className=' table-tt'>TT</th>
                                            <th rowSpan="2" className='table-manv'>Mã NV</th>
                                            <th rowSpan="2" className='table-hovaten'>Họ và tên</th>
                                            <th rowSpan="2" className='table-phongban'>Phòng ban</th>
                                            <th rowSpan="2" className='table-vitri'>Vị trí</th>
                                            {daysInMonth.map((d, index) => (
                                                <th key={index}>{d.weekday}</th>
                                            ))}
                                            <th colSpan="2">Đi muộn</th>
                                            <th colSpan="2">Đi muộn</th>
                                            <th colSpan="3">Nghỉ phép</th>
                                            <th colSpan="2">Công chính</th>
                                            <th>Làm thêm</th>
                                            <th rowSpan="2">Công <br />chuẩn</th>
                                            <th colSpan="2">Công tổng</th>
                                        </tr>
                                        <tr>
                                            {daysInMonth.map((d, index) => (
                                                <th key={index}>{d.day}</th>
                                            ))}
                                            <th>Số phút</th>
                                            <th>Tiền phạt</th>
                                            <th>Số phút</th>
                                            <th>Tiền phạt</th>
                                            <th>Đầu kỳ</th>
                                            <th>Đã dùng</th>
                                            <th>Phép tồn</th>
                                            <th>Số công</th>
                                            <th>Công lễ</th>
                                            <th>Số giờ</th>
                                            <th>Công hành chính</th>
                                            <th>Công làm thêm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td>Trưởng phòng THHT</td>
                                            <td>N</td>
                                            <td>N</td>
                                            <td >1</td>
                                            <td >1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>N</td>
                                            <td>N</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td>Trưởng phòng THHT</td>
                                            <td>N</td>
                                            <td>N</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>N</td>
                                            <td>N</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td>Trưởng phòng THHT</td>
                                            <td>N</td>
                                            <td>N</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>1</td>
                                            <td>N</td>
                                            <td>N</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row pageable-center">
                            <div class="col-sm-12 col-md-5">
                                <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                            </div>
                            <div class="col-sm-12 col-md-7">
                                <div class="dataTables_paginate mg-top-0">
                                    <ul class="pagination">
                                        <li class="page-item previous disabled my-center">
                                            <i class="ti ti-chevron-left"></i>
                                        </li>
                                        <li class="page-item active "><a class="page-link">1</a></li>
                                        <li class=" page-item next disabled my-center">
                                            <i class="ti ti-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TimeKeepingDetailComponent x={xdb} y={ydb} showMenu={showMenudb} />
        </>
    );
};

export default TimeSheetComponent;

