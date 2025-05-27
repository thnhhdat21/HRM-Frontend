import { useEffect, useRef, useState } from 'react';
import JobPositionCRUDComponent from './JobPositionCRUDComponent';
import { getListJobPosition } from '../../../service/JobPositionService';
import { responseData, responseDelete } from '../../../util/ResponseUtil';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { DELETE } from '../../../util/ApproveOrDeleteUtil';
import { deleteJobPosition } from '../../../service/Manage/ManageJobPositionService';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';

const SettingJobPositionComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listJobPostion, setListJobPostion] = useState({})
    const [selectedId, setSelectedId] = useState("")
    const [typeOpen, setTypeOpen] = useState([])
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Vị trí công việc", subTitle: "" }))

    useEffect(() => {
        getListJobPosition().then((response) => {
            responseData(response, setListJobPostion)
        })
    }, [])

    const handleDeleteJobPosition = () => {
        deleteJobPosition(selectedId).then(response => {
            responseDelete(response, setListJobPostion, selectedId)
            if (response.data.code === 1000) {
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        });
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                        <button className="nav-link nav-link-profile active" id="info-tab"
                                        >Vị trí công việc</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_job_position"
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "crud_job_position-create"])}><i
                                        className="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
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
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleDeleteJobPosition}
            />

            <JobPositionCRUDComponent selectedId={selectedId} typeOpen={typeOpen} setListJobPostion={setListJobPostion} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_job_position"} handleDelete={handleDeleteJobPosition} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingJobPositionComponent;

