import React, { useEffect, useRef, useState } from 'react';
import './css/timekeeping-style.css'
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { updatePageIndexFilter, updateYearFilter, updateYearMonthFilter } from '../../redux/slice/SearchFilterSlice';
import { getCountTimeKeeping } from '../../service/TimeKeepingSerivce';
import { responseData } from '../../util/ResponseUtil';
import { getCountEmployeeOnLeave, getListOnleave } from '../../service/OnLeaveService';


const OnLeaveManamentComponent = () => {
    const dispatch = useDispatch();
    const onLeaveFilter = useSelector((state) => state.searchFilter);

    const [open, setOpen] = useState(false);
    const [yearValue, setYearValue] = useState(dayjs());
    const [listOnLeave, setListOnLeave] = useState([])
    const [totalOnLeave, setTotalOnLeave] = useState(0)
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
            dispatch(updateTitleHeader({ title: "Bảng nghỉ phép năm " + year, subTitle: "" }))
            dispatch(updateYearFilter(year))
        }
    }, [yearValue])

    useEffect(() => {
        if (onLeaveFilter.year) {
            getListOnleave(onLeaveFilter).then((response) => {
                responseData(response, setListOnLeave)
            })
        }
    }, [onLeaveFilter])

    useEffect(() => {
        if (onLeaveFilter.year) {
            getCountEmployeeOnLeave(onLeaveFilter).then((response) => {
                if (response.data.code === 1000) {
                    setTotalOnLeave(response.data.data)
                }
            })
        }
    }, [
        onLeaveFilter.name,
        JSON.stringify(onLeaveFilter.department || []),
        JSON.stringify(onLeaveFilter.jobPosition || []),
        JSON.stringify(onLeaveFilter.duty || []),
        onLeaveFilter.dateJoin || '',
        onLeaveFilter.year])

    return (
        <>
            <div class="page-wrapper">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                        <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                            <ul class="nav ">
                                <li class="nav-item" role="presentation" className='nav-profile' style={{}}>
                                    <button class="nav-link nav-link-profile active" id="info-tab"
                                    >Bảng phép năm {onLeaveFilter.year}</button>
                                </li>
                            </ul>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 icon-header-2">
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
                                            <th colSpan="5">Phép năm</th>
                                        </tr>
                                        <tr>
                                            <th>Tổng phép</th>
                                            <th>Theo quy định</th>
                                            <th>Thâm niên</th>
                                            <th>Đã sử dụng</th>
                                            <th>Tồn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listOnLeave.length > 0 && listOnLeave.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.employeeCode}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td>{item.department}</td>
                                                    <td>{item.jobPosition}</td>
                                                    <td>{item.seniorDay + item.regulaDay}</td>
                                                    <td>{item.regulaDay}</td>
                                                    <td >{item.seniorDay}</td>
                                                    <td >{item.usedDay}</td>
                                                    <td >{(item.seniorDay + item.regulaDay) - item.usedDay}</td>
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
                                    const start = (onLeaveFilter.pageIndex - 1) * 12 + 1;
                                    const end = Math.min(onLeaveFilter.pageIndex * 12, totalOnLeave);
                                    return `${start} - ${end}`;
                                })()} trong {totalOnLeave} bản ghi</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <div className="dataTables_paginate mg-top-0">
                                    <ul className="pagination">
                                        <li className={`page-item previous disabled my-center ${onLeaveFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(onLeaveFilter.pageIndex - 1)) }}>
                                            <i className="ti ti-chevron-left"></i>
                                        </li>
                                        <li className="page-item active "><a className="page-link">{onLeaveFilter.pageIndex}</a></li>
                                        <li className={`page-item next disabled my-center  ${((onLeaveFilter.pageIndex - 1) * 12 + 12) >= totalOnLeave ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(onLeaveFilter.pageIndex + 1)) }}>
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

export default OnLeaveManamentComponent;

