import React from 'react';
import '../css/crud-style.css';


const GroupCRUDComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Tạo mới nhóm</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">Tên nhóm<span class="text-danger">
                                    *</span></label>
                                <input type="email" class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='checkbox-permisstion'>
                        <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Cho phép quản trị hệ thống</span>
                    </div>

                    <div className='checkbox-permisstion'>
                        <input class="form-check-input" type="checkbox" style={{ width: "18.4px", height: "18.4px" }} />
                        <span> Nhóm mặc định</span>
                    </div>


                    <div class="card">
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table table-permission" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th>
                                                </th>
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupCRUDComponent;

