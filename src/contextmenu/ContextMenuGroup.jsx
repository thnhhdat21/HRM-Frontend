import React from 'react';
import './css/context-menu-style.css'

const ContextMenuGroup = ({ x, y, showMenu }) => {
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

    return (
        <>
            <div className="menu" style={style()}>
                <ul>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#edit-group"><i className='ti ti-edit' />
                        Chỉnh sửa
                    </li>
                    <li style={{ width: "200px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#approve_delete_component"
                    ><i className='ti ti-trash' />
                        Xóa
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuGroup;

