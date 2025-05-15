import React, { useState } from 'react';
import './css/context-menu-style.css'
import { useNavigate } from 'react-router-dom';
import { CONTRACT_STATE_WAITING } from '../util/ContractUtil';

const ContextMenuContract = ({ x, y, showMenu, setTypeOpen, infoEmployee, isManage }) => {
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

    const navigate = useNavigate();

    return (
        <>
            {
                isManage && (
                    <div class="menu" style={style()}>
                        <ul>
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

