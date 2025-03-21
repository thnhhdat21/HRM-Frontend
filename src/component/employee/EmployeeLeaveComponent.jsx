import React, { useRef } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuContract from '../../contextmenu/ContextMenuContract';
import LeaveApprovalComponent from '../approval/crud/LeaveApprovalComponent';

const EmployeeLeaveComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div>
                                <h6>THÔNG TIN NGHỈ PHÉP</h6>
                                <table class="table list-on-leave text-black">
                                    <tbody>
                                        <tr >
                                            <td>Phép năm:</td>
                                            <td>13.0</td>
                                            <td>Tồn năm trước:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Đã sử dụng</td>
                                            <td>1.0</td>
                                            <td className='strong-timekeeping text-black'>Phép còn lại:</td>
                                            <td className='strong-timekeeping text-black'>12.0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div style={{ marginBottom: "10px" }} className='d-flex align-items-center justify-content-center'>
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#create_leave_approval">
                                    Đăng ký nghỉ
                                </a>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <table class="table borderless table-timekeeping-employee">
                                <thead>
                                    <tr>
                                        <th style={{ width: "15%" }}>Ngày / Lý do</th>
                                        <th>Thông tin chi tiết</th>
                                        <th>Người duyệt (Chờ)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="align-top text-center">
                                            <div class="timekeeping-items d-flex flex-column">
                                                <span style={{ padding: 0 }} className='reason-leave'>Nghỉ phép cả ngày</span>
                                                <span style={{ color: "#787676  ", fontWeight: 400, padding: 0 }}>14/01/2025</span>
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
                                    <tr>
                                        <td className="align-top text-center">
                                            <div class="timekeeping-items d-flex flex-column">
                                                <span style={{ padding: 0 }} className='reason-leave'>Nghỉ phép cả ngày</span>
                                                <span style={{ color: "#787676  ", fontWeight: 400, padding: 0 }}>14/01/2025</span>
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
            </div >
            <ContextMenuContract x={x} y={y} showMenu={showMenu} />
            <LeaveApprovalComponent />
        </>
    );
};

export default EmployeeLeaveComponent;

