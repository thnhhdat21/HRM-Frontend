import React from 'react';
import './css/context-menu-style.css'
import { useNavigate } from 'react-router-dom';

const ContextMenuTimeKeeping = ({ x, y, showMenu, id }) => {
    const style = () => {
        return {
            width: '220px',
            height: '140px',
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
            <div class="menu" style={style()}>
                <ul>
                    <li style={{ width: "200px" }} onClick={() => navigate('/contract/create-contract')}>
                        <i className='ti ti-edit' />
                        Sửa
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#create_appendix">
                        <i className='ti ti-trash' />
                        Xóa
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#end_contract">
                        <i className='ti ti-copy' />
                        Nhân bản
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuTimeKeeping;

