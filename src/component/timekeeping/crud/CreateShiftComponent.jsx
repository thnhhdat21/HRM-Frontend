import React from 'react';
import '../css/timekeeping-style.css'

const CreateShiftComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="content">
                    <div class="card card-body">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <h4 className='mb-3'>Tạo mới phân ca</h4>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin chung</label>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-9">
                                <div class="mb-3">
                                    <label class="form-label">Tiêu đề </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-5">
                                <div class="mb-3">
                                    <label class="form-label">Phân ca </label>
                                    <select className="form-control">
                                        <option value="" selected hidden>Chọn</option>
                                        <option value="Cha">Phân ca cho phòng ban, vị trí</option>
                                        <option value="Mẹ">Phân ca cho cá nhân</option>
                                        <option value="Anh trai">Phân ca cho toàn bộ công ty</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Loại ca </label>
                                    <select className="form-control">
                                        <option value="" selected hidden>Chọn</option>
                                        <option value="Cha">Hành chính</option>
                                        <option value="Mẹ">Ca kíp</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Phòng ban </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Vị trí </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Phân công </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Hiệu lực từ ngày </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Đến ngày </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin phân công</label>
                        </div>


                        {/* Phân ca theo cá nhân */}
                        {/* <div className='row' style={{ marginLeft: "10px" }}>
                            <div class="col-md-12">
                                <div class="mb-3">
                                    <div class="custom-datatable-filter table-responsive table-work-shift-personal">
                                        <div class="table-container">
                                            <table class="table" id='myTable'>
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th></th>
                                                        <th >Mã NV</th>
                                                        <th>Nhân sự</th>
                                                        <th>Vị trí</th>
                                                        <th>Phòng ban</th>
                                                        <th>Thứ 2</th>
                                                        <th>Thứ 3</th>
                                                        <th>Thứ 4</th>
                                                        <th>Thứ 5</th>
                                                        <th>Thứ 6</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-id='1'>
                                                        <td>
                                                            <div class="col-md-1 d-flex align-items-center">
                                                                <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                            </div>
                                                        </td>
                                                        <td><input type="text" className="form-control id-employee" placeholder="" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                        <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-1 mt-2" style={{ marginLeft: "10px" }}>
                                        <div class="mb-2 circle">
                                            <i className='ti ti-plus' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div class="row mt-2">
                            <div class="col-md-1">
                                <label class="form-label">Thứ </label>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Ca </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-1">
                                <input type="text" class="form-control " placeholder='' value="Thứ 2" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control " placeholder='' />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-1">
                                <input type="text" class="form-control " placeholder='' value="Thứ 3" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control " placeholder='' />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-1">
                                <input type="text" class="form-control " placeholder='' value="Thứ 4" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control " placeholder='' />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-1">
                                <input type="text" class="form-control " placeholder='' value="Thứ 5" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control " placeholder='' />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-1">
                                <input type="text" class="form-control " placeholder='' value="Thứ 6" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control " placeholder='' />
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

export default CreateShiftComponent;

