import React from 'react';
import { APPROVE, CLOSING, DELETE, NO_APPROVE } from '../../util/ApproveOrDeleteUtil';

const ApproveOrDeleteComponent = ({ handleClick, type }) => {
    return (
        <>
            <div class="modal fade" id="approve_delete_component">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-accepts">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">

                                <h4 class="modal-title me-2">{
                                    type === DELETE && "Bạn có chắc chắn xóa?" ||
                                    type === APPROVE && "Duyệt..." ||
                                    type === NO_APPROVE && "Không duyệt..." ||
                                    type === CLOSING && "Chốt ..."
                                } </h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        {type !== DELETE && (
                            <div class="modal-body">
                                <div class="row mt-2">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">Ý kiến</label>
                                            <input type="text" class="form-control" placeholder='Thêm ý kiến hoặc bỏ trống' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div class="modal-body d-flex align-items-center justify-content-center gap-3 border-top">
                            <button type="button" class="btn btn-outline-light border w-50"
                                data-bs-dismiss="modal">KHÔNG</button>
                            <button type="submit" class="btn btn-primary w-50" onClick={() => {
                                if (typeof handleClick === "function") {
                                    handleClick();
                                }
                            }}>
                                {
                                    type === DELETE && "XÓA" ||
                                    type === APPROVE && "DUYỆT" ||
                                    type === NO_APPROVE && "KHÔNG DUYỆT" ||
                                    type === CLOSING && "CHỐT"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApproveOrDeleteComponent;

