import React from 'react';
import '../css/crud-style.css';


const PenaltyCRUDComponent = () => {
    return (
        <>
            <div class="modal fade" id="crud_penalty">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới hình phạt</h4>
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
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Lỗi vi phạm <span class="text-danger">
                                                        *</span></label>
                                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="mb-3">
                                                    <label class="form-label">Số tiền </label>
                                                    <input type="text" class="form-control" placeholder='Cấp bậc' />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Mô tả</label>
                                                    <input type="text" class="form-control" placeholder='Nhập mô tả' />
                                                </div>
                                            </div>
                                            <div class="col-md-1 d-flex align-items-center">
                                                <i class="ti ti-x mt-3" style={{ fontSize: "20px" }}></i>
                                            </div>
                                        </div>

                                        <div class="col-md-1">
                                            <div class="mb-2 circle">
                                                <i className='ti ti-plus' />
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

export default PenaltyCRUDComponent;

