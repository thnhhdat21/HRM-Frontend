import React from 'react';
import TypeContractCRUDComponent from './crud/TypeContractCRUDComponent';

const SettingTypeContractComponent = () => {
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Nhân sự</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_type_contract"
                                    class="btn btn-primary d-flex align-items-center"><i
                                        class="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <span className='active-category-list'>Loại hợp đồng lao động </span>
                            </div>
                        </div>
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
                                                <th>Tên hợp đồng</th>
                                                <th>Loại hợp đồng</th>
                                                <th>Đóng bảo hiểm</th>
                                                <th>Thời hạn</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr> <tr>
                                                <td>
                                                    <div class="form-check form-check-md">
                                                        <input class="form-check-input" type="checkbox" />
                                                    </div>
                                                </td>
                                                <td><span>Hợp đồng thử việc</span></td>
                                                <td><span>Hợp đồng xác định thời hạn</span></td>
                                                <td><span>có</span></td>
                                                <td><span>2 tháng</span></td>
                                                <td><span className='badge'>Hoạt động</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TypeContractCRUDComponent />
        </>
    );
};

export default SettingTypeContractComponent;

