import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import SalaryDecisionComponent from './crud/SalaryDecisionComponent';
import EndContractDecisionComponent from './crud/EndContractDecisionComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { responseData } from '../../util/ResponseUtil';
import { approvalDecision, deleteDecision, getCountDecision, getListDecision, noApprovalDecision } from '../../service/DecisionService';
import { updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import ContextMenuDecision from '../../contextmenu/ContextMenuDecisionAndLetter';
import { toast } from 'react-toastify';
import { DECISION_TYPE_APPOINT, DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD, DECISION_TYPE_SALARY, DECISION_TYPE_TERMINATION, DECISION_TYPE_TRANSFER, DecisiontState, DecisionType } from '../../util/DecisionUtil';
import { getListEmployeeSelect } from '../../service/EmployeeService';
import RewardAndPenaltyDecisionComponent from './crud/RewardAndPenaltyDecisionComponent';
import TranferAndAppointmentDecisionComponent from './crud/TranferAndAppointmentDecisionComponent';
import { convertDate } from '../../util/TimeUtil';
import ApproveOrDeleteComponent from '../customer/ApproveOrDeleteComponent';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { PerManageDecision } from '../../util/PermissionUtil';
import DetailDecisionComponent from './DetailDecisionComponent';

const ManageDecisionComponent = () => {
    //lay role
    const roleString = Cookies.get('permissions');
    let roles = new Set();
    let isManage = false;
    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isManage = PerManageDecision.some((role) => roles.has(role))
    }

    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách quyết định", subTitle: "" }))

    const searchFilter = useSelector((state) => state.searchFilter)

    const element = document.getElementById("contextMenuDecision")
    if (element) {
        var width = element.offsetWidth
        var height = element.offsetHeight
    }
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, width, height);
    const [totalDecision, setTotalDecision] = useState(0) // hiển thị phân trang
    const [listDecision, setListDecision] = useState([])
    const [countDecision, setCountDecision] = useState([])
    const [totalItem, setTotalItem] = useState(0) // hiển thị nav
    const [selected, setSelected] = useState("");
    const [typeOpen, setTypeOpen] = useState([])
    const [typeSave, setTypeSave] = useState("");
    const [modalId, setModalId] = useState([])
    const [listEmployeeSelect, setListEmployeeSelect] = useState([])
    const [typeApproveOrDelete, setTypeApproveOrDelete] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        if (isManage) {
            getListEmployeeSelect().then((response) => {
                responseData(response, setListEmployeeSelect)
            })
        }
    }, [isManage])

    const handleApproveAndDelete = async (e) => {
        var response = null
        var title = "";
        if (typeApproveOrDelete === DELETE) {
            response = await deleteDecision(selected.decisionId)
            title = "Xóa thành công!"
        } else if (typeApproveOrDelete === NO_APPROVE) {
            response = await noApprovalDecision(selected.decisionId)
        } else if (typeApproveOrDelete === APPROVE) {
            response = await approvalDecision(selected.decisionId)
            title = "Đã duyệt quyết định!"
        }
        if (response.data.code === 1000) {
            if (title !== "")
                toast.success(title);
            document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            updateDecision()
        } else if (response.data.code > 1000)
            toast.error(response.data.message)
        else
            toast.error("Bảo trì hệ thống")
    }


    useEffect(() => {
        getCountDecision(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const list = response.data.data
                const totalCount = list.reduce((total, item) => total + Number(item.count || 0), 0);
                setCountDecision(list)
                setTotalItem(totalCount)
                setTotalDecision(totalCount)
            }
        })
    }, [
        searchFilter.name,
        JSON.stringify(searchFilter.department || []),
        JSON.stringify(searchFilter.jobPosition || []),
        JSON.stringify(searchFilter.duty || []),
        searchFilter.dateJoin || ''
    ])

    useEffect(() => {
        getListDecision(searchFilter).then((response) => {
            responseData(response, setListDecision)
        })

    }, [searchFilter])

    const handleClickNav = (type, count) => {
        dispatch(updateTypeFilter(type))
        dispatch(updatePageIndexFilter(1))
        setTotalDecision(count)
    }

    useEffect(() => {
        if (selected.decisionType) {
            setModalId(DecisionType.get(selected.decisionType).modal)
            setTypeSave(selected.decisionType)
        }
    }, [selected])

    const handleClickDropMenu = (id, typeSave) => {
        setTypeOpen(prevList => [...prevList, id + "-create"])
        setTypeSave(typeSave)
    }

    const updateDecision = () => {
        getCountDecision(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const list = response.data.data
                const totalCount = list.reduce((total, item) => total + Number(item.count || 0), 0);
                setCountDecision(list)
                setTotalDecision(totalCount)
                setTotalItem(totalCount)
            }
        })

        getListDecision(searchFilter).then((response) => {
            responseData(response, setListDecision)
        })
    }

    const handleClickNavigate = () => {
        navigate("/manage-decision/decision-detail", { state: { decisionId: selected.decisionId, decisionType: selected.decisionType } });
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
                                        <button className={`nav-link nav-link-profile ${searchFilter.type === '' ? "active" : ""}`} onClick={() => handleClickNav('', totalItem)}
                                        > Tất cả ({totalItem}) </button>
                                    </li>
                                    {
                                        countDecision.length > 0 && countDecision.map((item, index) => (
                                            <li key={index} className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                                <button className={`nav-link nav-link-profile ${searchFilter.type === item.id ? "active" : ""}`} onClick={() => handleClickNav(item.id, item.count)}
                                                >{item.name + " (" + item.count + ")"} </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {isManage && (
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                    <div className="dropdown profile-dropdown">
                                        <a href="#" className="btn btn-danger d-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                        </a>
                                        <div className="dropdown-menu shadow-none">
                                            <div className="card mb-0">
                                                <div className="card-body crud-depart">
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_reward_penalty_decision"
                                                        onClick={() => handleClickDropMenu("create_reward_penalty_decision", DECISION_TYPE_REWARD)}
                                                    >
                                                        Quyết định khen thưởng
                                                    </a>
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_tranfer_appointment_decision"
                                                        onClick={() => handleClickDropMenu("create_tranfer_appointment_decision", DECISION_TYPE_TRANSFER)}
                                                    >
                                                        Quyết định điều chuyển
                                                    </a>
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_reward_penalty_decision"
                                                        onClick={() => handleClickDropMenu("create_reward_penalty_decision", DECISION_TYPE_PENALTY)}                                                >
                                                        Quyết định kỷ luật nội bộ
                                                    </a>
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_tranfer_appointment_decision"
                                                        onClick={() => handleClickDropMenu("create_tranfer_appointment_decision", DECISION_TYPE_APPOINT)}                                                >
                                                        Quyết định bổ nhiệm
                                                    </a>
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_salary_decision"
                                                        onClick={() => handleClickDropMenu("create_salary_decision", DECISION_TYPE_SALARY)}                                                >
                                                        Quyết định điều chỉnh lương
                                                    </a>
                                                    <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create_terminate_decision"
                                                        onClick={() => handleClickDropMenu("create_terminate_decision", DECISION_TYPE_TERMINATION)}                                                >
                                                        Quyết định chấm dứt HĐLĐ
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive height-my-table">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Người tạo</th>
                                                <th>Số quyết định</th>
                                                <th>Ngày quyết định</th>
                                                <th>Loại quyết định</th>
                                                <th>Đối với nhân sự</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {listDecision.length > 0 && listDecision.map((item, index) => (
                                                <tr key={index} onContextMenu={() => setSelected(item)}>
                                                    <td>{item.createdBy}</td>
                                                    <td>{item.decisionCode}</td>
                                                    <td>{convertDate(item.decisionDate)}</td>
                                                    <td>{item.decisionType ? DecisionType.get(item.decisionType).name : ""}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td><span className={`badge ${item.decisionState ? DecisiontState.get(Number(item.decisionState)).bg : ""}`}>{item.decisionState ? DecisiontState.get(Number(item.decisionState)).name : ""}</span></td>
                                                    <td>{convertDate(item.createdAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="row pageable-center">
                                <div className="col-sm-12 col-md-5">
                                    <div>Hiển thị {(() => {
                                        const start = (searchFilter.pageIndex - 1) * 12 + 1;
                                        const end = Math.min(searchFilter.pageIndex * 12, totalDecision);
                                        return `${start} - ${end}`;
                                    })()} trong {totalDecision} bản ghi</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate mg-top-0">
                                        <ul className="pagination">
                                            <li className={`page-item previous disabled my-center ${searchFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex - 1)) }}>
                                                <i className="ti ti-chevron-left"></i>
                                            </li>
                                            <li className="page-item active "><a className="page-link">{searchFilter.pageIndex}</a></li>
                                            <li className={`page-item next disabled my-center  ${((searchFilter.pageIndex - 1) * 12 + 12) >= totalDecision ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex + 1)) }}>
                                                <i className="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ContextMenuDecision x={x}
                y={y}
                showMenu={showMenu}
                modalId={modalId}
                setTypeOpen={setTypeOpen}
                state={selected.decisionState}
                setTypeApproveOrDelete={setTypeApproveOrDelete}
                handleClickNavigate={handleClickNavigate}
                isManage={isManage}
                modalDetail={"decision_detail"}
            />

            <DetailDecisionComponent
                decisionId={selected.decisionId}
                decisionType={selected.decisionType}
                typeOpen={typeOpen}
                setTypeApproveOrDelete={setTypeApproveOrDelete}
                setTypeOpen={setTypeOpen}
                isManage={isManage} />

            {isManage && (
                <>
                    <ApproveOrDeleteComponent
                        handleClick={handleApproveAndDelete}
                        type={typeApproveOrDelete} />

                    <RewardAndPenaltyDecisionComponent
                        decisionId={selected.decisionId}
                        typeOpen={typeOpen}
                        type={typeSave}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}
                    />

                    <TranferAndAppointmentDecisionComponent
                        decisionId={selected.decisionId}
                        typeOpen={typeOpen}
                        type={typeSave}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}

                    />

                    <SalaryDecisionComponent
                        decisionId={selected.decisionId}
                        typeOpen={typeOpen}
                        type={typeSave}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}

                    />

                    <EndContractDecisionComponent
                        decisionId={selected.decisionId}
                        typeOpen={typeOpen}
                        listEmployeeSelect={listEmployeeSelect}
                        updateDecision={updateDecision}
                    />
                </>
            )}
        </>
    );
};

export default ManageDecisionComponent;