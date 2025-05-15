import React, { useEffect, useState } from 'react';
import { getSalaryDetailEmployee } from '../../../service/EmployeeService';
import { responseData } from '../../../util/ResponseUtil';
import { convertMonth } from '../../../util/TimeUtil';

const SalaryQuickWatchComponent = ({ x, y, showMenu, id, yearMonth }) => {
    const [salaryDetail, setSalaryDetail] = useState({})

    const style = () => {
        return {
            width: '600px',
            maxHeight: '440px',
            borderRadius: 10,
            display: 'flex',
            padding: 20,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none',
            zIndex: 10,
        }
    }

    useEffect(() => {
        if (id) {
            getSalaryDetailEmployee(id).then((response) => {
                responseData(response, setSalaryDetail)
            })
        }
    }, [id])
    return (
        <>
            <div class="menu" id="detail_timekeeping" style={style()}>
                <div class="modal-content" style={{ padding: "15px" }}>
                    <div class="modal-header no-border">
                        <div class="d-flex align-items-center">
                            <h4 class="modal-title me-2">Phiếu lương tháng {convertMonth(yearMonth)}</h4>
                        </div>
                        <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="menu"
                            aria-label="Close">
                            <i class="ti ti-x"></i>
                        </button>
                    </div>
                    <div class="card-header flex-wrap row-gap-3 p-categoty-list header-timekeeping-detail">
                        <div className='d-flex category-list-employ align-items-center ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500, borderBottom: "1px solid #E9EDF4" }}>
                            <span >Thực lĩnh:</span>
                            <span className='text-success' style={{ fontSize: "25px" }}>{Number(salaryDetail.salaryReal).toLocaleString("vi-VN")} VNĐ</span>
                        </div>
                    </div>

                    <div class="modal-body ">
                        <table className="table profile-details table-detail-salary">
                            <tbody>
                                <tr>
                                    <th>Công chuẩn</th>
                                    <td><span className='text-black'>{salaryDetail.workDayReal}</span></td>
                                    <th>Lương cơ bản</th>
                                    <td><span className='text-black'>{Number(salaryDetail.salaryGross).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                                <tr>
                                    <th>Ngày công</th>
                                    <td><span className='text-black'>{salaryDetail.totalWorkDay}</span></td>
                                    <th>Lương ngày công</th>
                                    <td><span className='text-black'>{Number(salaryDetail.salaryWorkDay).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                                <tr>
                                    <th>Tổng phụ cấp</th>
                                    <td><span className='text-black'>{Number(salaryDetail.totalAllowance).toLocaleString("vi-VN")} VNĐ</span></td>
                                    <th>Tổng thưởng</th>
                                    <td><span className='text-black'>{Number(salaryDetail.reward).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                                <tr>
                                    <th>OT Trong tuần</th>
                                    <td><span className='text-black'>{Number(salaryDetail.salaryOTOnWeek).toLocaleString("vi-VN")} VNĐ</span></td>
                                    <th>OT cuối tuần</th>
                                    <td><span className='text-black'>{Number(salaryDetail.salaryOTLastWeek).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                                <tr>
                                    <th>OT nghỉ lễ</th>
                                    <td><span className='text-black'>{Number(salaryDetail.salaryOTHoliday).toLocaleString("vi-VN")} VNĐ</span></td>
                                    <th>Tổng phạt</th>
                                    <td> <span className='text-black'>{Number(salaryDetail.penalty).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                                <tr>
                                    <th>Bảo hiểm</th>
                                    <td><span className='text-black'>{Number(salaryDetail.totalInsurance).toLocaleString("vi-VN")} VNĐ</span></td>
                                    <th>Thuế TNCN</th>
                                    <td><span className='text-black'>{Number(salaryDetail.totalTax).toLocaleString("vi-VN")} VNĐ</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SalaryQuickWatchComponent;

