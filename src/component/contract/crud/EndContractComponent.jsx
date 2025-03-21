import React from 'react';
import '../css/contract-style.css'

const EndContractComponent = () => {
    return (
        <>
            <div class="modal fade" id="end_contract">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h5 class="modal-title me-2">Thanh lý hợp đồng</h5>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày thanh lý </label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do thanh lý </label>
                                        <select className="form-control">
                                            <option value="" selected hidden>Chọn lý do thanh lý</option>
                                            <option value="">Thôi việc</option>
                                            <option value="Mẹ">Ký hợp đồng mới</option>
                                            <option value="Anh trai">Quyết định chấm dứt HĐLĐ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" class="btn btn-primary">CẬP NHẬT </button>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
};

export default EndContractComponent;

