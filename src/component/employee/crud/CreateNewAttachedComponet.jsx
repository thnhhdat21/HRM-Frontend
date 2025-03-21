import React from 'react';
import '../css/profile.css';

const CreateNewAttachedComponet = () => {
    return (
        <>
            <div class="tab-pane fade" id="create-employee-attached">
                <div className='row mt-4'>
                    <div class="custom-datatable-filter table-responsive">
                        <div class="table-container">
                            <table class="table" id='myTable'>
                                <thead class="thead-light">
                                    <tr>
                                        <th class="no-sort">
                                            <div class="form-check form-check-md">
                                                <input class="form-check-input" type="checkbox" id="select-all" />
                                            </div>
                                        </th>
                                        <th>Tiêu đề</th>
                                        <th>Dung lượng</th>
                                        <th>Định dạng</th>
                                        <th>Cập nhật</th>
                                        <th>Đưa lên</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-md">
                                                <input class="form-check-input" type="checkbox" />
                                            </div>
                                        </td>
                                        <td><a href="employee-details.html">1</a></td>
                                        <td>820.11 KB</td>
                                        <td>jpg</td>
                                        <td>16:48 23/09/2021</td>
                                        <td>Nguyễn Thành Đạt</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="form-check form-check-md">
                                                <input class="form-check-input" type="checkbox" />
                                            </div>
                                        </td>
                                        <td><a href="employee-details.html">hình ảnh đại diện nhân viên</a></td>
                                        <td>272.29 KB</td>
                                        <td>jpg</td>
                                        <td>16:48 23/09/2021</td>
                                        <td>Nguyễn Thành Đạt</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewAttachedComponet;

