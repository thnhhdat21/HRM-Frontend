import React from 'react';

const AcceptDecisionComponent = () => {
    return (
        <>
            <div class="modal fade" id="accept_decision">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-accepts">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Duyệt đơn ...</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">KHÔNG DUYỆT</button>
                            <button type="submit" class="btn btn-primary">DUYỆT</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AcceptDecisionComponent;

