import React, { useEffect, useRef, useState } from 'react';
import DutyCRUDComponent from './crud/DutyCRUDComponent';
import { deleteDuty } from '../../service/Manage/ManageDutyService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { DELETE } from '../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { getListDuty } from '../../service/DutyService';

const SettingDutyComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách chức vụ", subTitle: "" }))

    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listDuty, setListDuty] = useState({});
    const [selectedDuty, setSelectedDuty] = useState("");
    const [typeOpen, setTypeOpen] = useState([]);

    useEffect(() => {
        getListDuty().then((response) => {
            if (response.data.code === 1000) {
                setListDuty(response.data.data)
            } else if (response.data.code > 1000)
                toast.error(response.data.message)
            else
                toast.error("Bảo trì hệ thống")
        })
    }, [])

    const handleDeleteDuty = () => {
        deleteDuty(selectedDuty.id).then(response => {
            if (response.data.code === 1000) {
                toast.success("Xóa thành công!");
                setListDuty(prevList => prevList.filter(item => item.id !== selectedDuty.id));
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            } else {
                toast.error(response.data.message);
            }
        });
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "15px" }}>
                                        <button class="nav-link nav-link-profile active" id="info-tab"
                                        >Chức vụ</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_duty"
                                    class="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "crud_duty-create"])}>
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }}></i>
                                </a>
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
                                                <th>Tên chức vụ</th>
                                                <th>Trạng thái</th>
                                                <th>Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {listDuty.length > 0 && listDuty.map((item, index) => (
                                                <tr id={item.id} onContextMenu={() => setSelectedDuty(item)}>
                                                    <td></td>
                                                    <td>{item.createdBy}</td>
                                                    <td>{item.name}</td>
                                                    <td><span className='badge'>{item.status}</span></td>
                                                    <td>{item.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleDeleteDuty}
            />

            <DutyCRUDComponent selectedDuty={selectedDuty} typeOpen={typeOpen} setListDuty={setListDuty} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_duty"} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingDutyComponent;

