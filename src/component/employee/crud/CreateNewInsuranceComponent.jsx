import React from 'react';

const CreateNewInsuranceComponent = ({
    insurance,
    setInsurance,
    isCreateInsurance,
    setIsCreateInsurance,
}) => {

    const onChangeInput = (e) => {
        setInsurance({ ...insurance, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div class="tab-pane fade" id="create-employee-insurance">
                <div class="col-md-12 mt-2" style={{ fontSize: "20px" }} >
                    <i className={`${isCreateInsurance ? "ti ti-chevron-down" : "ti ti-chevron-up"}  text-danger`} /> <label class="form-label text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsCreateInsurance(!isCreateInsurance)}
                    >Thông tin bảo hiểm</label>
                </div>
                <div className={`${isCreateInsurance ? "" : "hidden"} row mt-2 `}>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số sổ bảo hiểm </label>
                            <input type="text" class="form-control" placeholder='Nhập số sổ bảo hiểm' name='insuranceNumber' value={insurance.insuranceNumber} onChange={onChangeInput} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số thẻ BHYT </label>
                            <input type="text" class="form-control" placeholder='Nhập số thẻ BHYT' name='insuranceCard' value={insurance.insuranceCard} onChange={onChangeInput} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewInsuranceComponent;

