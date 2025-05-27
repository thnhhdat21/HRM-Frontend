import React, { useEffect, useState } from 'react';
import { LETTER_TYPE_END_WORK } from '../../../util/LetterUtil';
import { responseData } from '../../../util/ResponseUtil';
import { getListLetterReason } from '../../../service/LetterReasonService';
import { getLetter, updateInOutAndEndWorkLetter } from '../../../service/LetterService';
import { toast } from 'react-toastify';

const EndJobLetterComponent = ({ type, typeOpen, letterId, updateLetter }) => {
    const createModal = "create_endjob_letter-create"
    const editModal = "create_endjob_letter-edit"
    const [listReason, setListReason] = useState([])

    const [values, setValues] = useState({
        letterId: "",
        dateRegis: new Date().toISOString().split('T')[0],
        employeeId: "",
        letterReasonId: "",
        description: "",
        type: LETTER_TYPE_END_WORK
    })

    useEffect(() => {
        if (Number(type) === LETTER_TYPE_END_WORK)
            getListLetterReason(LETTER_TYPE_END_WORK).then((response) => {
                responseData(response, setListReason)
            })
    }, [type])

    useEffect(() => {
        if (typeOpen.at(-1) === createModal) {
            setValues({
                letterId: "",
                dateRegis: new Date().toISOString().split('T')[0],
                employeeId: "",
                letterReasonId: "",
                description: '',
                type: LETTER_TYPE_END_WORK
            })
        } else if (typeOpen.at(-1) === editModal) {
            getLetter(letterId).then((response) => {
                if (response.data.code === 1000) {
                    const letter = response.data.data;
                    setValues({
                        letterId: letter.letterId,
                        dateRegis: letter.dateRegis,
                        employeeId: letter.employeeId,
                        letterReasonId: letter.letterReasonId,
                        description: letter.description,
                        type: LETTER_TYPE_END_WORK
                    })
                }
            })
        }
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
        setValues({ ...values, ["letterReasonId"]: '' })
    }

    const checkValidator = (value) => {
        if (value.letterReasonId === "") {
            toast.error("Yêu cầu chọn lý do nghỉ!")
            return false;
        } else if (value.dateRegis === '') {
            toast.error("Yêu cầu chọn ngày thôi việc")
            return false
        }
        return true;
    }

    const handleClickUpdate = (e) => {
        e.preventDefault()
        var isCorrect = false
        isCorrect = checkValidator(values)

        if (isCorrect) {
            updateInOutAndEndWorkLetter(values).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật quyết định thành công")
                    updateLetter()
                    document.querySelector('#create_endjob_letter [data-bs-dismiss="modal"]').click();
                } else if (response.data.code > 1000) {
                    toast.error(response.data.message)
                }
            })
        }
    }


    return (
        <>
            <div className="modal fade" id="create_endjob_letter">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Tạo mới đơn xin thôi việc</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body overflow-modal-crud">
                            <div className="row ">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Lý do thôi việc </label>
                                        <div className="select-wrapper-department">
                                            <select className="select-crud" value={Number(values.letterReasonId)} name='letterReasonId' onChange={onChangeInput}>
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
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label className="form-label">Ngày thôi việc </label>
                                        <input type="date" className="form-control" name='dateRegis' value={values.dateRegis} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Mô tả</label>
                                        <textarea type="text" className="form-control" placeholder='Mô tả' name='description' value={values.description} onChange={onChangeInput} />
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

export default EndJobLetterComponent;