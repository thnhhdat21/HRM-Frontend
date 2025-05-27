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
            <div className="modal fade" id="search-filter">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-detail-timekeeping">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Tìm kiếm </h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form action="employees.html">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active">
                                    <div className="modal-body pb-0 overflow-modal-crud">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Tên nhân sự </label>
                                                    <input type="text" className="form-control" name='name' value={values.name} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Ngày vào</label>
                                                    <input type="date" className="form-control" placeholder='dd/mm/yyyy' name='dateJoin' value={values.dateJoin} onChange={onChangeInput} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Phòng ban </label>
                                                    <SelectCustomer
                                                        listItem={listDepartment}
                                                        selectedItem={selectedDepartment}
                                                        setSelectedItem={setSelectedDepartment}
                                                        elementId={"options-search-filter-department"}
                                                        type={"up"} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Vị trí </label>
                                                    <SelectCustomer
                                                        listItem={listJobPostion}
                                                        selectedItem={selectedJobPosition}
                                                        setSelectedItem={setSelectedJobPosition}
                                                        elementId={"options-search-filter-job-position"}
                                                        type={"up"} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Chức vụ </label>
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
                                    <div className="modal-footer" style={{ zIndex: 1060, position: "static" }}>
                                        <button type="button" className="btn btn-outline-light border me-2"
                                            data-bs-dismiss="modal">HỦY BỎ</button>
                                        <div className={`btn ${searching() ? "btn-primary" : "btn-outline-light border"}  me-2`} onClick={(e) => { if (searching()) onChangeReset(e); }}
                                        >ĐẶT LẠI </div>
                                        <button type="submit" className="btn btn-primary" onClick={onChangeSearch}>TÌM KIẾM </button>
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

