import React from 'react';

const TableBusinessBlockComponent = () => {
    return (
        <>
            <table class="table" id='myTable'>
                <thead class="thead-light">
                    <tr>
                        <th></th>
                        <th>Tên nghiệp vụ</th>
                        <th>Mã nghiệp vụ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Khối công nghệ</td>
                        <td>KCN</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Khối kinh doanh</td>
                        <td>KKD</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Khối tài chính</td>
                        <td>KTC</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default TableBusinessBlockComponent;

