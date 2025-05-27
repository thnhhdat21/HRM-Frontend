import { useEffect, useState } from 'react';
import { responseData, responseUpdate } from '../../../util/ResponseUtil';
import { getInsuranceSetting, updateInsuranceSetting } from '../../../service/Manage/InsuranceSettingService';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';

const SettingInsuranceComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Cài đặt bảo hiểm", subTitle: "" }))
    const [insuranceSetting, setInsuranceSetting] = useState({});
    const [values, setValues] = useState({
        id: "",
        singedContract: "",
        returnedLeaveTmp: "",
        leaveTmp: "",
        unpaidLeave: "",
    })
    useEffect(() => {
        getInsuranceSetting().then((response) => {
            responseData(response, setInsuranceSetting)
            if (response.data.code === 1000) {
                const insuranceSetting = response.data.data
                setValues({
                    id: insuranceSetting.id,
                    singedContract: insuranceSetting.singedContract,
                    returnedLeaveTmp: insuranceSetting.returnedLeaveTmp,
                    leaveTmp: insuranceSetting.leaveTmp,
                    unpaidLeave: insuranceSetting.unpaidLeave,
                })
            }
        })
    }, [])

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
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN TĂNG BẢO HIỂM</h5>
                                <div className='date-increase'>
                                    <p>Tăng lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là tăng số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Ký hợp đồng lao động</h5>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input className="form-check-input me-2" type="checkbox" role="switch" name='singedContract' checked={values.singedContract} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Nghỉ tạm thời quay trở lại làm việc</h5>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input className="form-check-input me-2" type="checkbox" role="switch" name='returnedLeaveTmp' checked={values.returnedLeaveTmp} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                            <div className="border-bottom mb-3 pb-3">
                                <h5>ĐIỀU KIỆN GIẢM BẢO HIỂM</h5>
                                <div className='date-increase'>
                                    <p>Giảm lao động đóng BNXH, BHYT, BHTN trong trường hợp này được hiểu là giảm số lượng người lao động tham gia đóng BHXH, BHYT, BHTN</p>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Nghỉ tạm thời</h5>
                                        <div className='date-increase'>
                                            <p>Nghỉ ốm, Nghỉ thai sản, ....</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input className="form-check-input me-2" type="checkbox" role="switch" name='leaveTmp' checked={values.leaveTmp} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Nghỉ không lương</h5>
                                        <div className='date-increase'>
                                            <p>Nghỉ quá số ngày một tháng theo quy định của nhà nước là 14 ngày</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input className="form-check-input me-2" type="checkbox" role="switch" name='unpaidLeave' checked={values.unpaidLeave} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer mt-5">
                        <button type="button" className="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <div type="submit" className="btn btn-primary" onClick={handleUpdateInsuranceSetting}>CẬP NHẬT</div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingInsuranceComponent;

