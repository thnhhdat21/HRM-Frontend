import React from 'react';
import './css/setting-style.css';
import { Link, useNavigate } from 'react-router-dom';

const SettingInsuranceComponent = () => {
    const navigate = useNavigate();

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN TĂNG BẢO HIỂM</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày chốt tăng hàng tháng</h5>
                                        <div className='date-increase'>
                                            <p>Tăng lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là tăng số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                            <p>Những phát sinh này tăng trước ngày này sẽ báo tăng tháng này, còn sau ngày này sẽ báo tăng tháng sau.</p>
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
                                        <h5 class="fw-medium mb-1">Ký hợp đồng lao động</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ thai sản quay lại làm việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ không lương theo quy định (đã báo giảm) quay trở lại làm việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Tăng mức đóng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN GIẢM BẢO HIỂM</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày chốt giảm hàng tháng</h5>
                                        <div className='date-increase'>
                                            <p>Giảm lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là giảm số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                            <p>Những phát sinh này giảm trước ngày này sẽ báo tăng tháng này, còn sau ngày này sẽ báo tăng tháng sau.</p>
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
                                        <h5 class="fw-medium mb-1">Hợp đồng lao động được đóng bảo hiểm nghỉ việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ thai theo chế độ</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Giảm mức đóng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ không lương</h5>
                                        <div className='date-increase'>
                                            <p>Đối với trường hợp người lao động không làm việc và không hưởng tiền lương quá số ngày nghỉ tối đa hàng tháng thì không đóng BHXH tháng đó.</p>
                                            <p>Thời gian này không được tính để hưởng BHXH.</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3" style={{ marginLeft: "20px" }}>
                                        <h5 class="fw-medium mb-1">Số ngày tối đa nghỉ không lương hàng tháng</h5>
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
                        <Link to={"/settings/type-insurance"} class="d-flex justify-content-between align-items-center p-3">
                            <h5>CÀI ĐẶT TỶ LỆ BẢO HIỂM</h5>
                            <i style={{ fontSize: "25px" }} className='ti ti-external-link' />
                        </Link>

                    </div>


                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingInsuranceComponent;

