import './css/context-menu-style.css'
import { ACCOUNT_ACTIVED, ACCOUNT_LOCKED, ACCOUNT_NOT_ACTIVE } from '../util/AccountUtil';
import { DELETE, LOCK, UNLOCK } from '../util/ApproveOrDeleteUtil';

const ContextMenuAccount = ({ x, y, showMenu, setTypeOpen, typeAccount }) => {
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

    const menuItems = [
        {
            condition: typeAccount === ACCOUNT_ACTIVED,
            icon: "ti ti-lock",
            text: "Khóa",
            target: "#approve_delete_component",
            type: LOCK
        },
        {
            condition: typeAccount === ACCOUNT_NOT_ACTIVE,
            icon: "ti ti-circle-check",
            text: "Kích hoạt",
            target: "#active_account"
        },
        {
            condition: typeAccount === ACCOUNT_LOCKED,
            icon: "ti ti-lock-open",
            text: "Mở khóa",
            target: "#approve_delete_component",
            type: UNLOCK
        }
    ];

    return (
        <>
            <div class="menu" style={style()}>
                <ul>
                    {menuItems.map((item, index) =>
                        item.condition ? (
                            <li key={index} style={{ width: "200px" }} data-bs-toggle="modal" data-bs-target={item.target}
                                onClick={() => setTypeOpen(item.type)} >
                                <i className={item.icon} /> {item.text}
                            </li>
                        ) : null
                    )}
                    <li style={{ width: "200px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#approve_delete_component"
                        onClick={() => setTypeOpen(DELETE)} >

                        <i className='ti ti-trash' />
                        Xóa
                    </li>
                </ul>
            </div >
        </>
    );
};

export default ContextMenuAccount;