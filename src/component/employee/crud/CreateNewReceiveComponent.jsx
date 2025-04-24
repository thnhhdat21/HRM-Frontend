import React from 'react';

const CreateNewReceiveComponent = () => {
    return (
        <>
            <div class="tab-pane fade" id="create-employee-receive">
                <div className='row mt-4'>
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /> Ảnh cá nhân</td>
                                <td><input type="checkbox" checked /> Bản sao giấy khai sinh</td>
                                <td><input type="checkbox" checked /> Bản sao sổ hộ khẩu</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" checked /> Bằng cấp, trình độ chuyên môn</td>
                                <td><input type="checkbox" /> Bảo hiểm xã hội</td>
                                <td><input type="checkbox" /> Cam kết chính thức</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /> Cam kết làm việc</td>
                                <td><input type="checkbox" /> Cam kết thai sản</td>
                                <td><input type="checkbox" /> Cam kết thử việc</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" checked /> CMT/Căn cước/HC</td>
                                <td><input type="checkbox" /> Cơ cấu lương</td>
                                <td><input type="checkbox" checked /> Giấy khám sức khỏe</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /> Hợp đồng lao động</td>
                                <td><input type="checkbox" /> Information security agreement</td>
                                <td><input type="checkbox" /> Quyết định bổ nhiệm</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" checked /> Quyết định chấm dứt HĐLĐ</td>
                                <td><input type="checkbox" checked /> Sơ yếu lý lịch</td>
                                <td><input type="checkbox" checked /> Tạo tài khoản email</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" /> Test 1</td>
                                <td><input type="checkbox" /> Thư mời làm việc</td>
                                <td><input type="checkbox" /> Đánh giá thử việc</td>
                            </tr>
                            <tr>
                                <td colSpan="3"><input type="checkbox" /> Đề xuất điều chỉnh chức vụ, thu nhập</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CreateNewReceiveComponent;

