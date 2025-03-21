import React, { useRef } from 'react';
import './css/timekeeping-style.css'

const OnLeaveManamentComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header  flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ align-items-center' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <span className='active-category-list'>Bảng phép năm 2023</span>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                <i className='fe fe-calendar' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Năm</span>
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
                                            <th colSpan="3">Phép năm</th>
                                        </tr>
                                        <tr>
                                            <th>Đầu kỳ</th>
                                            <th>Đã dùng</th>
                                            <th>Phép tồn</th>
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
        </>
    );
};

export default OnLeaveManamentComponent;

