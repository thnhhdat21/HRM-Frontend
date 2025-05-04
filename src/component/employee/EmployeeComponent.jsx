import React, { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuEmployee from '../../contextmenu/ContextMenuEmployee';
import { Link } from 'react-router-dom';
import { responseData } from '../../util/ResponseUtil';
import { getCountEmployee, getListEmployee } from '../../service/ManageEmployeeService';
import EmployeeOfDepartment from './component/EmployeeOfDeparment';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import DeparmentFilterComponent from './component/DeparmentFilterComponent';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import UpdateEducationComponent from './profile/update/UpdateEducationComponent';
import { getEducationProfile } from '../../service/EducationService';
import { getFamilyOfEmployee } from '../../service/FamilyService';
import UpdateFamilyComponent from './profile/update/UpdateFamilyComponent';
import UpdateResumeComponent from './profile/update/UpdateResumeComponent';
import { getResumeProfile } from '../../service/EmployeeService';
import UpdateRewardAndPenaltyComponent from './crud/UpdateRewardAndPenaltyComponent';
import CreateContractComponent from './crud/CreateContractComponent';
import { activeAccount, lockAccount, unlockAccount } from '../../service/AccountService';
import { toast } from 'react-toastify';

const EmployeeComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 215, 360);
    const searchFilter = useSelector((state) => state.searchFilter)
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách nhân sự", subTitle: "" }))
    const [totalDecision, setTotalDecision] = useState(0) // hiển thị phân trang
    const [mapCountType, setMapCountType] = useState(new Map())
    const [listEmployee, setListEmployee] = useState([])
    const [typeOpen, setTypeOpen] = useState([])

    const [infoEmployee, setInfoEmployee] = useState({
        employeeId: 0,
        employeeName: "",
        department: "",
        accountStatus: 0,
        accountId: 0
    })

    //update
    const [education, setEducation] = useState([])
    const [family, setFamily] = useState([])
    const [resume, setResume] = useState([])


    useEffect(() => {
        getCountEmployee(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const listItem = response.data.data
                const map = new Map()
                listItem.map((item) => map.set(item.type, item.count))
                setMapCountType(map)
                const totalCount = listItem.reduce((total, item) => total + Number(item.count || 0), 0);
                setTotalDecision(totalCount)
            }
        })
    }, [
        searchFilter.status,
        searchFilter.name,
        JSON.stringify(searchFilter.department || []),
        JSON.stringify(searchFilter.jobPosition || []),
        JSON.stringify(searchFilter.duty || []),
        searchFilter.dateJoin || ''
    ])

    useEffect(() => {
        getListEmployee(searchFilter).then((response) => {
            responseData(response, setListEmployee)
        })
    }, [searchFilter])

    const onChangeType = (e, count) => {
        dispatch(updateTypeFilter(e.target.value))
        dispatch(updatePageIndexFilter(1))
        setTotalDecision(count)
    }

    //handle click update
    const hanleClickUpdateEdu = () => {
        getEducationProfile(infoEmployee.employeeId).then((response) => {
            responseData(response, setEducation)
        });
    }

    const hanleClickUpdateFamily = () => {
        getFamilyOfEmployee(infoEmployee.employeeId).then((response) => {
            responseData(response, setFamily)
        });
    }

    const handleClickUpdateResume = () => {
        getResumeProfile(infoEmployee.employeeId).then((response) => {
            responseData(response, setResume)
        });
    }

    const updateListEmplyee = () => {
        getListEmployee(searchFilter).then((response) => {
            responseData(response, setListEmployee)
        })
    }

    const handleClickUpdateAccount = async () => {
        let isCorrect = true;
        let title = "";
        let response;
        if (infoEmployee.accountStatus === 1) {
            response = await lockAccount(infoEmployee.accountId);
            if (response.data.code === 1000) {
                title = "Khóa tài khoản thành công!";
            } else {
                isCorrect = false;
            }
        } else if (infoEmployee.accountStatus === 2) {
            response = await activeAccount(infoEmployee.accountId);
            if (response.data.code === 1000) {
                title = "Kích hoạt tài khoản thành công!";
            } else {
                isCorrect = false;
            }
        } else if (infoEmployee.accountStatus === 3) {
            response = await unlockAccount(infoEmployee.accountId);
            if (response.data.code === 1000) {
                title = "Mở khóa tài khoản thành công!";
            } else {
                isCorrect = false;
            }
        }

        if (isCorrect) {
            toast.success(title);
            const listResponse = await getListEmployee(searchFilter);
            responseData(listResponse, setListEmployee);
        }
    }
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "10px" }}>
                                        <button class={`nav-link nav-link-profile ${searchFilter.type === '' ? "active" : ""}`}
                                            data-bs-target="#setting-asset-group" name='type' value={null} onClick={(e) => onChangeType(e, (mapCountType.get(1) + mapCountType.get(2)))}>Tất cả ({(mapCountType.get(1) + mapCountType.get(2)) || 0})</button>
                                    </li>
                                    {searchFilter.status !== '3' && (
                                        <>
                                            <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "10px" }}>
                                                <button class={`nav-link nav-link-profile ${searchFilter.type === '1' ? "active" : ""}`}
                                                    data-bs-target="#setting-asset-group" name='type' value={1} onClick={(e) => onChangeType(e, mapCountType.get(1))}>Thử việc ({mapCountType.get(1) || 0})</button>
                                            </li>
                                            <li class="nav-item" role="presentation" style={{ marginRight: "10px" }}>
                                                <button class={`nav-link nav-link-profile ${searchFilter.type === '2' ? "active" : ""}`}
                                                    data-bs-target="#setting-asset-unit" name='type' value={2} onClick={(e) => onChangeType(e, mapCountType.get(2))}>Chính thức ({mapCountType.get(2) || 0})</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div className="d-flex flex-column align-items-center nav-item department-filter"
                                    style={{ fontSize: "13px", marginLeft: "30px", fontWeight: 500 }}
                                    data-bs-toggle="modal" data-bs-target="#department-filter"
                                    onClick={() => setTypeOpen([...typeOpen, "departmentFilter"])}>
                                    <i className='fe fe-layers' />
                                    <span>Phòng ban</span>
                                </div>
                                <div class="mb-2 dropdown profile-dropdown" style={{ marginLeft: "20px" }}>
                                    <Link to={"/manage-employee/create-employee"} class="btn btn-danger d-flex align-items-center" >
                                        <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <div class="grid-list-employee header-payroll" style={{ backgroundColor: "#e5e7eb" }}>
                                        <span></span>
                                        <span>Mã NS</span>
                                        <span>Họ và tên</span>
                                        <span>Phòng ban</span>
                                        <span>Vị trí</span>
                                        <span>Chức vụ</span>
                                        <span>Ngày vào</span>
                                        <span>Ngày sinh</span>
                                        <span>Giới tính</span>
                                    </div >
                                    <div ref={tableRef}>
                                        {
                                            listEmployee.length > 0 && listEmployee.map((item, index) => (
                                                <EmployeeOfDepartment
                                                    explorer={item}
                                                    setInfoEmployee={setInfoEmployee} />
                                            ))
                                        }
                                    </div>
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
            </div>

            <ContextMenuEmployee x={x}
                y={y}
                showMenu={showMenu}
                infoEmployee={infoEmployee}
                setTypeOpen={setTypeOpen}
                hanleClickUpdateEdu={hanleClickUpdateEdu}
                hanleClickUpdateFamily={hanleClickUpdateFamily}
                handleClickUpdateResume={handleClickUpdateResume}
                handleClickUpdateAccount={handleClickUpdateAccount}
            />

            <CreateContractComponent
                employeeId={infoEmployee.employeeId}
                typeOpen={typeOpen}
                updateListEmplyee={updateListEmplyee} />

            <UpdateRewardAndPenaltyComponent
                employeeId={infoEmployee.employeeId}
                openModal={["#update-reward-penalty"]}
                typeOpen={typeOpen}
            />

            <DeparmentFilterComponent typeOpen={typeOpen} />

            <UpdateResumeComponent
                resume={resume}
                openModal={["#update-resume"]}
                updateListEmplyee={updateListEmplyee}
            />

            <UpdateFamilyComponent
                employeeId={infoEmployee.employeeId}
                family={family}
                openModal={["#update-family"]}
                updateFamily={null} />


            <UpdateEducationComponent
                employeeId={infoEmployee.employeeId}
                education={education}
                openModal={["#update-education"]}
                updateEducation={null} />
        </>
    );
};

export default EmployeeComponent;


