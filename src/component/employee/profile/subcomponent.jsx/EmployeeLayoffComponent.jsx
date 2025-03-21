import React from 'react';

const EmployeeLayoffComponent = () => {
    return (
        <>
            <div class="mt-5 tab-pane fade " id="profile-layoff">
                <div class="profile-container">
                    <div class="profile-header">Thủ tục thôi việc</div>
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <td><input type="checkbox" /> Bàn giao công việc</td>
                                <td><input type="checkbox" checked /> Bàn giao tài sản</td>
                                <td><input type="checkbox" checked /> Chốt và trả sổ bảo hiểm</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox" checked /> Khóa tài khoản HR</td>
                                <td><input type="checkbox" /> Khóa tài khoản Mail</td>
                                <td><input type="checkbox" /> Thanh toán công nợ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EmployeeLayoffComponent;
