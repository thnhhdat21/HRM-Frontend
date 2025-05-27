import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import './css/salary-style.css'
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { getListSalaryTable, getListSalaryTableLevelDepartment } from '../../service/SalaryService';
import { responseData } from '../../util/ResponseUtil';
import { convertDate, convertMonth } from '../../util/TimeUtil';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const PayrollComponen = () => {
    //lay role
    const roleString = Cookies.get('permissions');
    let roles = new Set();
    let isWatchCompany = false;
    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isWatchCompany = roles.has('ROLE_WATCH_SALARY_COMPANY') || roles.has('ADMIN')
    }

    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách bảng lương", subTitle: "" }))
    const tableRef = useRef(null)
    const [salaryTable, setSalaryTable] = useState([])

    const navigate = useNavigate()

    const handleDoubleClick = (salaryTableId) => {
        navigate('/manage-salary/table-salary-detail', { state: { salaryTableId: salaryTableId } })
    }

    useEffect(() => {
        if (isWatchCompany) {
            getListSalaryTable().then((response) => {
                responseData(response, setSalaryTable)
            })
        } else {
            getListSalaryTableLevelDepartment().then((response) => {
                responseData(response, setSalaryTable)
            })
        }
    }, [])

    return (
        <>
            <div className="page-wrapper" style={{ marginTop: "20px" }}>
                <div className="card">
                    <div className="card-body p-0">
                        <div className="custom-datatable-filter table-responsive height-my-table">
                            <div className="table-container ">
                                <div className="grid-timekeeping header-payroll">
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
                                                <i className='ti ti-chevron-down text-danger' /> <label className="form-label text-danger" >Tháng {convertMonth(item.yearMonth)}</label>
                                            </div>
                                            <div className="grid-timekeeping" onDoubleClick={() => handleDoubleClick(item.id)}>
                                                <span></span>
                                                <span>{item.nameSalaryTable}</span>
                                                <span className="badge">Chưa chốt</span>
                                                <span>{item.numberEmployee}</span>
                                                <span>{item.totalAmount && Number(item.totalAmount).toLocaleString('vi-VN')}</span>
                                                <span>{convertDate(item.createdAt)}</span>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>

                        {/* <div className="row pageable-center">
                            <div className="col-sm-12 col-md-5">
                                <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate mg-top-0">
                                    <ul className="pagination">
                                        <li className="page-item previous disabled my-center">
                                            <i className="ti ti-chevron-left"></i>
                                        </li>
                                        <li className="page-item active "><a className="page-link">1</a></li>
                                        <li className=" page-item next disabled my-center">
                                            <i className="ti ti-chevron-right"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div >
        </>
    );
};

export default PayrollComponen;

