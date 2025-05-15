import { useEffect, useState } from 'react';
import './css/setting-style.css';
import { getLeaveSetting, updateLeaveSetting } from '../../service/Manage/LeaveSettingservice';
import { responseData, responseUpdate } from '../../util/ResponseUtil';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { useDispatch } from 'react-redux';

const SettingOnLeaveComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Cài đặt nghỉ phép", subTitle: "" }))
    const [leaveSetting, setLeaveSetting] = useState({})
    const [values, setValues] = useState({
        id: "",
        annualLeaveDays: "",
        seniorLeaveEnabled: false,
        seniorYears: ""
    })

    useEffect(() => {
        getLeaveSetting().then((response) => {
            responseData(response, setLeaveSetting)
            if (response.data.code === 1000) {
                const leaveSetting = response.data.data
                setValues({
                    id: leaveSetting.id || "",
                    annualLeaveDays: leaveSetting.annualLeaveDays || "",
                    seniorLeaveEnabled: leaveSetting.seniorLeaveEnabled || false,
                    seniorYears: leaveSetting.seniorYears || ""
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

    const handleUpdateLeaveSetting = (e) => {
        e.preventDefault()
        const hasUpdate = checkUpdate()
        if (hasUpdate) {
            updateLeaveSetting(values).then((response) => {
                responseUpdate(response, "Cập nhật thành công", setLeaveSetting, getLeaveSetting)
            })
        }
    }

    const checkUpdate = () => {
        return Object.keys(leaveSetting).some(key => {
            if (key === "id") {
                return
            }
            return leaveSetting[key] !== values[key]
        });
    };

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-body">
                            <div class="border-bottom mb-3 pb-3">
                                <h5>CÀI ĐẶT NGHỈ PHÉP</h5>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Số ngày nghỉ phép tối đa trong 1 năm</h5>
                                        <div className='date-increase'>
                                            <p>Theo luật những công việc hành chính là 12 ngày/năm</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input type="number" className='form-control' name='annualLeaveDays' value={values.annualLeaveDays} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Chu kỳ tính phép</h5>
                                        <div className='date-increase'>
                                            <p>Thường các doanh nghiệp có chu kỳ tính phép theo năm dương lịch.</p>
                                        </div>
                                    </div>
                                    <div className='row justify-content-end'>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="number" max={12} maxLength={2} class="form-control" name='leaveCycleStart' value={values.leaveCycleStart} onChange={onChangeInput} />
                                            </div>
                                        </div>
                                        <div class="col-md-2 d-flex align-items-center justify-content-center">
                                            <div class="mb-3">
                                                đến hết tháng
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="number" max={12} maxLength={2} class="form-control" name='leaveCycleEnd' value={values.leaveCycleEnd} onChange={onChangeInput} />
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="mb-3">
                                                <input type="text" class="form-control" name='leaveCycleUnit' value={values.leaveCycleUnit} onChange={onChangeInput} />
                                            </div>
                                        </div>
                                    </div>

                                </div> */}
                                {/* <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Cài đặt số phép được hưởng</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" checked={Number(values.accrualMethod) === 1} value={1} name='accrualMethod' onChange={onChangeInput} />
                                            <span>Mỗi tháng 1 phép, còn lại thì cộng vào tháng đầu</span>
                                        </div>
                                        <div class="form-check form-check-md me-2 mt-3">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" checked={Number(values.accrualMethod) === 2} value={2} name='accrualMethod' onChange={onChangeInput} />
                                            <span>Lấy tổng số phép tối đa 1 năm chia đều cho 12 tháng</span>
                                        </div>
                                        <div class="form-check form-check-md me-2 mt-3">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" checked={Number(values.accrualMethod) === 3} value={3} name='accrualMethod' onChange={onChangeInput} />
                                            <span>Nhận hết phép năm trong tháng đầu tiên của năm</span>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Ngày được thêm phép mới</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input type="text" className='form-control' name='receiveNewLeaveDate' value={values.receiveNewLeaveDate} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div> */}
                                <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Cho phép hưởng phép thâm niên</h5>
                                        <div className='date-increase'>
                                            <p>Cài đặt cho phép nhân viên làm lâu năm được hưởng thêm phép thâm niên</p>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='seniorLeaveEnabled' checked={values.seniorLeaveEnabled} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center flex-wrap border-bottom">
                                    <div class="mb-3">
                                        <h5 class="fw-medium mb-1">Số năm được hưởng phép thân niên</h5>
                                    </div>
                                    <div class="mb-3">
                                        <div class="form-check form-check-md form-switch me-2">
                                            <input type="text" className='form-control' name='seniorYears' value={values.seniorYears} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="card mt-4">
                        <Link to={"/settings/timekeeping"} class="d-flex justify-content-between align-items-center p-3">
                            <h5>CÀI ĐẶT CA LÀM VIỆC</h5>
                            <i style={{ fontSize: "25px" }} className='ti ti-external-link' />
                        </Link>

                    </div> */}


                    <div class="modal-footer mt-2">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary" onClick={handleUpdateLeaveSetting}>CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingOnLeaveComponent;

