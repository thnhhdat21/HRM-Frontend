import React from 'react';

const RewardDecisionComponent = () => {
    return (
        <>
            <div class="modal fade" id="create_reward_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Quyết định khen thưởng</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body ">
                            <div class="row ">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Số quyết định </label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày quyết định </label>
                                        <input type="date" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Cấp quyết định </label>
                                        <input type="email" class="form-control" placeholder='Mã hợp đồng' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="form-check form-check-md">
                                        <input class="form-check-input" type="checkbox" id="select-all" />
                                        <label class="form-label">Phòng ban </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Nhân viên </label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <div class="mb-3">
                                        <label class="form-label">Khen thưởng </label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="mb-3">
                                        <label class="form-label">Số tiền </label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Hình thức </label>
                                        <input type="email" class="form-control" placeholder='Nhập tên chức vụ' />
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
            </div>
        </>
    );
};

export default RewardDecisionComponent;

