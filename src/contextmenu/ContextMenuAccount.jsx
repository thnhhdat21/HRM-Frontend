import './css/context-menu-style.css'
import { ACCOUNT_ACTIVED, ACCOUNT_LOCKED, ACCOUNT_NOT_ACTIVE } from '../util/AccountUtil';
import { getCountAccount, lockAccount, unlockAccount } from '../service/Manage/ManageAccountService';
import { toast } from 'react-toastify';

const ContextMenuAccount = ({ x, y, showMenu, typeAccount, setListAccount, setCountAccout, selected, setOpenModal }) => {
    const style = () => {
        return {
            borderRadius: 10,
            padding: 10,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none',
            fontSize: '15px'
        }
    }
    const handleOnClickLock = () => {
        lockAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                setListAccount(prevList => prevList.filter(item => item.id !== selected.id));
                getCountAccount().then((response) => {
                    if (response.data.code === 1000) {
                        setCountAccout(response.data.data)
                    }
                })
                toast.success("Khóa tài khoản thành công")
            }
        })
    }

    const handleOnClickUnLock = () => {
        unlockAccount(selected.id).then((response) => {
            if (response.data.code === 1000) {
                setListAccount(prevList => prevList.filter(item => item.id !== selected.id));
                getCountAccount().then((response) => {
                    if (response.data.code === 1000) {
                        setCountAccout(response.data.data)
                    }
                })
                toast.success("Mở khóa tài khoản thành công")
            }
        })
    }


    const menuItems = [
        {
            condition: typeAccount === ACCOUNT_ACTIVED,
            icon: "ti ti-lock",
            text: "Khóa",
            function: handleOnClickLock
        },
        {
            condition: typeAccount === ACCOUNT_NOT_ACTIVE,
            icon: "ti ti-circle-check",
            text: "Kích hoạt",
            target: "#crud_recall"
        },
        {
            condition: typeAccount === ACCOUNT_LOCKED,
            icon: "ti ti-lock-open",
            text: "Mở khóa",
            function: handleOnClickUnLock
        }
    ];




    return (
        <>
            <div class="menu" style={style()}>
                <ul>
                    {menuItems.map((item, index) =>
                        item.condition ? (
                            <li key={index} style={{ width: "200px" }} {...(typeAccount === ACCOUNT_NOT_ACTIVE ? { "data-bs-toggle": "modal", "data-bs-target": "#active_account" } : null)}
                                onClick={item.function} >
                                <i className={item.icon} /> {item.text}
                            </li>
                        ) : null
                    )}
                    <li style={{ width: "200px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#approve_delete_component"
                    >
                        <i className='ti ti-trash' />
                        Xóa
                    </li>
                </ul>
            </div >
        </>
    );
};

export default ContextMenuAccount;