import { useEffect, useRef, useState } from 'react';
import BusinessBlockCRUDComponent from '../businessBlock/BusinessBlockCRUDComponent';
import TableDepartmentComponent from '../component/TableDepartmentComponent';
import TableBusinessBlockComponent from '../component/TableBusinessBlockComponent';
import { deleteBusinessBlock, getBusinessBlock } from '../../../service/Manage/ManageBusinessBlockService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import { deleteDepartment, getListDepartment } from '../../../service/Manage/ManageDepartmentService';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { responseData } from '../../../util/ResponseUtil';
import { DELETE } from '../../../util/ApproveOrDeleteUtil';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';
import DepartmentCRUDComponent from './DepartmentCRUDComponent';

const ManageDepartmentComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách phòng ban", subTitle: "" }))
    const tableBusinessRef = useRef(null)
    const tableDepartmentRef = useRef(null)
    const [tableRef, setTableRef] = useState(tableDepartmentRef);
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);

    const [modalId, setModalId] = useState(null)
    const [handleDelete, setHandleDelete] = useState(null)
    const [selectedId, setSelectedId] = useState("")
    const [typeOpenModal, setTypeOpenModal] = useState([])

    const [openBusinessBlock, setOpenBusinessBlock] = useState(false)

    const [listBusinessBlock, setListBusinessBlock] = useState(null)
    const [businessBlockDetail, setBusinessBlockDetail] = useState(null)

    const [listDepartment, setListDepartment] = useState(null)

    useEffect(() => {
        getListDepartment().then((response) => {
            responseData(response, setListDepartment)
        })
    }, [])

    const handleDeleteBusinessBlock = () => {
        deleteBusinessBlock(selectedId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Xóa khối nghiệp vụ thành công")
                getBusinessBlock().then((response) => {
                    responseData(response, setListBusinessBlock)
                })
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            } else {
                toast.success(response.data.message)
            }
        })
    }

    const handleDeleteDepartment = () => {
        deleteDepartment(selectedId).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Xóa phòng ban thành công")
                getListDepartment().then((response) => {
                    responseData(response, setListDepartment)
                })
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            } else {
                toast.success(response.data.message)
            }
        })
    }

    useEffect(() => {
        getBusinessBlock().then((response) => {
            responseData(response, setListBusinessBlock)
        })
    }, [])

    useEffect(() => {
        if (openBusinessBlock) {
            setModalId("crud_business_block")
            setTableRef(tableBusinessRef)
        } else {
            setTableRef(tableDepartmentRef)
            setModalId("crud_department")
        }
    }, [openBusinessBlock])

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                        <button className="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#department" onClick={() => setOpenBusinessBlock(false)} >Phòng ban</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button onClick={() => setOpenBusinessBlock(true)} className="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#business-block" >Khối nghiệp vụ</button>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown profile-dropdown">
                                <a href="#" className="btn btn-danger d-flex align-items-center" data-bs-toggle="dropdown">
                                    <i className="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                                <div className="dropdown-menu shadow-none">
                                    <div className="card mb-0">
                                        <div className="card-body crud-depart">
                                            <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_department" onClick={() => { setTypeOpenModal((prev) => [...prev, "crud_department-create"]) }}>
                                                Phòng ban,chi nhánh
                                            </a>
                                            <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_business_block" onClick={() => { setTypeOpenModal((prev) => [...prev, "crud_business_block-create"]) }}>
                                                Khối nghiệp vụ
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <TableDepartmentComponent ref={tableDepartmentRef} setSelectedId={setSelectedId} listDepartment={listDepartment} />
                            <TableBusinessBlockComponent ref={tableBusinessRef} setSelectedId={setSelectedId} listBusinessBlock={listBusinessBlock} setBusinessBlockDetail={setBusinessBlockDetail} />
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={modalId} setTypeOpen={setTypeOpenModal} />
            <DepartmentCRUDComponent setListDepartment={setListDepartment} typeOpen={typeOpenModal} listDepartment={listDepartment} listBusinessBlock={listBusinessBlock} selectedId={selectedId} />
            <BusinessBlockCRUDComponent setListBusinessBlock={setListBusinessBlock} typeOpen={typeOpenModal} businessBlock={businessBlockDetail} />

            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={openBusinessBlock ? handleDeleteBusinessBlock : handleDeleteDepartment}
            />

        </>
    );
};

export default ManageDepartmentComponent;

