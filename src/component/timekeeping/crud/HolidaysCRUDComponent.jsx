import React, { useEffect, useState } from 'react';
import { updateHoliday } from '../../../service/HolidayService';
import { responseDataUpdateUI } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';

const HolidaysCRUDComponent = ({ selected, openModal, handleUpdateHoliday }) => {
    const MODAL_CREATE = "create"
    const MODAL_EDIT = "edit"
    const [values, setValues] = useState({
        id: "",
        reason: "",
        type: "",
        date: "",
        description: ""
    })
    useEffect(() => {
        if (openModal.at(-1) === MODAL_CREATE) {
            setValues({
                id: "",
                reason: "",
                type: "",
                date: "",
                description: ""
            })
        } else if (openModal.at(-1) === MODAL_EDIT) {
            setValues({
                id: selected.id,
                reason: selected.reason,
                type: selected.type,
                date: selected.date,
                description: selected.description
            })
        }
    }, [openModal])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = validator(values)

        if (isCorrect) {
            handleUpdateHoliday(values)
        }
    }


    const validator = (values) => {
        if (values.reason === "") {
            toast.error("Yêu cầu nhập đầy đủ lý do!")
            return false;
        } else if (values.type === 0 || values.type === "") {
            toast.error("Yêu cầu chọn loại nghỉ!")
            return false
        } else if (values.date === "") {
            toast.error("Yêu cầu chọn ngày nghỉ!")
            return false
        }
        return true
    }

    return (
        <>
            <div class="modal fade" id="crud_holiday">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">{openModal.at(-1) === MODAL_CREATE ? "Tạo mới " : "Cập nhật"}  ngày nghỉ</h4>
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
                                        <input type="email" class="form-control" placeholder='Lý do nghỉ' name='reason' value={values.reason} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Loại nghỉ </label>
                                        <select className='form-label' value={values.type} name='type' onChange={onChangeInput}>
                                            <option value={0} hidden>Chọn loại nghỉ</option>
                                            <option value={1}>Nghỉ lễ</option>
                                            <option value={2}>Nghỉ bù</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày nghỉ </label>
                                        <input type="date" class="form-control" name='date' value={values.date} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">Mô tả </label>
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

export default HolidaysCRUDComponent;

