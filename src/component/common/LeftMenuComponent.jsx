import { useEffect, useState } from 'react';
import { mapPathId, menuEmployeeManage, menuEmployeePersonal, menuObjectSetting } from '../../util/LeftMenuUtil';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSearchFilter, updateStatusFilter } from '../../redux/slice/SearchFilterSlice';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { logoutUtil } from '../../util/AuthenUtil';
import { logout } from '../../service/AuthenService';

const LeftMenuComponnent = () => {
    const location = useLocation();
    const [leftMenu, setLeftMenu] = useState([])
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const roleString = Cookies.get('permissions');
    let roles = new Set();

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
    }

    useEffect(() => {
        if (location.pathname.startsWith("/personal")) {
            setLeftMenu(menuEmployeePersonal);
        } else if (location.pathname.startsWith("/settings")) {
            setLeftMenu(menuObjectSetting)
        } else if (location.pathname.startsWith("/manage")) {
            setLeftMenu(menuEmployeeManage);
        }
        setSelectedMenu(location.pathname)
    }, [location.pathname]);

    useEffect(() => {
        setActiveSubMenu(mapPathId.get(location.pathname))
    }, [leftMenu]);


    function handleMenuClick(item, e) {
        e.preventDefault();
        if (item.child && item.child.length > 0) {
            e.preventDefault();
            setActiveMenu((prev) => (prev === item.id ? null : item.id));
        } else {
            setActiveSubMenu(null)
            setActiveMenu(item.id);
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

    const refreshToken = Cookies.get("refreshToken")
    const handleClickLogout = (e) => {
        e.preventDefault()
        logout(refreshToken).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Đăng xuất")
                logoutUtil()
                setTimeout(() => {
                    navigate("/");
                }, 500);
            }
        })
    }

    return (
        <>
            <div className="sidebar" id="sidebar">
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
                                        (location.pathname.startsWith("/settings")) ? (
                                            leftMenu.length > 0 && leftMenu.map((item, index) => {
                                                return (
                                                    < li key={index + item.name} className='submenu'>
                                                        <a role="button" href="#" onClick={(e) => handleMenuClick(item, e)}
                                                            className="active subdrop" >

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
                                            })
                                        ) : (
                                            <>
                                                {
                                                    leftMenu.length > 0 && leftMenu.map((item, index) => {
                                                        const hasPermission = item.permissions && item.permissions.some(role => roles.has(role))
                                                        if (hasPermission) {
                                                            return (
                                                                < li key={index + item.name} className='submenu'>
                                                                    <a role="button" href="#" onClick={(e) => handleMenuClick(item, e)}
                                                                        className={`${activeMenu === item.id ? "active" : ""}  ${selectedMenu === item.path ? "active subdrop" : ""} 
                                                                ${activeMenu === item.id ? "subdrop" : ""}`} >

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
                                                    })
                                                }
                                                {
                                                    location.pathname.startsWith("/personal") && (
                                                        < li className='submenu' onClick={handleClickLogout}>
                                                            <a role="button">
                                                                <i className='ti ti-logout'></i>
                                                                <span>Đăng xuất</span>
                                                            </a>
                                                        </li>
                                                    )
                                                }
                                            </>
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