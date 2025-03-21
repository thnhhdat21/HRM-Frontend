import React from 'react';

const HolidaysCRUDComponent = () => {
    return (
        <>
            <div class="modal fade" id="crud_holiday">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới ngày nghỉ</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row ">
                                <div class="col-md-12">
                                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do </label>
                                        <input type="email" class="form-control" placeholder='Lý do nghỉ' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Loại nghỉ </label>
                                        <input type="date" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Danh sách ngày nghỉ</label>
                            </div>
                            <div className='row' style={{ marginLeft: "10px" }}>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <table class="table borderless table-create-profile">
                                            <tr>
                                                <th>Ngày nghỉ</th>
                                                <th>Mô tả</th>
                                                <th>Tính công</th>
                                                <th>Phòng ban</th>
                                                <th>Vị trí</th>
                                                <th style={{ width: "5%" }}></th>
                                            </tr>
                                            <tr>
                                                <td><input type="date" className="form-control" placeholder="Nhập lương" /></td>
                                                <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                <td>
                                                    <select className="form-control">
                                                        <option value="Cha">Có</option>
                                                        <option value="Mẹ">Không</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-control">
                                                        <option value="" selected hidden>Chọn</option>
                                                        <option value="Cha">Tất cả</option>
                                                        <option value="Mẹ">Tích hợp hệ thống</option>
                                                        <option value="Anh trai">Dịch vụ trực tuyến</option>
                                                        <option value="Chị gái">Chị gái</option>
                                                        <option value="Con">Con</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="form-control">
                                                        <option value="" selected hidden>Chọn</option>
                                                        <option value="Cha">Tất cả</option>
                                                        <option value="Mẹ">Tích hợp hệ thống</option>
                                                        <option value="Anh trai">Dịch vụ trực tuyến</option>
                                                        <option value="Chị gái">Chị gái</option>
                                                        <option value="Con">Con</option>
                                                    </select>
                                                </td>
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

export default HolidaysCRUDComponent;

