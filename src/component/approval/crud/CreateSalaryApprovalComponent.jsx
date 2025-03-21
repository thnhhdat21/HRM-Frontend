import React from 'react';

const CreateSalaryApprovalComponent = () => {
    return (
        <>
            <div class="modal fade" id="create_salary_approval">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới phiếu ứng lươg</h4>
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
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="mb-3">
                                                    <label class="form-label">Mã nhân sự</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên nhân sự</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày công</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Công chuẩn <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Lương cơ bản </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Lương ngày công </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Đã xin ứng </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Có thể ứng </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin ứng lương</label>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Số tiền xin ứng </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Phí tạm thời </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày xin ứng </label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Lý do ứng </label>
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
                </div >
            </div >
        </>
    );
};

export default CreateSalaryApprovalComponent;

