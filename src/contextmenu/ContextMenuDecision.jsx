import React from 'react';
import './css/context-menu-style.css'
import { APPROVE, DELETE, NO_APPROVE } from '../util/ApproveOrDeleteUtil';

const ContextMenuDecision = ({ x, y, showMenu, modalId, setTypeOpen, state, setTypeApproveOrDelete, handleClickNavigate }) => {
    const WAITING = 1;
    const CHECKED = 2;
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
                    <li style={{ width: "200px" }}
                        onClick={handleClickNavigate}>
                        <i className='fe fe-eye' />
                        Xem chi tiết
                    </li>
                    {Number(state) === WAITING &&
                        (
                            <>
                                <li style={{ width: "200px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#approve_delete_component"
                                    onClick={() => setTypeApproveOrDelete(APPROVE)}
                                ><i className='ti ti-check' />
                                    Duyệt
                                </li>
                                <li style={{ width: "200px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#approve_delete_component"
                                    onClick={() => setTypeApproveOrDelete(NO_APPROVE)}
                                ><i className='ti ti-x' />
                                    Không Duyệt
                                </li>
                            </>
                        )
                    }
                    {Number(state) !== CHECKED && (
                        <>
                            <li style={{ width: "200px" }}
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                                onClick={() => setTypeOpen(prevList => [...prevList, modalId + "-edit"])}>
                                <i className='ti ti-edit' />
                                Chỉnh sửa
                            </li>
                            <li style={{ width: "200px" }}
                                data-bs-toggle="modal"
                                data-bs-target="#approve_delete_component"
                                onClick={() => setTypeApproveOrDelete(DELETE)}
                            ><i className='ti ti-trash' />
                                Xóa
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default ContextMenuDecision;

