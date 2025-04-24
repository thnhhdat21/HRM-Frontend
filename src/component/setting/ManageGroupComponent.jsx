import React, { use, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteRole, getListRole } from '../../service/RoleService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuGroup from '../../contextmenu/ContextMenuGroup';
import EditGroupComponent from './crud/EditGroupComponent';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';

const ManageGroupComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách nhóm tài khoản", subTitle: "" }))
    const [listRole, setListRole] = useState(null);
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const [selectedId, setSelectedId] = useState(null);
    useEffect(() => {
        getListRole().then((response) => {
            if (response.data.code === 1000) {
                setListRole(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        })
    }, [])

    const handleDeleteRole = () => {
        deleteRole(selectedId).then(response => {
            if (response.data.code === 1000) {
                toast.success("Xóa thành công!");
                setListRole(prevList => prevList.filter(item => item.id !== selectedId));
            } else {
                toast.error(response.data.message);
            }
        });
    }
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <Link to={"/admin/admin-group/add"}
                                    class="btn btn-primary d-flex align-items-center"><i
                                        class="ti ti-circle-plus " style={{ fontSize: "20px" }}></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th></th>
                                                <th>Tên nhóm</th>
                                                <th>Quản trị hệ thống</th>
                                                <th>Nhóm mặc định</th>
                                                <th>Tài khoản</th>
                                                <th>Người tạo</th>
                                                <th>Người sửa</th>
                                                <th>Ngày tạo</th>
                                                <th>Ngày sửa</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listRole && listRole.map((item, index) => (
                                                    <tr key={item.id} onContextMenu={() => { setSelectedId(item.id) }}>
                                                        <td></td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.accountAdmin ? "Có" : "Không"}</span></td>
                                                        <td><span>{item.accountDefault ? "Có" : "Không"}</span></td>
                                                        <td><span>{item.count}</span></td>
                                                        <td><span>{item.createdBy}</span></td>
                                                        <td><span>{item.updatedBy}</span></td>
                                                        <td><span>{item.createdDate}</span></td>
                                                        <td><span>{item.updatedDate}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div class="row pageable-center">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuGroup x={x} y={y} showMenu={showMenu} handleDeleteRole={handleDeleteRole} />
            <EditGroupComponent id={selectedId} />
        </>
    );
};

export default ManageGroupComponent;

