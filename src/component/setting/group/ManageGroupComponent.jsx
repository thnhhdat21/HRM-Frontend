import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteRole, getListRole } from '../../../service/Manage/ManageRoleService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import EditGroupComponent from './EditGroupComponent';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { DELETE } from '../../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
const ManageGroupComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách nhóm tài khoản", subTitle: "" }))
    const [listRole, setListRole] = useState(null);
    const element = document.getElementById("contextMenuGroup")
    if (element) {
        var width = element.offsetWidth
        var height = element.offsetHeight
    }
    const tableRef = useRef(null)

    const { x, y, showMenu } = useRightClickMenu(tableRef, width, height);
    const [selectedId, setSelectedId] = useState(null);
    const [typeOpen, setTypeOpen] = useState([])
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
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();

            } else {
                toast.error(response.data.message);
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
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <Link to={"/settings/group/add"}
                                    className="btn btn-primary d-flex align-items-center"><i
                                        className="ti ti-circle-plus " style={{ fontSize: "20px" }}></i>
                                </Link>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th></th>
                                                <th>Tên nhóm</th>
                                                <th>Quản trị hệ thống</th>
                                                <th>Nhóm mặc định</th>
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
                                                        <td><span>{item.createdDate}</span></td>
                                                        <td><span>{item.updatedDate}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className="row pageable-center">
                                <div className="col-sm-12 col-md-5">
                                    <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate mg-top-0">
                                        <ul className="pagination">
                                            <li className="page-item previous disabled my-center">
                                                <i className="ti ti-chevron-left"></i>
                                            </li>
                                            <li className="page-item active "><a className="page-link">1</a></li>
                                            <li className=" page-item next disabled my-center">
                                                <i className="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleDeleteRole}
            />
            <ContextMenuTwoItem x={x} y={y} modalId={"edit-group"} showMenu={showMenu} setTypeOpen={setTypeOpen} />
            <EditGroupComponent id={selectedId} typeOpen={typeOpen} />
        </>
    );
};

export default ManageGroupComponent;

