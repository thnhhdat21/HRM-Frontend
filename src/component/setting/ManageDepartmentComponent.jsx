import React, { use, useEffect, useRef, useState } from 'react';
import DepartmentCRUDComponent from './crud/DepartmentCRUDComponent';
import BusinessBlockCRUDComponent from './crud/BusinessBlockCRUDComponent';
import TableDepartmentComponent from './component/TableDepartmentComponent';
import TableBusinessBlockComponent from './component/TableBusinessBlockComponent';
import { deleteBusinessBlock, getBusinessBlock } from '../../service/BusinessBlockService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuSetting from '../../contextmenu/ContextMenuSetting';
import { deleteDepartment, getListDepartment } from '../../service/DepartmentService';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';

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
    const [typeOpenModal, setTypeOpenModal] = useState("")

    const [openBusinessBlock, setOpenBusinessBlock] = useState(false)

    const [listBusinessBlock, setListBusinessBlock] = useState(null)
    const [businessBlockDetail, setBusinessBlockDetail] = useState(null)

    const [listDepartment, setListDepartment] = useState(null)

    useEffect(() => {
        getListDepartment().then((response) => {
            if (response.data.code === 1000) {
                setListDepartment(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        })
    }, [])

    const handleDeleteBusinessBlock = (id, setList) => {
        deleteBusinessBlock(id).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Xóa khối nghiệp vụ thành công")
                setList(prevList => prevList.filter(item => item.id !== id));
            } else {
                toast.success(response.data.message)
            }
        })
    }

    const removeDepartmentById = (department, id) => {
        if (!department.children) return department.id !== id ? department : null;

        const newChildren = department.children
            .map(child => removeDepartmentById(child, id))
            .filter(child => child !== null);

        return department.id !== id
            ? { ...department, children: newChildren }
            : null;
    };



    const handleDeleteDepartment = (id, setList) => {
        deleteDepartment(id).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Xóa khối phòng ban thành công")
                setList(prevList => removeDepartmentById(prevList, id));
            } else {
                toast.success(response.data.message)
            }
        })
    }

    useEffect(() => {
        getBusinessBlock().then((response) => {
            if (response.data.code === 1000) {
                setListBusinessBlock(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        })
    }, [])

    useEffect(() => {
        if (openBusinessBlock) {
            setHandleDelete(() => handleDeleteBusinessBlock)
            setModalId("crud_business_block")
            setTableRef(tableBusinessRef)
        } else {
            setTableRef(tableDepartmentRef)
            setModalId("crud_department")
            setHandleDelete(() => handleDeleteDepartment)
        }
    }, [openBusinessBlock])

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "15px" }}>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#department" onClick={() => setOpenBusinessBlock(false)} >Phòng ban</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button onClick={() => setOpenBusinessBlock(true)} class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#business-block" >Khối nghiệp vụ</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="mb-2 dropdown profile-dropdown">
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="dropdown">
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                                <div class="dropdown-menu shadow-none">
                                    <div class="card mb-0">
                                        <div class="card-body crud-depart">
                                            <a class="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_department" onClick={() => { setTypeOpenModal("create") }}>
                                                Phòng ban,chi nhánh
                                            </a>
                                            <a class="dropdown-item d-inline-flex align-items-center p-0 py-2" data-bs-toggle="modal" data-bs-target="#crud_business_block" onClick={() => setTypeOpenModal("create")}>
                                                Khối nghiệp vụ
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-content" id="myTabContent">
                            <TableDepartmentComponent ref={tableDepartmentRef} setSelectedId={setSelectedId} listDepartment={listDepartment} />
                            <TableBusinessBlockComponent ref={tableBusinessRef} setSelectedId={setSelectedId} listBusinessBlock={listBusinessBlock} setBusinessBlockDetail={setBusinessBlockDetail} />
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuSetting x={x} y={y} showMenu={showMenu} modalId={modalId} handleDelete={handleDelete} selectedId={selectedId} setlist={openBusinessBlock ? setListBusinessBlock : setListDepartment} setTypeOpenModal={setTypeOpenModal} />
            <DepartmentCRUDComponent setListDepartment={setListDepartment} typeOpen={typeOpenModal} setTypeOpen={setTypeOpenModal} listDepartment={listDepartment} listBusinessBlock={listBusinessBlock} selectedId={selectedId} />
            <BusinessBlockCRUDComponent setListBusinessBlock={setListBusinessBlock} typeOpen={typeOpenModal} businessBlock={businessBlockDetail} />
        </>
    );
};

export default ManageDepartmentComponent;

