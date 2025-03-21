import React from 'react';

const CreateNewInsuranceComponent = () => {
    return (
        <>
            <div class="tab-pane fade" id="create-employee-insurance">
                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin bảo hiểm</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số sổ bảo hiểm </label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Trạng thái sổ </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label class="form-label">Pháo nhân đóng </label>
                            <input type="email" class="form-control" placeholder='Pháp nhân đóng' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số thẻ BHYT </label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Mã tỉnh cấp </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-8">
                        <div class="mb-3">
                            <label class="form-label">ĐK khám chữa bệnh </label>
                            <input type="email" class="form-control " placeholder='' />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Nghiệp vụ báo tăng</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">NV hoàn thiện HS</label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">NV hoàn thiện HS </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày nhận thẻ BHYT </label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày trả thẻ BHYT </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Nghiệp vụ báo giảm</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày nhận sổ BH từ NLĐ</label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">NV hoàn thiện HS </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày nhận sổ BH đã chốt </label>
                            <input type="email" class="form-control" placeholder='Nhập họ và tên' />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày trả sổ cho NLĐ </label>
                            <input type="text" class="form-control" placeholder='Cấp bậc' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewInsuranceComponent;

