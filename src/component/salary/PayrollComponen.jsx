import React, { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuAsset from '../../contextmenu/ContextMenuAsset';
import './css/salary-style.css'
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { getListSalaryTable } from '../../service/SalaryService';
import { responseData } from '../../util/ResponseUtil';
import { convertDate, convertMonth } from '../../util/TimeUtil';
import { useNavigate } from 'react-router-dom';

const PayrollComponen = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách bảng lương", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 260);
    const [salaryTable, setSalaryTable] = useState([])

    const navigate = useNavigate()

    const handleDoubleClick = (salaryTableId) => {
        navigate('/manage-salary/table-salary-detail', { state: { salaryTableId: salaryTableId } })
    }

    useEffect(() => {
        getListSalaryTable().then((response) => {
            responseData(response, setSalaryTable)
        })
    }, [])

    return (
        <>
            <div class="page-wrapper" style={{ marginTop: "20px" }}>
                <div class="card">
                    <div class="card-body p-0">
                        <div class="custom-datatable-filter table-responsive height-my-table">
                            <div class="table-container ">
                                <div class="grid-timekeeping header-payroll">
                                    <span></span>
                                    <span>Tên bảng lương</span>
                                    <span>Trạng thái</span>
                                    <span>Nhân sự</span>
                                    <span>Tổng tiền</span>
                                    <span>Ngày tạo</span>
                                </div>
                                {
                                    salaryTable.length > 0 && salaryTable.map((item, index) => (
                                        <>
                                            <div style={{ fontSize: "20px" }}>
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Tháng {convertMonth(item.yearMonth)}</label>
                                            </div>
                                            <div class="grid-timekeeping" onDoubleClick={() => handleDoubleClick(item.id)}>
                                                <span></span>
                                                <span>{item.nameSalaryTable}</span>
                                                <span class="badge">Chưa chốt</span>
                                                <span>{item.numberEmployee}</span>
                                                <span>{item.totalAmount && Number(item.totalAmount).toLocaleString('vi-VN')}</span>
                                                <span>{convertDate(item.createdAt)}</span>
                                            </div>
                                        </>
                                    ))
                                }
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

