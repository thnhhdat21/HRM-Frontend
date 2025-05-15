import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchFilter, updateSearchFilter } from '../../redux/slice/SearchFilterSlice';
import { responseData } from '../../util/ResponseUtil';
import { getListDepartmentChild } from '../../service/DepartmentService';
import SelectCustomer from '../customer/SelectCustomer';
import { getListJobPosition } from '../../service/JobPositionService';
import { getListDuty } from '../../service/DutyService';


const FilterSearchComponent = ({ typeOpen }) => {
    const [listDepartment, setListDepartment] = useState([])
    const [listJobPostion, setListJobPostion] = useState([])
    const [listDuty, setListDuty] = useState([])

    const [selectedDepartment, setSelectedDepartment] = useState([])
    const [selectedJobPosition, setSelectedJobPosition] = useState([])
    const [selectedDuty, setSelectedDuty] = useState([])

    const [values, setValues] = useState({
        name: "",
        dateJoin: "",
    })

    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.searchFilter)

    useEffect(() => {
        if (JSON.parse(typeOpen)) {
            getListDepartmentChild().then((response) => {
                responseData(response, setListDepartment)
            })
            getListJobPosition().then((response) => {
                responseData(response, setListJobPostion)
            })
            getListDuty().then((response) => {
                responseData(response, setListDuty)
            })
            setValues({
                name: searchFilter.name,
                dateJoin: searchFilter.dateJoin
            })
            setSelectedDepartment(searchFilter.department)
            setSelectedJobPosition(searchFilter.jobPosition)
            setSelectedDuty(searchFilter.duty)
        }
    }, [typeOpen])

    useEffect(() => {
        if (JSON.parse(typeOpen)) {
            setValues({
                name: searchFilter.name,
                dateJoin: searchFilter.dateJoin
            })
            setSelectedDepartment(searchFilter.department)
            setSelectedJobPosition(searchFilter.jobPosition)
            setSelectedDuty(searchFilter.duty)
        }
    }, [searchFilter])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onChangeSearch = (e) => {
        e.preventDefault()
        const action = {
            name: values.name,
            dateJoin: values.dateJoin,
            department: selectedDepartment,
            jobPosition: selectedJobPosition,
            duty: selectedDuty,
        }
        dispatch(updateSearchFilter(action))
        document.querySelector('#search-filter [data-bs-dismiss="modal"]').click();

    }

    const onChangeReset = (e) => {
        e.preventDefault()
        console.log("hahah")
        dispatch(resetSearchFilter())
    }

    const searching = (e) => {
        if (searchFilter.name !== '' ||
            searchFilter.dateJoin !== '' ||
            searchFilter.department.length > 0 ||
            searchFilter.jobPosition.length > 0 ||
            searchFilter.duty.length > 0
        )
            return true
        return false
    }
    return (
        <>
            <div class="modal fade" id="search-filter">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div class="modal-content" >
                        <div class="modal-header">
                            <div class="d-flex align-items-center">
                                <h4 class="modal-title me-2">Tìm kiếm </h4>
                            </div>
                            <button type="button" class="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active">
                                    <div class="modal-body pb-0 overflow-modal-crud">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Tên nhân sự </label>
                                                    <input type="text" class="form-control" name='name' value={values.name} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Ngày vào</label>
                                                    <input type="date" class="form-control" placeholder='dd/mm/yyyy' name='dateJoin' value={values.dateJoin} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Phòng ban </label>
                                                    <SelectCustomer
                                                        listItem={listDepartment}
                                                        selectedItem={selectedDepartment}
                                                        setSelectedItem={setSelectedDepartment}
                                                        elementId={"options-search-filter-department"}
                                                        type={"up"} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Vị trí </label>
                                                    <SelectCustomer
                                                        listItem={listJobPostion}
                                                        selectedItem={selectedJobPosition}
                                                        setSelectedItem={setSelectedJobPosition}
                                                        elementId={"options-search-filter-job-position"}
                                                        type={"up"} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="mb-3">
                                                    <label class="form-label">Chức vụ </label>
                                                    <SelectCustomer
                                                        listItem={listDuty}
                                                        selectedItem={selectedDuty}
                                                        setSelectedItem={setSelectedDuty}
                                                        elementId={"options-search-filter-duty"}
                                                        type={"up"} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" style={{ zIndex: 1060, position: "static" }}>
                                        <button type="button" class="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div class={`btn ${searching() ? "btn-primary" : "btn-outline-light border"}  me-2`} onClick={(e) => { if (searching()) onChangeReset(e); }}
                                        >ĐẶT LẠI </div>
                                        <button type="submit" class="btn btn-primary" onClick={onChangeSearch}>TÌM KIẾM </button>
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

export default FilterSearchComponent;

