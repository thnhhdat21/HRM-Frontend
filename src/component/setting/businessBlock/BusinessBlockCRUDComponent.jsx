import { useEffect, useState } from 'react';
import { createBusinessBlock, updateBusinessBlock } from '../../../service/Manage/ManageBusinessBlockService';
import { toast } from 'react-toastify';


const BusinessBlockCRUDComponent = ({ setListBusinessBlock, typeOpen, businessBlock }) => {
    const modalEdit = "crud_business_block-edit"
    const modalCreate = "crud_business_block-create"
    const [values, setValues] = useState({
        name: "",
        code: "",
    })

    useEffect(() => {
        if (typeOpen.at(-1) === modalEdit) {
            setValues({
                id: businessBlock.id || "",
                name: businessBlock.name || "",
                code: businessBlock.code || "",
            });
        } else if (typeOpen.at(-1) === modalCreate) {
            setValues({
                name: "",
                code: "",
            });
        }
    }, [typeOpen])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCreateBusinessBlock = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        createBusinessBlock(values.name, values.code).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Tạo khối nghiệp vụ thành công")
                document.querySelector('#crud_business_block [data-bs-dismiss="modal"]')?.click();
                setListBusinessBlock(prev => [...prev, response.data.data])
            } else {
                toast.error(response.data.message)
            }
        })
    }

    const handleUpdateBusinessBlock = () => {
        if (values.name.trim().length === 0 || values.code.trim().length === 0) {
            toast.error("Chưa nhập tên hoặc mã nhóm")
            return;
        }

        updateBusinessBlock(values.id, values.name, values.code).then((response) => {
            if (response.data.code === 1000) {
                toast.success("Cập nhật nghiệp vụ thành công")
                document.querySelector('#crud_business_block [data-bs-dismiss="modal"]')?.click();
                setListBusinessBlock(prev =>
                    prev.map(item => item.id === response.data.data.id ? response.data.data : item)
                );
            } else {
                toast.error(response.data.message)
            }
        })
    }
    return (
        <>
            <div className="modal fade" id="crud_business_block">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">{typeOpen.at(-1) === modalEdit ? "Cập nhật khối nghiệp vụ" : "Tạo mới khối nghiệp vụ"} </h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active">
                                    <div className="modal-body pb-0 ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Tên nghiệp vụ<span className="text-danger">
                                                        *</span></label>
                                                    <input type="text" className="form-control" name='name' onChange={onChangeInput} value={values.name || ""} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Mã<span className="text-danger">
                                                        *</span></label>
                                                    <input type="text" className="form-control" name='code' onChange={onChangeInput} value={values.code || ""} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div type="submit" className="btn btn-primary" onClick={() => { typeOpen.at(-1) === modalCreate ? handleCreateBusinessBlock() : handleUpdateBusinessBlock() }}> {typeOpen.at(-1) === modalCreate ? "THÊM MỚI" : "CẬP NHẬT"} </div>
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

export default BusinessBlockCRUDComponent;

