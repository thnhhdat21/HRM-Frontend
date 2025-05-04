import React, { useEffect, useState } from 'react';
import { mapPathId, menuEmployeeManage, menuEmployeePersonal, menuObjectSetting } from '../../util/LeftMenuUtil';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSearchFilter, updateStatusFilter, updateStatusFilterByContract } from '../../redux/slice/SearchFilterSlice';

const LeftMenuComponnent = () => {
    const location = useLocation();
    const [leftMenu, setLeftMenu] = useState([])
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.startsWith("/personal")) {
            setLeftMenu(menuEmployeePersonal);
        } else if (location.pathname.startsWith("/settings")) {
            setLeftMenu(menuObjectSetting)
        } else {
            setLeftMenu(menuEmployeeManage);
        }
        setSelectedMenu(location.pathname)
    }, [location.pathname]);

    useEffect(() => {
        setActiveMenu(location.pathname)
        setActiveSubMenu(mapPathId.get(location.pathname))
    }, [leftMenu]);


    function handleMenuClick(item, e) {
        e.preventDefault();
        if (item.child && item.child.length > 0) {
            e.preventDefault();
            setActiveMenu((prev) => (prev === item.path ? null : item.path));
        } else {
            setActiveSubMenu(null)
            setActiveMenu(item.path);
            navigate(item.path);
        }
    }

    const handleSubMenuClick = (item, e) => {
        e.preventDefault();
        setActiveSubMenu(item.id);
        dispatch(resetSearchFilter())
        dispatch(updateStatusFilter(item.status))
        navigate(item.path);
    };


    return (
        <>
            <div className="sidebar test" id="sidebar">
                <div className="sidebar-logo">
                    <a href="index.html" className="logo logo-normal">
                        <img src="/assets/logo/logo.png" alt="Logo" style={{ width: "200px", height: "50px" }} />
                    </a>
                    <a href="index.html" className="logo-small">
                        <img src="/assets/logo/logo-small.png" alt="Logo" style={{ width: "140px", height: "38px" }} />
                    </a>
                </div>
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li>
                                <ul>
                                    {
                                        leftMenu.length > 0 && leftMenu.map((item, index) => {
                                            return (
                                                < li key={index + item.name} className='submenu'>
                                                    <a role="button" href="#" onClick={(e) => handleMenuClick(item, e)}
                                                        className={`${activeMenu === item.path || item.path === "setting" ? "active" : ""}  ${selectedMenu === item.path ? "active" : ""} 
                                                                ${activeMenu === item.path || item.path === "setting" ? "subdrop" : ""}`} >

                                                        <i className={item.icon}></i>
                                                        <span>{item.name}</span>
                                                        <span className={`${item.child.length > 0 ? 'menu-arrow' : ''} `}></span>
                                                    </a>
                                                    {
                                                        item.child && item.child.length > 0 && (
                                                            <ul style={{ display: activeMenu === item.path ? "block" : "none" }}>
                                                                {
                                                                    item.child.map((itemChild, index) => (
                                                                        <li key={itemChild.name + index} >
                                                                            <a role="button" href='#' onClick={(e) => handleSubMenuClick(itemChild, e)} className={`${activeSubMenu === itemChild.id ? "active" : ""}`}>{itemChild.name}</a>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        )
                                                    }
                                                </li>
                                            )
                                        }
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div >

            </div >
        </>
    );
};

export default LeftMenuComponnent;