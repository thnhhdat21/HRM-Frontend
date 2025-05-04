import React, { use, useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import HolidaysCRUDComponent from './crud/HolidaysCRUDComponent';
import ContextMenuTimeKeeping from '../../contextmenu/ContextMenuTimeKeeping';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { deleteHoliday, getListHoliday, updateHoliday } from '../../service/HolidayService';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import { convertDate } from '../../util/TimeUtil';
import { HolidayType } from '../../util/HolidayUtil';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';
import { toast } from 'react-toastify';

const HolidaysComponent = () => {
    const dispatch = useDispatch();
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const [holidayFilter, setHolidayFilter] = useState({
        type: 0,
        pageIndex: 1,
        year: 2025
    })

    const [open, setOpen] = useState(false);
    const [yearValue, setYearValue] = useState(dayjs());
    const [listHoliday, setListHoliday] = useState([])
    const [totalHoliday, setTotalHoliday] = useState(0)
    const [selected, setSelected] = useState({})
    const [openModal, setOpenModal] = useState([])

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
            dispatch(updateTitleHeader({ title: "Danh sách nghỉ lễ năm " + year, subTitle: "" }))
            setHolidayFilter({
                year: year,
                pageIndex: 1,
                type: ''
            })
        }
    }, [yearValue])

    const onChangeType = (e) => {
        setHolidayFilter({ ...holidayFilter, [e.target.name]: Number(e.target.value) })
    }

    useEffect(() => {
        getListHoliday(holidayFilter).then((response) => {
            responseData(response, setListHoliday)
        })
    }, [holidayFilter])

    const handleDelete = (e) => {
        deleteHoliday(selected.id).then((response) => {
            responseDelete(response, setListHoliday, selected.id)
        })
    }

    const handleUpdateHoliday = (values) => {
        updateHoliday(values).then((response) => {
            if (response.data.code === 1000) {
                getListHoliday(holidayFilter).then((response) => {
                    responseData(response, setListHoliday)
                    document.querySelector('#crud_holiday [data-bs-dismiss="modal"]').click();
                    toast.success("Cập nhật thành công!")
                })
            } else if (response.data.code > 1000) {
                toast.info(response.data.message)
            } else
                toast.error("Bảo trì hệ thống!")
        })
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "10px" }}>
                                        <button class={`nav-link nav-link-profile ${Number(holidayFilter.type) === 0 ? "active" : ""}`}
                                            data-bs-target="#setting-asset-group" name='type' value={0} onClick={(e) => onChangeType(e)} >Tất cả</button>
                                    </li>
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "10px" }}>
                                        <button class={`nav-link nav-link-profile ${holidayFilter.type === 1 ? "active" : ""}`}
                                            data-bs-target="#setting-asset-group" name='type' value={1} onClick={(e) => onChangeType(e)}>Nghỉ lễ</button>
                                    </li>
                                    <li class="nav-item" role="presentation" style={{ marginRight: "10px" }}>
                                        <button class={`nav-link nav-link-profile ${holidayFilter.type === 2 ? "active" : ""}`}
                                            data-bs-target="#setting-asset-unit" name='type' value={2} onClick={(e) => onChangeType(e)}>Nghỉ bù</button>
                                    </li>
                                </ul>
                            </div>

                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 icon-header-2">
                                    <div className="d-flex flex-column align-items-center " style={{ fontSize: "12px", position: "relative" }}
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
                                <div class="mb-2 dropdown profile-dropdown" >
                                    <a href="#" class="btn btn-danger d-flex align-items-center"
                                        data-bs-toggle="modal" data-bs-target="#crud_holiday"
                                        onClick={() => setOpenModal([...openModal, "create"])}
                                    >
                                        <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive height-my-table">
                                <div class="table-container">
                                    <table ref={tableRef} class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th></th>
                                                <th>Ngày nghỉ</th>
                                                <th>Lý do</th>
                                                <th>Loại nghỉ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listHoliday.length > 0 && listHoliday.map((item, index) => (
                                                    <tr key={index} onContextMenu={() => setSelected(item)}>
                                                        <td></td>
                                                        <td>{convertDate(item.date)}</td>
                                                        <td>{item.reason}</td>
                                                        <td>{item.type && HolidayType.get(item.type).name}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div class="row pageable-center">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <ContextMenuTwoItem
                x={x}
                y={y}
                showMenu={showMenu}
                modalId={"crud_holiday"}
                handleDelete={handleDelete}
                setTypeOpen={setOpenModal}
            />
            <HolidaysCRUDComponent selected={selected} openModal={openModal} handleUpdateHoliday={handleUpdateHoliday} />
        </>
    );
};

export default HolidaysComponent;

