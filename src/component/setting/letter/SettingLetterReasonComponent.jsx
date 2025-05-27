import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import ReasonLeaveCRUDComponent from './ReasonLeaveCRUDComponent';
import ReasonWorktimeCRUDComponent from './ReasonWorktimeCRUDComponent';
import { responseData, responseDelete, responseUpdateAndUpdateUI, responseUpdateType } from '../../../util/ResponseUtil';
import { modalCRUDReason } from '../../../util/ApprovalReasonUtil';
import ReasonGeneralCRUDComponent from './ReasonGeneralCRUDComponent';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { createLetterReason, deleteLetterReason, updateLetterReason } from '../../../service/Manage/ManageLetterReasonService';
import { DELETE } from '../../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';
import { getListLetterReason } from '../../../service/LetterReasonService';

const SettingLetterReasonComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Cài đặt đơn từ", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 200, 82);
    const [typeOpen, setTypeOpen] = useState([])
    const [reasonType, setReasonType] = useState(1)
    const [listLetterReason, setListLetterReason] = useState([])
    const [modalId, setModalId] = useState("#create_leave_reason");
    const [selectedId, setSelectedId] = useState("")

    useEffect(() => {
        getListLetterReason(reasonType).then((response) => {
            responseData(response, setListLetterReason)
        })
        setModalId(modalCRUDReason.get(JSON.parse(reasonType)))
    }, [reasonType])

    const onChangeNav = (e) => {
        setReasonType(e.target.value)
    }

    const handleLetterReason = () => {
        deleteLetterReason(selectedId).then((response) => {
            responseDelete(response, setListLetterReason, selectedId)
            if (response.data.code === 1000) {
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
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
            createLetterReason(newList).then((response) => {
                responseUpdateType(response, "Thêm mới thành công", setListLetterReason, getListLetterReason, reasonType)
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
            updateLetterReason(selectedId, values).then((response) => {
                responseUpdateAndUpdateUI(response, setListLetterReason)
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công!")
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" >
                                        <button className="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group" value={1} onClick={onChangeNav}>Lý do nghỉ</button>
                                    </li>
                                    <li className="nav-item nav-profile" role="presentation" >
                                        <button className="nav-link nav-link-profile" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group" value={2} onClick={onChangeNav}>Lý do OT</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={3} onClick={onChangeNav}>Lý do làm theo chế độ</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={4} onClick={onChangeNav}>Lý do checkin/out</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" value={6} onClick={onChangeNav}>Lý do thôi việc</button>
                                    </li>
                                </ul>
                            </div>

                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <a href="#" className="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#${modalId}`}
                                    onClick={() => setTypeOpen(prevList => [...prevList, modalId + "-create"])}>
                                    <i className="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="no-sort">
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
                                            {listLetterReason.length > 0 && listLetterReason.map((item, index) => (
                                                <tr key={index} onContextMenu={() => setSelectedId(item.id)}>
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

            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleLetterReason}
            />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={modalId} setTypeOpen={setTypeOpen} />

            <ReasonLeaveCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
            <ReasonWorktimeCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
            <ReasonGeneralCRUDComponent typeOpen={typeOpen} selectedId={selectedId} reasonType={reasonType} handleCreate={handleCreate} handleUpdate={handleUpdate} />
        </>
    );
};

export default SettingLetterReasonComponent;