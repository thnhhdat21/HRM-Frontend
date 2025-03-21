import React from 'react';
import './css/context-menu-style.css'
import { Link, useNavigate } from 'react-router-dom';

const ContextMenuContract = ({ x, y, showMenu, id }) => {
    const style = () => {
        return {
            width: '220px',
            height: '220px',
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
                    <li onClick={() => navigate('/contract/create-contract')}>
                        <i className='ti ti-file-plus' />
                        Tạo mới hợp đồng
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#create_appendix"><i className='ti ti-notes' />
                        Thêm phụ lục hợp đồng
                    </li>
                    <li className='border-bottom' data-bs-toggle="modal" data-bs-target="#end_contract"><i className='ti ti-refresh' />
                        Thanh lý hợp đồng
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#create_contract"><i className='ti ti-file-plus' />
                        Sửa
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#create_appendix"><i className='fe fe-list' />
                        Xóa
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuContract;

