import React from 'react';

const ContractCRUDComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="content">
                    <div class="card card-body">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <h4 className='mb-3'>Tạo hợp đồng mới</h4>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin chung</label>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-9">
                                <div class="mb-3">
                                    <label class="form-label">Nhân sự </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">Mã hợp đồng </label>
                                    <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Loại hợp đồng </label>
                                    <input type="text" class="form-control" placeholder='Cấp bậc' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Phòng ban </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Vị trí </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Chức vụ </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Hệ số tay nghề </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Nơi làm việc </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label">Hình thức </label>
                                    <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Hiệu lực từ ngày </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Đến ngày </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Ngày ký </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Người ký </label>
                                    <input type="text" class="form-control " placeholder='' />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                            <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Lương và phụ cấp mới</label>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Từ ngày </label>
                                    <input type="date" class="form-control " placeholder='' />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="mb-3">
                                    <label class="form-label">Ghi chú </label>
                                    <input type="text" class="form-control " placeholder='Việt ghi chú' />
                                </div>
                            </div>
                        </div>


                        <div className='row' style={{ marginLeft: "0px" }}>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <table class="table borderless table-create-profile">
                                        <tr>
                                            <th>Hình thức lương</th>
                                            <th style={{ width: "36%" }}>Số tiền</th>
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
                                            <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className='row' style={{ marginLeft: "0px" }}>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <table class="table borderless table-create-profile">
                                        <tr>
                                            <th>Phụ cấp</th>
                                            <th style={{ width: "30%" }}>Số tiền</th>
                                            <th style={{ width: "5%" }}></th>
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
                                            <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                            <td>
                                                <div class="col-md-1 d-flex align-items-center">
                                                    <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="col-md-1 mt-2" style={{ marginLeft: "10px" }}>
                                        <div class="mb-2 circle">
                                            <i className='ti ti-plus' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ContractCRUDComponent;

