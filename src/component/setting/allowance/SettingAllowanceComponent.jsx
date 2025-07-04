import React, { useEffect, useRef, useState } from 'react';
import AllowanceCRUDComponent from './AllowanceCRUDComponent';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import { deleteAllowance } from '../../../service/Manage/ManageAllowanceService';
import { responseData, responseDelete } from '../../../util/ResponseUtil';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { DELETE } from '../../../util/ApproveOrDeleteUtil';
import { getListAllownace } from '../../../service/AllowanceService';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';

const SettingAllowanceComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Cài đặt phụ cấp", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listAllowance, setListAllowance] = useState({});
    const [selected, setSelected] = useState("");
    const [typeOpen, setTypeOpen] = useState([]);

    useEffect(() => {
        getListAllownace().then((response) => {
            responseData(response, setListAllowance)
        })
    }, [])

    const handleDeleteAllowance = () => {
        deleteAllowance(selected.id).then(response => {
            responseDelete(response, setListAllowance, selected.id)
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
                                    <li className="nav-item nav-profile" role="presentation" >
                                        <button className="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group">Loại phụ cấp</button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_allowance"
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "crud_allowance-create"])}>
                                    <i
                                        className="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
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
                                                <th>Tên phụ cấp</th>
                                                <th>Số tiền / Đơn vị </th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listAllowance.length > 0 && listAllowance.map((item, index) => (
                                                    <tr onContextMenu={() => setSelected(item)}>
                                                        <td>
                                                        </td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.amount} / {item.unit}</span></td>
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
                handleClick={handleDeleteAllowance}
            />
            <AllowanceCRUDComponent selected={selected} typeOpen={typeOpen} setListAllowance={setListAllowance} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_allowance"} handleDelete={handleDeleteAllowance} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingAllowanceComponent;

