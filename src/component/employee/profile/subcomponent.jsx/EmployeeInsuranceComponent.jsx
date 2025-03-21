import React from 'react';

const EmployeeInsuranceComponnent = () => {
    return (
        <div class="tab-pane fade " id="profile-insurance" style={{ margin: "60px 10px 0 10px" }}>
            <div class="row">
                <div class="col-xl-8 d-flex">
                    <div class="card flex-fill">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                            <h6>Thông tin chung</h6>
                        </div>
                        <div class="card-body p-0">
                            <div style={{ padding: "16px" }}>
                                <div class="row">
                                    <label class="form-label" style={{ fontSize: "15px" }}>Thông tin bảo hiểm</label>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Số sổ BHXH</label>
                                            <span>01234</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Số thể BHYT</label>
                                            <span>00123456789</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Mã tỉnh cấp</label>
                                            <span>01</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Đăng ký khám chữa bệnh</label>
                                            <span>0163</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Trạng thái sổ</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Pháp nhân</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <label class="form-label" style={{ fontSize: "15px" }}>Nghiệp vụ báo tăng</label>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">NV hoàn thiện HS</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">NV hoàn thiện HS</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Ngày nhận thẻ BHYT</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Ngày trả thẻ BHYT</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-2">
                                    <label class="form-label" style={{ fontSize: "15px" }}>Nghiệp vụ báo giảm</label>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Ngày nhận sổ BH từ NLĐ</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">NS hoàn thiện HS</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Ngày nhận sổ BH đã chốt</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3 d-flex flex-column info-detail">
                                            <label class="form-label">Ngày trả sổ cho NLĐ</label>
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>



                                <div class="row mt-2">
                                    <div class="mb-3">
                                        <label class="form-label">Lịch sử giải quyết chế độ</label>
                                        <div class="card-body p-0">
                                            <div class="custom-datatable-filter table-responsive">
                                                <div class="table-container">
                                                    <table class="table borderless profile-details">
                                                        <tbody>
                                                            <tr>
                                                                <th>TT</th>
                                                                <th>Ngày nhận hồ sơ</th>
                                                                <th>Ngày hoàn thiện thủ tục</th>
                                                                <th>Ngày nhận tiền BH trả</th>
                                                                <th>Ngày trả chế độ</th>
                                                                <th>Số tiền </th>
                                                            </tr>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>21/02/2022</td>
                                                                <td>27/02/2022</td>
                                                                <td>27/02/2022</td>
                                                                <td>21/02/2022</td>
                                                                <td>141,900</td>
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
                                        <p class="fw-medium text-gray-9 mb-1"><a href="https://smarthr.dreamstechnologies.com/html/template/activity.html">Báo tăng</a></p>
                                        <span>Tăng mới</span>
                                    </div>
                                    <div className='float-end'>
                                        <span style={{ fontSize: "15px", fontWeight: 500, color: "#202c4b" }}>5,000,000 VNĐ</span>
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

export default EmployeeInsuranceComponnent;