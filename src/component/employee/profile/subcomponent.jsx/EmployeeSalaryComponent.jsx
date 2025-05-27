import React, { useEffect, useRef, useState } from 'react';
import SalaryQuickWatchComponent from '../../crud/SalaryQuickWatchComponent';
import { PROFILE_SALARY } from '../../../../util/EmployeeUtil';
import { getListSalaryEmployee, getSalaryAllowanceEmployee, getSalaryEmployee } from '../../../../service/EmployeeService';
import { responseData } from '../../../../util/ResponseUtil';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { convertMonthText } from '../../../../util/TimeUtil';
import useDoubleClickDetailSalary from '../../../../hooks/useDoubleClickDetailSalary';

const EmployeeSalaryComponent = ({ employeeId, navId }) => {
    const tableRef = useRef(null)
    const { xdb, ydb, showMenudb } = useDoubleClickDetailSalary(tableRef, 600, 357);
    const [salaryEmployee, setSalaryEmployee] = useState([])
    const [open, setOpen] = useState(false);
    const [yearValue, setYearValue] = useState(dayjs());
    const [salaryDetail, setSalaryDetail] = useState("")
    const [isFirst, setIsFirst] = useState(true)

    const [salaryAllowance, setSalaryAllowance] = useState({})

    const [salaryRequest, setSalaryRequest] = useState({
        employeeId: employeeId,
        year: "",
    })

    const handleIconClick = () => {
        setOpen(true);
    };
    const handleYearChange = (date) => {
        if (date) {
            setYearValue(date);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (yearValue.year()) {
            setSalaryRequest({ ...salaryRequest, ["year"]: yearValue.year() })
        }
    }, [yearValue])

    useEffect(() => {
        if (salaryRequest.year && Number(navId) === PROFILE_SALARY) {
            getListSalaryEmployee(salaryRequest.employeeId, salaryRequest.year).then((response) => {
                responseData(response, setSalaryEmployee)
            })
        }

        if (Number(navId) === PROFILE_SALARY && isFirst) {
            setIsFirst(false)
            getSalaryAllowanceEmployee(employeeId).then((response) => {
                responseData(response, setSalaryAllowance)
            })
        }
    }, [salaryRequest, navId])

    return (
        <>
            <div className={`tab-pane fade ${navId === PROFILE_SALARY ? "show active" : ""} `} v id="profile-salary" style={{ margin: "60px 10px 0 10px" }}>
                <div className="row">
                    <div className="col-xl-8 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                                <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 ">
                                    <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                        <ul className="nav ">
                                            <li className="nav-item nav-profile" role="presentation" style={{}}>
                                                <button className="nav-link nav-link-profile active" id="info-tab"
                                                >Lương thực nhân năm {salaryRequest.year}</button>
                                            </li>
                                        </ul>
                                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3 icon-header-2">
                                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", position: "relative" }}
                                                onClick={handleIconClick} >
                                                <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                                <span style={{ whiteSpace: 'nowrap', margin: 0 }}>{yearValue ? yearValue.year() : 'Năm'} </span>
                                                <div style={{ position: 'absolute', top: 0, right: "85px", opacity: 0, pointerEvents: 'none' }}>
                                                    <DatePicker
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                        picker="year"
                                                        value={yearValue}
                                                        onChange={handleYearChange}
                                                        allowClear={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0 height-my-table" ref={tableRef}>
                                <div style={{ padding: "16px" }}>
                                    <div className="row">
                                        {
                                            salaryEmployee.length > 0 && salaryEmployee.map((item, index) => (
                                                <div key={index} className="col-md-3 item-salary-month" onDoubleClick={() => setSalaryDetail(item)}>
                                                    <div className="d-flex flex-column info-detail">
                                                        <label className="form-label">{convertMonthText(item.yearMonth)}</label>
                                                        <div className='content-salary-month'>
                                                            <span className='luong-thuc-nhan'>Lương thực nhận</span>
                                                            <span>{Number(item.salary).toLocaleString('vi-VN')} VNĐ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                    <h6>Lương và phụ cấp</h6>
                                </div>
                            </div>
                            <div className="card-body schedule-timeline activity-timeline">
                                <div className="d-flex align-items-start">
                                    <div className="avatar avatar-md avatar-rounded bg-info flex-shrink-0 dots-history">
                                    </div>
                                    <div className="flex-fill ps-3 pb-4 timeline-flow content-history">
                                        <div style={{ marginLeft: "15px" }}>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <p className="fw-medium text-gray-9 mb-1">Lương cơ bản</p>
                                                <p className="fw-medium text-gray-9 mb-1">{Number(salaryAllowance.salaryGross).toLocaleString("vi-VN")} VNĐ</p>
                                            </div>
                                            {salaryAllowance.allowances && salaryAllowance.allowances.length > 0 && salaryAllowance.allowances.map((item, index) => (
                                                <div className='d-flex align-items-center justify-content-between' style={{ marginLeft: "5px" }}>
                                                    <p className="fw-medium text-gray-9 mb-1">{item.name}</p>
                                                    <p className="fw-medium text-gray-9 mb-1">{item.amount !== 0 && (Number(item.amount).toLocaleString("vi-VN") + "VNĐ / " + item.unit)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SalaryQuickWatchComponent x={xdb} y={ydb} showMenu={showMenudb} id={salaryDetail.salaryDetailId} yearMonth={salaryDetail.yearMonth} />
        </>
    );
};

export default EmployeeSalaryComponent;

