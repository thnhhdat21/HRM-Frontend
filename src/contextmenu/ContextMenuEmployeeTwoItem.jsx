import './css/context-menu-style.css'

const ContextMenuEmployeeTwoItem = ({ x, y, showMenu, modalId, setTypeOpen, state }) => {
    const CHECKED = 2;
    const style = () => {
        return {
            borderRadius: 10,
            padding: 10,
            top: y,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none',
            zIndex: 10
        }
    }

    return (
        <>
            <div className="menu" style={style()}>
                <ul>
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

export default ContextMenuEmployeeTwoItem;

