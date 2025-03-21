import React from 'react';

const CreateNewResumeComponent = () => {
    return (
        <>
            <div class="tab-pane fade active show" id="create-employee-resume">
                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin chung</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Họ và tên </label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Ngày sinh </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Giới tính</label>
                            <input type="text" class="form-control" placeholder='Nhập mô tả' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nơi sinh </label>
                            <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nguyên quán </label>
                            <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">CMT/Căn cước/Hộ chiếu </label>
                            <input type="email" class="form-control " placeholder='' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày cấp </label>
                            <input type="text" class="form-control " placeholder='' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Nơi cấp</label>
                            <input type="text" class="form-control " placeholder='Nhập mô tả' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label class="form-label">Ảnh chứng minh thư nhân dân</label>
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
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Quốc tế </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tình trạng hôn nhân </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Dân tộc </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tôn giáo </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số tài khoản </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tên tài khoản </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngân hàng </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Chi nhánh </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Mã số thuế cá nhân </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Mã đồng bộ </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày vào </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày ký HĐLĐ chính thức </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Trình độ học vấn </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Hệ đào tạo </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngành học </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin liên hệ</label>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Điện thoại </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Email </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nơi ở hiện tại </label>
                            <input type="email" class="form-control " placeholder='Nhập tên chức vụ' />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Thường trú </label>
                            <input type="text" class="form-control " placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin gia đình & người phụ thuộc</label>
                </div>

                <div className='row' style={{ marginLeft: "0px" }}>
                    <table class="table borderless table-create-profile">
                        <tr>
                            <th>Mối quan hệ</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Điện thoại</th>
                            <th>CMT/Căn cước</th>
                            <th>Ngày cấp</th>
                            <th>Nơi cấp</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <select className="form-control">
                                    <option value="" selected hidden>Chọn</option>
                                    <option value="Cha">Cha</option>
                                    <option value="Mẹ">Mẹ</option>
                                    <option value="Anh trai">Anh trai</option>
                                    <option value="Chị gái">Chị gái</option>
                                    <option value="Con">Con</option>
                                </select>
                            </td>
                            <td><input type="text" className="form-control" placeholder="Họ và tên" /></td>
                            <td><input type="date" className="form-control" /></td>
                            <td><input type="text" className="form-control" placeholder="Số điện thoại" /></td>
                            <td><input type="text" className="form-control" placeholder="Số CMT/CCCD" /></td>
                            <td><input type="date" className="form-control" /></td>
                            <td><input type="text" className="form-control" placeholder="Nơi cấp" /></td>
                            <td>
                                <div class="col-md-1 d-flex align-items-center">
                                    <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="col-md-1 mt-2">
                        <div class="mb-2 circle">
                            <i className='ti ti-plus' />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Quá trình học tập</label>
                </div>

                <div className='row' style={{ marginLeft: "0px" }}>
                    <table class="table borderless table-create-profile">
                        <tr>
                            <th>Từ ngày</th>
                            <th>Đến ngày</th>
                            <th>Hình thức đào tạo</th>
                            <th>Chuyên ngành</th>
                            <th>Trình độ học vấn</th>
                            <th>Nơi đào tạo</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td><input type="date" className="form-control" placeholder="Từ ngày" /></td>
                            <td><input type="date" className="form-control" placeholder="Đến ngày" /></td>
                            <td><input type="text" className="form-control" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="text" className="form-control" placeholder="" /></td>
                            <td><input type="date" className="form-control" /></td>
                            <td>
                                <div class="col-md-1 d-flex align-items-center">
                                    <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="col-md-1 mt-2">
                        <div class="mb-2 circle">
                            <i className='ti ti-plus' />
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <div class="image-section">
                                <div class="image-box">
                                    <p>Ảnh nhân viên</p>
                                    <img src="/assets/my-img/anh-the-2024.jpg" alt="Ảnh đại diện" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewResumeComponent;

