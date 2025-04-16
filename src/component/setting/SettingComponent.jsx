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
                                    <i className='ti ti-settings' style={{ color: "white" }} />
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
                                    <i className='ti ti-file-text' style={{ color: "white" }} />
                                </div>
                                <span>Đơn từ</span>
                            </Link >
                            <Link to="/settings/asset" className='item'>
                                <div class="icon" style={{ background: "#76c9af" }} >
                                    <i className='ti ti-device-desktop' style={{ color: "white" }} />
                                </div>
                                <span>Tài sản</span>
                            </Link >
                            <Link to="/settings/contract" className='item'>
                                <div class="icon" style={{ background: "#1f8b80" }}>
                                    <i className='ti ti-file-code' style={{ color: "white" }} />
                                </div>
                                <span>Hợp đồng</span>
                            </Link >

                            <Link to="/settings/insurance" className='item'>
                                <div class="icon" style={{ background: "#1f8b80" }}>
                                    <i className='ti ti-file-plus' style={{ color: "white" }} />

                                </div>
                                <span>Bảo hiểm</span>
                            </Link >
                            <Link to="/settings/on-leave" className='item'>
                                <div class="icon" style={{ background: "#3fa694" }} >
                                    <i className='fe fe-check-circle' style={{ color: "white" }} />
                                </div>
                                <span>Chấm công</span>
                            </Link >
                            <Link to="/settings/allowance" className='item'>
                                <div class="icon" style={{ background: "#33a17c" }} >

                                    <i className='fe fe-dollar-sign' style={{ color: "white" }} />
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

