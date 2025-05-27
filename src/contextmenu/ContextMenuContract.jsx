import './css/context-menu-style.css'
import { useNavigate } from 'react-router-dom';
import { CONTRACT_STATE_WAITING } from '../util/ContractUtil';
import { PROFILE_CONTRACT } from '../util/EmployeeUtil';

const ContextMenuContract = ({ x, y, showMenu, setTypeOpen, infoEmployee, isManage }) => {
    const navigate = useNavigate();
    const style = () => {
        return {
            borderRadius: 10,
            padding: 10,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none'
        }
    }

    const handleClickNavigate = (url) => {
        navigate(url, { state: { employeeId: infoEmployee.employeeId, employeeName: infoEmployee.employeeName, navItem: PROFILE_CONTRACT } });
    }
    return (
        <>
            {
                isManage && (
                    <div class="menu" style={style()}>
                        <ul>
                            <li onClick={() => handleClickNavigate('/profile-employee')}>
                                <i className='ti ti-eye' />
                                Xem hợp đồng
                            </li>
                            {
                                infoEmployee.contractState !== CONTRACT_STATE_WAITING ? (<>
                                    <li data-bs-toggle="modal" data-bs-target="#create-contract"
                                        onClick={() => setTypeOpen((prev) => [...prev, "#create-contract"])}>
                                        <i className='ti ti-file-plus' />
                                        Tạo mới hợp đồng
                                    </li>
                                    <li data-bs-toggle="modal" data-bs-target="#create-contract"
                                        className={`border-bottom ${infoEmployee.contractDateLiquid ? "hidden" : ""}`}
                                        onClick={() => setTypeOpen((prev) => [...prev, "#create-contract-appdix"])}
                                    ><i className='ti ti-notes' />
                                        Thêm phụ lục hợp đồng
                                    </li>
                                    <li className={`border-bottom ${infoEmployee.contractDateLiquid ? "hidden" : ""}`} data-bs-toggle="modal" data-bs-target="#end-contract"
                                        onClick={() => setTypeOpen((prev) => [...prev, "#end-contract"])}
                                    ><i className='ti ti-refresh ' />
                                        Thanh lý hợp đồng
                                    </li>
                                </>) : (
                                    <>
                                        <li data-bs-toggle="modal" data-bs-target="#create_contract"><i className='ti ti-file-plus' />
                                            Sửa
                                        </li>
                                        <li data-bs-toggle="modal" data-bs-target="#create_appendix"><i className='fe fe-list' />
                                            Xóa
                                        </li>
                                    </>
                                )
                            }

                        </ul>
                    </div >
                )
            }
        </>
    );
};

export default ContextMenuContract;

