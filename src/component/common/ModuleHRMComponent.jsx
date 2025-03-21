import React from 'react';
import { Link } from 'react-router-dom';

const ModuleHRMComponent = () => {
    return (
        <>
            <div class="dropdown me-1" >
                <button href="" class="btn btn-menubar" data-bs-toggle="dropdown">
                    <i class="ti ti-layout-grid-remove"></i>
                </button>
                <div class="dropdown-menu dropdown-lg dropdown-menu-end" >
                    <div class="card mb-0 border-0 shadow-none hrm-menu" style={{ zIndex: 9999 }}>
                        <div class="card-header">
                            <h4>HRM</h4>
                        </div>
                        <div class="card-body pb-1">
                            <div class="row">
                                <div class="col-sm-6">
                                    <Link to="/manage-approval/approval" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="ti ti-file-text text-default me-2"></i>Đơn từ
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                    <Link to="/manage-asset/asset" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="ti ti-device-desktop text-default me-2"></i>Tài sản
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                    <Link to={"/profile-employee"} class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="ti ti-user-plus text-default me-2"></i>Tuyển dụng
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                </div>
                                <div class="col-sm-6">
                                    <Link to={"/manage-employee/list-employee"} class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="ti ti-users text-default me-2"></i>Nhân sự
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                    <Link to={"/manage-timekeeping"} class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="fe fe-check-circle text-default me-2"></i>Chấm công
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                    <Link to="/manage-salary/payroll" class="d-flex align-items-center justify-content-between p-2 crm-link mb-3">
                                        <span class="d-flex align-items-center me-3">
                                            <i class="fe fe-dollar-sign text-default me-2"></i>Bảng lương
                                        </span>
                                        <i class="ti ti-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuleHRMComponent;

