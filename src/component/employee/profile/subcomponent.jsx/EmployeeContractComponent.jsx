import React from 'react';

const EmployeeContractComponent = () => {
    return (
        <div class="tab-pane fade " id="profile-contract" style={{ margin: "60px 10px 0 10px" }}>
            <div class="row">
                <div class="col-xl-8 d-flex">
                    <div class="card flex-fill">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                            <h6>Thông tin chung</h6>
                        </div>
                        <div class="card-body p-0">
                            <div style={{ padding: "16px" }}>
                                <div class="row">
                                    <label class="form-label" style={{ fontSize: "15px" }}>Thông tin hợp đồng</label>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Mã HĐ</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Tên nhân sự</label>
                                            <span className='ms-3'>Nguyễn Thành Đạt</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Tên hợp đồng</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Phòng ban</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Vị trí</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Chức vụ</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Nơi làm việc</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Hình thức hợp đồng</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Hiệu lực từ ngày</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Tình trạng</label>
                                            <p className=' badge bagde-succes'>Đang hiệu lực</p>
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
                                    <label class="form-label" style={{ fontSize: "15px" }}>Lương và phụ cấp</label>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Lương cở bản gross</label>
                                            <span className='ms-3'>20,000,000 VNĐ</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Phụ cấp</label>
                                            <table>
                                                <tr>
                                                    <th>Tên phụ cấp</th>
                                                    <th>Số tiền</th>
                                                </tr>
                                                <tr>
                                                    <td>Phụ cấp ăn trưa</td>
                                                    <td>50,000 VNĐ / Ngày</td>
                                                </tr>
                                                <tr>
                                                    <td>Phụ cấp Taxi</td>
                                                    <td>300,000 VNĐ / Ngày</td>
                                                </tr>
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
                                        <p class="fw-medium text-gray-9 mb-1"><a href="https://smarthr.dreamstechnologies.com/html/template/activity.html">Hợp đồng 2 năm</a></p>
                                        <span>Gia hạn</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeContractComponent;