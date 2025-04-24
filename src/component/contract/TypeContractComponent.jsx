import React, { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuContract from '../../contextmenu/ContextMenuContract';
import EndContractComponent from './crud/EndContractComponent';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { getCountContractType } from '../../service/ContractTypeService';
import { responseData } from '../../util/ResponseUtil';
import { updateTypeFilter } from '../../redux/slice/SearchFilterSlice';
import { getListContract } from '../../service/ContractService';
import { ContractStatus } from '../../util/ContractUtil';
import { convertDate } from '../../util/TimeUtil';
import CreateContractComponent from '../employee/crud/CreateContractComponent';

const TypeContractComponent = () => {
    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách hợp đồng", subTitle: "" }))
    const searchFilter = useSelector((state) => state.searchFilter)
    const [listCountContractType, setListCountContractType] = useState([])
    const [listContract, setListContract] = useState([])
    const [totalContract, setTotalContract] = useState("")
    const [typeOpen, setTypeOpen] = useState([])
    const [infoEmployee, setInfoEmployee] = useState({
        employeeId: "",
        contractId: "",
        contractCode: "",
        contractState: "",
        contractDateLiquid: "",
    })

    console.log(infoEmployee)

    useEffect(() => {
        const fetchAll = async () => {
            const response = await getCountContractType(searchFilter)
            if (response.data.code === 1000) {
                const list = response.data.data
                const totalCount = list.reduce((total, item) => total + (item.count || 0), 0);
                setListCountContractType(list)
                setTotalContract(totalCount)
            }
        }
        fetchAll()
    }, [
        searchFilter.status,
        searchFilter.name,
        JSON.stringify(searchFilter.department || []),
        JSON.stringify(searchFilter.jobPosition || []),
        JSON.stringify(searchFilter.duty || []),
        searchFilter.dateJoin || ''
    ])

    useEffect(() => {
        getListContract(searchFilter).then((response) => {
            responseData(response, setListContract)
        })
    }, [searchFilter])


    const onChangeType = (e) => {
        dispatch(updateTypeFilter(e.target.value))
    }

    const handleClickType = (index) => {
        const newList = [...listCountContractType]; // sao chép danh sách để tránh thay đổi trực tiếp mảng gốc
        const [selectedItem] = newList.splice(index, 1); // loại bỏ phần tử tại index
        newList.splice(3, 0, selectedItem); // chèn phần tử đã loại bỏ vào vị trí thứ 4
        dispatch(updateTypeFilter(selectedItem.id))
        setListCountContractType(newList); // cập nhật lại trạng thái
    };

    const handleSetInfoEmployee = (item) => {
        const valueNew = {
            employeeId: item.employeeId,
            contractId: item.contractId,
            contractCode: item.contractCode,
            contractState: item.contractState,
            contractDateLiquid: item.contractDateLiquid,
        }
        setInfoEmployee(valueNew)
    }

    const updateListContract = async (e) => {
        const response = await getCountContractType(searchFilter)
        if (response.data.code === 1000) {
            const list = response.data.data
            const totalCount = list.reduce((total, item) => total + (item.count || 0), 0);
            setListCountContractType(list)
            setTotalContract(totalCount)
        }

        getListContract(searchFilter).then((response) => {
            responseData(response, setListContract)
        })

    }

    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class={`nav-link nav-link-profile ${searchFilter.type === '' ? "active" : ""}`}
                                            value={''}
                                            data-bs-target="#setting-asset-group"
                                            onClick={onChangeType}>
                                            Tất cả {"(" + totalContract + ")"}
                                        </button>
                                    </li>
                                    {
                                        listCountContractType.length > 0 && listCountContractType.slice(0, 3).map((item, index) => (
                                            <li class="nav-item" role="presentation" className='nav-profile'>
                                                <button class={`nav-link nav-link-profile ${Number(searchFilter.type) === Number(item.id) ? "active" : ""}`}
                                                    value={item.id}
                                                    data-bs-target="#setting-asset-group"
                                                    onClick={onChangeType}
                                                >
                                                    {item.name + "(" + item.count + ")"}
                                                </button>
                                            </li>
                                        ))
                                    }
                                    {
                                        listCountContractType.length > 3 && (<li class="nav-item" role="presentation" className='nav-profile'>
                                            <button class={`nav-link nav-link-profile ${Number(searchFilter.type) === Number(listCountContractType[3].id) ? "active" : ""}`}
                                                value={listCountContractType[3].id}
                                                data-bs-target="#setting-asset-group"
                                                onClick={onChangeType}>
                                                {listCountContractType[3].name + "(" + listCountContractType[3].count + ")"}
                                            </button>
                                        </li>)
                                    }
                                    <li>
                                        <div className='dropdown'>
                                            <button class={`nav-link nav-link-profile `} style={{ paddingLeft: 0 }} data-bs-toggle="dropdown">
                                                < i className={`ti ${1 === 1 ? "ti-chevron-down" : "ti-chevron-up"}`} />
                                            </button>
                                            <div style={{ position: 'relative' }} className='dropdown-menu'>
                                                <div class="menu menu-title " >
                                                    {
                                                        <ul>
                                                            {listCountContractType.length > 0 && listCountContractType.slice(4).map((item, index) => (
                                                                <li style={{ whiteSpace: 'nowrap' }}
                                                                    onClick={() => handleClickType(index + 4)}>
                                                                    {item.name + "(" + item.count + ")"}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                </ul>



                            </div>

                            <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                <div class="mb-2">
                                    <Link to={"/manage-employee/create-contract"} class="btn btn-danger d-flex align-items-center" >
                                        <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div class="card-body p-0">
                            <div class="custom-datatable-filter table-responsive">
                                <div class="table-container">
                                    <table class="table" id='myTable'>
                                        <thead class="thead-light">
                                            <tr>
                                                <th>Người tạo</th>
                                                <th>Mã HĐ</th>
                                                <th>Mã nhân sự</th>
                                                <th>Tên nhân sự</th>
                                                <th>Phòng ban</th>
                                                <th>Tên hợp đồng</th>
                                                <th>Trạng thái hồ sơ ký</th>
                                                <th>Ngày hoàn tất ký</th>
                                                <th>Ngày hết hạn</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={tableRef}>
                                            {
                                                listContract.length > 0 && listContract.map((item, index) => (
                                                    <tr onContextMenu={() => handleSetInfoEmployee(item)}>
                                                        <td>{item.createdBy}</td>
                                                        <td>{item.contractCode}</td>
                                                        <td>{item.employeeCode}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.department}</td>
                                                        <td>{item.contractName}</td>
                                                        <td>
                                                            <td><span class={`badge ${item.contractStatus ? ContractStatus.get(Number(item.contractStatus)).bg : ""}`}>{item.contractStatus ? ContractStatus.get(Number(item.contractStatus)).name : ""}</span></td>
                                                        </td>
                                                        <td>{convertDate(item.dateSign)}</td>
                                                        <td>{convertDate(item.dateEnd)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="row pageable-center">
                                <div class="col-sm-12 col-md-5">
                                    <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate mg-top-0">
                                        <ul class="pagination">
                                            <li class="page-item previous disabled my-center">
                                                <i class="ti ti-chevron-left"></i>
                                            </li>
                                            <li class="page-item active "><a class="page-link">1</a></li>
                                            <li class=" page-item next disabled my-center">
                                                <i class="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuContract x={x} y={y} showMenu={showMenu} setTypeOpen={setTypeOpen} infoEmployee={infoEmployee} />

            <EndContractComponent
                contractId={infoEmployee.contractId}
                typeOpen={typeOpen}
                updateListContract={updateListContract}
            />

            <CreateContractComponent
                employeeId={infoEmployee.employeeId}
                typeOpen={typeOpen} />
        </>
    );
};

export default TypeContractComponent;

