import React from 'react';
import '../css/crud-style.css';


const ActiveAccountComponent = () => {
    return (
        <>
            <div class="modal fade" id="active_account">
                {/* <div class="page-wrapper" id="crud_department"> */}
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Kích hoạt tài khoản</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 ">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên đăng nhập</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm người dùng</label>
                                                    <select class="select-crud">
                                                        <option>Select</option>
                                                        <option>Finance</option>
                                                        <option>Developer</option>
                                                        <option>Executive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Xác nhận lại mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Tự động tạo tên đăng nhập</span>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Để mật khẩu ngẫu nhiên</span>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Gửi email thông tin đăng nhập cho người dùng</span>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveAccountComponent;

