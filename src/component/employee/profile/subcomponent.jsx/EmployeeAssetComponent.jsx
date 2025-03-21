import React from 'react';

const EmployeeAssetComponent = () => {
    return (
        <>
            <div class="mt-5 tab-pane fade " id="profile-asset">
                <div class="profile-container">
                    <table class="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th>Mã tài sản</th>
                                <th>Tên tài sản</th>
                                <th>Mã cấp</th>
                                <th>Ngày cấp</th>
                                <th>Mã thu</th>
                                <th>Số lượng</th>
                                <th>Ngày thu</th>
                                <th>Tình trạng</th>
                            </tr>
                            <tr>
                                <td>TS00189</td>
                                <td>Thinkpad X1 carbon Gen 8</td>
                                <td>CP35/2021</td>
                                <td>24/09/2024</td>
                                <td>-</td>
                                <td>1</td>
                                <td>-</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>TS00174</td>
                                <td>Ghế xoay</td>
                                <td>CP35/2021</td>
                                <td>24/09/2024</td>
                                <td>-</td>
                                <td>1</td>
                                <td>-</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>TS00189</td>
                                <td>Máy in</td>
                                <td>CP35/2021</td>
                                <td>24/09/2024</td>
                                <td>-</td>
                                <td>1</td>
                                <td>-</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default EmployeeAssetComponent;

