import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import LeaveLetterComponent from './crud/LeaveLetterComponent';
import { deleteLetter } from '../../service/LetterService';
import { approvalLetter, getCountLetter, noApprovalLetter, getListLetter } from '../../service/Manage/ManageLetterService';
import { responseData } from '../../util/ResponseUtil';
import { updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import { LetterState, LetterType } from '../../util/LetterUtil';
import ContextMenuDecision from '../../contextmenu/ContextMenuDecisionAndLetter';
import { APPROVE, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';
import { toast } from 'react-toastify';
import WorkTimeLetterComponent from './crud/WorkTimeLetterComponent';
import OvertimeLetterComponent from './crud/OvertimeLetterComponent';
import EndJobLetterComponent from './crud/EndJobLetterComponent';
import CheckinLetterComponent from './crud/CheckinLetterComponent';
import Cookies from 'js-cookie';
import { PerManageLetter } from '../../util/PermissionUtil';
import DetailLetterComponent from './DetailLetterComponent';
import ApproveOrDeleteComponent from '../customer/ApproveOrDeleteComponent';
import { convertDate } from '../../util/TimeUtil';
const ManageLetterComponent = () => {
    //lay role
    const roleString = Cookies.get('permissions');
    let roles = new Set();
    let isManage = false;
    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isManage = PerManageLetter.some((role) => roles.has(role))
    }

    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách đơn từ", subTitle: "" }))
    const searchFilter = useSelector((state) => state.searchFilter)
    const element = document.getElementById("contextMenuDecision")
    if (element) {
        var width = element.offsetWidth
        var height = element.offsetHeight
    }
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, width, height);
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
            title = "Đã duyệt đơn từ!"
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

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
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
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive height-my-table">
                                <div className="table-container">
                                    <table ref={tableRef} className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="no-sort">
                                                </th>
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
                                                <tr key={index} onContextMenu={() => setSelected(item)} >
                                                    <td></td>
                                                    <td>{item.employeeCode}</td>
                                                    <td>{item.employeeName}</td>
                                                    <td><span className={`badge ${item.letterState ? LetterState.get(Number(item.letterState)).bg : ""}`}>{item.letterState ? LetterState.get(Number(item.letterState)).name : ""}</span></td>
                                                    <td>{item.letterType ? LetterType.get(Number(item.letterType)).name : ""}</td>
                                                    <td>{item.department}</td>
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
            </div >

            <ContextMenuDecision x={x}
                y={y}
                showMenu={showMenu}
                modalId={modalId}
                setTypeOpen={setTypeOpen}
                state={selected.letterState}
                setTypeApproveOrDelete={setTypeApproveOrDelete}
                isManage={isManage}
                modalDetail={"letter_detail"}
            />

            <DetailLetterComponent
                letterId={selected.letterId}
                letterType={Number(selected.letterType)}
                setTypeApproveOrDelete={setTypeApproveOrDelete}
                typeOpen={typeOpen}
                setTypeOpen={setTypeOpen}
                isManage={isManage}
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

export default ManageLetterComponent;

