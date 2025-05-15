import { useEffect, useRef, useState } from 'react';
import PenaltyCRUDComponent from './crud/PenaltyCRUDComponent';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { getListRewardOrPenalty } from '../../service/RewardAndPenaltyService';
import { responseData, responseDelete } from '../../util/ResponseUtil';
import ContextMenuTwoItem from '../../contextmenu/ContextMenuTwoItem';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { DECISION_TYPE_PENALTY } from '../../util/DecisionUtil';
import { DELETE } from '../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { deleteRewardOrPenalty } from '../../service/Manage/ManageRewardAndPenaltyService';

const SettingPenaltyComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Phạt nội bộ", subTitle: "" }))
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [listPenalty, setListPenalty] = useState({})
    const [selected, setSelected] = useState("")
    const [typeOpen, setTypeOpen] = useState([])

    useEffect(() => {
        getListRewardOrPenalty(DECISION_TYPE_PENALTY).then((response) => {
            responseData(response, setListPenalty)
        })
    }, [])

    const handleDeletePanalty = () => {
        deleteRewardOrPenalty(selected.id).then((response) => {
            responseDelete(response, setListPenalty, selected.id)
            if (response.data.code === 1000) {
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                        <button className="nav-link nav-link-profile active" id="info-tab"
                                        >Phạt nội bộ </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#crud_penalty"
                                    className="btn btn-primary d-flex align-items-center"
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}
                                ><i
                                    className="ti ti-circle-plus" style={{ fontSize: "20px" }}
                                ></i></a>
                            </div>
                        </div>

                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th>
                                                </th>
                                                <th>Người tạo</th>
                                                <th>Lỗi vi phạm</th>
                                                <th>Số tiền</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listPenalty.length > 0 && listPenalty.map((item, index) => (
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
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleDeletePanalty}
            />

            <PenaltyCRUDComponent selected={selected} typeOpen={typeOpen} setListPenalty={setListPenalty} />
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={"crud_penalty"} setTypeOpen={setTypeOpen} />
        </>
    );
};

export default SettingPenaltyComponent;

