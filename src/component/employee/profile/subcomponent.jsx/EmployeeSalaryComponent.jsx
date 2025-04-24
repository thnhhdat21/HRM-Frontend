import React, { useRef } from 'react';
import SalaryQuickWatchComponent from '../../crud/SalaryQuickWatchComponent';
import useDoubleClickDetail from '../../../../hooks/useDoubleClickDetail';

const EmployeeSalaryComponent = () => {
    const tableRef = useRef(null)
    const { xdb, ydb, showMenudb } = useDoubleClickDetail(tableRef, 600, 370);

    return (
        <>
            <div class="tab-pane fade" id="profile-salary" style={{ margin: "60px 10px 0 10px" }}>
                <div class="row">
                    <div class="col-xl-8 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 ">
                                    <h6>Lương thực nhận năm 2024</h6>
                                    <i className='fe fe-calendar icon-header-2' style={{ marginLeft: "15px", fontSize: "20px" }} />
                                </div>
                            </div>
                            <div class="card-body p-0" ref={tableRef}>
                                <div style={{ padding: "16px" }}>
                                    <div class="row">
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 1</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 2</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 3</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 4</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 5</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 6</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 7</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month">
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 8</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" >
                                        <div class="col-md-3 item-salary-month" style={{ borderBottom: "none" }} >
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 9</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month" style={{ borderBottom: "none" }}>
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 10</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month" style={{ borderBottom: "none" }}>
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 11</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 item-salary-month" style={{ borderBottom: "none" }}>
                                            <div class="d-flex flex-column info-detail">
                                                <label class="form-label">Tháng 12</label>
                                                <div className='content-salary-month'>
                                                    <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                    <span>72,000,000 VNĐ</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header">
                                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Lịch sử lương và phụ cấp</h6>
                                </div>
                            </div>
                            <div class="card-body schedule-timeline activity-timeline">
                                <div class="d-flex align-items-start">
                                    <div class="avatar avatar-md avatar-rounded bg-info flex-shrink-0 dots-history">
                                    </div>
                                    <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <p class="fw-medium text-gray-9 mb-1">13/10/2023</p>
                                            <i className='ti ti-chevron-down' />
                                        </div>
                                        <div style={{ marginLeft: "15px" }}>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p class="fw-medium text-gray-9 mb-1">Lương cơ bản gross</p>
                                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p class="fw-medium text-gray-9 mb-1">Phụ cấp</p>
                                                <p class="fw-medium text-gray-9 mb-1">300,000 VNĐ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SalaryQuickWatchComponent x={xdb} y={ydb} showMenu={showMenudb} />
        </>
    );
};

export default EmployeeSalaryComponent;

