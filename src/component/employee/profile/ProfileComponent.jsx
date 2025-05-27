import { useEffect, useState } from 'react';
import '../css/profile.css';
import ResumeComponent from './subcomponent.jsx/ResumeComponent';
import EmployeeWorkComponnent from './subcomponent.jsx/EmployeeWorkComponent';
import EmployeeContractComponent from './subcomponent.jsx/EmployeeContractComponent';
import EmployeeSalaryComponent from './subcomponent.jsx/EmployeeSalaryComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFile } from '../../../service/MinIOService';
import { PROFILE_CONTRACT, PROFILE_RESUME, PROFILE_SALARY, PROFILE_WORK } from '../../../util/EmployeeUtil';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import Cookies from 'js-cookie';
import { PerWatchContract, PerWatchEmployee, PerWatchSalary } from '../../../util/PermissionUtil';
const ProfileComponnent = () => {
    // lấy permission 
    const roleString = Cookies.get('permissions');
    let roles = new Set();
    const currentEmployeeId = Cookies.get('employeeId');

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
    }

    const location = useLocation();
    const employeeId = location.state?.employeeId || "";
    const employeeName = location.state?.employeeName || "";
    const navItem = location.state?.navItem || "";
    const [navId, setNavId] = useState()

    useEffect(() => {
        if (navItem)
            setNavId(navItem)
    }, [navItem])

    const [imageCache, setImageCache] = useState(new Map());
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Hồ sơ nhân sự", subTitle: employeeName }))

    const handleClickNav = (e) => {
        const value = e.target.value
        setNavId(value)
    }

    const handleGetFile = async (fileName) => {
        if (imageCache.has(fileName)) {
            return imageCache.get(fileName)
        } else {
            if (fileName) {
                const response = await getFile(fileName);
                if (response.status === 200) {
                    const avatarBlob = response.data
                    setImageCache(prev => {
                        const newCache = new Map(prev);
                        newCache.set(fileName, avatarBlob);
                        return newCache;
                    });
                    return avatarBlob
                }
            }
        }
    }

    return (
        <>
            <div className='page-wrapper' style={{ position: "static" }}>
                < div className="header" style={{ marginTop: "55px", height: "55px", background: "#f8f9fa", zIndex: 10 }} >
                    <div className="main-header">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                                <ul className="nav ">
                                    {(PerWatchEmployee.some(role => roles.has(role)) || currentEmployeeId === employeeId) && (
                                        <>
                                            <li className="nav-item nav-profile" role="presentation" >
                                                <button className={`nav-link nav-link-profile ${navId === PROFILE_RESUME ? "active" : ""}`} id="info-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile-resume" value={PROFILE_RESUME} onClick={handleClickNav}> Sơ yếu lý lịch</button>
                                            </li>
                                            <li className="nav-item nav-profile" role="presentation">
                                                <button className={`nav-link nav-link-profile ${navId === PROFILE_WORK ? "active" : ""}`} id="address-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile-work" value={PROFILE_WORK} onClick={handleClickNav}>Công việc</button>
                                            </li>
                                        </>
                                    )}
                                    {(PerWatchContract.some(role => roles.has(role)) || currentEmployeeId === employeeId) && (
                                        <li className="nav-item" role="presentation">
                                            <button className={`nav-link nav-link-profile ${navId === PROFILE_CONTRACT ? "active" : ""}`} id="address-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile-contract" value={PROFILE_CONTRACT} onClick={handleClickNav}>Hợp đồng</button>
                                        </li>
                                    )}

                                    {
                                        (PerWatchSalary.some(role => roles.has(role)) || currentEmployeeId === employeeId) && (
                                            <li className="nav-item" role="presentation">
                                                <button className={`nav-link nav-link-profile ${navId === PROFILE_SALARY ? "active" : ""}`} id="address-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile-salary" value={PROFILE_SALARY} onClick={handleClickNav}>Lương & Phụ cấp</button>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="tab-content" id="myTabContent">
                    <ResumeComponent employeeId={employeeId} navId={navId} handleGetFile={handleGetFile} />
                    <EmployeeWorkComponnent employeeId={employeeId} navId={navId} />
                    <EmployeeContractComponent employeeId={employeeId} navId={navId} />
                    <EmployeeSalaryComponent employeeId={employeeId} navId={navId} />
                </div>
            </div >
        </>
    );
};

export default ProfileComponnent;

