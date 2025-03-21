import React, { useRef } from 'react';
import TimeKeepingDetailComponent from '../../timekeeping/crud/TimeKeepingDetailComponent';
import useDoubleClickDetail from '../../../hooks/useDoubleClickDetail';

const PayrollEmployeeComponent = () => {
    const tableRef = useRef(null)
    const { xdb, ydb, showMenudb } = useDoubleClickDetail(tableRef, 550, 220);

    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header  flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ align-items-center justify-content-between ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                                <span className='active-category-list'>Bảng lương</span>
                                <span>Chi tiết công thức</span>
                            </div>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                    <i className='fe fe-calendar' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Tháng</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Chốt</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-lock' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Chốt đơn</span>
                                </div>
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                    <i className='ti ti-clock' style={{ fontSize: "20px" }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>Lịch sử</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive">
                            <div class="table-container sticky-table-salary">
                                <table class="table table-bordered" id='myTable'>
                                    <thead class="thead-light">
                                        <tr>
                                            <th className='table-stt'>STT</th>
                                            <th className='table-manv-salary'>Mã nhân sự</th>
                                            <th className='table-hovaten'>Họ và tên</th>
                                            <th className='table-phongban'>Tên phòng ban</th>
                                            <th className='table-input'>Chức vụ</th>
                                            <th className='table-input'>Lương cở bản gross</th>
                                            <th className='table-input'>Phụ cấp xăng xe</th>
                                            <th className='table-input'>Phụ cấp diện thoại</th>
                                            <th className='table-input'>KPI</th>
                                            <th className='table-input'>Công làm việc</th>
                                            <th className='table-input'>[P] Nghỉ phép năm</th>
                                            <th className='table-input'>Số công chuẩn</th>
                                            <th className='table-input'>Lương cơ bản thực tính</th>
                                            <th className='table-input'>Khấu trừ BHXH, BHYT, BHTN</th>
                                            <th className='table-input'>Tạm ứng</th>
                                            <th className='table-input'>Thực lĩnh</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th>PERSONEL_CODE</th>
                                            <th>PERSONEL_NAME</th>
                                            <th>DEPARTMENT_NAME</th>
                                            <th>JOB_TOTLE</th>
                                            <th>SALARY_TYPE_CB</th>
                                            <th>SALARY_ALLOW_3</th>
                                            <th>SALARY_ALLOW_4</th>
                                            <th>THUONGKPI</th>
                                            <th>CAL_WORKDAY</th>
                                            <th>LEAVE_TYPE_P</th>
                                            <th>NUMBER_WORKDAY</th>
                                            <th>LUONGCB</th>
                                            <th>DEDUCT_INSURANCE</th>
                                            <th>TAMUNG</th>
                                            <th>SALARY_END</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td>Trưởng phòng THHT</td>
                                            <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                            <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
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
                                        <tr>
                                            <td>
                                                <span>1</span>
                                            </td>
                                            <td>TD021</td>
                                            <td>Trịnh Trần Phương Tuân</td>
                                            <td>Tích hợp hệ thống</td>
                                            <td>Trưởng phòng THHT</td>
                                            <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
                                            <td><input type="email" class="form-control" placeholder='Mã hợp đồng' /></td>
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
            <TimeKeepingDetailComponent x={xdb} y={ydb} showMenu={showMenudb} />
        </>
    );
};

export default PayrollEmployeeComponent;

