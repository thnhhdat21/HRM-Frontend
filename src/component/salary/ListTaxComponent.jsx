import React, { useEffect, useState } from 'react';
import './css/tax-style.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { updatePageIndexFilter, updateYearFilter } from '../../redux/slice/SearchFilterSlice';
import { responseData } from '../../util/ResponseUtil';
import { getListTax } from '../../service/SalaryService';
import { getCountEmployeeOnLeave } from '../../service/Manage/ManageOnLeaveService';

const ListTaxComponent = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Bảng thuế", subTitle: "" }))
    const taxfilter = useSelector((state) => state.searchFilter);
    const [open, setOpen] = useState(false);
    const [yearValue, setYearValue] = useState(dayjs());
    const [listTax, setListTax] = useState([])
    const [totalTax, setTotalTax] = useState(0)

    const handleIconClick = () => {
        setOpen(true);
    };
    const handleYearChange = (date) => {
        if (date) {
            setYearValue(date);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (yearValue.year()) {
            const year = yearValue.year()
            dispatch(updateTitleHeader({ title: "Bảng thuế năm " + year, subTitle: "" }))
            dispatch(updateYearFilter(year))
        }
    }, [yearValue])

    useEffect(() => {
        if (taxfilter.year) {
            getCountEmployeeOnLeave(taxfilter).then((response) => {
                if (response.data.code === 1000) {
                    setTotalTax(response.data.data)
                }
            })
        }
    }, [
        taxfilter.name,
        JSON.stringify(taxfilter.department || []),
        JSON.stringify(taxfilter.jobPosition || []),
        JSON.stringify(taxfilter.duty || []),
        taxfilter.dateJoin || '',
        taxfilter.year])

    useEffect(() => {
        if (taxfilter.year) {
            getListTax(taxfilter).then((response) => {
                responseData(response, setListTax)
            })
        }
    }, [taxfilter])

    return (
        <>
            <div className="page-wrapper">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <ul className="nav ">
                                <li className="nav-item nav-profile" role="presentation">
                                    <button className="nav-link nav-link-profile active" id="info-tab"
                                    >Bảng thuế năm {taxfilter.year}</button>
                                </li>
                            </ul>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 icon-header-2">
                                <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", position: "relative" }}
                                    onClick={handleIconClick} >
                                    <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                    <span style={{ whiteSpace: 'nowrap', margin: 0 }}>{yearValue ? yearValue.year() : 'Năm'} </span>
                                    <div style={{ position: 'absolute', top: 0, right: "85px", opacity: 0, pointerEvents: 'none' }}>
                                        <DatePicker
                                            open={open}
                                            onOpenChange={setOpen}
                                            picker="year"
                                            value={yearValue}
                                            onChange={handleYearChange}
                                            allowClear={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="custom-datatable-filter table-responsive height-my-table">
                            <div className="table-container sticky-table-tax">
                                <table className="table table-bordered" id='myTable'>
                                    <thead className="thead-light">
                                        <tr>
                                            <th rowSpan="2" className='table-manv'>Mã NV</th>
                                            <th rowSpan="2" className='table-hovaten'>Họ và tên</th>
                                            <th rowSpan="2" className='table-phongban'>Phòng ban</th>
                                            <th colSpan="2">Tháng 1</th>
                                            <th colSpan="2">Tháng 2</th>
                                            <th colSpan="2">Tháng 3</th>
                                            <th colSpan="2">Tháng 4</th>
                                            <th colSpan="2">Tháng 5</th>
                                            <th colSpan="2">Tháng 6</th>
                                            <th colSpan="2">Tháng 7</th>
                                            <th colSpan="2">Tháng 8</th>
                                            <th colSpan="2">Tháng 9</th>
                                            <th colSpan="2">Tháng 10</th>
                                            <th colSpan="2">Tháng 11</th>
                                            <th colSpan="2">Tháng 12</th>
                                        </tr>
                                        <tr>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                            <th>Thu nhập</th>
                                            <th>Thuế TNCN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listTax.length > 0 && listTax.map((item, index) => (
                                            <tr>
                                                <td>{item.employeeCode}</td>
                                                <td>{item.employeeName}</td>
                                                <td>{item.department}</td>
                                                {item.salaryMonths.length > 0 && item.salaryMonths.map((salary, index) => (
                                                    <>
                                                        <td>{Number(salary.salary).toLocaleString("vi-VN")}</td>
                                                        <td>{Number(salary.tax).toLocaleString("vi-VN")}</td>
                                                    </>

                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="row pageable-center">
                            <div className="col-sm-12 col-md-5">
                                <div>Hiển thị {(() => {
                                    const start = (taxfilter.pageIndex - 1) * 12 + 1;
                                    const end = Math.min(taxfilter.pageIndex * 12, totalTax);
                                    return `${start} - ${end}`;
                                })()} trong {totalTax} bản ghi</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate mg-top-0">
                                    <ul className="pagination">
                                        <li className={`page-item previous disabled my-center ${taxfilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(taxfilter.pageIndex - 1)) }}>
                                            <i className="ti ti-chevron-left"></i>
                                        </li>
                                        <li className="page-item active "><a className="page-link">{taxfilter.pageIndex}</a></li>
                                        <li className={`page-item next disabled my-center  ${((taxfilter.pageIndex - 1) * 12 + 12) >= totalTax ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(taxfilter.pageIndex + 1)) }}>
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

export default ListTaxComponent;

