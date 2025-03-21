import React from 'react';

const CreatePayrollTypeComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="content">
                    <div class="card card-body">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <h4 className='mb-3'>Tạo mới loại bảng lương</h4>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin chung</label>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-2">
                                <div class="mb-3">
                                    <label class="form-label">Mã loại bảng lương </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Tên bảng lương </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">từ khóa đại diện </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Vị trí áp dụng </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Lấy từ bảng chấm công </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">Hình thức lương </label>
                                    <select className="form-control">
                                        <option value="" selected hidden>Chọn</option>
                                        <option value="Cha">Phân ca cho phòng ban, vị trí</option>
                                        <option value="Mẹ">Phân ca cho cá nhân</option>
                                        <option value="Anh trai">Phân ca cho toàn bộ công ty</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-3">
                                <div class="form-check form-check-md">
                                    <input class="form-check-input" type="checkbox" id="select-all" />
                                    <label class="form-label">Tự động tạo hàng tháng</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <select className="form-control">
                                        <option value="" selected hidden>Chọn</option>
                                        <option value="Cha">Ngày 1</option>
                                        <option value="Mẹ">Ngày 3</option>
                                        <option value="Anh trai">Ngày 5</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="form-check form-check-md">
                                    <input class="form-check-input" type="checkbox" id="select-all" />
                                    <label class="form-label">Hiển thị phiếu lương</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Mô tả</label>
                                    <textarea type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin phân công</label>
                        </div>

                        <div className='row' style={{ marginLeft: "10px" }}>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="custom-datatable-filter table-responsive">
                                        <div class="table-container table-payroll-type">
                                            <table class="table" id='myTable'>
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th class="no-sort col-stt"> Cột</th>
                                                        <th className='col-title'>Tiêu đề cột</th>
                                                        <th className='col-value'>Giá trị cột</th>
                                                        <th className='col-keyword'>Từ khóa cột</th>
                                                        <th className='col-math'>Cách tính (công thức/hằng số)</th>
                                                        <th className='col-value-total'>Giá trị của hàng tổng hợp khi tách dòng</th>
                                                        <th className='col-value-type'>Kiểu giá trị</th>
                                                        <th className='col-salary'>Phiếu lương</th>
                                                        <th className='col-decs'>Mô tả</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-id='1'>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                        <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="col-md-1 mt-2">
                                                <div class="mb-2 circle">
                                                    <i className='ti ti-plus' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>



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

export default CreatePayrollTypeComponent;

