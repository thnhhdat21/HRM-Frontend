import React, { useEffect, useState } from 'react';
import { compareDates } from '../../../util/TimeUtil';
import { LETTER_TYPE_WORKTIME } from '../../../util/LetterUtil';
import { responseData } from '../../../util/ResponseUtil';
import { getLetterReasonDetail, getListLetterReason } from '../../../service/LetterReasonService';
import { getLetter, updateWorkTimeLetter } from '../../../service/LetterService';
import { toast } from 'react-toastify';

const WorkTimeLetterComponent = ({ type, typeOpen, letterId, updateLetter }) => {
    const createModal = "create_worktime_letter-create"
    const editModal = "create_worktime_letter-edit"
    const [listReason, setListReason] = useState([])

    const [values, setValues] = useState({
        letterId: "",
        employeeId: "",
        letterReasonId: "",
        dateStart: "",
        dateEnd: "",
        description: ""
    })

    useEffect(() => {
        if (Number(type) === LETTER_TYPE_WORKTIME)
            getListLetterReason(LETTER_TYPE_WORKTIME).then((response) => {
                responseData(response, setListReason)
            })
    }, [type])

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                letterId: "",
                employeeId: "",
                letterReasonId: "",
                dateStart: new Date().toISOString().split('T')[0],
                dateEnd: "",
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
                        goLate: letter.goLate,
                        backEarly: letter.backEarly,
                        description: letter.description
                    })
                }
            })
        }
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeInputReason = async (e) => {
        const id = e.target.value;
        const response = await getLetterReasonDetail(id)
        if (response.data.code === 1000) {
            const letterReason = response.data.data
            setValues({ ...values, ["letterReasonId"]: id, ["backEarly"]: letterReason.backEarly, ['goLate']: letterReason.goLate })
        }

    }

    const handleClear = () => {
        setValues({ ...values, ["letterReasonId"]: '', ["isWorkDay"]: '' })
    }

    const checkValidator = (value) => {
        if (value.letterReasonId === "") {
            toast.error("Yêu cầu chọn lý do nghỉ!")
            return false;
        } else if (value.dateStart === '') {
            toast.error("Yêu cầu chọn ngày bắt đầu")
            return false;
        } else if (compareDates(value.dateStart, new Date().toISOString().split('T')[0]) !== 1) {
            toast.error("Ngày bắt đầu không hợp lệ!")
            return false;
        } else if (value.dateEnd === '') {
            toast.error("Yêu cầu chọn ngày kết thúc!")
            return false;
        } else if (compareDates(value.dateEnd, new Date().toISOString().split('T')[0]) !== 1) {
            toast.error("Ngày kết thúc không hợp lệ!")
            return false;
        } else if (compareDates(value.dateStart, value.dateEnd) === 1) {
            toast.error("Thời gian không hợp lệ!")
            return false;
        }
        return true
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false
        isCorrect = checkValidator(values)

        if (isCorrect) {
            updateWorkTimeLetter(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật quyết định thành công")
                    updateLetter()
                    document.querySelector('#create_worktime_letter [data-bs-dismiss="modal"]').click();
                } else if (response.data.code > 1000) {
                    toast.error(response.data.message)
                }
            })
        }
    }

    return (
        <>
            <div class="modal fade" id="create_worktime_letter">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Đăng ký làm theo chế độ</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row ">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do </label>
                                        <div className="select-wrapper-department">
                                            <select class="select-crud" value={Number(values.letterReasonId)} name='letterReasonId' onChange={onChangeInputReason}>
                                                <option value={""} hidden>Chọn lý do</option>
                                                {
                                                    listReason.length > 0 && listReason.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.reason}</option>
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

                            <div class="row mt-2">
                                <div class="col-md-5">
                                    <div class="mb-3">
                                        <label class="form-label">Từ ngày</label>
                                        <input type="date" class="form-control" name='dateStart' value={values.dateStart} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="mb-3">
                                        <label class="form-label">Đến ngày</label>
                                        <input type="date" class="form-control" name='dateEnd' value={values.dateEnd} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div class="col-md-10">
                                    <div class="mb-3">
                                        <table class="table table-create-profile">
                                            <tr>
                                                <th style={{ width: "32%" }}>Chế độ</th>
                                                <th>Thời gian</th>
                                            </tr>
                                            <tr>
                                                <td><input type="text" className="form-control" placeholder="Nhập lương" value="Đi muộn" onChange={""} /></td>
                                                <td><input type="text" className="form-control readonly-input" name='goLate' value={values.goLate} onChange={""} /></td>
                                            </tr>
                                            <tr>
                                                <td><input type="text" className="form-control" placeholder="Nhập lương" value="Về sớm" onChange={""} /></td>
                                                <td><input type="text" className="form-control readonly-input" name='backEarly' value={values.backEarly} onChange={""} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-8">
                                    <div class="mb-3">
                                        <label class="form-label">Mô tả</label>
                                        <textarea type="text" class="form-control" name='description' value={values.description} onChange={onChangeInput} />
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
            </div>
        </>
    );
};

export default WorkTimeLetterComponent;

