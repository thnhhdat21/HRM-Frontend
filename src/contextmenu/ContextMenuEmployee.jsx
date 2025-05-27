import './css/context-menu-style.css'
import { useNavigate } from 'react-router-dom';
import { DECISION_TYPE_PENALTY, DECISION_TYPE_REWARD } from '../util/DecisionUtil';
import { PerManageAdmin, PerManageContract, PerManageDecision, PerManageEmployee, PerWatchEmployee } from '../util/PermissionUtil';
import { PROFILE_RESUME } from '../util/EmployeeUtil';

const ContextMenuEmployee = ({ x, y, showMenu, setTypeOpen, infoEmployee, hanleClickUpdateEdu, hanleClickUpdateFamily, handleClickUpdateResume, handleClickUpdateAccount, roles }) => {

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
    const handleClickNavigate = (url) => {
        navigate(url, { state: { employeeId: infoEmployee.employeeId, employeeName: infoEmployee.employeeName, navItem: PROFILE_RESUME } });
    }

    return (
        <>
            <div class="menu main-menu" style={style()} id='contextMenuEmployee'>
                <ul>
                    {
                        PerWatchEmployee.some((role) => roles.has(role)) && (
                            <li onClick={() => handleClickNavigate('/profile-employee')}><i className='fe fe-eye' />
                                Chi tiết nhân sự
                            </li>
                        )
                    }
                    {
                        PerManageEmployee.some((role) => roles.has(role)) && (
                            <>
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
                                    className="menu-item" data-bs-toggle="modal" data-bs-target="#update-number-insurance"
                                    onClick={() => setTypeOpen((prev) => [...prev, "update-number-insurance"])}
                                ><i className='ti ti-file-plus' />
                                    Số sổ bảo hiểm
                                </li>
                            </>
                        )
                    }
                    {
                        PerManageDecision.some((role) => roles.has(role)) && (
                            <>
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
                            </>
                        )
                    }
                    {
                        PerManageContract.some((role) => roles.has(role)) && (
                            <li className='has-submenu-context'><i className='ti ti-file-plus' />
                                Tạo hợp đồng
                                <div class="submenu-context ">
                                    <ul>
                                        <li data-bs-toggle="modal" data-bs-target="#create-contract" style={{ display: infoEmployee.contractId ? "" : "none" }}
                                            onClick={() => setTypeOpen((prev) => [...prev, "#create-contract-appdix"])}
                                        >
                                            Tạo phụ lục
                                        </li>
                                        <li data-bs-toggle="modal" data-bs-target="#create-contract"
                                            onClick={() => setTypeOpen((prev) => [...prev, "#create-contract"])}
                                        >
                                            Tạo mới
                                        </li>
                                        <li data-bs-toggle="modal" data-bs-target="#end-contract" style={{ display: infoEmployee.contractId ? "" : "none" }}
                                            onClick={() => setTypeOpen((prev) => [...prev, "#end-contract"])}
                                        >
                                            Thanh lý
                                        </li>

                                    </ul>
                                </div>
                            </li>
                        )
                    }
                    {
                        PerManageAdmin.some((role) => roles.has(role)) && (
                            <>
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
                            </>
                        )
                    }
                </ul>
            </div >
        </>
    );
};

export default ContextMenuEmployee;

