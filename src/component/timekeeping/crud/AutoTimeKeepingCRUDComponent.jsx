import React from 'react';

const AutoTimeKeepingCRUDComponent = () => {
    return (
        <>
            <div class="modal fade" id="crud_auto_timekeeping">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-update-job-history">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Cập nhật tự động chấm công</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 ">
                                        <div className='row' style={{ marginLeft: "10px" }}>
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <table class="table borderless table-create-profile">
                                                        <tr>
                                                            <th style={{ width: "10%" }}>Mã NV</th>
                                                            <th>Nhân sự</th>
                                                            <th>Từ ngày</th>
                                                            <th>Đến ngày</th>
                                                            <th>Phòng ban</th>
                                                            <th>Chức vụ</th>
                                                            <th style={{ width: "5%" }}></th>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="text" className="form-control" placeholder="" /></td>
                                                            <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
                                                            <td><input type="date" className="form-control" placeholder="Nhập lương" /></td>
                                                            <td><input type="date" className="form-control" placeholder="Nhập lương" /></td>
                                                            <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
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
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary">CẬP NHẬT </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AutoTimeKeepingCRUDComponent;

