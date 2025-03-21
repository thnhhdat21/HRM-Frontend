import React from 'react';

const PayrollDetailComponent = () => {
    return (
        <div className='page-wrapper'>
            < div class="header" style={{ marginTop: "50px", height: "55px", background: "#f8f9fa" }} >
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
            </div >

            <div style={{ margin: "60px 10px 0 10px" }}>
                <div class="row">
                    <div class="col-xl-8 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                <h6>Thông tin chung</h6>
                            </div>
                            <div class="card-body p-0">
                                <div style={{ padding: "16px" }}>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Từ khóa đại diện</label>
                                                <span>KD_HN1</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Phòng ban áp dụng</label>
                                                <span>Tích hợp hệ thống</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Vị trí áp dụng</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Bảng chấm công toàn công ty</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Hình thức lương</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Hiển thị phiếu lương</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Ngày tạo</label>
                                                <span>-</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="mb-3 d-flex flex-column info-detail">
                                                <label class="form-label">Tự động tạo vào ngày</label>
                                                <p></p>
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
                                        <label class="form-label" style={{ fontSize: "15px" }}>Cấu hình các cột</label>
                                    </div>

                                    <div className='row mt-2'>
                                        <div class="custom-datatable-filter table-responsive">
                                            <div class="table-container">
                                                <table class="table table-bordered" id='myTable'>
                                                    <thead class="thead-light">
                                                        <tr>
                                                            <th style={{ width: "5%" }}>Cột</th>
                                                            <th >Tiêu đề cột</th>
                                                            <th >Từ khóa cột</th>
                                                            <th >Loại</th>
                                                            <th >Cách tính (công thức/ hằng số)</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><span>A</span></td>
                                                            <td><span>Mã nhân sự</span></td>
                                                            <td><span>PERSONNEL_CODE</span></td>
                                                            <td><span>Hệ thống</span></td>
                                                            <td><span></span></td>
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
                    <div class="col-xl-4 d-flex">
                        <div class="card flex-fill">
                            <div class="card-header">
                                <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Lịch sử hoạt động</h6>
                                </div>
                            </div>
                            <div class="card-body schedule-timeline activity-timeline">
                                <div class="d-flex align-items-start">
                                    <div class="avatar avatar-md avatar-rounded bg-info flex-shrink-0 dots-history">
                                    </div>
                                    <div class="flex-fill ps-3 pb-4 timeline-flow content-history">
                                        <span>14: 58 13/10/2023</span>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <p class="fw-medium text-gray-9 mb-1"><a href="https://smarthr.dreamstechnologies.com/html/template/activity.html">Nguyễn Thành Đạt -TD021 </a>đã tạo phân ca</p>
                                        </div>
                                        <span>ID:22 - Bảng lương kinh doanh HN</span>
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

export default PayrollDetailComponent;