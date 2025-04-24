import React, { useEffect, useState } from 'react';
import '../../css/crud-style.css'
import { calculatorTime, formatTime } from '../../../../util/TimeUtil';
import SelectCustomer from '../../../customer/SelectCustomer';
import { getListJobPosition } from '../../../../service/JobPositionService';
import { responseData, responseDataUpdateUI, responseUpdateAndUpdateUI } from '../../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { checkValidatorTimeKeeping } from '../../../../util/TimeKeepingUtil';
import { createWorkShift, getWorkShiftDetail, updateJobPositionInWS, updateWorkShift } from '../../../../service/WorkShiftService';

const TimeKeepingCRUDComponent = ({ selectedId, typeOpen, setListWorkShift }) => {
    const [listJobPosition, setListJobPosition] = useState([]);
    const [selectedJobPosition, setSelectedJobPosition] = useState([]);
    const [selectedPrevJP, setSelectedPrevJP] = useState([]);

    const [values, setValues] = useState({
        code: "",
        name: "",
        timeIn: "",
        timeOut: "",
        nextDayEnabled: false,
        breakStartTime: "",
        breakEndTime: "",
        totalTime: "",
        totalWorkDay: "",
        checkinFirst: "",
        checkoutLater: "",
        autoTimeKeeping: false,
        autoCheckoutForPosition: false,
    })

    useEffect(() => {
        if (typeOpen.at(-1) === "edit") {
            getWorkShiftDetail(selectedId).then((response) => {
                if (response.data.code === 1000) {
                    const workShift = response.data.data
                    setValues({
                        code: workShift.code || "",
                        name: workShift.name || "",
                        timeIn: workShift.timeIn || "",
                        timeOut: workShift.timeOut || "",
                        nextDayEnabled: workShift.nextDayEnabled || false,
                        breakStartTime: workShift.breakStartTime || "",
                        breakEndTime: workShift.breakEndTime || "",
                        totalTime: workShift.totalTime || "",
                        totalWorkDay: workShift.totalWorkDay || "",
                        checkinFirst: workShift.checkinFirst || "",
                        checkoutLater: workShift.checkoutLater || "",
                        autoTimeKeeping: workShift.autoTimeKeeping || false,
                        autoCheckoutForPosition: workShift.autoCheckoutForPosition || false,
                    });
                    setSelectedJobPosition(workShift.jobPositions || [])
                    setSelectedPrevJP(workShift.jobPositions || [])
                }
            })
        } else if (typeOpen.at(-1) === "open") {
            setValues({
                code: "",
                name: "",
                timeIn: "",
                timeOut: "",
                nextDayEnabled: false,
                breakStartTime: "",
                breakEndTime: "",
                totalTime: "",
                totalWorkDay: "",
                checkinFirst: "",
                checkoutLater: "",
                autoTimeKeeping: false,
                autoCheckoutForPosition: false,
            });
            setSelectedJobPosition([])
        }
    }, [typeOpen]);


    useEffect(() => {
        getListJobPosition().then((response) => {
            responseData(response, setListJobPosition)
        })
    }, [])


    useEffect(() => {
        if (values.timeOut.length > 4) {
            const total = calculatorTime(values.timeIn, values.timeOut, values.breakStartTime, values.breakEndTime, values.nextDayEnabled)
            setValues({ ...values, ["totalTime"]: total })
        } else if (values.timeOut.length > 4 && values.breakEndTime.length > 4) {
            const total = calculatorTime(values.timeIn, values.timeOut, values.breakStartTime, values.breakEndTime, values.nextDayEnabled)
            setValues({ ...values, ["totalTime"]: total })
        } else if (values.timeIn.length > 4 && values.breakEndTime.length > 4) {
            const total = calculatorTime(values.timeIn, values.timeOut, values.breakStartTime, values.breakEndTime, values.nextDayEnabled)
            setValues({ ...values, ["totalTime"]: total })
        } else if (values.breakEndTime.length > 4 && values.breakStartTime.length > 4) {
            const total = calculatorTime(values.timeIn, values.timeOut, values.breakStartTime, values.breakEndTime, values.nextDayEnabled)
            setValues({ ...values, ["totalTime"]: total })
        }
    }, [values.timeIn, values.timeOut, values.nextDayEnabled, values.breakStartTime, values.breakEndTime])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleClear = (name) => {
        setValues({ ...values, [name]: "" })
    }

    const onChangeInputTime = (e) => {
        const name = e.target.name;
        const formatted = formatTime(e.target.value);

        setValues(prev => ({
            ...prev,
            [name]: formatted,
        }));
    };

    const onChangeSwitch = (e) => {
        setValues({ ...values, [e.target.name]: !values[e.target.name] })
    }

    const handleClickCreate = (e) => {
        e.preventDefault()
        var isCorrect = true;
        isCorrect = checkValidatorTimeKeeping(values, selectedJobPosition)
        if (isCorrect) {
            createWorkShift(values, selectedJobPosition).then((response) => {
                responseDataUpdateUI(response, setListWorkShift)
                if (response.data.code === 1000) {
                    document.querySelector('#crud_time_keeping [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = true;
        var backCorrect = true;
        isCorrect = checkValidatorTimeKeeping(values, selectedJobPosition)
        if (isCorrect) {
            updateWorkShift(selectedId, values).then((response) => {
                responseUpdateAndUpdateUI(response, setListWorkShift)
                if (response.data.code !== 1000) {
                    backCorrect = false;
                }
            })
            if (backCorrect) {
                const isSameJPs = JSON.stringify(selectedPrevJP) === JSON.stringify(selectedJobPosition.sort((a, b) => a - b));
                if (!isSameJPs) {
                    updateJobPositionInWS(selectedId, selectedJobPosition).then((response) => {
                        if (response.data.code !== 1000) {
                            backCorrect = false;
                        }
                    })
                }
            }
        }
        if (isCorrect && backCorrect) {
            toast.success("Cập nhật thành công")
            document.querySelector('#crud_time_keeping [data-bs-dismiss="modal"]').click();
        }
    }
    return (
        <>
            <div class="modal fade" id="crud_time_keeping" >
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo mới loại hợp đồng lao động</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 overflow-modal-crud">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Thông tin chung</label>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Mã ca</label>
                                                        <input type="text" format class="form-control" name='code' value={values.code} onChange={onChangeInput} />
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tên ca</label>
                                                        <input type="text" class="form-control" name='name' value={values.name} onChange={onChangeInput} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ vào</label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='timeIn' maxLength={4} value={values.timeIn} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ ra </label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='timeOut' maxLength={4} value={values.timeOut} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Qua ngày </label>
                                                        <div className="selected-container">
                                                            <div className="select-wrapper">
                                                                <select name='nextDayEnabled' value={values.nextDayEnabled} onChange={onChangeInput}>
                                                                    <option value="" hidden>Chọn</option>
                                                                    <option value={true}>Qua ngày</option>
                                                                    <option value={false}>Không qua</option>
                                                                </select>
                                                                {values.nextDayEnabled !== "" && (
                                                                    <div className="x-selected" onClick={() => handleClear('nextDayEnabled')}>
                                                                        <i className="ti ti-x"></i>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Giờ nghỉ </label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='breakStartTime' maxLength={4} value={values.breakStartTime} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Kết thúc nghỉ </label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='breakEndTime' maxLength={4} value={values.breakEndTime} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tổng giờ </label>
                                                        <input type="text" class="form-control readonly-input input-rtl" placeholder="--:--" name='totalTime' maxLength={4} value={values.totalTime} />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Tổng công </label>
                                                        <input type="number" class="form-control input-rtl" name='totalWorkDay' value={values.totalWorkDay} onChange={onChangeInput} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Checkin trước </label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='checkinFirst' maxLength={4} value={values.checkinFirst} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Checkout sau </label>
                                                        <div class="input-icon-end position-relative time-input-custom">
                                                            <input type="text" class="form-control" placeholder="--:--" name='checkoutLater' maxLength={4} value={values.checkoutLater} onChange={onChangeInputTime} />
                                                            <span class="input-icon-addon">
                                                                <i class="ti ti-clock-hour-3 text-gray-7"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger">Tự động</label>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex right-content align-items-center">
                                                        <div class="form-check form-check-md form-switch me-2">
                                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='autoTimeKeeping' checked={values.autoTimeKeeping} onChange={onChangeSwitch} />
                                                        </div>
                                                        <span class="form-label mb-0">Chấm công tự động</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div class="col-md-12">
                                                    <div class="mb-3 d-flex right-content align-items-center">
                                                        <div class="form-check form-check-md form-switch me-2">
                                                            <input class="form-check-input me-2" type="checkbox" role="switch" name='autoCheckoutForPosition' checked={values.autoCheckoutForPosition} onChange={onChangeSwitch} />
                                                        </div>
                                                        <span class="form-label mb-0">Checkout tự động áp dụng cho vị trí</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`row permission-row  ${!values.autoCheckoutForPosition ? "blurred" : ""}`}>
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label class="form-label">Ví trí</label>
                                                        <SelectCustomer listItem={listJobPosition} selectedItem={selectedJobPosition} setSelectedItem={setSelectedJobPosition} elementId={"options-jp-timekeeping"} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={typeOpen.at(-1) === "open" ? handleClickCreate : handleClickUpdate}>CẬP NHẬT </button>
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

export default TimeKeepingCRUDComponent;

