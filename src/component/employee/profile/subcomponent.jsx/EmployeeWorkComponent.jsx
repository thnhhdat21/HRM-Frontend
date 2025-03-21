import React from 'react';

const EmployeeWorkComponnent = () => {
    return (
        <div class="mt-5 tab-pane fade" id="profile-work" role="tabpanel">
            <div class="profile-container">
                <div class="profile-header">Công việc</div>
                <div class="profile-info">
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th>Trạng thái</th>
                                <td><span class="badge">Đang làm việc</span></td>
                                <th>Tình trạng hồ sơ</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Phòng ban</th>
                                <td>CÔNG TY CỔ PHẦN 1OFFICE &rsaquo; Ban Giám đốc</td>
                                <th>Vị trí</th>
                                <td>Giám đốc kinh doanh</td>
                            </tr>
                            <tr>
                                <th>Chức vụ</th>
                                <td>Giám đốc</td>
                                <th>Ngày vào</th>
                                <td>01/01/2010</td>
                            </tr>
                            <tr>
                                <th>Ngày ký HĐLĐ chính thức</th>
                                <td>01/01/2012</td>
                                <th>Tên hợp đồng</th>
                                <td>Hợp đồng vô thời hạn</td>
                            </tr>
                            <tr>
                                <th>Nơi làm việc</th>
                                <td>G2, Five Star, Số 2 Kim Giang, Thanh Xuân, Hà Nội</td>
                                <th>Ngạch lương</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Cấp bậc</th>
                                <td>Hạng A</td>
                                <th>Trung tâm chi phí</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>Tài khoản 1Office</th>
                                <td><a href="#">giamdoc</a></td>
                                <th>Nhóm người dùng</th>
                                <td>Nhóm admin (ENTERPRISE)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="profile-container mt-4">
                <div class="profile-header">Lịch sử công việc</div>
                <table class="table borderless profile-details">
                    <tbody>
                        <tr>
                            <th>Từ ngày</th>
                            <th>Trạng thái</th>
                            <th>Phòng ban</th>
                            <th>Vị trí</th>
                            <th>Chức vụ</th>
                            <th>Hợp đồng hiện tại</th>
                            <th>Mã HĐ</th>
                        </tr>
                        <tr>
                            <td>01/01/2013</td>
                            <td><span class="badge">Đang làm việc</span></td>
                            <td>Ban Giám đốc</td>
                            <td>Giám đốc kinh doanh</td>
                            <td>Giám đốc</td>
                            <td>Hợp đồng vô thời hạn</td>
                            <td>00708-03</td>
                        </tr>
                        <tr>
                            <td>02/09/2012</td>
                            <td><span class="badge">Đang làm việc</span></td>
                            <td>CÔNG TY CỔ PHẦN 1OFFICE</td>
                            <td></td>
                            <td></td>
                            <td>Hợp đồng vô thời hạn</td>
                            <td>00708-03</td>
                        </tr>
                        <tr>
                            <td>01/03/2012</td>
                            <td><span class="badge">Đang làm việc</span></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Hợp đồng 6 tháng lần 1</td>
                            <td>00708-01</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeWorkComponnent;