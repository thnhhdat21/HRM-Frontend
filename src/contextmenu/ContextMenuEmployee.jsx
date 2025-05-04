import React from 'react';
import './css/context-menu-style.css'
import { useNavigate } from 'react-router-dom';
import { DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD } from '../util/DecisionUtil';

const ContextMenuEmployee = ({ x, y, showMenu, setTypeOpen, infoEmployee, hanleClickUpdateEdu, hanleClickUpdateFamily, handleClickUpdateResume, handleClickUpdateAccount }) => {
    const navigate = useNavigate();
    const style = () => {
        return {
            borderRadius: 10,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none',
            zIndex: 9999
        }
    }
    // const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    // const [subMenuPosition, setSubMenuPosition] = useState("right"); // Vị trí mặc định là bên phải
    // const menuItemRef = useRef(null);
    // const subMenuRef = useRef(null);

    // useEffect(() => {
    //     if (isSubMenuVisible && menuItemRef.current && subMenuRef.current) {
    //         const itemRect = menuItemRef.current.getBoundingClientRect();
    //         const subMenuRect = subMenuRef.current.getBoundingClientRect();
    //         const screenWidth = window.innerWidth;

    //         // Nếu menu con bị tràn bên phải -> đặt bên trái
    //         if (itemRect.right + subMenuRect.width > screenWidth) {
    //             setSubMenuPosition("left");
    //         } else {
    //             setSubMenuPosition("right");
    //         }
    //     }
    // }, [isSubMenuVisible]);

    const handleClickNavigate = (url) => {
        navigate(url, { state: { employeeId: infoEmployee.employeeId, employeeName: infoEmployee.employeeName } });
    }

    return (
        <>
            <div class="menu main-menu" style={style()}>
                <ul>
                    <li onClick={() => handleClickNavigate('/profile-employee')}><i className='fe fe-eye' />
                        Chi tiết nhân sự
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update-resume"
                        onClick={() => handleClickUpdateResume()}
                    ><i className='ti ti-refresh' />
                        Cập nhật thông tin hồ sơ
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update-education"
                        onClick={() => hanleClickUpdateEdu()}
                    ><i className='ti ti-school' />
                        Cập nhật quá trình học tập
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update-family"
                        onClick={() => hanleClickUpdateFamily()}
                    ><i className='ti ti-user-plus' />
                        Cập nhật thông tin gia đình
                    </li>
                    <li
                        className="menu-item" data-bs-toggle="modal" data-bs-target=""><i className='ti ti-file-plus' />
                        Bảo hiểm
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update-reward-penalty"
                        onClick={() => setTypeOpen((prev) => [...prev, DECISION_TYPE_REWARD])}
                    ><i className='fe fe-bookmark' />
                        Chế độ phúc lợi
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update-reward-penalty"
                        onClick={() => setTypeOpen((prev) => [...prev, DECISION_TYPE_PENALTY])}
                    ><i className='ti ti-scale' />
                        Kỷ luật nội bộ
                    </li>
                    <li className='has-submenu-context'><i className='ti ti-file-plus' />
                        Tạo hợp đồng
                        <div class="submenu-context ">
                            <ul>
                                <li data-bs-toggle="modal" data-bs-target="#create-contract" style={{ display: infoEmployee.department ? "" : "none" }}
                                    onClick={() => setTypeOpen((prev) => [...prev, "#create-contract-appdix"])}
                                >
                                    Tạo phụ lục
                                </li>
                                <li data-bs-toggle="modal" data-bs-target="#create-contract"
                                    onClick={() => setTypeOpen((prev) => [...prev, "#create-contract"])}
                                >
                                    Tạo mới
                                </li>
                                <li data-bs-toggle="modal" data-bs-target="">
                                    Thanh lý
                                </li>

                            </ul>
                        </div>
                    </li>
                    {infoEmployee.accountStatus === 1 && (<li
                        onClick={handleClickUpdateAccount}
                    ><i className='ti ti-lock'
                        />
                        Khóa tài khoản
                    </li>)}

                    {infoEmployee.accountStatus === 2 && (<li
                        onClick={handleClickUpdateAccount} ><i className='ti ti-circle-check' />
                        Kích hoạt
                    </li>)}

                    {infoEmployee.accountStatus === 3 && (<li
                        onClick={handleClickUpdateAccount}
                    ><i className='ti ti-lock-open' />
                        Mở khóa
                    </li>)}

                </ul>
            </div >
        </>
    );
};

export default ContextMenuEmployee;

