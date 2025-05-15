import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { responseData } from '../../util/ResponseUtil';
import { getCountSalaryDetail, getlistSalaryDetail } from '../../service/SalaryService';
import { updatePageIndexFilter, updateSalaryTableId } from '../../redux/slice/SearchFilterSlice';

const PayrollEmployeeComponent = () => {
    const location = useLocation();
    const salaryTableId = location.state?.salaryTableId || "";

    const dispatch = useDispatch()
    const salaryFilter = useSelector((state) => state.searchFilter);

    const [listSalaryEmployee, setListSalaryEmployee] = useState([])
    const [totalSalary, setTotalSalary] = useState(0)

    useEffect(() => {
        if (salaryTableId) {
            dispatch(updateSalaryTableId(salaryTableId))
        }
    }, [salaryTableId])

    useEffect(() => {
        if (salaryFilter.salaryTableId)
            getlistSalaryDetail(salaryFilter).then((response) => {
                responseData(response, setListSalaryEmployee)
            })
    }, [salaryFilter])

    useEffect(() => {
        if (salaryFilter.salaryTableId) {
            getCountSalaryDetail(salaryFilter).then((response) => {
                if (response.data.code === 1000) {
                    setTotalSalary(response.data.data)
                }
            })
        }
    }, [
        salaryFilter.name,
        JSON.stringify(salaryFilter.department || []),
        JSON.stringify(salaryFilter.jobPosition || []),
        JSON.stringify(salaryFilter.duty || []),
        salaryFilter.dateJoin || '',
        salaryFilter.salaryTableId])

    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header  flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ align-items-center justify-content-between ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                                <span className='active-category-list'>Bảng lương</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive height-my-table">
                            <div class="table-container sticky-table">
                                <table class="table table-bordered" id='myTable'>
                                    <thead class="thead-light">
                                        <tr>
                                            <th rowSpan="2" className='table-manv'>Mã NV</th>
                                            <th rowSpan="2" className='table-hovaten'>Họ và tên</th>
                                            <th rowSpan="2" className='table-phongban'>Phòng ban</th>
                                            <th rowSpan="2" className='table-vitri'>Vị trí</th>
                                            <th rowSpan="2">Công chuẩn</th>
                                            <th rowSpan="2">Lương cơ bản</th>
                                            <th rowSpan="2">Ngày công</th>
                                            <th rowSpan="2">Lương ngày công</th>
                                            <th rowSpan="2">Tổng phụ cấp</th>
                                            <th rowSpan="2">Tổng thưởng</th>
                                            <th rowSpan="2">OT trong tuần</th>
                                            <th rowSpan="2">OT cuối tuần</th>
                                            <th rowSpan="2">OT nghỉ lễ</th>
                                            <th rowSpan="2">Tổng phạt</th>
                                            <th rowSpan="2">Bảo hiểm</th>
                                            <th rowSpan="2">Thuế TNCN</th>
                                            <th rowSpan="2">Thực lĩnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listSalaryEmployee.length > 0 && listSalaryEmployee.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.employeeCode}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td>{item.department}</td>
                                                    <td>{item.jobPosition}</td>

                                                    <td>{item.workDayReal}</td>
                                                    <td>{Number(item.salaryGross).toLocaleString("vi-VN")}</td>
                                                    <td >{item.totalWorkDay}</td>
                                                    <td >{Number(item.salaryWorkDay).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.totalAllowance).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.reward).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.salaryOTOnWeek).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.salaryOTLastWeek).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.salaryOTHoliday).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.penalty).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.totalInsurance).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.totalTax).toLocaleString("vi-VN")}</td>
                                                    <td >{Number(item.salaryReal).toLocaleString("vi-VN")}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row pageable-center">
                            <div className="col-sm-12 col-md-5">
                                <div>Hiển thị {(() => {
                                    const start = (salaryFilter.pageIndex - 1) * 12 + 1;
                                    const end = Math.min(salaryFilter.pageIndex * 12, totalSalary);
                                    return `${start} - ${end}`;
                                })()} trong {totalSalary} bản ghi</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate mg-top-0">
                                    <ul className="pagination">
                                        <li className={`page-item previous disabled my-center ${salaryFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(salaryFilter.pageIndex - 1)) }}>
                                            <i className="ti ti-chevron-left"></i>
                                        </li>
                                        <li className="page-item active "><a className="page-link">{salaryFilter.pageIndex}</a></li>
                                        <li className={`page-item next disabled my-center  ${((salaryFilter.pageIndex - 1) * 12 + 12) >= totalSalary ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(salaryFilter.pageIndex + 1)) }}>
                                            <i className="ti ti-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayrollEmployeeComponent;

