import React from 'react';
import "../css/timekeeping-style.css"

const TimeKeepingDetailComponent = ({ x, y, showMenu, id }) => {

    const style = () => {
        return {
            width: '600px',
            maxHeight: '440px',
            borderRadius: 10,
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
                            <h4 class="modal-title me-2">Nguyễn Thành Đạt, ngày 21/11/2003</h4>
                        </div>
                        <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="menu"
                            aria-label="Close">
                            <i class="ti ti-x"></i>
                        </button>
                    </div>
                    <div class="card-header flex-wrap row-gap-3 p-categoty-list header-timekeeping-detail">
                        <div className='d-flex category-list-employ align-items-center ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500, borderBottom: "1px solid #E9EDF4" }}>
                            <span className=' active-category-list'>Bảng chấm công</span>
                            <span>Đơn từ</span>
                            <span>Chốt chấm công</span>
                            <span >Phạt</span>
                        </div>
                    </div>

                    <div class="modal-body ">
                        <div class="row ">
                            <div class="col-md-12">
                                <label class="form-label">Công làm việc trong ngày: </label>
                                <span>&ensp;1</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <label class="form-label">Thông tin nhân sự: </label>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Mã nhân viên: &ensp; TD021</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Vị trí: &ensp; Trưởng phòng</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12 mb-2">
                                <span>Phòng ban: &ensp; Tích hợp hệ thống </span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <label class="form-label">Ca làm việc: </label>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Tên ca: &ensp; Ca hành chính  </span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Mã ca: &ensp; HC   </span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Thời gian: &ensp; 8:00 - 17:30</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Chốt chấm công: &ensp; 7:30, 21/11/2003 - 7:30, 21/11/2003  </span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Số công được tính: &ensp; 1</span>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="col-md-12">
                                <span>Tiền phạt do đi muộn: &ensp; 50,000 (240p)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default TimeKeepingDetailComponent;

