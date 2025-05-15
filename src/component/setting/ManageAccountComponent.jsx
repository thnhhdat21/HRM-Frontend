import React, { use, useEffect, useRef, useState } from 'react';
import ActiveAccountComponent from './crud/ActiveAccountComponent';
import { ACCOUNT_ACTIVED, ACCOUNT_LOCKED, ACCOUNT_NOT_ACTIVE } from '../../util/AccountUtil';
import TableAccountComponent from './component/TableAccountComponent';
import { deleteAccount, getCountAccount, getListAccount, lockAccount } from '../../service/Manage/ManageAccountService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuAccount from '../../contextmenu/ContextMenuAccount';
import { getListRole } from '../../service/RoleService';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import ApproveOrDeleteComponent from '../common/ApproveOrDeleteComponent';
import { DELETE } from '../../util/ApproveOrDeleteUtil';

const ManageAccountComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách tài khoản", subTitle: "" }))
    const [typeAccount, setTypeAccount] = useState(ACCOUNT_ACTIVED);
    const [listAccount, setListAccount] = useState(null);
    const [countAccount, setCountAccount] = useState(null);
    const [listGroup, setLisGroup] = useState(null);
    const tableActive = useRef(null)
    const tableNotActive = useRef(null)
    const tableLock = useRef(null)
    const [tableRef, setTableRef] = useState(tableActive);
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const [update, setUpdate] = useState(0);
    const [openModal, setOpenModal] = useState("open")

    const [selected, setSelected] = useState(null);

    const handleClickSetType = (type) => {
        setTypeAccount(type)
    }

    useEffect(() => {
        getListRole().then((response) => {
            if (response.data.code === 1000) {
                setLisGroup(response.data.data)
            } else if (response.data.code > 1000) {
                toast.error(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        })
        getCountAccount().then((response) => {
            if (response.data.code === 1000) {
                setCountAccount(response.data.data)
            } else if (response.data.code > 1000) {
                toast.error(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        })
    }, [])

    useEffect(() => {
        getListAccount(typeAccount).then((response) => {
            if (response.data.code === 1000) {
                console.log(response.data.data)
                setListAccount(response.data.data)
                if (typeAccount === ACCOUNT_ACTIVED) {
                    setTableRef(tableActive)
                } else if (typeAccount === ACCOUNT_NOT_ACTIVE) {
                    setTableRef(tableNotActive)
                } else {
                    setTableRef(tableLock)
                }
            } else if (response.data.code > 1000) {
                setListAccount("")
            } else {
                toast.error(response.data.message)
            }
        })
    }, [typeAccount])

    useEffect(() => {
        getListAccount(typeAccount).then((response) => {
            if (response.data.code === 1000) {
                setListAccount(response.data.data)
            } else if (response.data.code > 1000) {
                setListAccount("")
            } else {
                toast.error(response.data.message)
            }
        })
    }, [update])

    const handleOnClickDelete = () => {
        deleteAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                setListAccount(prevList => prevList.filter(item => item.id !== selected.id));
                getCountAccount().then((response) => {
                    if (response.data.code === 1000) {
                        setCountAccount(response.data.data)
                    }
                })
                toast.success("Xóa tài khoản thành công")
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile' style={{ marginRight: "15px" }}>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#account-actived"
                                            onClick={() => handleClickSetType(ACCOUNT_ACTIVED)}
                                        >Đang hoạt động ({countAccount && countAccount.accountActive})</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" style={{ marginRight: "15px" }}
                                            data-bs-toggle="tab"
                                            data-bs-target="#account-not-actived"
                                            onClick={() => handleClickSetType(ACCOUNT_NOT_ACTIVE)}
                                        >Chưa kích hoạt ({countAccount && countAccount.accountNotActive}) </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#account-locked"
                                            onClick={() => handleClickSetType(ACCOUNT_LOCKED)}
                                        >Đã khóa ({countAccount && countAccount.accountLock})</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tab-content " id="myTabContent">
                            <TableAccountComponent setSelected={setSelected} ref={tableActive} tabId={"account-actived"} listAccount={typeAccount === ACCOUNT_ACTIVED ? listAccount : ""} />
                            <TableAccountComponent setSelected={setSelected} ref={tableNotActive} tabId={"account-not-actived"} listAccount={typeAccount === ACCOUNT_NOT_ACTIVE ? listAccount : ""} />
                            <TableAccountComponent setSelected={setSelected} ref={tableLock} tabId={"account-locked"} listAccount={typeAccount === ACCOUNT_LOCKED ? listAccount : ""} />
                        </div>
                    </div>
                </div>
            </div >
            <ApproveOrDeleteComponent
                type={DELETE}
                handleClick={handleOnClickDelete}
            />
            <ActiveAccountComponent typeAccount={typeAccount} selected={selected} setCountAccout={setCountAccount} setListAccount={setListAccount} />
            <ContextMenuAccount x={x} y={y} showMenu={showMenu} typeAccount={typeAccount} setListAccount={setListAccount} selected={selected} setCountAccout={setCountAccount} setOpenModal={setOpenModal} />
        </>
    );
};

export default ManageAccountComponent;