import React, { useEffect, useRef, useState } from 'react';
import './css/context-menu-style.css'

const ContextMenuEmployee = ({ x, y, showMenu, id }) => {
    const style = () => {
        return {
            width: '250px',
            height: '550px',
            borderRadius: 10,
            padding: 10,
            top: y + 250,
            left: x,
            position: 'absolute',
            display: showMenu ? 'flex' : 'none'
        }
    }
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [subMenuPosition, setSubMenuPosition] = useState("right"); // Vị trí mặc định là bên phải
    const menuItemRef = useRef(null);
    const subMenuRef = useRef(null);

    useEffect(() => {
        if (isSubMenuVisible && menuItemRef.current && subMenuRef.current) {
            const itemRect = menuItemRef.current.getBoundingClientRect();
            const subMenuRect = subMenuRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;

            // Nếu menu con bị tràn bên phải -> đặt bên trái
            if (itemRect.right + subMenuRect.width > screenWidth) {
                setSubMenuPosition("left");
            } else {
                setSubMenuPosition("right");
            }
        }
    }, [isSubMenuVisible]);




    return (
        <>
            <div class="menu" style={style()}>
                <ul>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-refresh' />
                        Cập nhật trạng thái hồ sơ
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update_salary"><i className='fe fe-dollar-sign' />
                        Cập nhật lương & phụ cấp
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update_job_history"><i className='ti ti-list-check' />
                        Cập nhật công việc
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-school' />
                        Quá trình học tập
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-user-plus' />
                        Cập nhật thông tin gia đình
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-list-details' />
                        Cập nhật thông tin tiếp nhận
                    </li>
                    <li ref={menuItemRef}
                        onMouseEnter={() => setIsSubMenuVisible(true)}
                        onMouseLeave={() => setIsSubMenuVisible(false)}
                        className="menu-item" data-bs-toggle="modal" data-bs-target=""><i className='ti ti-file-plus' />
                        Bảo hiểm
                        {isSubMenuVisible && (
                            <div
                                ref={subMenuRef}
                                className="submenu"
                                style={{
                                    top: "0",
                                    [subMenuPosition]: "100%", // Điều chỉnh vị trí
                                }}
                            >
                                <ul>
                                    <li>Thông tin bảo hiểm</li>
                                    <li>Cập nhật bảo hiểm</li>
                                    <li>Chi tiết quyền lợi</li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update_reward"><i className='fe fe-bookmark' />
                        Chế độ phúc lợi
                    </li>
                    <li data-bs-toggle="modal" data-bs-target="#update_penalty"><i className='ti ti-scale' />
                        Kỷ luật nội bộ
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-file-plus' />
                        Tạo hợp đồng
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-lock' />
                        Khóa tài khoản
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-file' />
                        Biểu mẫu
                    </li>
                    <li data-bs-toggle="modal" data-bs-target=""><i className='ti ti-cloud-upload' />
                        Thêm tài liệu
                    </li>
                </ul>
            </div>
        </>
    );
};

export default ContextMenuEmployee;

