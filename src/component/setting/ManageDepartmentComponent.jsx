import React from 'react';
import DepartmentCRUDComponent from './crud/DepartmentCRUDComponent';
import BusinessBlockCRUDComponent from './crud/BusinessBlockCRUDComponent';
import TableDepartmentComponent from './component/TableDepartmentComponent';
import TableBusinessBlockComponent from './component/TableBusinessBlockComponent';

const ManageDepartmentComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Danh sách phòng ban</h2>
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
                            <div class="mb-2 dropdown profile-dropdown">
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="dropdown">
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                                <div class="dropdown-menu shadow-none">
                                    <div class="card mb-0">
                                        <div class="card-body crud-depart">
                                            <a class="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_department" >
                                                Phòng ban,chi nhánh
                                            </a>
                                            <a class="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_business_block">
                                                Khối nghiệp vụ
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <span className='active-category-list'>Phòng ban, chi nhánh (125)</span>
                                <span>Khối nghiệp vụ</span>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <TableDepartmentComponent />
                                    <TableBusinessBlockComponent />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DepartmentCRUDComponent />
            <BusinessBlockCRUDComponent />
        </>
    );
};

export default ManageDepartmentComponent;

