import React from 'react';

const HistoryAssetComponent = () => {
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
                        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#accept_salary_approval">
                                <i className='ti ti-share' style={{ fontSize: "20px", }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Cấp phát</span>
                            </div>
                            {/* <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }}>
                                <i className='ti ti-arrow-back-up' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Thu hồi</span>
                            </div> */}
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }}>
                                <i className='ti ti-arrow-up' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Báo tăng</span>
                            </div>

                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }}>
                                <i className='ti ti-arrow-down' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Báo mất</span>
                            </div>
                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", marginLeft: "15px" }}>
                                <i className='ti ti-shopping-cart' style={{ fontSize: "20px" }} />
                                <span style={{ whiteSpace: 'nowrap' }}>Thanh lý</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div style={{ marginTop: "80px" }}>
                <div class="profile-container">
                    <div class="profile-info">
                        <table class="table" id='myTable'>
                            <thead class="thead-light">
                                <tr>
                                    <th>Ngày</th>
                                    <th>Tác vụ</th>
                                    <th>Tồn đầu kỳ</th>
                                    <th>Số lượng</th>
                                    <th>Tồn cuối kỳ</th>
                                    <th>Chi phí phát sinh</th>
                                    <th>Mô tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>
                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>
                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>
                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>

                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>

                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                                <tr>

                                    <td><span>Hợp đồng thử việc</span></td>
                                    <td><span>Hợp đồng xác định thời hạn</span></td>
                                    <td><span>có</span></td>
                                    <td><span>2 tháng</span></td>
                                    <td><span className='badge'>Hoạt động</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryAssetComponent;