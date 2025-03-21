import React from 'react';
import '../css/crud-style.css';


const AccountEditComponent = () => {
    return (
        <>
            <div class="modal fade" id="edit_account">
                {/* <div class="page-wrapper" id="crud_department"> */}
                <div class="modal-dialog modal-dialog-centered modal-lg modal-edit-account">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Sửa tài khoản</h4>
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
                                            <div class="col-md-8">
                                                <div class="mb-3">
                                                    <label class="form-label">Hồ sơ nhân sự</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Tài khoản</label>
                                                    <input type="email" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Phòng ban <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="mb-3">
                                                    <label class="form-label">Email</label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày sinh</label>
                                                    <input type="text" class="form-control" />

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Điện thoại</label>
                                                    <input type="text" class="form-control" />

                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Trạng thái <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Thay đổi mật khẩu</span>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Xác nhận lại mật khẩu <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Nhóm người dùng <span class="text-danger">
                                                        *</span></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div className='checkbox-permisstion'>
                                                <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                                                <span style={{ marginLeft: "20px" }}>Tùy chỉnh quyền</span>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body p-0">
                                                        <div class="custom-datatable-filter table-responsive">
                                                            <div class="table-container">
                                                                <table class="table table-permission" id='myTable'>
                                                                    <thead class="thead-light">
                                                                        <tr>
                                                                            <th></th>
                                                                            <th>Đối tượng</th>
                                                                            <th>Quản lý</th>
                                                                            <th>Xem</th>
                                                                            <th>Tạo mới</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>NHÂN SỰ</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Hồ sơ nhân sự</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Hợp đồng</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Bảo hiểm</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>BẢNG LƯƠNG</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Bảng lương</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Loại bảng lương</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>


                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>CHẤM CÔNG</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Chấm công</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Bảng chấm công</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>ĐƠN TỪ</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Đơn từ</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span className='tittle'>TÀI SẢN</span></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <div class="form-check form-check-md">
                                                                                    <input class="form-check-input" type="checkbox" />
                                                                                </div>
                                                                            </td>
                                                                            <td><span>Tài sản</span></td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Quản lý công ty</option>
                                                                                    <option value="no-create">Quản lý phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect2">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="no-create">Xem công ty</option>
                                                                                    <option value="no-create">Xem phòng ban</option>
                                                                                </select>
                                                                            </td>
                                                                            <td>
                                                                                <select id="roleSelect3">
                                                                                    <option value="" selected hidden>Chọn quyền</option>
                                                                                    <option value="create">Tạo mới</option>
                                                                                    <option value="no-create">Không tạo mới</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
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
                </div>
            </div>
        </>
    );
};

export default AccountEditComponent;

