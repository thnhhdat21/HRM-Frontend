import React from 'react';

const OvertimeApprovalComponent = () => {
    return (
        <>
            <div class="modal fade" id="create_overtime_approval">
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Đăng ký làm thêm giờ</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body test">
                            <div class="row ">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày đăng ký </label>
                                        <input type="date" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                                <div class="col-md-5 form-check form-check-md d-flex align-items-center mt-2" style={{ margin: "0 0 0 10px" }} >
                                    <input class="form-check-input" type="checkbox" id="select-all" />
                                    <label class="form-label" style={{ margin: "0 0 0 10px" }}>Làm thêm qua ngày hôm sau </label>
                                </div>

                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Giờ bắt đầu làm thêm</label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Giờ kết thúc làm thêm</label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tổng số giờ đăng ký</label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do làm thêm</label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Mô tả</label>
                                        <textarea type="email" class="form-control" placeholder='Nhập tên chức vụ' />
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

export default OvertimeApprovalComponent;

