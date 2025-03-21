import React from 'react';

const ResumeComponent = () => {
    return (
        <>
            <div class="mt-5 tab-pane fade show active" id="profile-resume">
                <div class="profile-container">
                    <div class="profile-header">Sơ yếu lý lịch</div>
                    <div class="profile-info">
                        <img src="./assets/my-img/anh-the-2024.jpg" alt="Ảnh nhân viên" class="profile-img" />
                        <table class="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <td><strong>Họ và tên</strong></td>
                                    <td>Lê Việt Thắng</td>
                                    <td><strong>Mã NV / Mã chấm công</strong></td>
                                    <td>00708 / HN.291</td>
                                </tr>
                                <tr>
                                    <td><strong>Ngày sinh</strong></td>
                                    <td>01/11/1983</td>
                                    <td><strong>Giới tính</strong></td>
                                    <td>Nam</td>
                                </tr>
                                <tr>
                                    <td><strong>Tình trạng hôn nhân</strong></td>
                                    <td>Kết hôn</td>
                                    <td><strong>Quốc tịch</strong></td>
                                    <td>Việt Nam</td>
                                </tr>
                                <tr>
                                    <td><strong>Điện thoại</strong></td>
                                    <td>0912345678</td>
                                    <td><strong>Email</strong></td>
                                    <td>giamdoc@gmail.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Thông tin khác</div>
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <td><strong>Dân tộc</strong></td>
                                <td>Kinh</td>
                                <td><strong>Tôn giáo</strong></td>
                                <td>Không</td>
                            </tr>
                            <tr>
                                <td><strong>CMT/Căn cước/Hộ chiếu</strong></td>
                                <td>194533902</td>
                                <td><strong>Ngày cấp, Nơi cấp</strong></td>
                                <td>26/03/2011, tại công an Thành phố Hà Nội</td>
                            </tr>
                            <tr>
                                <td><strong>Nơi sinh</strong></td>
                                <td>Thành phố Hà Nội, Việt Nam</td>
                                <td><strong>Nguyên quán</strong></td>
                                <td>Tỉnh Hà Giang, Việt Nam</td>
                            </tr>
                            <tr>
                                <td><strong>[Thường trú] Địa chỉ</strong></td>
                                <td>Tầng 3, G2 Five Star Garden, số 2 Kim Giang, Quận Thanh Xuân, Hà Nội</td>
                                <td><strong>[Chỗ ở hiện nay] Địa chỉ</strong></td>
                                <td>Phường Minh Khai, Quận Hai Bà Trưng, Hà Nội</td>
                            </tr>
                            <tr>
                                <td><strong>Mã số thuế cá nhân</strong></td>
                                <td>1942421249</td>
                                <td><strong>TK ngân hàng</strong></td>
                                <td>LÊ VIỆT THẮNG, 129492212249, Ngân hàng quân đội</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="profile-container mt-4">
                    <div class="profile-header">Thông tin gia đình & người phụ thuộc</div>
                    <table class="table borderless profile-details">
                        <tr>
                            <th>Mối quan hệ</th>
                            <th>Họ và tên</th>
                            <th>Năm sinh</th>
                            <th>CMT/Căn cước</th>
                            <th>Ngày cấp</th>
                            <th>Nơi cấp</th>
                            <th>Điện thoại</th>
                            <th>Người phụ thuộc</th>
                            <th>Từ ngày</th>
                            <th>Đến ngày</th>
                            <th>Mã số thuế</th>
                            <th>Ghi chú</th>
                        </tr>
                        <tr>
                            <td>Bố</td>
                            <td>Nguyễn Tự Long</td>
                            <td>01/01/1950</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>0987654349</td>
                            <td>Không</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Mẹ</td>
                            <td>Nguyễn Thị Thương</td>
                            <td>03/07/1957</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>0987678897</td>
                            <td>Có</td>
                            <td>01/02/2021</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Trình độ học vấn</div>
                    <table class="table borderless profile-details">
                        <tr>
                            <th>Từ tháng</th>
                            <th>Đến tháng</th>
                            <th>Trình độ học vấn</th>
                            <th>Nơi đào tạo</th>
                            <th>Chuyên ngành</th>
                            <th>Hình thức đào tạo</th>
                        </tr>
                        <tr>
                            <td>08/2015</td>
                            <td></td>
                            <td></td>
                            <td>Đại học Kinh tế Quốc dân</td>
                            <td>Quản trị kinh doanh</td>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Kinh nghiệm làm việc</div>
                    <table class="table borderless profile-details">
                        <tr>
                            <th>Từ tháng</th>
                            <th>Đến tháng</th>
                            <th>Công ty</th>
                            <th>Vị trí</th>
                            <th>Người tham chiếu</th>
                            <th>Điện thoại</th>
                            <th>Mô tả</th>
                        </tr>
                        <tr>
                            <td>01/2019</td>
                            <td></td>
                            <td>Công ty cổ phần Workway</td>
                            <td>Giám đốc</td>
                            <td></td>
                            <td>0987899001</td>
                            <td>Giám đốc điều hành</td>
                        </tr>
                    </table>
                </div>

                <div class="profile-container mt-4">
                    <div class="profile-header">Ảnh chứng minh thư nhân dân</div>
                    <div class="image-section">
                        <div class="image-box">
                            <p>Ảnh CCCD/CMND mặt trước</p>
                            <img src="front_id.jpg" alt="Ảnh mặt trước" />
                        </div>
                        <div class="image-box">
                            <p>Ảnh CCCD/CMND mặt sau</p>
                            <img src="back_id.jpg" alt="Ảnh mặt sau" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumeComponent;

