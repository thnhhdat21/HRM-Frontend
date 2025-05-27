import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import OvertimeLetterComponent from '../letter/crud/OvertimeLetterComponent';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { getListOverTimeLetter } from '../../service/EmployeeService';
import { responseData } from '../../util/ResponseUtil';
import { deleteLetter } from '../../service/LetterService';
import { convertDate, getDayOnWeek } from '../../util/TimeUtil';
import { LETTER_TYPE_OVERTIME, LetterState } from '../../util/LetterUtil';
import ContextMenuEmployeeTwoItem from '../../contextmenu/ContextMenuEmployeeTwoItem';
import { DELETE } from '../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../customer/ApproveOrDeleteComponent';
import Cookies from 'js-cookie';


const EmployeeOTComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 200, 82);
    const [listOvertime, setListOvertime] = useState([])
    const [typeOpen, setTypeOpen] = useState([])
    const [selected, setSelected] = useState("")
    const dispatch = useDispatch()
    dispatch(updateTitleHeader({ title: "Danh sách tăng ca", subTitle: "" }))
    const employeeId = Cookies.get('employeeId')

    useEffect(() => {
        getListOverTimeLetter(employeeId).then((response) => {
            responseData(response, setListOvertime)
        })
    }, [])

    const handleClickDropMenu = (id) => {
        setTypeOpen(prevList => [...prevList, id + "-create"])
    }

    const update = (e) => {
        getListOverTimeLetter().then((response) => {
            responseData(response, setListOvertime)
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
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div style={{ marginBottom: "10px" }} className='d-flex align-items-center justify-content-center'>
                                <a href="#" className="btn btn-danger d-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#create_overtime_letter"
                                    onClick={() => handleClickDropMenu("create_overtime_letter")}
                                >
                                    <i className="ti ti-clock" style={{ fontSize: "20px", marginRight: "5px" }} />
                                    Đăng ký OT
                                </a>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <table className="table borderless table-timekeeping-employee">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>Ngày</th>
                                        <th>Đăng ký</th>
                                        <th>Người duyệt (Chờ)</th>
                                    </tr>
                                </thead>
                                <tbody ref={tableRef}>
                                    {listOvertime.length > 0 && listOvertime.map((item, index) => (
                                        <tr key={index} onContextMenu={() => setSelected(item)}>
                                            <td>
                                                <div className="timekeeping-items">
                                                    <span>{getDayOnWeek(item.dateRegis)}</span>
                                                    <span>{convertDate(item.dateRegis)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='work-time'>
                                                    <span className='strong-timekeeping'>Ngày đăng ký: {convertDate(item.dateRegis)}</span>
                                                </div>
                                                <div className='work-time'>
                                                    <span>Từ thời gian:</span>
                                                    <span className='strong-timekeeping'>{item.timeStart}</span>
                                                    <span>- Tới thời gian:</span>
                                                    <span className='strong-timekeeping'>{item.timeEnd}</span>
                                                </div>
                                                <div className='work-time'>
                                                    <span>Lý do tăng ca: </span>
                                                    <span className='strong-timekeeping'>{item.letterReason}</span>
                                                    <span>{item.description}</span>
                                                </div>
                                                <div className='work-time'>
                                                    <span className={`badge text-white ${item.letterState ? LetterState.get(Number(item.letterState)).bg : ""}`}>{item.letterState ? LetterState.get(Number(item.letterState)).name : ""}</span>
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
            </div>
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={hanleClickDelete}
            />

            <ContextMenuEmployeeTwoItem
                x={x}
                y={y}
                showMenu={showMenu}
                modalId={"create_overtime_letter"}
                setTypeOpen={setTypeOpen}
                state={selected.letterState}
            />

            <OvertimeLetterComponent
                letterId={selected.letterId}
                typeOpen={typeOpen}
                type={LETTER_TYPE_OVERTIME}
                updateLetter={update}
                employeeId={employeeId}
            />
        </>
    );
};

export default EmployeeOTComponent;

