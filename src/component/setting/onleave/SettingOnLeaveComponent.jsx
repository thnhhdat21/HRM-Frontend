import { useEffect, useState } from 'react';
import { getLeaveSetting, updateLeaveSetting } from '../../../service/Manage/LeaveSettingservice';
import { responseData, responseUpdate } from '../../../util/ResponseUtil';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
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
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <div className="border-bottom mb-3 pb-3">
                                <h5>CÀI ĐẶT NGHỈ PHÉP</h5>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-4">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Số ngày nghỉ phép tối đa trong 1 năm</h5>
                                        <div className='date-increase'>
                                            <p>Theo luật những công việc hành chính là 12 ngày/năm</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input type="number" className='form-control' name='annualLeaveDays' value={values.annualLeaveDays} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Cho phép hưởng phép thâm niên</h5>
                                        <div className='date-increase'>
                                            <p>Cài đặt cho phép nhân viên làm lâu năm được hưởng thêm phép thâm niên</p>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input className="form-check-input me-2" type="checkbox" role="switch" name='seniorLeaveEnabled' checked={values.seniorLeaveEnabled} onChange={onChangeSwitch} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom">
                                    <div className="mb-3">
                                        <h5 className="fw-medium mb-1">Số năm được hưởng phép thân niên</h5>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-check-md form-switch me-2">
                                            <input type="text" className='form-control' name='seniorYears' value={values.seniorYears} onChange={onChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer mt-2">
                        <button type="button" className="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" className="btn btn-primary" onClick={handleUpdateLeaveSetting}>CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingOnLeaveComponent;

