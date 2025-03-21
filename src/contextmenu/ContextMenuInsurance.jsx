import React from 'react';
import './css/context-menu-style.css'

const ContextMenuInsurance = ({ x, y, showMenu, id }) => {
    const style = () => {
        return {
            width: '220px',
            height: '100px',
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
            <div class="menu" style={style()}>
                <ul>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#browse_insurance"><i className='ti ti-check' />
                        Chốt
                    </li>
                    <li style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target="#update_type_insurance"><i className='ti ti-check' />
                        Tỷ lệ bảo hiểm
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuInsurance;

