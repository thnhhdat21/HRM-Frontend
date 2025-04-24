import React, { useEffect, useState } from 'react';
import '../css/contract-style.css'
import { endContract, getContractDetail, getContractProfileByContractId } from '../../../service/ContractService';
import { responseData } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { compareDates } from '../../../util/TimeUtil';

const EndContractComponent = ({ contractId, typeOpen, updateListContract }) => {
    const modalId = "end-contract"
    const [contract, setContract] = useState({})
    const [values, setValues] = useState({
        contractId: contractId,
        dateLiquidation: "",
        reasonLiquidation: "",
    })

    useEffect(() => {
        if (typeOpen.at(-1) === `#${modalId}`) {
            getContractDetail(contractId).then((response) => {
                responseData(response, setContract)
            })
            setValues({
                contractId: contractId,
                dateLiquidation: "",
                reasonLiquidation: "",
            })
        }
    }, [typeOpen])


    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const checkValidator = (values) => {
        if (values.dateLiquidation === "") {
            toast.error("Yêu cầu nhập ngày thanh lý")
            return false;
        } else if (values.dateLiquidation) {
            if ((contract.dateEnd && compareDates(values.dateLiquidation, contract.dateEnd) === 1) ||
                compareDates(values.dateLiquidation, contract.dateStart) === -1) {
                toast.error("Ngày thanh lý không hợp lệ")
                return false
            }
        } if (values.reasonLiquidation === "") {
            toast.error("Yêu cầu chọn lý do thanh lý")
            return false
        }
        return true
    }

    const handleContractLiquidation = (e) => {
        e.preventDefault()
        var isCorrect = false;
        isCorrect = checkValidator(values)
        if (isCorrect) {
            endContract(values).then((response) => {
                if (response.data.code === 1000) {
                    updateListContract()
                    toast.success("Thanh lý thành công hợp đồng")
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                } else if (response.data.code > 1000) {
                    toast.error(response.data.data)
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }
    }

    return (
        <>
            <div class="modal fade" id={modalId}>
                <div class="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h5 class="modal-title me-2">Thanh lý hợp đồng</h5>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>

                        <div class="modal-body overflow-modal-crud">
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Mã hợp đồng </label>
                                        <input type="text" class="form-control readonly-input" value={contract.contractCode} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Ngày thanh lý </label>
                                        <input type="date" class="form-control" name='dateLiquidation' value={values.dateLiquidation} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label class="form-label">Lý do thanh lý </label>
                                        <select className="form-control" name='reasonLiquidation' value={values.reasonLiquidation} onChange={onChangeInput}>
                                            <option value="" hidden>Chọn lý do thanh lý</option>
                                            <option value="Thôi việc">Thôi việc</option>
                                            <option value="Ký hợp đồng mới">Ký hợp đồng mới</option>
                                            <option value="Quyết định chấm dứt HĐLĐ">Quyết định chấm dứt HĐLĐ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" class="btn btn-primary" onClick={handleContractLiquidation}> CẬP NHẬT </button>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
};

export default EndContractComponent;

