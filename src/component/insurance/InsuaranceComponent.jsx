import React, { useRef } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuContract from '../../contextmenu/ContextMenuContract';

const InsuaranceComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Danh sách bảo hiểm tháng 10/2023</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="me-2 mb-2">
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-file-export me-1"></i>Export
                                    </a>
                                    <ul class="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                                class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                                class="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#add_employee"
                                    class="btn btn-primary d-flex align-items-center"><i
                                        class="ti ti-circle-plus"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table ref={tableRef} class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th class="no-sort">
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                                    </div>
                                                </th>
                                                <th>Mã NV</th>
                                                <th>Họ và tên</th>
                                                <th>Phòng ban</th>
                                                <th>Vị trí công việc</th>
                                                <th>Chức vụ</th>
                                                <th>Ngày vào chính thức</th>
                                                <th>Số sổ BH</th>
                                                <th>Mức đóng BH</th>
                                                <th>CT đóng</th>
                                                <th>NLĐ đóng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-id='1'>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-001</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="/assets/img/users/user-32.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#view_details">Anthony Lewis</a></p>
                                                            <span class="fs-12">Finance</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="75141b011d1a1b0c35100d14180519105b161a18">[email&#160;protected]</a>
                                                </td>
                                                <td>(123) 4567 890</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Finance
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>12 Sep 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr data-id='2'>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-002</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-09.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Brian
                                                                Villalobos</a></p>
                                                            <span class="fs-12">Developer</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="70120219111e301508111d001c155e131f1d">[email&#160;protected]</a>
                                                </td>
                                                <td>(179) 7382 829</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Developer
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>24 Oct 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-003</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-01.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Harvey
                                                                Smith</a></p>
                                                            <span class="fs-12">Developer</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="c1a9a0b3b7a4b881a4b9a0acb1ada4efa2aeac">[email&#160;protected]</a>
                                                </td>
                                                <td>(184) 2719 738</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Developer
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>18 Feb 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-004</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-33.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#view_details">Stephan Peralt</a></p>
                                                            <span class="fs-12">Executive Officer</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="e8988d9a8984a88d90898598848dc68b8785">[email&#160;protected]</a>
                                                </td>
                                                <td>(193) 7839 748</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Executive
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>17 Oct 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-005</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-33.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Doglas
                                                                Martini</a></p>
                                                            <span class="fs-12">Manager</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="bad7dbc8ced4d3cdc8fadfc2dbd7cad6df94d9d5d7">[email&#160;protected]</a>
                                                </td>
                                                <td>(183) 9302 890</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Manager
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>20 Jul 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-006</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-02.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Linda
                                                                Ray</a></p>
                                                            <span class="fs-12">Finance</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="0476657d30313244617c65697468612a676b69">[email&#160;protected]</a>
                                                </td>
                                                <td>(120) 3728 039</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Finance
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>10 Apr 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-007</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-35.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Elliot
                                                                Murray</a></p>
                                                            <span class="fs-12">Finance</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="6c01191e1e0d152c09140d011c0009420f0301">[email&#160;protected]</a>
                                                </td>
                                                <td>(102) 8480 832</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Developer
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>29 Aug 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-008</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-36.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#view_details">Rebecca Smtih</a></p>
                                                            <span class="fs-12">Executive</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="255648514c4d65405d44485549400b464a48">[email&#160;protected]</a>
                                                </td>
                                                <td>(162) 8920 713</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Executive
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>22 Feb 2024</td>
                                                <td>
                                                    <span class="badge badge-danger d-inline-flex align-items-center badge-sm">
                                                        <i class="ti ti-point-filled me-1"></i>Inactive
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-009</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-37.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Connie
                                                                Waters</a></p>
                                                            <span class="fs-12">Developer</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="41222e2f2f2824012439202c312d246f222e2c">[email&#160;protected]</a>
                                                </td>
                                                <td>(189) 0920 723</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Developer
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Finance</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>03 Nov 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><a href="employee-details.html">Emp-010</a>
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <a href="employee-details.html" class="avatar avatar-md"
                                                            data-bs-toggle="modal" data-bs-target="#view_details"><img
                                                                src="assets/img/users/user-38.jpg"
                                                                class="img-fluid rounded-circle" alt="img" /></a>
                                                        <div class="ms-2">
                                                            <p class="text-dark mb-0"><a href="employee-details.html"
                                                                data-bs-toggle="modal" data-bs-target="#view_details">Lori
                                                                Broaddus</a></p>
                                                            <span class="fs-12">Finance</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection"
                                                    class="__cf_email__"
                                                    data-cfemail="57352538363333222417322f363a273b327934383a">[email&#160;protected]</a>
                                                </td>
                                                <td>(168) 8392 823</td>
                                                <td>
                                                    <div class="dropdown me-3">
                                                        <a href="javascript:void(0);"
                                                            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                                            data-bs-toggle="dropdown">
                                                            Finance
                                                        </a>
                                                        <ul class="dropdown-menu  dropdown-menu-end p-3">
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Executive</a>
                                                            </li>
                                                            <li>
                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item rounded-1">Developer</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>17 Dec 2024</td>
                                                <td>
                                                    <span class="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i class="ti ti-point-filled me-1"></i>Active
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="action-icon d-inline-flex">
                                                        <a href="#" class="me-2" data-bs-toggle="modal"
                                                            data-bs-target="#edit_employee"><i class="ti ti-edit"></i></a>
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                                                            class="ti ti-trash"></i></a>
                                                    </div>
                                                </td>
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

export default InsuaranceComponent;

