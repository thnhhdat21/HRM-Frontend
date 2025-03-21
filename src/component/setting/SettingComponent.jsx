import React from 'react';
import './css/setting-style.css';
import { Link } from 'react-router-dom';
import HeaderComponnent from '../common/HeaderComponet';

const SettingComponent = () => {
    return (
        <>
            <HeaderComponnent setting={1} />
            <div className='page-wrapper'>
                <div class="setting-container mt-5">
                    <div class="setting-section">
                        <h2>HỆ THỐNG</h2>
                        <div class="items mt-4">
                            <Link to="/admin/admin-account" className='item'>
                                <div class="icon" style={{ backgroundColor: "#9783ea" }}>
                                    <img src="/assets/my-img/setting.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Hệ thống</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="setting-container mt-5">
                    <div class="setting-section">
                        <h2>HRM</h2>
                        <div class="items mt-5">
                            <Link to="/settings/approval" className='item'>
                                <div class="icon" style={{ background: "#ff6c6c" }} >
                                    <img src="/assets/my-img/document.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Đơn từ</span>
                            </Link >
                            <Link to="/settings/asset-group" className='item'>
                                <div class="icon" style={{ background: "#76c9af" }} >
                                    <img src="/assets/my-img/responsive.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Tài sản</span>
                            </Link >
                            <Link to="/admin-account" className='item'>
                                <div class="icon" style={{ background: "#0b92b5" }} >
                                    <img src="/assets/my-img/user-plus.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Tuyển dụng</span>
                            </Link >

                            <Link to="/setting/employee" className='item'>
                                <div class="icon" style={{ background: "#1f8b80" }}>
                                    <img src="/assets/my-img/group.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Nhân sự</span>
                            </Link >
                            <Link to="/admin-account" className='item'>
                                <div class="icon" style={{ background: "#3fa694" }} >
                                    <img src="/assets/my-img/checked.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Chấm công</span>
                            </Link >
                            <Link to="/admin-account" className='item'>
                                <div class="icon" style={{ background: "#33a17c" }} >
                                    <img src="/assets/my-img/dollar.png" alt="" style={{ width: "20px" }} />
                                </div>
                                <span>Bảng lương</span>
                            </Link >
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingComponent;

