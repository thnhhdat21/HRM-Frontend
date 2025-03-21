import React from 'react';

const SalaryQuickWatchComponent = ({ x, y, showMenu, id }) => {

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
            display: showMenu ? 'flex' : 'none',
            zIndex: 10,
        }
    }

    return (
        <>
            <div class="menu" id="detail_timekeeping" style={style()}>
                <div class="modal-content">
                    <div class="modal-header no-border">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title me-2">Phiếu lương tháng 1/2023</h4>
                        </div>
                        <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="menu"
                            aria-label="Close">
                            <i class="ti ti-x"></i>
                        </button>
                    </div>
                    <div class="card-header flex-wrap row-gap-3 p-categoty-list header-timekeeping-detail">
                        <div className='d-flex category-list-employ align-items-center ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500, borderBottom: "1px solid #E9EDF4" }}>
                            <span >Tổng thu nhập:</span>
                            <span className='text-success' style={{ fontSize: "25px" }}>4,692,500 VNĐ</span>
                        </div>
                    </div>

                    <div class="modal-body ">
                        <div class="row ">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Công làm việc</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Số công chuẩn</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Lương cơ bản gross</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Thưởng KPI</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Thưởng lễ 2/9</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p class="fw-medium text-gray-9 mb-1">Lương thực tế</p>
                                <p class="fw-medium text-gray-9 mb-1">7,750,000 VNĐ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SalaryQuickWatchComponent;

