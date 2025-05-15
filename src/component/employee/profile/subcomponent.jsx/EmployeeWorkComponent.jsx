import React, { useEffect, useState } from 'react';
import { getWorkProcess, getWorkProfile } from '../../../../service/ContractService';
import { responseData, responseData_ReturnInfo } from '../../../../util/ResponseUtil';
import { EmployeeStatus, EmployeeType, PROFILE_WORK } from '../../../../util/EmployeeUtil';
import { calculateWorkingTime, compareDates, convertDate } from '../../../../util/TimeUtil';
import { getOnLeaveProfile } from '../../../../service/OnLeaveService';
import { ContractStatus } from '../../../../util/ContractUtil';
import UpdateOnLeaveComponent from '../update/UpdateOnLeaveComponent';
import Cookies from 'js-cookie';
import { PerManageEmployee } from '../../../../util/PermissionUtil';

const EmployeeWorkComponnent = ({ employeeId, navId }) => {
    //Lay role
    const roleString = Cookies.get('permissions');
    const currentAccountLogin = Cookies.get('employeeId');
    let roles = new Set();

    let isUpdateInfo = false;

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isUpdateInfo = PerManageEmployee.some(role => roles.has(role)) || currentAccountLogin === employeeId
    }

    const [work, setWork] = useState({})
    const [workHistory, setWorkHistory] = useState({})
    const [onLeave, setOnLeave] = useState({})
    const [hasFetched, setHasFetched] = useState(false);
    const [openModal, setOpenModal] = useState([])

    useEffect(() => {
        if (Number(navId) === PROFILE_WORK && !hasFetched) {
            setHasFetched(true);
            getWorkProfile(employeeId).then((response) => {
                responseData_ReturnInfo(response, setWork)
            })

            getOnLeaveProfile(employeeId).then((response) => {
                responseData_ReturnInfo(response, setOnLeave)
            })

            getWorkProcess(employeeId).then((response) => {
                responseData_ReturnInfo(response, setWorkHistory)
            })
        }
    }, [navId])

    const handleOpenModal = (modalId) => {
        setOpenModal([...openModal, modalId]);
    };

    const updateOnLeave = (e) => {
        getOnLeaveProfile(employeeId).then((response) => {
            responseData(response, setOnLeave)
        })
    }

    console.log(onLeave)

    return (
        <>
            <div class="mt-5 tab-pane fade" id="profile-work" role="tabpanel">
                <div class="profile-container">
                    <div class="profile-header">Thông tin công việc</div>
                    <div class="profile-info">
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td><span class={`badge ${work.status ? EmployeeStatus.get(work.status).textType : ""}`}>{work.status ? EmployeeStatus.get(work.status).name : ""}</span></td>
                                    <th>Tình trạng hồ sơ</th>
                                    <td><span class={`badge ${work.type ? EmployeeType.get(work.type).textType : ""}`}>{work.type ? EmployeeType.get(work.type).name : ""}</span></td>
                                </tr>
                                <tr>
                                    <th>Phòng ban</th>
                                    <td>{work.department}</td>
                                    <th>Vị trí</th>
                                    <td>{work.jobPosition}</td>
                                </tr>
                                <tr>
                                    <th>Chức vụ</th>
                                    <td>{work.duty}</td>
                                    <th>Ngày vào</th>
                                    <td>{work.dateJoin && (
                                        <>
                                            {convertDate(work.dateJoin)}
                                            {compareDates(work.dateJoin, new Date().toLocaleDateString()) >= 0 && (
                                                <> - {calculateWorkingTime(work.dateJoin)}</>
                                            )}
                                        </>
                                    )}</td>
                                </tr>
                                <tr>
                                    <th>Ngày ký HĐLĐ</th>
                                    <td>{convertDate(work.dateSign)}</td>
                                    <th>Tên hợp đồng</th>
                                    <td>{work.contractName}</td>
                                </tr>
                                <tr>
                                    <th>Thời gian giữ vị trí hiện tại</th>
                                    <td>{compareDates(work.dateOnBoard, new Date().toISOString().split('T')[0]) !== 1 ?
                                        calculateWorkingTime(work.dateOnBoard) : ''}</td>
                                    <th>Ngạch lương</th>
                                    <td>{work.salaryGross ? Number(work.salaryGross).toLocaleString('vi-VN') + ' VNĐ' : ''}</td>
                                </tr>
                                <tr>
                                    <th>Tài khoản HR.TDSoftware</th>
                                    <td>{work.account}</td>
                                    <th>Nhóm người dùng</th>
                                    <td>{work.role}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-container mt-4">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Thông tin nghỉ phép</div>
                        {
                            isUpdateInfo && (
                                <div className='update-infomation' style={{ marginRight: "10px" }} data-bs-toggle="modal" data-bs-target="#update-onleave"
                                    onClick={() => handleOpenModal("#update-onleave")}>
                                    <i className='ti ti-edit' style={{ fontSize: "25px" }} />
                                </div>
                            )
                        }

                    </div>
                    <div class="profile-info">
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th style={{ width: "25%" }}>Số phép theo quy định</th>
                                    <td>{onLeave.regulaDay ? onLeave.regulaDay.toFixed(2) : ""}</td>
                                    <th style={{ width: "25%" }}>Phép thâm niên</th>
                                    <td>{onLeave.seniorDay ? onLeave.seniorDay.toFixed(2) : ""}</td>

                                </tr>
                                <tr>
                                    <th>Số phép đã nghỉ</th>
                                    <td>{onLeave.usedDay ? onLeave.usedDay.toFixed(2) : ""}</td>
                                    <th>Còn lại</th>
                                    <td>{onLeave.regulaDay > onLeave.usedDay ? (onLeave.regulaDay + onLeave.seniorDay - onLeave.usedDay).toFixed(2) : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Quá trình nhân sự</div>
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th>Từ ngày</th>
                                <th>Trạng thái</th>
                                <th>Phòng ban</th>
                                <th>Vị trí</th>
                                <th>Chức vụ</th>
                                <th>Hợp đồng đã ký</th>
                                <th>Mã HĐ</th>
                            </tr>

                            {workHistory.length > 0 && workHistory.map((item, index) => (
                                <tr>
                                    <td>{item.dateStart}</td>
                                    <td><span class={`badge ${item.status ? ContractStatus.get(item.status).bg : ""}`}>{item.status ? ContractStatus.get(item.status).name : ""}</span></td>
                                    <td>{item.department}</td>
                                    <td>{item.jobPosition}</td>
                                    <td>{item.duty}</td>
                                    <td>{item.contractType}</td>
                                    <td>{item.code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
            <UpdateOnLeaveComponent employeeId={employeeId} onLeave={onLeave} openModal={openModal} updateOnLeave={updateOnLeave} />
        </>
    );
};

export default EmployeeWorkComponnent;