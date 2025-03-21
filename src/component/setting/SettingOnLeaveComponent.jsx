import React from 'react';
import './css/setting-style.css';
import { Link } from 'react-router-dom';

const SettingOnLeaveComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>CÀI ĐẶT NGHỈ PHÉP</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Số ngày nghỉ phép tối đa trong 1 năm</h5>
                                        <div className='date-increase'>
                                            <p>Theo luật những công việc hành chính là 12 ngày/năm</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input type="email" className='form-control' />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Chu kỳ tính phép</h5>
                                        <div className='date-increase'>
                                            <p>Thường các doanh nghiệp có chu kỳ tính phép theo năm dương lịch.</p>
                                        </div>
                                    </div>
                                    <div className='row justify-content-end'>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-2 d-flex align-items-center justify-content-center">
                                            <div class="mb-3">
                                                đến hết tháng
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Cài đặt số phép được hưởng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                            <span>Mỗi tháng 1 phép, còn lại thì cộng vào tháng đầu</span>
                                        </div>
                                        <div class="form-check form-check-md me-2 mt-3">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                            <span>Lấy tổng số phép tối đa 1 năm chia đều cho 12 tháng</span>
                                        </div>
                                        <div class="form-check form-check-md me-2 mt-3">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                            <span>Nhận hết phép năm trong tháng đầu tiên của năm</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày được thêm phép mới</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input type="email" className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <Link to={"/settings/timekeeping"} class="d-flex justify-content-between align-items-center p-3">
                            <h5>CÀI ĐẶT CA LÀM VIỆC</h5>
                            <i style={{ fontSize: "25px" }} className='ti ti-external-link' />
                        </Link>

                    </div>


                    <div class="modal-footer mt-2">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingOnLeaveComponent;

