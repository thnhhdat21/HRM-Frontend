import React, { useEffect, useState } from 'react';
import { createAssetGroup, getListAssetGroup, updateAssetGroup } from '../../../service/AssetGroupService';
import { responseData, responseUpdate } from '../../../util/ResponseUtil';
import { toast } from 'react-toastify';
import { getListDepartment, getListDepartmentChild } from '../../../service/DepartmentService';
import SelectCustomer from '../../customer/SelectCustomer';
import { useDispatch, useSelector } from 'react-redux';
import { updateDepartmentFilter } from '../../../redux/slice/SearchFilterSlice';


const DeparmentFilterComponent = ({ typeOpen }) => {
    const [listDepartment, setListDepartment] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState([])
    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.searchFilter)
    useEffect(() => {
        if (typeOpen.at(-1) === "departmentFilter") {
            getListDepartmentChild().then((response) => {
                responseData(response, setListDepartment)
            })
            setSelectedDepartment(searchFilter.department)
        }
    }, [typeOpen])

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateDepartmentFilter(selectedDepartment))
        document.querySelector('#department-filter [data-bs-dismiss="modal"]').click();
    }

    return (
        <>
            <div class="modal fade" id="department-filter">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping" style={{ top: "-120px" }}>
                    <div class="modal-content" >
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Lọc theo phòng ban</h4>
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
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Chọn phòng ban </label>
                                                    <SelectCustomer listItem={listDepartment} selectedItem={selectedDepartment} setSelectedItem={setSelectedDepartment} elementId={"options-department-filter"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" >
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <button type="submit" class="btn btn-primary" onClick={handleUpdate}>CẬP NHẬT </button>
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

export default DeparmentFilterComponent;

