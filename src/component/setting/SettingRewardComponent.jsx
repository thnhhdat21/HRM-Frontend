import React, { useEffect, useRef, useState } from 'react';
import RewardCRUDComponent from './crud/RewardCRUDComponent';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { deleteRewardOrPenalty, getListRewardOrPenalty } from '../../service/RewardAndPenaltyService';
import { REWARD } from '../../util/RewardAndPenaltyUtil';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';

const SettingRewardComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listReward, setListReward] = useState({})
    const [selected, setSelected] = useState("")
    const [typeOpen, setTypeOpen] = useState([])

    useEffect(() => {
        getListRewardOrPenalty(REWARD).then((response) => {
            responseData(response, setListReward)
        })
    }, [])

    const handleDeleteReward = () => {
        deleteRewardOrPenalty(selected.id).then((response) => {
            responseDelete(response, setListReward, selected.id)
        })
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Nhân sự</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="mb-2">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_reward"
                                    class="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}
                                ><i
                                    class="ti ti-circle-plus" style={{ fontSize: "20px" }} ></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <span className='active-category-list'>Chế độ phúc lợi </span>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th> </th>
                                                <th>Người tạo</th>
                                                <th>Tên phúc lợi</th>
                                                <th>Số tiền</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listReward.length > 0 && listReward.map((item, index) => (
                                                    <tr onContextMenu={() => setSelected(item)}>
                                                        <td>
                                                        </td>
                                                        <td><span>{item.createBy}</span></td>
                                                        <td><span>{item.name}</span></td>
                                                        <td><span>{item.amount}</span></td>
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
            <RewardCRUDComponent selected={selected} typeOpen={typeOpen} setListReward={setListReward} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_reward"} handleDelete={handleDeleteReward} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingRewardComponent;

