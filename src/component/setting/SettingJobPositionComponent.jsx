import React, { useEffect, useRef, useState } from 'react';
import JobPositionCRUDComponent from './crud/JobPositionCRUDComponent';
import { getListDuty } from '../../service/DutyService';
import { deleteJobPosition, getListJobPosition } from '../../service/JobPositionService';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';

const SettingJobPositionComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listJobPostion, setListJobPostion] = useState({})
    const [selectedId, setSelectedId] = useState("")
    const [typeOpen, setTypeOpen] = useState([])

    useEffect(() => {
        getListJobPosition().then((response) => {
            responseData(response, setListJobPostion)
        })
    }, [])

    const handleDeleteJobPosition = () => {
        deleteJobPosition(selectedId).then(response => {
            responseDelete(response, setListJobPostion, selectedId)
        });
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Vị trí nhân sự</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_job_position"
                                    class="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}><i
                                        class="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <span className='active-category-list'>Vị trí công việc</span>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th></th>
                                                <th>Người tạo</th>
                                                <th>Tên vị trí</th>
                                                <th>Nhóm quyền</th>
                                                <th>Mức lương</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listJobPostion.length > 0 && listJobPostion.map((item, index) => (
                                                    <tr onContextMenu={() => setSelectedId(item.id)}>
                                                        <td><span></span></td>
                                                        <td><span>{item.createBy}</span></td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.role}</span></td>
                                                        <td><span>{item.salaryFrom} - {item.salaryTo}</span></td>
                                                        <td><span className='badge'>{item.status}</span></td>
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

            <JobPositionCRUDComponent selectedId={selectedId} typeOpen={typeOpen} setListJobPostion={setListJobPostion} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_job_position"} handleDelete={handleDeleteJobPosition} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingJobPositionComponent;

