import { useEffect, useState } from 'react';
import SelectCustomer from '../customer/SelectCustomer';
import { getListDepartmentChild } from '../../service/DepartmentService';
import { responseData } from '../../util/ResponseUtil';

const DepartmentReport = ({ setSelected, selected }) => {
    const [listDepartment, setListDepartment] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState([])

    useEffect(() => {
        getListDepartmentChild().then((response) => {
            responseData(response, setListDepartment)
        })
        setSelectedDepartment(selected)
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        setSelected(selectedDepartment)
        document.querySelector('#department-filter [data-bs-dismiss="modal"]').click();
    }

    return (
        <>
            <div className="modal fade" id="department-filter">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping" style={{ top: "-120px" }}>
                    <div className="modal-content" >
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Lọc theo phòng ban</h4>
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
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Chọn phòng ban </label>
                                                    <SelectCustomer listItem={listDepartment} selectedItem={selectedDepartment} setSelectedItem={setSelectedDepartment} elementId={"options-department-filter"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer" >
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" className="btn btn-primary" onClick={handleUpdate}>CẬP NHẬT </button>
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

export default DepartmentReport;

