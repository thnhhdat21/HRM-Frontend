import React from 'react';

const SalaryDecisionComponent = () => {
    return (
        <>
            <div class="modal fade" id="create_salary_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Quyết định tăng lương</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row ">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Số quyết định </label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày quyết định </label>
                                        <input type="date" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Nhân viên </label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do</label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Từ ngày </label>
                                        <input type="date" class="form-control " placeholder='' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tiền lương cũ </label>
                                        <input type="text" class="form-control " placeholder='Việt ghi chú' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tiền lương mới </label>
                                        <input type="text" class="form-control " placeholder='Việt ghi chú' />
                                    </div>
                                </div>
                            </div>

                            <div className='row' style={{ marginLeft: "10px" }}>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <table class="table borderless table-create-profile">
                                            <tr>
                                                <th>Phụ cấp</th>
                                                <th style={{ width: "30%" }}>Số tiền</th>
                                                <th style={{ width: "5%" }}></th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <select className="form-control">
                                                        <option value="" selected hidden>Chọn</option>
                                                        <option value="Cha">Cha</option>
                                                        <option value="Mẹ">Mẹ</option>
                                                        <option value="Anh trai">Anh trai</option>
                                                        <option value="Chị gái">Chị gái</option>
                                                        <option value="Con">Con</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                <td>
                                                    <div class="col-md-1 d-flex align-items-center">
                                                        <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="col-md-1 mt-2" style={{ marginLeft: "10px" }}>
                                            <div class="mb-2 circle">
                                                <i className='ti ti-plus' />
                                            </div>
                                        </div>
                                    </div>
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
            </div>
        </>
    );
};

export default SalaryDecisionComponent;

