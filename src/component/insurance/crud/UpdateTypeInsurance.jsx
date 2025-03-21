import React from 'react';

const UpdateTypeInsurance = () => {
    return (
        <>
            <div class="modal fade" id="update_type_insurance">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Cập nhật tỷ lệ bảo hiểm</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body test">
                            <div class=" d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                <div className="tab-container d-flex">
                                    <div className="tab-type active-tab-type">
                                        <span>Cài đặt 1</span>
                                    </div>
                                    {[...Array(2)].map((_, index) => (
                                        <>
                                            <div key={index} className="tab-type">
                                                <span>Cài đặt {index + 2}</span>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </div>


                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Từ tháng</label>
                                        <input type="date" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Mức đóng </label>
                                        <input type="text" class="form-control" placeholder='Cấp bậc' />
                                    </div>
                                </div>

                            </div>
                            <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Bảo hiểm xã hội </label>
                                        <input type="email" class="form-control input-rtl" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Công ty đóng </label>
                                        <input type="text" class="form-control input-rtl" placeholder='Cấp bậc' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Người lao động</label>
                                        <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Bảo hiểm TNLĐ - BNN </label>
                                        <input type="email" class="form-control input-rtl" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Công ty đóng </label>
                                        <input type="text" class="form-control input-rtl" placeholder='Cấp bậc' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Người lao động</label>
                                        <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Bảo hiểm y tế </label>
                                        <input type="email" class="form-control input-rtl" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Công ty đóng </label>
                                        <input type="text" class="form-control input-rtl" placeholder='Cấp bậc' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Người lao động</label>
                                        <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Bảo hiểm thất nghiệp </label>
                                        <input type="email" class="form-control input-rtl" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Công ty đóng </label>
                                        <input type="text" class="form-control input-rtl" placeholder='Cấp bậc' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Người lao động</label>
                                        <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tổng cộng </label>
                                        <input type="email" class="form-control input-rtl" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tổng công ty đóng </label>
                                        <input type="text" class="form-control input-rtl" placeholder='Cấp bậc' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tổng người lao động</label>
                                        <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" class="btn btn-primary">CẬP NHẬT </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateTypeInsurance;

