import React from 'react';
import AcceptSalayApprovalComponent from './crud/AcceptSalayApprovalComponent';

const SalaryApprovalDetailComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="p-categoty-list">
                    <div className='d-flex align-items-center justify-content-between category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                        <span className='active-category-list' style={{ fontWeight: 500 }}>Chi tiết thông tin</span>
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                <i className='ti ti-check' style={{ fontSize: "20px" }} />
                                <span >Duyệt</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-edit' style={{ fontSize: "20px" }} />
                                <span >Sửa</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-trash' style={{ fontSize: "20px" }} />
                                <span >Thu hồi</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }}>
                                <i className='ti ti-clock' style={{ fontSize: "20px" }} />
                                <span>Lịch sử</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-container">
                    <div class="profile-header">
                        Thông tin chung

                    </div>
                    <div class="profile-info">
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <td><strong>Mã ứng</strong></td>
                                    <td>00312060122</td>
                                    <td><strong>Họ tên</strong></td>
                                    <td>Nguyễn Thành Đạt / 211201056</td>
                                </tr>
                                <tr>
                                    <td><strong>Phòng ban</strong></td>
                                    <td>Phòng tích hợp hệ thống</td>
                                    <td><strong>Vị trí</strong></td>
                                    <td>Nhân viên</td>
                                </tr>
                                <tr>
                                    <td><strong>Loại hợp đồng</strong></td>
                                    <td>Hợp đồng xác định thời hạn</td>
                                    <td><strong>Ngày vào</strong></td>
                                    <td>21/11/2023</td>
                                </tr>
                                <tr>
                                    <td><strong>Trạng thái duyệt</strong></td>
                                    <td><span class="badge badge-warning">Chờ duyệt</span></td>
                                    <td><strong>Trạng thái ứng</strong></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Thông tin Ứng lương</div>
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <td><strong>Số tiền xin ứng</strong></td>
                                <td>1,000,000 VNĐ</td>
                                <td><strong>Phí tạm tính</strong></td>
                                <td>37,500 VNĐ</td>
                            </tr>
                            <tr>
                                <td><strong>Ngày xin ứng</strong></td>
                                <td>09:35 06/01/2023</td>
                                <td><strong>Ngày công</strong></td>
                                <td>3.49</td>
                            </tr>
                            <tr>
                                <td><strong>Lương cơ bản</strong></td>
                                <td>15,000,000 VNĐ</td>
                                <td><strong>Lương ngày công</strong></td>
                                <td>2,227,660 VNĐ</td>
                            </tr>
                            <tr>
                                <td><strong>Ngân hàng</strong></td>
                                <td>05712365751-NGUYEN THANH DAT- TCB</td>
                                <td><strong>Lý do ứng</strong></td>
                                <td>Học tập</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <AcceptSalayApprovalComponent />
        </>
    );
};

export default SalaryApprovalDetailComponent;

