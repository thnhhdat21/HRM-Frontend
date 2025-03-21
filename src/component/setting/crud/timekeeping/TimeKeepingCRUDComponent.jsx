import React, { useRef } from 'react';
import ContextMenuTimeKeeping from '../../../../contextmenu/ContextMenuTimeKeeping';
import useRightClickMenu from '../../../../hooks/useRightClickMenu';

const TimeKeepingCRUDComponent = () => {
    const tableRef = useRef()
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 140);
    return (
        <>
            <div class="modal fade" id="crud_time_keeping">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới loại hợp đồng lao động</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 overflow-modal-crud">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mã ca</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên ca</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex right-content align-items-center">
                                                        <div class="form-check form-check-md form-switch me-2">
                                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                                        </div>
                                                        <span class="form-label mb-0">Nhiều khoảng làm việc</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Nếu chọn nhiều khoảng làm việc */}
                                            {/* <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <table class="table borderless table-create-profile">
                                                            <tr>
                                                                <th style={{ width: "32%" }}>Từ giờ</th>
                                                                <th style={{ width: "32%" }}>Đến giờ</th>
                                                                <th style={{ width: "32%" }}>Qua ngày</th>
                                                                <th style={{ width: "4%" }}></th>
                                                            </tr>
                                                            <tr>
                                                                <td><input type="text" className="form-control" placeholder="Nhập lương" /></td>
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
                                            </div> */}
                                            <div className='row'>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ vào <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ ra </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Qua ngày </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ nghỉ </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Kết thúc nghỉ </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tổng giờ </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tổng công <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Checkin trước <span class="text-danger">
                                                            *</span></label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Checkout sau </label>
                                                        <input type="text" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Tự động</label>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex right-content align-items-center">
                                                        <div class="form-check form-check-md form-switch me-2">
                                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                                        </div>
                                                        <span class="form-label mb-0">Chấm công tự động</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex right-content align-items-center">
                                                        <div class="form-check form-check-md form-switch me-2">
                                                            <input class="form-check-input me-2" type="checkbox" role="switch" />
                                                        </div>
                                                        <span class="form-label mb-0">Checkout tự động áp dụng cho vị trí</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Ví trí</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Ghi chú</label>
                                                        <input type="email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary">THÊM MỚI </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ContextMenuTimeKeeping x={x} y={y} showMenu={showMenu} />
        </>
    );
};

export default TimeKeepingCRUDComponent;

