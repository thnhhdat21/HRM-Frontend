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
            <div className="tab-pane fade" id="create-employee-insurance">
                <div className="col-md-12 mt-2" style={{ fontSize: "20px" }} >
                    <i className={`${isCreateInsurance ? "ti ti-chevron-down" : "ti ti-chevron-up"}  text-danger`} /> <label className="form-label text-danger"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setIsCreateInsurance(!isCreateInsurance)}
                    >Thông tin bảo hiểm</label>
                </div>
                <div className={`${isCreateInsurance ? "" : "hidden"} row mt-2 `}>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label className="form-label">Số sổ bảo hiểm </label>
                            <input type="text" className="form-control" placeholder='Nhập số sổ bảo hiểm' name='insuranceNumber' value={insurance.insuranceNumber} onChange={onChangeInput} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label className="form-label">Số thẻ BHYT </label>
                            <input type="text" className="form-control" placeholder='Nhập số thẻ BHYT' name='insuranceCard' value={insurance.insuranceCard} onChange={onChangeInput} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewInsuranceComponent;

