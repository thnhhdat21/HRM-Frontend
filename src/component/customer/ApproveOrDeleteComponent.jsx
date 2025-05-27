import { APPROVE, CLOSING, DELETE, LOCK, NO_APPROVE, UNLOCK } from '../../util/ApproveOrDeleteUtil';

const ApproveOrDeleteComponent = ({ handleClick, type }) => {
    return (
        <>
            <div className="modal fade" id="approve_delete_component">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-accepts">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">

                                <h4 className="modal-title me-2">{
                                    (type === DELETE && "Bạn có chắc chắn xóa?") ||
                                    (type === APPROVE && "Duyệt...") ||
                                    (type === NO_APPROVE && "Không duyệt...") ||
                                    (type === CLOSING && "Chốt ...") ||
                                    (type === LOCK && "Khóa tài khoản ...") ||
                                    (type === UNLOCK && "Mở khóa tài khoản ...")
                                } </h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        {type !== DELETE && (
                            <div className="modal-body">
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Ý kiến</label>
                                            <input type="text" className="form-control" placeholder='Thêm ý kiến hoặc bỏ trống' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="modal-body d-flex align-items-center justify-content-center gap-3 border-top">
                            <button type="button" className="btn btn-outline-light border w-50"
                                data-bs-dismiss="modal">KHÔNG</button>
                            <button type="submit" className="btn btn-primary w-50" onClick={() => {
                                if (typeof handleClick === "function") {
                                    handleClick();
                                }
                            }}>
                                {
                                    (type === DELETE && "XÓA") ||
                                    (type === APPROVE && "DUYỆT") ||
                                    (type === NO_APPROVE && "KHÔNG DUYỆT") ||
                                    (type === CLOSING && "CHỐT") ||
                                    (type === LOCK && "KHÓA ...") ||
                                    (type === UNLOCK && "MỞ KHÓA ...")
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

