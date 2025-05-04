import React, { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import LeaveLetterComponent from './crud/LeaveLetterComponent';
import { approvalLetter, deleteLetter, getCountLetter, getListLetter, noApprovalLetter } from '../../service/LetterService';
import { responseData } from '../../util/ResponseUtil';
import { updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import { LETTER_TYPE_END_WORK, LETTER_TYPE_INOUT, LETTER_TYPE_LEAVE, LETTER_TYPE_OVERTIME, LETTER_TYPE_WORKTIME, LetterState, LetterType } from '../../util/LetterUtil';
import ContextMenuDecision from '../../contextmenu/ContextMenuDecision';
import { useNavigate } from 'react-router-dom';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';
import { toast } from 'react-toastify';
import WorkTimeLetterComponent from './crud/WorkTimeLetterComponent';
import OvertimeLetterComponent from './crud/OvertimeLetterComponent';
import EndJobLetterComponent from './crud/EndJobLetterComponent';
import CheckinLetterComponent from './crud/CheckinLetterComponent';
const LetterComponent = () => {
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách đơn từ", subTitle: "" }))
    const searchFilter = useSelector((state) => state.searchFilter)
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 200, 150);
    const navigate = useNavigate()
    const [totalLetter, setTotalLetter] = useState(0) // hiển thị phân trang
    const [listLetter, setListLetter] = useState([])
    const [countLetter, setCountLetter] = useState([])
    const [totalItem, setTotalItem] = useState(0) // hiển thị nav
    const [typeOpen, setTypeOpen] = useState([])
    const [typeSave, setTypeSave] = useState(0)
    const [selected, setSelected] = useState({})
    const [modalId, setModalId] = useState("")
    const [typeApproveOrDelete, setTypeApproveOrDelete] = useState("")


    useEffect(() => {
        getCountLetter(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const list = response.data.data
                const totalCount = list.reduce((total, item) => total + Number(item.count || 0), 0);
                setCountLetter(list)
                setTotalItem(totalCount)
                setTotalLetter(totalCount)
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
        getListLetter(searchFilter).then((response) => {
            responseData(response, setListLetter)
        })

    }, [searchFilter])

    const handleClickNav = (type, count) => {
        dispatch(updateTypeFilter(type))
        dispatch(updatePageIndexFilter(1))
        setTotalLetter(count)
    }

    const handleApproveAndDelete = async (e) => {
        var response = null
        var title = "";
        if (typeApproveOrDelete === DELETE) {
            response = await deleteLetter(selected.letterId)
            title = "Xóa thành công!"
        } else if (typeApproveOrDelete === NO_APPROVE) {
            response = await noApprovalLetter(selected.letterId)
        }
        else if (typeApproveOrDelete === APPROVE) {
            response = await approvalLetter(selected.letterId)
            title = "Đã duyệt quyết định!"
        }
        if (response.data.code === 1000) {
            if (title !== "")
                toast.success(title);
            document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            updateLetter()
        } else if (response.data.code > 1000)
            toast.error(response.data.message)
        else
            toast.error("Bảo trì hệ thống")
    }

    const handleClickDropMenu = (id, typeSave) => {
        setTypeOpen(prevList => [...prevList, id + "-create"])
        setTypeSave(typeSave)
    }


    const updateLetter = () => {
        getCountLetter(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const list = response.data.data
                const totalCount = list.reduce((total, item) => total + Number(item.count || 0), 0);
                setCountLetter(list)
                setTotalLetter(totalCount)
                setTotalItem(totalCount)
            }
        })

        getListLetter(searchFilter).then((response) => {
            responseData(response, setListLetter)
        })
    }

    useEffect(() => {
        if (selected.letterType) {
            setModalId(LetterType.get(Number(selected.letterType)).modal)
            setTypeSave(selected.letterType)
        }
    }, [selected])

    const handleClickNavigate = () => {
        navigate("/manage-letter/letter-detail", { state: { letterId: selected.letterId, letterType: selected.letterType } });
    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                        <button className={`nav-link nav-link-profile ${searchFilter.type === '' ? "active" : ""} `} onClick={() => handleClickNav('', totalItem)}
                                        > Tất cả ({totalItem}) </button>
                                    </li>
                                    {
                                        countLetter.length > 0 && countLetter.map((item, index) => (
                                            <li key={index} className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                                <button className={`nav-link nav-link-profile ${searchFilter.type === item.id ? "active" : ""}`} onClick={() => handleClickNav(item.id, item.count)}
                                                >{item.name + " (" + item.count + ")"} </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
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
                                                    data-bs-target="#create_leave_letter"
                                                    onClick={() => handleClickDropMenu("create_leave_letter", LETTER_TYPE_LEAVE)}
                                                >
                                                    Đơn xin nghỉ
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#create_overtime_letter"
                                                    onClick={() => handleClickDropMenu("create_overtime_letter", LETTER_TYPE_OVERTIME)}
                                                >
                                                    Đơn đăng ký OT
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#create_worktime_letter"
                                                    onClick={() => handleClickDropMenu("create_worktime_letter", LETTER_TYPE_WORKTIME)}
                                                >
                                                    Đơn làm theo chế độ
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#create_checkin_letter"
                                                    onClick={() => handleClickDropMenu("create_checkin_letter", LETTER_TYPE_INOUT)}
                                                >
                                                    Giải trình đi muộn về sớm
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#create_endjob_letter"
                                                    onClick={() => handleClickDropMenu("create_endjob_letter", LETTER_TYPE_END_WORK)}
                                                >
                                                    Đơn thôi việc
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive height-my-table">
                                <div class="table-container">
                                    <table ref={tableRef} class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th class="no-sort">
                                                </th>
                                                <th>Người tạo</th>
                                                <th>Mã NV</th>
                                                <th>Họ và tên</th>
                                                <th>Trạng thái</th>
                                                <th>Loại đơn</th>
                                                <th>Phòng ban </th>
                                                <th>Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {listLetter.length > 0 && listLetter.map((item, index) => (
                                                <tr key={index} onContextMenu={() => setSelected(item)}>
                                                    <td></td>
                                                    <td>{item.createdBy}</td>
                                                    <td>{item.employeeCode}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td><span className={`badge ${item.letterState ? LetterState.get(Number(item.letterState)).bg : ""}`}>{item.letterState ? LetterState.get(Number(item.letterState)).name : ""}</span></td>
                                                    <td>{item.letterType ? LetterType.get(Number(item.letterType)).name : ""}</td>
                                                    <td>{item.department}</td>
                                                    <td>{item.createdAt}</td>
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
                                        const end = Math.min(searchFilter.pageIndex * 12, totalLetter);
                                        return `${start} - ${end}`;
                                    })()} trong {totalLetter} bản ghi</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate mg-top-0">
                                        <ul className="pagination">
                                            <li className={`page-item previous disabled my-center ${searchFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex - 1)) }}>
                                                <i className="ti ti-chevron-left"></i>
                                            </li>
                                            <li className="page-item active "><a className="page-link">{searchFilter.pageIndex}</a></li>
                                            <li className={`page-item next disabled my-center  ${((searchFilter.pageIndex - 1) * 12 + 12) >= totalLetter ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex + 1)) }}>
                                                <i className="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuDecision x={x}
                y={y}
                showMenu={showMenu}
                modalId={modalId}
                setTypeOpen={setTypeOpen}
                state={selected.letterState}
                setTypeApproveOrDelete={setTypeApproveOrDelete}
                handleClickNavigate={handleClickNavigate}
            />

            <ApproveOrDeleteComponent handleClick={handleApproveAndDelete} type={typeApproveOrDelete} />

            <LeaveLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateLetter}
            />

            <OvertimeLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateLetter}
            />

            <WorkTimeLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateLetter}
            />

            <CheckinLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateLetter}
            />

            <EndJobLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={typeSave}
                updateLetter={updateLetter}
            />
        </>
    );
};

export default LetterComponent;

