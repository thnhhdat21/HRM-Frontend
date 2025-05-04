import React, { useRef } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuAsset from '../../contextmenu/ContextMenuAsset';
import './css/salary-style.css'
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';

const PayrollComponen = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách bảng lương", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 260);
    return (
        <>
            <div class="page-wrapper" style={{ marginTop: "20px" }}>
                <div class="card">
                    {/* <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            </div>
                            <div class="mb-2 dropdown profile-dropdown">
                            </div>
                        </div> */}
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive">
                            <div class="table-container">
                                <div class="grid header-payroll">
                                    <div class="form-check form-check-md">
                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                    </div>
                                    <span>Tạo bởi</span>
                                    <span>Tên bảng lương</span>
                                    <span>Trạng thái</span>
                                    <span>Phòng ban áp dụng</span>
                                    <span>Nhân sự</span>
                                    <span>Tổng tiền</span>
                                    <span>Ngày tạo</span>
                                </div>

                                <div style={{ fontSize: "20px" }}>
                                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Tháng 8/2023</label>
                                </div>
                                <div class="grid" >
                                    <div class="form-check form-check-md">
                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                    </div>
                                    <span class="avatar avatar-lg me-2 avatar-rounded avater-payroll">
                                        <img src="/assets/img/profiles/avatar-12.jpg" alt="img" />
                                    </span>
                                    <span>Bảng lương BOD</span>
                                    <span class="badge">Chưa chốt</span>
                                    <span>Ban Giám đốc</span>
                                    <span>5</span>
                                    <span>22,040,000</span>
                                    <span>25/08/2023</span>
                                </div>

                                <div class="grid">
                                    <div class="form-check form-check-md">
                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                    </div>
                                    <span class="avatar avatar-lg me-2 avatar-rounded avater-payroll">
                                        <img src="/assets/img/profiles/avatar-12.jpg" alt="img" />
                                    </span>
                                    <span>Bảng lương Test - Tạm ứng</span>
                                    <span class="badge">Chưa chốt</span>
                                    <span>Ban Giám đốc, Phòng Kinh doanh Hà Nội</span>
                                    <span>39</span>
                                    <span>28,770,000</span>
                                    <span>25/08/2023</span>
                                </div>

                                <div style={{ fontSize: "20px" }}>
                                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Tháng 7/2023</label>
                                </div>
                                <div class="grid">
                                    <div class="form-check form-check-md">
                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                    </div>
                                    <span class="avatar avatar-lg me-2 avatar-rounded avater-payroll">
                                        <img src="/assets/img/profiles/avatar-12.jpg" alt="img" />
                                    </span>
                                    <span>BẢNG LƯƠNG CHI NHÁNH HCM</span>
                                    <span class="badge">Chưa chốt</span>
                                    <span>Công ty Cổ phần 1Office</span>
                                    <span>121</span>
                                    <span>0</span>
                                    <span>25/09/2023</span>
                                </div>
                            </div>
                        </div>

                        {/* <div class="row pageable-center">
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
                        </div> */}
                    </div>
                </div>
            </div >
            <ContextMenuAsset x={x} y={y} showMenu={showMenu} />
        </>
    );
};

export default PayrollComponen;

