import React, { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ReasonLeaveCRUDComponent from './crud/approval/ReasonLeaveCRUDComponent';
import ReasonWorktimeCRUDComponent from './crud/approval/ReasonWorktimeCRUDComponent';
import { createApprovalReason, deleteApprovalReason, getApprovalReasonDetail, getListApprovalReason, updateApprovalReason } from '../../service/ApprovalReasonService';
import { responseData, responseDelete, responseUpdateAndUpdateUI, responseUpdateType } from '../../util/ResponseUtil';
import { modalCRUDReason } from '../../util/ApprovalReasonUtil';
import ReasonGeneralCRUDComponent from './crud/approval/ReasonGeneralCRUDComponent';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';
import { toast } from 'react-toastify';

const SettingApprovalComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const [typeOpen, setTypeOpen] = useState([])
    const [reasonType, setReasonType] = useState(1)
    const [listApprovalReason, setListApprovalReason] = useState([])
    const [modalId, setModalId] = useState("#create_leave_reason");
    const [selectedId, setSelectedId] = useState("")

    useEffect(() => {
        getListApprovalReason(reasonType).then((response) => {
            responseData(response, setListApprovalReason)
        })
        setModalId(modalCRUDReason.get(JSON.parse(reasonType)))
    }, [reasonType])

    const onChangeNav = (e) => {
        setReasonType(e.target.value)
    }

    const handleApprovalReason = () => {
        deleteApprovalReason(selectedId).then((response) => {
            responseDelete(response, setListApprovalReason, selectedId)
        })
    }

    const handleCreate = (e, rows, checkValidator) => {
        e.preventDefault()
        var isCorrect = true;
        rows.forEach(element => {
            isCorrect = checkValidator(element)
            if (!isCorrect)
                return
        });
        if (isCorrect) {
            const newList = rows.map(({ id, ...rest }) => ({ ...rest }));
            createApprovalReason(newList).then((response) => {
                responseUpdateType(response, "Thêm mới thành công", setListApprovalReason, getListApprovalReason, reasonType)
                if (response.data.code === 1000) {
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }

    const handleUpdate = (e, values, checkValidator) => {
        e.preventDefault()
        const isCorrect = checkValidator(values)
        if (isCorrect) {
            updateApprovalReason(selectedId, values).then((response) => {
                responseUpdateAndUpdateUI(response, setListApprovalReason)
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công!")
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex align-items-center  mb-3">
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2 dropdown profile-dropdown">
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#${modalId}`}
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}>
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                            </div>
                        </div>
                        <div class="my-auto mb-2" style={{ marginLeft: "20px" }}>
                            <h2 class="mb-1">Danh mục</h2>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group" value={1} onClick={onChangeNav}>Lý do nghỉ</button>
                                    </li>
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group" value={2} onClick={onChangeNav}>Lý do OT</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={3} onClick={onChangeNav}>Lý do làm theo chế độ</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={4} onClick={onChangeNav}>Lý do checkin/out</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={5} onClick={onChangeNav}>Lý do công tác</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={6} onClick={onChangeNav}>Lý do thôi việc</button>
                                    </li>
                                </ul>
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
                                                <th>Lý do</th>
                                                <th>Tối đa</th>
                                                <th>Tính công</th>
                                                <th>Mô tả</th>
                                                <th>Ngày tạo</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {listApprovalReason.length > 0 && listApprovalReason.map((item, index) => (
                                                <tr onContextMenu={() => setSelectedId(item.id)}>
                                                    <td></td>
                                                    <td>{item.reason}</td>
                                                    <td>{item.maximum}</td>
                                                    <td>{item.workDayEnabled ? "Có" : "Không"}</td>
                                                    <td>{item.des}</td>
                                                    <td>{item.createdAt}</td>
                                                    <td><span className='badge badge-success'>{item.status}</span></td>
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
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} handleDelete={handleApprovalReason} modalId={modalId} setTypeOpen={setTypeOpen} />
            <ReasonLeaveCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
            <ReasonWorktimeCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
            <ReasonGeneralCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
        </>
    );
};

export default SettingApprovalComponent;