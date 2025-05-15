import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateOnLeaveProfile } from '../../../../service/OnLeaveService';
const UpdateOnLeaveComponent = ({ employeeId, onLeave, openModal, updateOnLeave }) => {
    const modalId = "update-onleave"
    const [values, setValues] = useState({
        employeeId: employeeId,
        seniorDay: "",
        regulaDay: "",
        usedDay: ""
    })

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (openModal.at(-1) === `#${modalId}`)
            setValues({
                employeeId: employeeId,
                regulaDay: onLeave.regulaDay,
                seniorDay: onLeave.seniorDay,
                usedDay: onLeave.usedDay
            })
    }, [openModal])

    const handleUpdateOnLeave = (e) => {
        e.preventDefault();
        const isCorrect = checkValidator(values);
        if (isCorrect) {
            updateOnLeaveProfile(values).then((response) => {
                if (response.data.code) {
                    toast.success("Cập nhật thành công!")
                    updateOnLeave()
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }


    const checkValidator = (values) => {
        if (values.usedDay < 0) {
            toast.error("Yêu cầu nhập số phép theo quy định!")
            return false;
        } else if (values.regulaDay < 0) {
            toast.error("Yêu cầu nhập số phép đã nghỉ!")
            return false;
        } else if (values.usedDay > values.regulaDay) {
            toast.error("Số ngày nhập không hợp lệ!")
            return false;
        }
        return true
    }


    return (
        <>
            <div class="modal fade" id={modalId}>
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping" style={{ top: "-120px" }}>
                    <div class="modal-content" >
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Cập nhật nghỉ phép</h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 ">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Số phép theo quy định</label>
                                                    <input type="number" className="form-control" name='regulaDay' value={values.regulaDay} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="mb-3">
                                                    <label class="form-label">Số phép đã nghỉ</label>
                                                    <input type="number" className="form-control" name='usedDay' value={values.usedDay} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" >
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={handleUpdateOnLeave}>CẬP NHẬT </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    );
};

export default UpdateOnLeaveComponent;

