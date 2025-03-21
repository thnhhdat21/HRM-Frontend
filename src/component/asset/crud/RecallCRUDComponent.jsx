import React, { useRef } from 'react';

const RecallCRUDComponent = () => {
    return (
        <>
            <div class="modal fade" id="crud_recall">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Thu hồi tài sản</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 overflow-modal-crud">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mã TS</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Thu hồi cho lần cấp phát</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Người được cấp phát<span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Số lượng </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Đã cấp phát / tổng </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Ngày trả<span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ trả </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Địa điểm thu hổi</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mô tả</label>
                                                        <textarea type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary">THÊM MỚI </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

export default RecallCRUDComponent;

