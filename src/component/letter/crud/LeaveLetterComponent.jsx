import React, { useEffect, useState } from 'react';
import SelectOneOptionCustomer from '../../customer/SelectOneOptionCustomer';
import { calculateLeaveDays, compareDates, getListDateTime } from '../../../util/TimeUtil';
import { getLetter, updateLeaveLetter } from '../../../service/LetterService';
import { toast } from 'react-toastify';
import { getListLetterReason } from '../../../service/LetterReasonService';
import { responseData } from '../../../util/ResponseUtil';
import { LETTER_TYPE_LEAVE } from '../../../util/LetterUtil';

const LeaveLetterComponent = ({ type, typeOpen, letterId, updateLetter }) => {
    const optionDateTime = getListDateTime();
    const createModal = "create_leave_letter-create"
    const editModal = "create_leave_letter-edit"
    const [listReason, setListReason] = useState([])

    const [values, setValues] = useState({
        letterId: "",
        employeeId: "",
        letterReasonId: "",
        dateStart: "",
        dateEnd: "",
        total: "",
        description: ""
    })

    useEffect(() => {
        if (Number(type) === LETTER_TYPE_LEAVE)
            getListLetterReason(LETTER_TYPE_LEAVE).then((response) => {
                responseData(response, setListReason)
            })
    }, [type])

    console.log(listReason)

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                letterId: "",
                employeeId: "",
                letterReasonId: "",
                dateStart: "",
                dateEnd: "",
                total: "",
                description: ""
            })
        } else if (typeOpen.at(-1) === editModal) {
            getLetter(letterId).then((response) => {
                if (response.data.code === 1000) {
                    const letter = response.data.data;
                    setValues({
                        letterId: letter.letterId,
                        employeeId: letter.employeeId,
                        letterReasonId: letter.letterReasonId,
                        dateStart: letter.dateStart,
                        dateEnd: letter.dateEnd,
                        total: letter.total,
                        description: letter.description
                    })
                }
            })
        }
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeInputReason = (e) => {
        const id = e.target.value;
        const selectedOption = e.target.selectedOptions[0];
        const isWorkDay = selectedOption.getAttribute("data-isWorkDay");
        setValues({ ...values, ["letterReasonId"]: id, ["isWorkDay"]: isWorkDay === 'true' ? "Có" : "Không" })
    }

    const handleClear = () => {
        setValues({ ...values, ["letterReasonId"]: '', ["isWorkDay"]: '' })
    }

    const checkValidator = (value) => {
        // if (value.letterReasonId === "") {
        //     toast.error("Yêu cầu chọn lý do nghỉ!")
        //     return false;
        // } else if (value.dateStart === '') {
        //     toast.error("Yêu cầu chọn ngày bắt đầu")
        //     return false;
        // } else if (compareDates(value.dateStart.split(' ')[0], new Date().toISOString().split('T')[0]) === -1) {
        //     toast.error("Ngày bắt đầu không hợp lệ!")
        //     return false;
        // } else if (value.dateEnd === '') {
        //     toast.error("Yêu cầu chọn ngày kết thúc!")
        //     return false;
        // } else if (compareDates(value.dateEnd.split(' ')[0], new Date().toISOString().split('T')[0]) === -1) {
        //     toast.error("Ngày kết thúc không hợp lệ!")
        //     return false;
        // } else if (compareDates(value.dateStart.split(' ')[0], value.dateEnd.split(' ')[0]) === 1) {
        //     toast.error("Thời gian không hợp lệ!")
        //     return false;
        // }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false
        isCorrect = checkValidator(values)

        if (isCorrect) {
            updateLeaveLetter(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật quyết định thành công")
                    updateLetter()
                    document.querySelector('#create_leave_letter [data-bs-dismiss="modal"]').click();
                }
            })
        }
    }



    return (
        <>
            <div class="modal fade" id="create_leave_letter">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tạo đơn xin nghỉ</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row ">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do </label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.letterReasonId)} name='letterReasonId' onChange={onChangeInputReason}>
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
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tính công </label>
                                        <input type="text" class="form-control readonly-input" placeholder='Tính công' name='isWorkDay' value={values.isWorkDay} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Từ ngày </label>
                                        <SelectOneOptionCustomer
                                            listItem={optionDateTime}
                                            name={'dateStart'}
                                            values={values}
                                            setValues={setValues}
                                            elementId={"options-time-leave-start"}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Đến ngày </label>
                                        <SelectOneOptionCustomer
                                            listItem={optionDateTime}
                                            name={'dateEnd'}
                                            values={values}
                                            setValues={setValues}
                                            elementId={"options-time-leave-end"}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">

                            </div>
                            <div class="row mt-2">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Tổng ngày nghỉ </label>
                                        <input type="text" class="form-control" placeholder='Tổng ngày nghỉ' name='total' value={values.total} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Mô tả</label>
                                        <textarea type="text" class="form-control" placeholder='Mô tả' name='description' value={values.description} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" class="btn btn-primary" onClick={handleClickUpdate}>CẬP NHẬT </button>
                        </div>

                    </div>
                </div>
            </div >
        </>
    );
};

export default LeaveLetterComponent;

