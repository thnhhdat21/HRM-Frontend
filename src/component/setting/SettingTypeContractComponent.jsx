import React, { useEffect, useRef, useState } from 'react';
import TypeContractCRUDComponent from './crud/TypeContractCRUDComponent';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import { deleteContractType } from '../../service/Manage/ManageContractTypeService';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { DELETE } from '../../util/ApproveOrDeleteUtil';
import { getListContractType } from '../../service/ContractTypeService';

const SettingTypeContractComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Loại hợp đồng lao động", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listContractType, setListContractType] = useState({});
    const [selectedId, setSelectedId] = useState("");
    const [typeOpen, setTypeOpen] = useState([]);

    useEffect(() => {
        getListContractType().then((response) => {
            responseData(response, setListContractType)
        })
    }, [])

    const handleDeleteContractType = () => {
        deleteContractType(selectedId).then(response => {
            responseDelete(response, setListContractType, selectedId)
            if (response.data.code === 1000) {
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
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
                                        >Loại hợp đồng lao động</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_type_contract"
                                    class="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "crud_type_contract-create"])}>
                                    <i
                                        class="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
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
                                                <th>Tên hợp đồng</th>
                                                <th>Loại hợp đồng</th>
                                                <th>Đóng bảo hiểm</th>
                                                <th>Thời hạn</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listContractType.length > 0 && listContractType.map((item, index) => (
                                                    <tr onContextMenu={() => setSelectedId(item.id)}>
                                                        <td>
                                                        </td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.type}</span></td>
                                                        <td><span>{item.insurance ? "Có" : "Không"}</span></td>
                                                        <td><span>{item.term} {item.unit}</span></td>
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
                handleClick={handleDeleteContractType}
            />

            <TypeContractCRUDComponent selectedId={selectedId} typeOpen={typeOpen} setListContractType={setListContractType} setTypeOpen={setTypeOpen} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_type_contract"} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingTypeContractComponent;

