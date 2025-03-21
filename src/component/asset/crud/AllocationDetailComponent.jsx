import React from 'react';

const AllocationDetailComponent = ({ x, y, showMenu, id }) => {

    const style = () => {
        return {
            width: '600px',
            maxHeight: '440px',
            borderRadius: 10,
            display: 'flex',
            padding: 20,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none'
        }
    }

    return (
        <>
            <div class="menu" id="detail_timekeeping" style={style()}>
                <div class="modal-content">
                    <div class="modal-header no-border">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title me-2">Mã cấp phát - CP106/2021</h4>
                        </div>
                        <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="menu"
                            aria-label="Close">
                            <i class="ti ti-x"></i>
                        </button>
                    </div>
                    <div class="mt-2 card-header flex-wrap row-gap-3 p-categoty-list header-timekeeping-detail d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid #E9EDF4" }}>
                        <div className='d-flex category-list-employ align-items-center ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <span className=' active-category-list'>Thông tin cấp phát</span>
                            <span>Lịch sử cấp phát</span>
                            <span>Lịch sử thu hồi</span>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                <i className='ti ti-refresh' style={{ fontSize: "20px" }} />
                                <span className='p-0' style={{ whiteSpace: 'nowrap', margin: 0 }}>Điều chuyển</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "20px" }}>
                                <i className='ti ti-arrow-back-up' style={{ fontSize: "20px" }} />
                                <span className='p-0' style={{ whiteSpace: 'nowrap', margin: 0 }}>Thu hồi</span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-body ">
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Mã CP: </label>
                                <span>&ensp;CP106/2021</span>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Tài sản: </label>
                                <span>&ensp;LapTop</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Người cấp: </label>
                                <span>&ensp;Phòng nhân sự</span>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Cấp phát cho: </label>
                                <span>&ensp;Phòng ban</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Phòng ban được cấp phát: </label>
                                <span>&ensp; Phòng Tích Hợp Hệ Thống</span>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ngày cấp: </label>
                                <span>&ensp; 27/09/2021</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Giờ cấp: </label>
                                <span>&ensp; 8:30</span>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Số lượng: </label>
                                <span>&ensp; 1 Cái</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-6">
                                <label class="form-label">Đã thu hồi: </label>
                                <span>&ensp; 0 Cái</span>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Địa điểm bàn giao: </label>
                                <span>&ensp; Phòng nhân sự</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <label class="form-label">Lý do cấp phát: </label>
                                <span>&ensp; Nhân sự mới</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AllocationDetailComponent;

