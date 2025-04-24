import React, { useEffect, useRef, useState } from 'react';
import TimeKeepingCRUDComponent from './crud/timekeeping/TimeKeepingCRUDComponent';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { deleteWorkShift, getListWorkShift } from '../../service/WorkShiftService';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';

const SettingTimeKeepingComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listWorkShift, setListWorkShift] = useState([])
    const [selectedId, setSelectedId] = useState({})
    const [typeOpen, setTypeOpen] = useState([])

    useEffect(() => {
        getListWorkShift().then((response) => {
            responseData(response, setListWorkShift)
        })
    }, [])

    const handleWorkShift = () => {
        deleteWorkShift(selectedId).then((response) => {
            responseDelete(response, setListWorkShift, selectedId)
        })
    }

    return (
        <>
            <div class="page-wrapper" >
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Phân hệ chấm công</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_time_keeping"
                                    class="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}
                                ><i
                                    class="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <span className='active-category-list'>Cài đặt ca làm việc </span>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th class="no-sort">
                                                </th>
                                                <th>Mã ca</th>
                                                <th>Tên ca</th>
                                                <th>Giờ vào</th>
                                                <th>Giờ ra</th>
                                                <th>Giờ nghỉ</th>
                                                <th>Giờ kết thúc nghỉ</th>
                                                <th>Check in trước</th>
                                                <th>Check in sau</th>
                                                <th>Tổng giờ</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listWorkShift.length > 0 && listWorkShift.map((item, index) => (
                                                    <tr onContextMenu={() => setSelectedId(item.id)}>
                                                        <td>
                                                        </td>
                                                        <td><span>{item.code}</span></td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.timeIn}</span></td>
                                                        <td><span>{item.timeOut}</span></td>
                                                        <td><span>{item.breakStartTime}</span></td>
                                                        <td><span>{item.breakEndTime}</span></td>
                                                        <td><span>{item.checkinFirst}</span></td>
                                                        <td><span>{item.checkoutLater}</span></td>
                                                        <td><span>{item.totalTime}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TimeKeepingCRUDComponent selectedId={selectedId} typeOpen={typeOpen} setListWorkShift={setListWorkShift} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_time_keeping"} handleDelete={handleWorkShift} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingTimeKeepingComponent;

