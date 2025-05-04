import React from 'react';
import './css/context-menu-style.css'

const ContextMenuTwoItem = ({ x, y, showMenu, modalId, handleDelete, setTypeOpen }) => {
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
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target={`#${modalId}`} onClick={() => setTypeOpen(prevList => [...prevList, "edit"])}><i className='ti ti-edit' />
                        Chỉnh sửa
                    </li>
                    <li style={{ width: "200px" }} onClick={() => handleDelete()}><i className='ti ti-trash' />
                        Xóa
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuTwoItem;

