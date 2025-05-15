import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkValidatorInsurance } from '../../../util/InsuranceUtil';
import { getInsuranceNumber, updateInsuranceNumber } from '../../../service/EmployeeService';

const UpdateNumberInsuranceComponent = ({ employeeId, typeOpen, updateInsurace }) => {
    const modalId = "update-number-insurance"
    const [insurance, setInsurance] = useState({
        employeeId: employeeId,
        insuranceNumber: "",
        insuranceCard: ""
    })

    const onChangeInput = (e) => {
        setInsurance({ ...insurance, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (typeOpen.at(-1) === modalId) {
            getInsuranceNumber(employeeId).then((response) => {
                if (response.data.code === 1000) {
                    setInsurance(response.data.data)
                }
            })
        }
    }, [typeOpen])

    const hanldeClickUpdateInsurance = (e) => {
        e.preventDefault()
        var isCorrect = checkValidatorInsurance(insurance);
        if (isCorrect) {
            updateInsuranceNumber(insurance).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật số sổ thành công")
                    if (typeof updateInsurace === 'function') {
                        updateInsurace();
                    }
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }
    }
    return (
        <>
            <div class="modal fade" id={modalId}>
                <div class="modal-dialog modal-dialog-centered modal-lg modal-accepts">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Số sổ bảo hiểm</h4>
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
                                            <div className={` row mt-2 `}>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Số sổ bảo hiểm </label>
                                                        <input type="text" class="form-control" placeholder='Nhập số sổ bảo hiểm' name='insuranceNumber' value={insurance.insuranceNumber} onChange={onChangeInput} />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Số thẻ BHYT </label>
                                                        <input type="text" class="form-control" placeholder='Nhập số thẻ BHYT' name='insuranceCard' value={insurance.insuranceCard} onChange={onChangeInput} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={hanldeClickUpdateInsurance}>CẬP NHẬT </button>
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

export default UpdateNumberInsuranceComponent;

