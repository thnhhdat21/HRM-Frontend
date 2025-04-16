import React, { useState } from 'react';

const TableAccountComponent = ({ tabId, listAccount, ref, setSelected }) => {
    return (
        <>
            <div className={`card-body p-0 tab-pane fade ${tabId === "account-actived" ? "show active" : ""} `} id={tabId}>
                <div class="custom-datatable-filter table-responsive">
                    <div class="table-container">
                        <table class="table" id='myTable'>
                            <thead class="thead-light">
                                <tr>
                                    <th></th>
                                    <th>Tài khoản</th>
                                    <th>Nhóm</th>
                                    <th>Mã NV</th>
                                    <th>Họ tên</th>
                                    <th>Phòng ban</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày kích hoạt</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {listAccount && listAccount.map((item, index) => (
                                    <tr onContextMenu={() => setSelected(item)}>
                                        <td></td>
                                        <td><span>{item.username}</span></td>
                                        <td><span>{item.role}</span></td>
                                        <td><span>{item.employeeCode}</span></td>
                                        <td><span>{item.fullName}</span></td>
                                        <td><span>{item.department}</span></td>
                                        <td><span>{item.createDate}</span></td>
                                        <td><span>{item.activeDate}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
        </>
    );
};

export default TableAccountComponent;

