const UpdateJobHistoryComponent = () => {
    return (
        <>
            <div className="modal fade" id="update_job_history">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-update-job-history">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Cập nhật lịch sử công việc</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active">
                                    <div className="modal-body pb-0 ">
                                        <div className="row">
                                            <div className="col-md-1-5">
                                                <div className="mb-3">
                                                    <label className="form-label">Từ ngày </label>
                                                    <input type="date" className="form-control" placeholder='Nhập tên chức vụ' />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Trạng thái công việc </label>
                                                    <input type="text" className="form-control" placeholder='Cấp bậc' />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Phòng ban</label>
                                                    <input type="text" className="form-control" placeholder='Nhập mô tả' />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Vị trí công việc</label>
                                                    <input type="text" className="form-control" placeholder='Nhập mô tả' />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Chức vụ</label>
                                                    <input type="text" className="form-control" placeholder='Nhập mô tả' />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label className="form-label">Lý do nghỉ</label>
                                                    <input type="text" className="form-control" placeholder='Nhập mô tả' />
                                                </div>
                                            </div>
                                            <div className="col-md-0 d-flex align-items-center">
                                                <i className="ti ti-x mt-3" style={{ fontSize: "20px" }}></i>
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <div className="mb-2 circle">
                                                <i className='ti ti-plus' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary">CẬP NHẬT </button>
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

export default UpdateJobHistoryComponent;

