import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNameFilter, updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import FilterSearchComponent from './FilterSearchComponent';
import { pathPermissionList } from '../../util/LeftMenuUtil';
import Cookies from 'js-cookie';

const HeaderComponnent = ({ setting }) => {
    const [openFilter, setOpenFilter] = useState(false)
    const dispatch = useDispatch()
    const searchFilter = useSelector((state) => state.searchFilter)
    const titleHeader = useSelector((state) => state.titleHeader)
    const [valueName, setValueName] = useState("")

    const roleString = Cookies.get('permissions');
    let roles = new Set();

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
    }

    useEffect(() => {
        setValueName(searchFilter.name)
    }, [searchFilter.name])

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            if (valueName.trim().length > 0) {
                dispatch(updatePageIndexFilter(1))
                dispatch(updateTypeFilter(''))
                dispatch(updateNameFilter(valueName))
            }
        }
    }

    const handleOnchangeSearch = (e) => {
        const value = e.target.value;
        setValueName(value)
        if (!value) {
            dispatch(updateNameFilter(''))
        }
    }

    const searching = () => {
        if (searchFilter.name !== '' ||
            searchFilter.dateJoin !== '' ||
            searchFilter.department.length > 0 ||
            searchFilter.jobPosition.length > 0 ||
            searchFilter.duty.length > 0
        )
            return true
        return false
    }

    return (
        <>
            <div className={`${setting ? 'setting-header' : ''} header`}>
                <div className="main-header">
                    <div className="header-user">
                        <div className="nav user-menu nav-list">
                            <div className="me-auto d-flex align-items-center" id="header-search">
                                {
                                    setting === 1 ? (<a href={null} className="logo logo-normal">
                                        <img src="/assets/logo/logo.png" alt="Logo" style={{ width: "200px", height: "50px" }} />
                                    </a>) : (<a id="toggle_btn" href={null} className="btn btn-menubar me-1">
                                        <i className="ti ti-arrow-bar-to-left"></i>
                                    </a>)
                                }
                                <div style={{ marginLeft: setting === 1 ? "15px" : "" }}>
                                    <h2>{setting === 1 ? "Cài đặt hệ thống" : titleHeader.title} <span className={`${titleHeader.subTitle ? "strong" : "hidden"}`}>{"/ " + titleHeader.subTitle}</span></h2>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="input-group input-group-flat d-inline-flex me-1">
                                    <span className="input-icon-addon">
                                        <i className="ti ti-search"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Tìm kiếm tên nhân sự" onKeyDown={handleEnterSearch} onChange={handleOnchangeSearch} value={valueName} />
                                    <div className="btn-menubar filter-search"
                                        data-bs-toggle="modal" data-bs-target="#search-filter"
                                        onClick={() => setOpenFilter(true)}
                                    >
                                        <i className='fa fa-sliders-h' />
                                        {searching() && <span className="notification-status-dot-filter"></span>}
                                    </div>
                                </div>
                                <div className="me-1">
                                    {
                                        roles.has('ADMIN') && (<Link to="/settings/account" className="btn btn-menubar">
                                            <i className="ti ti-settings-cog" />
                                        </Link>)
                                    }

                                </div>
                                <div className="dropdown me-1">
                                    {
                                        (() => {
                                            const item = pathPermissionList.find(item =>
                                                item.permissions && item.permissions.some(role => roles.has(role))
                                            );
                                            return item && (
                                                <Link to={item.path} className="btn btn-menubar">
                                                    <i className="ti ti-layout-grid-remove"></i>
                                                </Link>
                                            );
                                        })()
                                    }
                                </div>

                                <div className="me-1 notification_item">
                                    <a href="#" className="btn btn-menubar position-relative me-1" id="notification_popup"
                                        data-bs-toggle="dropdown">
                                        <i className="ti ti-bell"></i>
                                        <span className="notification-status-dot"></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end notification-dropdown p-4">
                                        <div className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                                            <h4 className="notification-title">Notifications (2)</h4>
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="text-primary fs-15 me-3 lh-1">Mark all as read</a>
                                                <div className="dropdown">
                                                    <a href="javascript:void(0);" className="bg-white dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i className="ti ti-calendar-due me-1"></i>Today
                                                    </a>
                                                    <ul className="dropdown-menu mt-2 p-3">
                                                        <li>
                                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                                This Week
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                                Last Week
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">
                                                                Last Month
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="noti-content">
                                            <div className="d-flex flex-column">
                                                <div className="border-bottom mb-3 pb-3">
                                                    <a href="activity.html">
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                                <img src="/assets/img/profiles/avatar-27.jpg" alt="Profile" />
                                                            </span>
                                                            <div className="flex-grow-1">
                                                                <p className="mb-1"><span
                                                                    className="text-dark fw-semibold">Shawn</span>
                                                                    performance in Math is below the threshold.</p>
                                                                <span>Just Now</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="border-bottom mb-3 pb-3">
                                                    <a href="activity.html" className="pb-0">
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                                <img src="/assets/img/profiles/avatar-23.jpg" alt="Profile" />
                                                            </span>
                                                            <div className="flex-grow-1">
                                                                <p className="mb-1"><span
                                                                    className="text-dark fw-semibold">Sylvia</span> added
                                                                    appointment on 02:00 PM</p>
                                                                <span>10 mins ago</span>
                                                                <div
                                                                    className="d-flex justify-content-start align-items-center mt-1">
                                                                    <span className="btn btn-light btn-sm me-2">Deny</span>
                                                                    <span className="btn btn-primary btn-sm">Approve</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="border-bottom mb-3 pb-3">
                                                    <a href="activity.html">
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                                <img src="/assets/img/profiles/avatar-25.jpg" alt="Profile" />
                                                            </span>
                                                            <div className="flex-grow-1">
                                                                <p className="mb-1">New student record <span className="text-dark fw-semibold"> George</span> is created by <span className="text-dark fw-semibold">Teressa</span></p>
                                                                <span>2 hrs ago</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="border-0 mb-3 pb-0">
                                                    <a href="activity.html">
                                                        <div className="d-flex">
                                                            <span className="avatar avatar-lg me-2 flex-shrink-0">
                                                                <img src="/assets/img/profiles/avatar-01.jpg" alt="Profile" />
                                                            </span>
                                                            <div className="flex-grow-1">
                                                                <p className="mb-1">A new teacher record for <span className="text-dark fw-semibold">Elisa</span> </p>
                                                                <span>09:45 AM</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex p-0">
                                            <a href="#" className="btn btn-light w-100 me-2">Cancel</a>
                                            <a href="activity.html" className="btn btn-primary w-100">View All</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="dropdown profile-dropdown">
                                    <a href="#" className="dropdown-toggle d-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        <span className="avatar avatar-sm online">
                                            <img src="/assets/img/profiles/avatar-12.jpg" alt="Img" className="img-fluid rounded-circle" />
                                        </span>
                                    </a>
                                    <div className="dropdown-menu shadow-none">
                                        <div className="card mb-0">
                                            <div className="card-header">
                                                <div className="d-flex align-items-center">
                                                    <span className="avatar avatar-lg me-2 avatar-rounded">
                                                        <img src="/assets/img/profiles/avatar-12.jpg" alt="img" />
                                                    </span>
                                                    <div>
                                                        <h5 className="mb-0">Kevin Larry</h5>
                                                        <p className="fs-12 fw-medium mb-0"><a href="https://smarthr.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="9ee9ffececfbf0defbe6fff3eef2fbb0fdf1f3">[email&#160;protected]</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="profile.html">
                                                    <i className="ti ti-user-circle me-1"></i>My Profile
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="bussiness-settings.html">
                                                    <i className="ti ti-settings me-1"></i>Settings
                                                </a>

                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="profile-settings.html">
                                                    <i className="ti ti-circle-arrow-up me-1"></i>My Account
                                                </a>
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="knowledgebase.html">
                                                    <i className="ti ti-question-mark me-1"></i>Knowledge Base
                                                </a>
                                            </div>
                                            <div className="card-footer">
                                                <a className="dropdown-item d-inline-flex align-items-center p-0 py-2" href="login.html">
                                                    <i className="ti ti-login me-2"></i>Logout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <FilterSearchComponent typeOpen={openFilter} />
        </>
    );
};

export default HeaderComponnent;

