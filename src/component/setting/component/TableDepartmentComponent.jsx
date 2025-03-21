import React from 'react';

const TableDepartmentComponent = () => {
    return (
        <>
            <table class="table" id='myTable'>
                <thead class="thead-light">
                    <tr>
                        <th></th>
                        <th>Tiêu đề</th>
                        <th>Cấp bậc</th>
                        <th>Khối nghiệp vụ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><i className='ti ti-folder-open' /> <span class="highlight">A. Công ty Cổ phần 1Office</span></td>
                        <td>Công ty</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;1. Ban Giám đốc</td>
                        <td>Phòng ban</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;2. Ban thư ký</td>
                        <td>Phòng ban</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><i className='ti ti-folder-open' /> 3. Trụ sở Hà Nội</td>
                        <td>Chi nhánh công ty</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;<i className='ti ti-folder-open' /> 3.1. Phòng Hành Chính Nhân Sự</td>
                        <td>Phòng ban</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.1. Nhóm Hành chính & Lễ tân</td>
                        <td>Phòng ban</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1.2. Nhóm Tuyển dụng</td>
                        <td>Phòng ban</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default TableDepartmentComponent;

