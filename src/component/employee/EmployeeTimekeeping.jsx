import React from 'react';
import "./css/profile.css"

const EmployeeTimekeeping = () => {
    return (
        <div className='page-wrapper'>
            {/* < div class="header" style={{ marginTop: "50px", height: "55px", background: "#f8f9fa" }} >
                <div class="main-header">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                        <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">

                            <div className="d-flex flex-column align-items-center icon-header-2 " style={{ fontSize: "12px" }}>
                                <i className='ti ti-plus' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Bảng lương</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ marginLeft: "15px", fontSize: "12px" }}>
                                <i className='ti ti-edit' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Sửa </span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ marginLeft: "15px", fontSize: "12px" }}>
                                <i className='ti ti-trash' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Xóa </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div > */}

            <div style={{ margin: "20px 10px 0 10px" }}>
                <div class="row">
                    <div class="col-xl-8 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <h6>Bảng công chi tiết tháng</h6>
                                <div className="d-flex align-items-center justify-content-center" style={{ marginLeft: "15px", fontSize: "12px" }}>
                                    <span class="form-label" style={{ whiteSpace: "nowrap", margin: "0" }}>Chọn tháng</span>
                                    <select className="form-control" style={{ marginLeft: "15px", width: "100px" }}>
                                        <option value="" selected hidden>Chọn</option>
                                        <option value="">8/2023</option>
                                        <option value="">8/2023</option>
                                        <option value="">8/2023</option>
                                        <option value="">8/2023</option>
                                    </select>
                                </div>
                            </div>
                            <div class="card-body p-0">
                                <div style={{ padding: "16px" }}>
                                    <table class="table borderless table-timekeeping-employee">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "10%" }}>Ngày</th>
                                                <th>Thời gian</th>
                                                <th>Công/Diễn giải</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="timekeeping-items weekend">
                                                        <span>Thứ Bảy</span>
                                                        <span>01/02</span>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="timekeeping-items weekend">
                                                        <span>Chủ Nhật</span>
                                                        <span>02/02</span>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="timekeeping-items">
                                                        <span>Thứ Hai</span>
                                                        <span>03/02</span>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className='time-checked'>
                                                        <span>08:13:17</span>
                                                        <span className='strong'>15:58:17</span>
                                                    </div>
                                                    <div className='registered-time'>
                                                        <span>Đăng ký: |</span>
                                                        <span><strong>X</strong></span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='work-time'>
                                                        <span>Công làm việc:</span>
                                                        <span className='strong-timekeeping'>1.00</span>
                                                    </div>
                                                    <div className='go-late'>
                                                        <span>Đi muộn:</span>
                                                        <span className='strong-timekeeping'>11 phút</span>
                                                    </div>
                                                    <div className='explain'>
                                                        <i className='fa fa-tag' />
                                                        <span className='strong-timekeeping'> Giải trình đi muộn</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 d-flex" style={{ maxHeight: "200px" }}>
                        <div class="card flex-fill">
                            <div class="card-header">
                                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Tổng công</h6>
                                </div>
                            </div>
                            <div class="card-body schedule-timeline activity-timeline">
                                <div class="d-flex align-items-start">
                                    <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <p class="fw-medium text-gray-9 mb-1">Công thực tế</p>
                                            <span className='strong-timekeeping text-black'>7.0</span>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between mt-2'>
                                            <p class="fw-medium text-gray-9 mb-1">Công tính lương</p>
                                            <span className='strong-timekeeping text-black'>7.0</span>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between mt-2'>
                                            <p class="fw-medium text-gray-9 mb-1">Ngày tính hỗ trợ ăn trưa</p>
                                            <span className='strong-timekeeping text-black'>7.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmployeeTimekeeping;