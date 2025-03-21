import React from 'react';
import AcceptDecisionComponent from '../../decision/crud/AcceptDecisionComponent';

const DetailApprovalComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="p-categoty-list">
                    <div className='d-flex align-items-center justify-content-between category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                        <span className='active-category-list' style={{ fontWeight: 500 }}>Chi tiết thông tin</span>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_decision">
                                <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                <span >Duyệt</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-edit' style={{ fontSize: "20px" }} />
                                <span >Sửa</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-trash' style={{ fontSize: "20px" }} />
                                <span >Thu hồi</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-clock' style={{ fontSize: "20px" }} />
                                <span>Lịch sử</span>
                            </div>
                        </div>
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
                                                    <span className='ms-3'>Nguyễn Thành Đạt</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Mã nhân viên </label>
                                                    <span>TD021</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Phòng ban</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Vị trí</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Chức vụ</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Lý do</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Tính công</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3 d-flex flex-column info-detail">
                                                    <label class="form-label">Trạng thái</label>
                                                    <span>Tích hợp hệ thống</span>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <div class="mb-3 d-flex flex-column info-detail">
                                                        <label class="form-label">Người duyệt</label>
                                                        <span>Nguyễn Đức Quý</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3 d-flex flex-column info-detail">
                                                        <label class="form-label">Ý kiến người duyệt</label>
                                                        <span>-</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex flex-column info-detail">
                                                        <label class="form-label">Mô tả</label>
                                                        <span>-</span>
                                                    </div>
                                                </div>
                                            </div>
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
                                                                            <th>Thời lượng</th>
                                                                            <th>Thời gian theo ca</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr data-id='1'>
                                                                            <td>
                                                                                <span>Nửa ca đầu 10/10/2023</span>
                                                                            </td>
                                                                            <td>
                                                                                <span>Nửa ca sau 10/10/2023</span>
                                                                            </td>
                                                                            <td>
                                                                                <span>1 ngày</span>
                                                                            </td>
                                                                            <td>
                                                                                <span>1 ngày</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
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

            <AcceptDecisionComponent />
        </>
    );
};

export default DetailApprovalComponent;

