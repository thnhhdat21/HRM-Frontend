import React, { useEffect, useState } from 'react';
import { LETTER_TYPE_OVERTIME } from '../../../util/LetterUtil';
import { responseData } from '../../../util/ResponseUtil';
import { getListLetterReason } from '../../../service/LetterReasonService';
import { getLetter, updateOverTimeLetter } from '../../../service/LetterService';
import { toast } from 'react-toastify';
import { calculatorTimeNoBreak, formatTime } from '../../../util/TimeUtil';

const OvertimeLetterComponent = ({ type, typeOpen, letterId, updateLetter, employeeId }) => {
    const createModal = "create_overtime_letter-create"
    const editModal = "create_overtime_letter-edit"
    const [listReason, setListReason] = useState([])

    const [values, setValues] = useState({
        dateRegis: new Date(),
        letterId: "",
        employeeId: employeeId,
        letterReasonId: "",
        timeStart: "",
        timeEnd: "",
        isNextDay: false,
        total: "",
        description: ""
    })

    useEffect(() => {
        if (Number(type) === LETTER_TYPE_OVERTIME)
            getListLetterReason(LETTER_TYPE_OVERTIME).then((response) => {
                responseData(response, setListReason)
            })
    }, [type])

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                dateRegis: new Date().toISOString().split('T')[0],
                letterId: "",
                employeeId: employeeId,
                letterReasonId: "",
                timeStart: "",
                timeEnd: "",
                total: "",
                isNextDay: false,
                description: ""
            })
        } else if (typeOpen.at(-1) === editModal) {
            getLetter(letterId).then((response) => {
                if (response.data.code === 1000) {
                    const letter = response.data.data;
                    setValues({
                        dateRegis: letter.dateRegis,
                        letterId: letter.letterId,
                        employeeId: letter.employeeId,
                        letterReasonId: letter.letterReasonId,
                        timeStart: letter.timeStart,
                        timeEnd: letter.timeEnd,
                        total: letter.total,
                        isNextDay: letter.isNextDay,
                        description: letter.description
                    })
                }
            })
        }
    }, [typeOpen])

    useEffect(() => {
        if (values.timeStart.length > 4 && values.timeEnd.length > 4) {
            const total = calculatorTimeNoBreak(values.timeStart, values.timeEnd, values.isNextDay)
            setValues({ ...values, ["total"]: total })
        }
    }, [values.timeStart, values.timeEnd, values.isNextDay])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeInputTime = (e) => {
        const name = e.target.name;
        const formatted = formatTime(e.target.value);

        setValues(prev => ({
            ...prev,
            [name]: formatted,
        }));
    };


    const onChangeInputReason = (e) => {
        const id = e.target.value;
        const selectedOption = e.target.selectedOptions[0];
        const isWorkDay = selectedOption.getAttribute("data-isWorkDay");
        setValues({ ...values, ["letterReasonId"]: id, ["isWorkDay"]: isWorkDay ? "Có" : "Không" })
    }

    const handleClear = () => {
        setValues({ ...values, ["letterReasonId"]: '', ["isWorkDay"]: '' })
    }

    const checkValidator = (value) => {
        if (value.dateRegis === "") {
            toast.error("Yêu cầu chọn ngày đăng ký!")
            return false;
        } else if (value.timeStart === '') {
            toast.error("Yêu cầu chọn thời gian bắt đầu")
            return false;
        } else if (value.timeEnd === '') {
            toast.error("Yêu cầu chọn thời gian kết thúc")
            return false;
        } else if (value.dateEnd === '') {
            toast.error("Yêu cầu chọn ngày kết thúc!")
            return false;
        } else if (value.letterReasonId === '') {
            toast.error("Yêu cầu chọn lí do!")
            return false;
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false
        isCorrect = checkValidator(values)
        if (isCorrect) {
            updateOverTimeLetter(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật quyết định thành công")
                    updateLetter()
                    document.querySelector('#create_overtime_letter [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }

    const onChangeCheckBox = (e) => {
        const { name, checked } = e.target;
        setValues({ ...values, [name]: checked });
    }


    return (
        <>
            <div className="modal fade" id="create_overtime_letter">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Đăng ký làm thêm giờ</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body overflow-modal-crud">
                            <div className="row ">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Ngày đăng ký </label>
                                        <input type="date" className="form-control" name='dateRegis' value={values.dateRegis} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="col-md-5 form-check form-check-md d-flex align-items-center mt-2" style={{ margin: "0 0 0 10px" }} >
                                    <input className="form-check-input" type="checkbox" id="select-all" name='isNextDay' checked={values.isNextDay} onClick={onChangeCheckBox} />
                                    <label className="form-label" style={{ margin: "0 0 0 10px" }}>Làm thêm qua ngày hôm sau </label>
                                </div>

                            </div>

                            <div className="row mt-2">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Giờ bắt đầu làm thêm</label>
                                        <input type="text" className="form-control" placeholder="--:--" name='timeStart' maxLength={4} value={values.timeStart} onChange={onChangeInputTime} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Giờ kết thúc làm thêm</label>
                                        <input type="text" className="form-control" placeholder="--:--" name='timeEnd' maxLength={4} value={values.timeEnd} onChange={onChangeInputTime} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Tổng số giờ đăng ký</label>
                                        <input type="text" className="form-control readonly-input" placeholder='Tổng giờ đăng kí' value={values.total} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Lý do làm thêm</label>
                                        <div className="select-wrapper-department">
                                            <select className="select-crud" value={Number(values.letterReasonId)} name='letterReasonId' onChange={onChangeInputReason}>
                                                <option value={""} hidden>Chọn lý do</option>
                                                {
                                                    listReason.length > 0 && listReason.map((item, index) => (
                                                        <option key={index} value={item.id} data-isWorkDay={item.workDayEnabled}>{item.reason}</option>
                                                    ))
                                                }
                                            </select>
                                            {values.letterReasonId && (
                                                <div className="x-selected" onClick={() => handleClear("letterReasonId")}>
                                                    <i className="ti ti-x"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Mô tả</label>
                                        <textarea type="text" className="form-control" placeholder='Nhập tên chức vụ' name='description' value={values.description} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" className="btn btn-primary" onClick={handleClickUpdate}>CẬP NHẬT </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OvertimeLetterComponent;

