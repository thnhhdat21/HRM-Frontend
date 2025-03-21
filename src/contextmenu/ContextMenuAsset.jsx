import React from 'react';
import './css/context-menu-style.css'
import { Link, useNavigate } from 'react-router-dom';

const ContextMenuAsset = ({ x, y, showMenu, id }) => {
    const style = () => {
        return {
            width: '220px',
            height: '260px',
            borderRadius: 10,
            display: 'flex',
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
            <div class="menu" style={style()}>
                <ul>
                    <li style={{ width: "200px" }} onClick={() => navigate('/contract/create-contract')}>
                        <i className='ti ti-eye' />
                        Xem nhanh
                    </li>
                    <li style={{ width: "200px" }} onClick={() => navigate('/contract/create-contract')}>
                        <i className='ti ti-refresh' />
                        Điều chuyển
                    </li>
                    <li style={{ width: "200px" }} onClick={() => navigate('/contract/create-contract')}>
                        <i className='ti ti-shield' />
                        Bảo hành, sửa chữa
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#crud_recall">
                        <i className='ti ti-arrow-back-up' />
                        Thu hồi
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#end_contract">
                        <i className='ti ti-edit' />
                        Sửa
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#end_contract">
                        <i className='ti ti-trash' />
                        Xóa
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuAsset;

