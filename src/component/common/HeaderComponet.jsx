import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNameFilter, updatePageIndexFilter, updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import FilterSearchComponent from './FilterSearchComponent';
import { pathPermissionList } from '../../util/LeftMenuUtil';
import Cookies from 'js-cookie';
import AvartarComponent from './AvartarComponent';

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
                                <AvartarComponent />
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

