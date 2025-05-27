import { useEffect, useRef, useState } from 'react';
import ActiveAccountComponent from './ActiveAccountComponent';
import { ACCOUNT_ACTIVED, ACCOUNT_LOCKED, ACCOUNT_NOT_ACTIVE } from '../../../util/AccountUtil';
import TableAccountComponent from '../component/TableAccountComponent';
import { deleteAccount, getCountAccount, getCountAccountType, getListAccount, lockAccount, unlockAccount } from '../../../service/Manage/ManageAccountService';
import { toast } from 'react-toastify';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import ContextMenuAccount from '../../../contextmenu/ContextMenuAccount';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { DELETE, LOCK, UNLOCK } from '../../../util/ApproveOrDeleteUtil';
import ApproveOrDeleteComponent from '../../customer/ApproveOrDeleteComponent';
import { updateStatusFilter } from '../../../redux/slice/SearchFilterSlice';

const ManageAccountComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách tài khoản", subTitle: "" }))
    const searchFilter = useSelector((state) => state.searchFilter)
    const [typeAccount, setTypeAccount] = useState(ACCOUNT_ACTIVED);
    const [listAccount, setListAccount] = useState(null);
    const [countAccountType, setCountAccountType] = useState(null);
    const tableActive = useRef(null)
    const tableNotActive = useRef(null)
    const tableLock = useRef(null)
    const [tableRef, setTableRef] = useState(tableActive);
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const [selected, setSelected] = useState(null);
    const [typeOpen, setTypeOpen] = useState(null);
    const [handleTypeOpen, setHandleTypeOpen] = useState(null);
    const [countAccount, setCountAcount] = useState(null);

    const handleClickSetType = (type) => {
        setTypeAccount(type)
        if (type === ACCOUNT_ACTIVED) {
            setTableRef(tableActive)
        } else if (type === ACCOUNT_NOT_ACTIVE) {
            setTableRef(tableNotActive)
        } else {
            setTableRef(tableLock)
        }
        dispatch(updateStatusFilter(type))
    }

    useEffect(() => {
        getCountAccountType(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                setCountAccountType(response.data.data)
            } else if (response.data.code > 1000) {
                toast.error(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        })
    }, [
        searchFilter.name,
        JSON.stringify(searchFilter.department || []),
        JSON.stringify(searchFilter.jobPosition || []),
        JSON.stringify(searchFilter.duty || []),
        searchFilter.dateJoin || ''
    ])

    useEffect(() => {
        getListAccount(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                setListAccount(response.data.data)
            } else if (response.data.code > 1000) {
                setListAccount("")
            } else {
                toast.error(response.data.message)
            }
        })

        getCountAccount(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                setCountAcount(response.data.data)
            } else if (response.data.code > 1000) {
                setCountAcount("")
            } else {
                toast.error(response.data.message)
            }
        })
    }, [searchFilter])

    useEffect(() => {
        if (typeOpen === DELETE) {
            setHandleTypeOpen(() => handleOnClickDelete)
        } else if (typeOpen === LOCK) {
            setHandleTypeOpen(() => handleOnClickLock)
        } else if (typeOpen === UNLOCK) {
            setHandleTypeOpen(() => handleOnClickUnLock)
        }
    }, [typeOpen])

    const update = () => {
        setListAccount(prevList => prevList.filter(item => item.id !== selected.id));
        getCountAccountType(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                setCountAccountType(response.data.data)
            } else if (response.data.code > 1000) {
                toast.error(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        })
    }

    const handleOnClickDelete = () => {
        deleteAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                update()
                toast.success("Xóa tài khoản thành công")
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }

    const handleOnClickLock = () => {
        lockAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                update()
                toast.success("Khóa tài khoản thành công")
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }

    const handleOnClickUnLock = () => {
        unlockAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                update()
                toast.success("Mở khóa tài khoản thành công")
                document.querySelector('#approve_delete_component [data-bs-dismiss="modal"]').click();
            }
        })
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex' style={{ gap: '20px', fontSize: '14px', fontWeight: "500" }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" style={{ marginRight: "15px" }}>
                                        <button className="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#account-actived"
                                            onClick={() => handleClickSetType(ACCOUNT_ACTIVED)}
                                        >Đang hoạt động ({countAccountType && countAccountType.accountActive})</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-link-profile " id="address-tab" style={{ marginRight: "15px" }}
                                            data-bs-toggle="tab"
                                            data-bs-target="#account-not-actived"
                                            onClick={() => handleClickSetType(ACCOUNT_NOT_ACTIVE)}
                                        >Chưa kích hoạt ({countAccountType && countAccountType.accountNotActive}) </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link nav-link-profile " id="address-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#account-locked"
                                            onClick={() => handleClickSetType(ACCOUNT_LOCKED)}
                                        >Đã khóa ({countAccountType && countAccountType.accountLock})</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content " id="myTabContent">
                            <TableAccountComponent setSelected={setSelected} ref={tableActive} tabId={"account-actived"} listAccount={listAccount} countAccount={countAccount} />
                            <TableAccountComponent setSelected={setSelected} ref={tableNotActive} tabId={"account-not-actived"} listAccount={listAccount} countAccount={countAccount} />
                            <TableAccountComponent setSelected={setSelected} ref={tableLock} tabId={"account-locked"} listAccount={listAccount} countAccount={countAccount} />
                        </div>
                    </div>
                </div>
            </div >
            <ApproveOrDeleteComponent
                type={typeOpen}
                handleClick={handleTypeOpen}
            />
            <ActiveAccountComponent selected={selected} update={update} />
            <ContextMenuAccount x={x} y={y} showMenu={showMenu} setTypeOpen={setTypeOpen} typeAccount={typeAccount} />
        </>
    );
};

export default ManageAccountComponent;