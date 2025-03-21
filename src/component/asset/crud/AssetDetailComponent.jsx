import React from 'react';

const AssetDetailComponent = () => {
    return (
        <div className='page-wrapper'>
            < div class="header" style={{ marginTop: "50px", height: "55px", background: "#f8f9fa" }} >
                <div class="main-header">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                        <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                            <span>Thông tin chung</span>
                            <span className='active-category-list'>Lịch sử tồn</span>
                            <span>Đính kèm</span>
                        </div>
                    </div>
                </div>
            </div >
            <div class="mt-5">
                <div class="profile-container">
                    <div class="profile-header">Thông tin chung</div>
                    <div class="profile-info">
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th>Mã TS</th>
                                    <td>TS00123</td>
                                    <th>Tên tài sản</th>
                                    <td>Laptop</td>
                                </tr>
                                <tr>
                                    <th>Nhóm tài sản</th>
                                    <td></td>
                                    <th>Đơn vị</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Phòng ban quản lý</th>
                                    <td></td>
                                    <th>Trạng thái</th>
                                    <td>01/01/2010</td>
                                </tr>
                                <tr>
                                    <th>Ngày mua</th>
                                    <td>01/01/2012</td>
                                    <th>Thời gian BH (Tháng)</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Khấu hao (Tháng)</th>
                                    <td></td>
                                    <th>Model/Series</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Nhà cung cấp</th>
                                    <td>Địa chỉ</td>
                                    <th>Điện thoại</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>Mô tả</th>
                                    <td>gegee</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Giá trị tài sản</div>
                    <div class="profile-info">
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th>Số lượng hiện tại</th>
                                    <td>TS00123</td>
                                    <th>Nguyên giá</th>
                                    <td>Laptop</td>
                                </tr>
                                <tr>
                                    <th>Đơn giá</th>
                                    <td></td>
                                    <th>SL cấp phát</th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th >Giá trị khấu hao</th>
                                    <td></td>
                                    <th>Giá trị còn lại</th>
                                    <td>01/01/2010</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailComponent;