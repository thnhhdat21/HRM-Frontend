import React from 'react';
import GroupCRUDComponent from './crud/GroupCRUDComponent';
import { Link } from 'react-router-dom';

const ManageGroupComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Danh sách nhóm</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <Link to={"/admin/admin-group/add"}
                                    class="btn btn-primary d-flex align-items-center"><i
                                        class="ti ti-circle-plus " style={{ fontSize: "20px" }}></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th class="no-sort">
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                                    </div>
                                                </th>
                                                <th>Tên nhóm</th>
                                                <th>Quản trị hệ thống</th>
                                                <th>Nhóm mặc định</th>
                                                <th>Tài khoản</th>
                                                <th>Người tạo</th>
                                                <th>Người sửa</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày sửa</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>datnt21</span></td>
                                                <td><span>ENTERPRISE</span></td>
                                                <td><span>Nhân viên</span></td>
                                                <td><span>TDS01</span></td>
                                                <td><span>Nguyễn Thành Đạt</span></td>
                                                <td><span>Tích hợp hệ thống</span></td>
                                                <td><span>16/04/2024</span></td>
                                                <td><span>17/04/2024</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row pageable-center">
                                <div class="col-sm-12 col-md-5">
                                    <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate mg-top-0">
                                        <ul class="pagination">
                                            <li class="page-item previous disabled my-center">
                                                <i class="ti ti-chevron-left"></i>
                                            </li>
                                            <li class="page-item active "><a class="page-link">1</a></li>
                                            <li class=" page-item next disabled my-center">
                                                <i class="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageGroupComponent;

