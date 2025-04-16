import React, { use, useEffect, useRef, useState } from 'react';
import AccountEditComponent from './crud/AccountEditComponent';
import ActiveAccountComponent from './crud/ActiveAccountComponent';
import { ACCOUNT_ACTIVED, ACCOUNT_LOCKED, ACCOUNT_NOT_ACTIVE } from '../../util/AccountUtil';
import TableAccountComponent from './component/TableAccountComponent';
import { getCountAccount, getListAccount, lockAccount } from '../../service/AccountService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuAccount from '../../contextmenu/ContextMenuAccount';
import { getListRole } from '../../service/RoleService';

const ManageAccountComponent = () => {
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


    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                        <div class="my-auto mb-2">
                            <h2 class="mb-1">Danh sách người dùng</h2>
                        </div>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                            <div class="me-2 mb-2">
                                <div class="dropdown">
                                    <a href="javascript:void(0);"
                                        class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown">
                                        <i class="ti ti-file-export me-1"></i>Export
                                    </a>
                                    <ul class="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                                class="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" class="dropdown-item rounded-1"><i
                                                class="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

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
            <AccountEditComponent openModal={openModal} setOpenModal={setOpenModal} setUpdate={setUpdate} setListAccount={setListAccount} typeAccount={typeAccount} listGroup={listGroup} selected={selected} setSelected={setSelected} />
            <ActiveAccountComponent listGroup={listGroup} typeAccount={typeAccount} selected={selected} setCountAccout={setCountAccount} setListAccount={setListAccount} />
            <ContextMenuAccount x={x} y={y} showMenu={showMenu} typeAccount={typeAccount} setListAccount={setListAccount} selected={selected} setCountAccout={setCountAccount} setOpenModal={setOpenModal} />
        </>
    );
};

export default ManageAccountComponent;

