import React, { useEffect, useState } from 'react';
import './css/setting-style.css';
import { Link, useNavigate } from 'react-router-dom';
import { responseData, responseUpdate } from '../../util/ResponseUtil';
import { getInsuranceSetting, updateInsuranceSetting } from '../../service/InsuranceSettingService';

const SettingInsuranceComponent = () => {
    const [insuranceSetting, setInsuranceSetting] = useState({});
    const [values, setValues] = useState({
        id: "",
        closingDateIncrease: "",
        singedContract: "",
        returnedFromMaternity: "",
        returnedFromUnpaidLeave: "",
        increasedContribution: "",
        closingDateDecrease: "",
        contractTerminated: "",
        maternityLeave: "",
        decreasedContribution: "",
        unpaidLeave: "",
        maxUnpaidLeaveDay: ""
    })
    useEffect(() => {
        getInsuranceSetting().then((response) => {
            responseData(response, setInsuranceSetting)
            if (response.data.code === 1000) {
                const insuranceSetting = response.data.data
                setValues({
                    id: insuranceSetting.id,
                    closingDateIncrease: insuranceSetting.closingDateIncrease,
                    singedContract: insuranceSetting.singedContract,
                    returnedFromMaternity: insuranceSetting.returnedFromMaternity,
                    returnedFromUnpaidLeave: insuranceSetting.returnedFromUnpaidLeave,
                    increasedContribution: insuranceSetting.increasedContribution,
                    closingDateDecrease: insuranceSetting.closingDateDecrease,
                    contractTerminated: insuranceSetting.contractTerminated,
                    maternityLeave: insuranceSetting.maternityLeave,
                    decreasedContribution: insuranceSetting.decreasedContribution,
                    unpaidLeave: insuranceSetting.unpaidLeave,
                    maxUnpaidLeaveDay: insuranceSetting.maxUnpaidLeaveDay
                })
            }
        })
    }, [])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onChangeSwitch = (e) => {
        setValues({ ...values, [e.target.name]: !values[e.target.name] })
    }

    const handleUpdateInsuranceSetting = () => {
        const hasUpdate = checkUpdate()
        updateInsuranceSetting(values, hasUpdate).then((response) => {
            responseUpdate(response, "Cập nhật thành công", setInsuranceSetting, getInsuranceSetting)
        })
    }

    const checkUpdate = () => {
        return Object.keys(insuranceSetting).some(key => {
            if (key === "id") {
                return
            }
            return insuranceSetting[key] !== values[key]
        });
    };


    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN TĂNG BẢO HIỂM</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày chốt tăng hàng tháng</h5>
                                        <div className='date-increase'>
                                            <p>Tăng lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là tăng số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                            <p>Những phát sinh này tăng trước ngày này sẽ báo tăng tháng này, còn sau ngày này sẽ báo tăng tháng sau.</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input min="0" style={{ direction: 'rtl' }} type="number" className='form-control' name='closingDateIncrease' value={values.closingDateIncrease} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ký hợp đồng lao động</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='singedContract' checked={values.singedContract} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ thai sản quay lại làm việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='returnedFromMaternity' checked={values.returnedFromMaternity} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ không lương theo quy định (đã báo giảm) quay trở lại làm việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='returnedFromUnpaidLeave' checked={values.returnedFromUnpaidLeave} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Tăng mức đóng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='increasedContribution' checked={values.increasedContribution} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN GIẢM BẢO HIỂM</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày chốt giảm hàng tháng</h5>
                                        <div className='date-increase'>
                                            <p>Giảm lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là giảm số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                            <p>Những phát sinh này giảm trước ngày này sẽ báo tăng tháng này, còn sau ngày này sẽ báo tăng tháng sau.</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input min="0" style={{ direction: 'rtl' }} type="number" className='form-control' name='closingDateDecrease' value={values.closingDateDecrease} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Hợp đồng lao động được đóng bảo hiểm nghỉ việc</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='contractTerminated' checked={values.contractTerminated} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ thai theo chế độ</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='maternityLeave' checked={values.maternityLeave} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Giảm mức đóng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='decreasedContribution' checked={values.decreasedContribution} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Nghỉ không lương</h5>
                                        <div className='date-increase'>
                                            <p>Đối với trường hợp người lao động không làm việc và không hưởng tiền lương quá số ngày nghỉ tối đa hàng tháng thì không đóng BHXH tháng đó.</p>
                                            <p>Thời gian này không được tính để hưởng BHXH.</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='unpaidLeave' checked={values.unpaidLeave} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3" style={{ marginLeft: "20px" }}>
                                        <h5 class="fw-medium mb-1">Số ngày tối đa nghỉ không lương hàng tháng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input min="0" style={{ direction: 'rtl' }} type="number" className='form-control' name='maxUnpaidLeaveDay' value={values.maxUnpaidLeaveDay} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-4">
                        <Link to={"/settings/type-insurance"} class="d-flex justify-content-between align-items-center p-3">
                            <h5>CÀI ĐẶT TỶ LỆ BẢO HIỂM</h5>
                            <i style={{ fontSize: "25px" }} className='ti ti-external-link' />
                        </Link>

                    </div>


                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <div type="submit" class="btn btn-primary" onClick={handleUpdateInsuranceSetting}>CẬP NHẬT</div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingInsuranceComponent;

