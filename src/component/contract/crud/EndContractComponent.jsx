import React, { useEffect, useState } from 'react';
import '../css/contract-style.css'
import { endContract, getContractDetail } from '../../../service/Manage/ManageContractService';
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
                    if (typeof updateListContract === 'function')
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
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog modal-dialog-centered modal-lg modal-crud-appendix">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h5 className="modal-title me-2">Thanh lý hợp đồng</h5>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body overflow-modal-crud">
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Mã hợp đồng </label>
                                        <input type="text" className="form-control readonly-input" value={contract.contractCode} onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Ngày thanh lý </label>
                                        <input type="date" className="form-control" name='dateLiquidation' value={values.dateLiquidation} onChange={onChangeInput} />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Lý do thanh lý </label>
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" className="btn btn-primary" onClick={handleContractLiquidation}> CẬP NHẬT </button>
                        </div>
                    </div >
                </div >
            </div >
        </>
    );
};

export default EndContractComponent;

