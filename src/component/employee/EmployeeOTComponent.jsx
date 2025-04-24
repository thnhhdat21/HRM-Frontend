import React, { useRef } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuContract from '../../contextmenu/ContextMenuContract';
import OvertimeApprovalComponent from '../approval/crud/OvertimeApprovalComponent';
const EmployeeOTComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div style={{ marginBottom: "10px" }} className='d-flex align-items-center justify-content-center'>
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#create_overtime_approval">
                                    <i class="ti ti-clock" style={{ fontSize: "20px", marginRight: "5px" }} />
                                    Đăng ký OT
                                </a>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <table class="table borderless table-timekeeping-employee">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>Ngày</th>
                                        <th>Đăng ký</th>
                                        <th>Người duyệt (Chờ)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="timekeeping-items">
                                                <span>Thứ Hai</span>
                                                <span>03/02</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='work-time'>
                                                <span className='strong-timekeeping'>Ngày đăng ký: 22/01/2025</span>
                                            </div>
                                            <div className='work-time'>
                                                <span>Từ thời gian:</span>
                                                <span className='strong-timekeeping'>19:00:00</span>
                                                <span>- Tới thời gian:</span>
                                                <span className='strong-timekeeping'>7:00:00</span>
                                            </div>
                                            <div className='work-time'>
                                                <span>Lý do tăng ca: </span>
                                                <span className='strong-timekeeping'>Làm thêm tại đối tác, khách hàng/Làm thêm tại nhà</span>
                                                <span>HT_OS xử lý sự cố hệ thống Smartbanking BIDV</span>
                                            </div>
                                            <div className='work-time'>
                                                <span className='badge text-white'>Đã duyệt</span>
                                            </div>
                                        </td>
                                        <td>
                                            {/* <div className='time-checked'>
                                                <span>08:13:17</span>
                                                <span className='strong'>15:58:17</span>
                                            </div>
                                            <div className='registered-time'>
                                                <span>Đăng ký: |</span>
                                                <span><strong>X</strong></span>
                                            </div> */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <OvertimeApprovalComponent />
        </>
    );
};

export default EmployeeOTComponent;

