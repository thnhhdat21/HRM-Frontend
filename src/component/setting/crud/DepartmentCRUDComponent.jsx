import React from 'react';
import '../css/crud-style.css';


const DepartmentCRUDComponent = () => {
    return (
        <>
            <div class="modal fade" id="crud_department">
                {/* <div class="page-wrapper" id="crud_department"> */}
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới phòng ban</h4>
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
                                                    <label class="form-label">Thuộc phòng ban</label>
                                                    <select class="select-crud">
                                                        <option>Select</option>
                                                        <option>Finance</option>
                                                        <option>Developer</option>
                                                        <option>Executive</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Mã</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên phòng ban <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Thuộc phòng ban</label>
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
                                                    <label class="form-label">Khối nghiệp vụ</label>
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
                                                    <label class="form-label">Loại phòng ban</label>
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
                                                    <label class="form-label">Tên phòng ban <span class="text-danger">
                                                        *</span></label>
                                                    <textarea type="text" class="form-control" />
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
                </div>
            </div>
        </>
    );
};

export default DepartmentCRUDComponent;

