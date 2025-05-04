import React, { useRef } from 'react';
import './css/tax-style.css'
import useDoubleClickDetail from '../../hooks/useDoubleClickDetail';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';

const ListTaxComponent = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Bảng thuế", subTitle: "" }))
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
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                    <i className='fe fe-calendar' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Năm</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                    <i className='ti ti-filter' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Theo phòng</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }}>
                                    <i className='ti ti-plus' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Phát sinh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive">
                            <div class="table-container sticky-table-tax">
                                <table class="table table-bordered" id='myTable'>
                                    <thead class="thead-light">
                                        <tr>
                                            <th rowSpan="2" className='table-manv'>Mã NV</th>
                                            <th rowSpan="2" className='table-hovaten'>Họ và tên</th>
                                            <th rowSpan="2" className='table-phongban'>Phòng ban</th>
                                            <th colSpan="5">Quyết toán thuế</th>
                                            <th colSpan="2">Tháng 1</th>
                                            <th colSpan="2">Tháng 2</th>
                                            <th colSpan="2">Tháng 3</th>
                                            <th colSpan="2">Tháng 4</th>
                                            <th colSpan="2">Tháng 5</th>
                                            <th colSpan="2">Tháng 6</th>
                                            <th colSpan="2">Tháng 7</th>
                                            <th colSpan="2">Tháng 8</th>
                                            <th colSpan="2">Tháng 9</th>
                                            <th colSpan="2">Tháng 10</th>
                                            <th colSpan="2">Tháng 11</th>
                                            <th colSpan="2">Tháng 12</th>
                                        </tr>
                                        <tr>
                                            <th>Tổng thu nhập</th>
                                            <th>Phát sinh</th>
                                            <th>Tổng thuế phải đóng</th>
                                            <th>Đã đóng</th>
                                            <th>Còn lại</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td></td>
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
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td></td>
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
            {/* <TimeKeepingDetailComponent x={xdb} y={ydb} showMenu={showMenudb} /> */}
        </>
    );
};

export default ListTaxComponent;

