import React from 'react';
import './css/setting-style.css';

const SettingTypeInsuranceComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card card-body">
                        {/* <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='mt-4'></div>
                            <div className='d-flex tab-type active-tab-type'>
                                <span>Cài đặt 1</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((1 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((2 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((3 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>

                            <div className='d-flex tab-type active-tab-type' style={{ left: `${142 + ((4 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((5 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((6 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((7 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                            <div className='d-flex tab-type' style={{ left: `${142 + ((3 - 1) * 125)}px` }}>
                                <span>Cài đặt 2</span>
                            </div>
                        </div> */}
                        <div class=" d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className="tab-container d-flex">
                                <div className="tab-type active-tab-type">
                                    <span>Cài đặt 1</span>
                                </div>
                                {[...Array(9)].map((_, index) => (
                                    <>
                                        <div key={index} className="tab-type">
                                            <span>Cài đặt {index + 2}</span>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>


                        <div class="row mt-4">
                            <div class="col-md-5">
                                <div class="mb-3">
                                    <label class="form-label">Phòng ban </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">Mức đóng </label>
                                    <input type="text" class="form-control" placeholder='Cấp bậc' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Từ tháng</label>
                                    <input type="text" class="form-control input-rtl" placeholder='Nhập mô tả' />
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

export default SettingTypeInsuranceComponent;

