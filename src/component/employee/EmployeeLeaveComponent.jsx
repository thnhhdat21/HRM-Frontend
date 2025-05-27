import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { getOnLeaveProfile } from '../../service/OnLeaveService';
import { responseData } from '../../util/ResponseUtil';
import { getListLeaveLetter } from '../../service/EmployeeService';
import { convertDate, convertLeaveDayToText, formatDateTime } from '../../util/TimeUtil';
import { LETTER_TYPE_LEAVE, LetterState } from '../../util/LetterUtil';
import LeaveLetterComponent from '../letter/crud/LeaveLetterComponent';
import ContextMenuEmployeeTwoItem from '../../contextmenu/ContextMenuEmployeeTwoItem';
import { DELETE } from '../../util/ApproveOrDeleteUtil';
import { deleteLetter } from '../../service/LetterService';
import ApproveOrDeleteComponent from '../customer/ApproveOrDeleteComponent';
import Cookies from 'js-cookie';

const EmployeeLeaveComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 200, 82);
    const [onLeave, setOnLeave] = useState({})
    const [listLeave, setListLeave] = useState([])
    const [typeOpen, setTypeOpen] = useState([])
    const [selected, setSelected] = useState("")
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách nghỉ", subTitle: "" }))
    const employeeId = Cookies.get('employeeId')
    useEffect(() => {
        getOnLeaveProfile(employeeId).then((response) => {
            responseData(response, setOnLeave)
        })
        getListLeaveLetter(employeeId).then((response) => {
            responseData(response, setListLeave)
        })
    }, [])

    const handleClickDropMenu = (id) => {
        setTypeOpen(prevList => [...prevList, id + "-create"])
    }

    const update = (e) => {
        getOnLeaveProfile(employeeId).then((response) => {
            responseData(response, setOnLeave)
        })

        getListLeaveLetter(employeeId).then((response) => {
            responseData(response, setListLeave)
        })
    }

    const hanleClickDelete = () => {
        deleteLetter(selected.letterId).then((response) => {
            if (response.data.code === 1000) {
                update()
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div>
                                <h6>THÔNG TIN NGHỈ PHÉP</h6>
                                <table className="table list-on-leave text-black">
                                    <tbody>
                                        <tr >
                                            <td>Phép năm:</td>
                                            <td>{onLeave.regulaDay}</td>
                                            <td>Phép thâm niên:</td>
                                            <td>{onLeave.seniorDay}</td>
                                        </tr>
                                        <tr>
                                            <td>Đã sử dụng</td>
                                            <td>{onLeave.usedDay}</td>
                                            <td className='strong-timekeeping text-black'>Phép còn lại:</td>
                                            <td className='strong-timekeeping text-black'>{
                                                (Number(onLeave.usedDay) !== 0
                                                    ? (Number(onLeave.regulaDay) + Number(onLeave.seniorDay) - Number(onLeave.usedDay))
                                                    : 0)
                                            }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div style={{ marginBottom: "10px" }} className='d-flex align-items-center justify-content-center'>
                                <a href="#" className="btn btn-danger d-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#create_leave_letter"
                                    onClick={() => handleClickDropMenu("create_leave_letter")}
                                >
                                    Đăng ký nghỉ
                                </a>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table borderless table-timekeeping-employee">
                                <thead>
                                    <tr>
                                        <th style={{ width: "15%" }}>Ngày đăng ký / Lý do</th>
                                        <th>Thông tin chi tiết</th>
                                        <th>Người duyệt (Chờ)</th>
                                    </tr>
                                </thead>
                                <tbody ref={tableRef}>
                                    {listLeave.length > 0 && listLeave.map((item, index) => (
                                        <tr key={index} onContextMenu={() => setSelected(item)}>
                                            <td className="align-top text-center" style={{ padding: "10px" }}>
                                                <div className="timekeeping-items d-flex flex-column">
                                                    <span style={{ padding: 0 }} className='reason-leave'>{item.workdayEnabled === true ? "Nghỉ phép " + convertLeaveDayToText(item.total) : "Nghỉ không lương"}</span>
                                                    <span style={{ color: "#787676  ", fontWeight: 400, padding: 0 }}>{convertDate(item.dateRegis)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='work-time' style={{ paddingTop: "5px" }}>
                                                    <span>Từ ngày:</span>
                                                    <span className='strong-timekeeping'>{formatDateTime(item.dateStart)}</span>
                                                    <span>- Tới ngày:</span>
                                                    <span className='strong-timekeeping'>{formatDateTime(item.dateEnd)}</span>
                                                </div>
                                                <div className='work-time'>
                                                    <span>Số ngày nghỉ:</span>
                                                    <span >{item.total && item.total.toFixed(2)}</span>
                                                </div>
                                                <div className='work-time'>
                                                    <span>Lý do nghỉ: </span>
                                                    <span className='strong-timekeeping'>{item.letterReason}</span>
                                                    <span>{item.description}</span>
                                                </div>
                                                <div className='work-time' style={{ paddingBottom: "5px" }}>
                                                    <span className={`text-white badge ${item.letterState ? LetterState.get(Number(item.letterState)).bg : ""}`}>{item.letterState ? LetterState.get(Number(item.letterState)).name : ""}</span>
                                                </div>
                                            </td>
                                            <td>
                                                {/* <div className='time-checked'>
                                                    <span>08:13:17</span>
                                                    <span className='strong'>15:58:17</span>
                                                </div>
                                                <div className='registered-time'>
                                                    <span>Đăng ký: |</span>
                                                    <span><strong>X</strong></span>
                                                </div> */}
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >

            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={hanleClickDelete}
            />

            <ContextMenuEmployeeTwoItem
                x={x}
                y={y}
                showMenu={showMenu}
                modalId={"create_leave_letter"}
                setTypeOpen={setTypeOpen}
                state={selected.letterState}
            />

            <LeaveLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={LETTER_TYPE_LEAVE}
                updateLetter={update}
            />
        </>
    );
};

export default EmployeeLeaveComponent;

