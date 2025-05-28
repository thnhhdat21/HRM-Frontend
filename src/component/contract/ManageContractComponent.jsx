import { useEffect, useRef, useState } from 'react';
import useRightClickMenu from '../../hooks/useRightClickMenu';
import ContextMenuContract from '../../contextmenu/ContextMenuContract';
import EndContractComponent from './crud/EndContractComponent';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import { responseData } from '../../util/ResponseUtil';
import { updatePageIndexFilter, updateTypeFilter, updateWhenClickNavContract } from '../../redux/slice/SearchFilterSlice';
import { getCountContract, getCountContractType, getListContract } from '../../service/Manage/ManageContractService';
import { ContractStatus } from '../../util/ContractUtil';
import { convertDate } from '../../util/TimeUtil';
import CreateContractComponent from '../employee/crud/CreateContractComponent';
import Cookies from 'js-cookie';
import { PerManageContract } from '../../util/PermissionUtil';
const ManageContractComponent = () => {
    //lay role
    const roleString = Cookies.get('permissions');
    let roles = new Set();
    let isManage = false;
    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isManage = PerManageContract.some((role) => roles.has(role))
    }

    const tableRef = useRef(null)
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 220);
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Danh sách hợp đồng", subTitle: "" }))
    const searchFilter = useSelector((state) => state.searchFilter)
    const [listCountContractType, setListCountContractType] = useState([])
    const [listContract, setListContract] = useState([])
    const [totalContract, setTotalContract] = useState("")
    const [totalContractType, setTotalContractType] = useState("")
    const [typeOpen, setTypeOpen] = useState([])
    const [infoEmployee, setInfoEmployee] = useState({
        employeeId: "",
        employeeName: "",
        contractId: "",
        contractCode: "",
        contractState: "",
        contractDateLiquid: "",
    })

    useEffect(() => {
        const fetchAll = async () => {
            const response = await getCountContractType(searchFilter)
            if (response.data.code === 1000) {
                const list = response.data.data
                setListCountContractType(list)
                const totalCount = list.reduce((total, item) => total + (item.count || 0), 0);
                setListCountContractType(list)
                setTotalContractType(totalCount)
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

        getCountContract(searchFilter).then((response) => {
            if (response.data.code === 1000) {
                const count = response.data.data
                setTotalContract(count)
            }
        })

    }, [searchFilter])


    const onChangeType = (e) => {
        dispatch(updateWhenClickNavContract(e.target.value))
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
            employeeName: item.employeeName,
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
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul className="nav ">
                                    <li className="nav-item nav-profile" role="presentation" >
                                        <button className={`nav-link nav-link-profile ${searchFilter.type === '' ? "active" : ""}`}
                                            value={''}
                                            data-bs-target="#setting-asset-group"
                                            onClick={onChangeType}>
                                            Tất cả {"(" + totalContractType + ")"}
                                        </button>
                                    </li>
                                    {
                                        listCountContractType.length > 0 && listCountContractType.slice(0, 3).map((item, index) => (
                                            <li className="nav-item nav-profile" role="presentation">
                                                <button className={`nav-link nav-link-profile ${Number(searchFilter.type) === Number(item.id) ? "active" : ""}`}
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
                                        listCountContractType.length > 3 && (<li className="nav-item nav-profile" role="presentation">
                                            <button className={`nav-link nav-link-profile ${Number(searchFilter.type) === Number(listCountContractType[3].id) ? "active" : ""}`}
                                                value={listCountContractType[3].id}
                                                data-bs-target="#setting-asset-group"
                                                onClick={onChangeType}>
                                                {listCountContractType[3].name + "(" + listCountContractType[3].count + ")"}
                                            </button>
                                        </li>)
                                    }
                                    <li>
                                        <div className='dropdown'>
                                            <button className={`nav-link nav-link-profile `} style={{ paddingLeft: 0 }} data-bs-toggle="dropdown">
                                                < i className={`ti ${1 === 1 ? "ti-chevron-down" : "ti-chevron-up"}`} />
                                            </button>
                                            <div style={{ position: 'relative' }} className='dropdown-menu'>
                                                <div className="menu menu-title " >
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
                            {
                                isManage && (
                                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                                        <div className="mb-2">
                                            <Link to={"/manage-contract/create-contract"} className="btn btn-danger d-flex align-items-center" >
                                                <i className="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive height-my-table">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th></th>
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
                                                        <td></td>
                                                        <td>{item.contractCode}</td>
                                                        <td>{item.employeeCode}</td>
                                                        <td>{item.employeeName}</td>
                                                        <td>{item.department}</td>
                                                        <td>{item.contractName}</td>
                                                        <td>
                                                            <td><span className={`badge ${item.contractStatus ? ContractStatus.get(Number(item.contractStatus)).bg : ""}`}>{item.contractStatus ? ContractStatus.get(Number(item.contractStatus)).name : ""}</span></td>
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

                            <div className="row pageable-center">
                                <div className="col-sm-12 col-md-5">
                                    <div>Hiển thị {(() => {
                                        const start = (searchFilter.pageIndex - 1) * 12 + 1;
                                        const end = Math.min(searchFilter.pageIndex * 12, totalContract);
                                        return `${start} - ${end}`;
                                    })()} trong {totalContract} bản ghi</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate mg-top-0">
                                        <ul className="pagination">
                                            <li className={`page-item previous disabled my-center ${searchFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex - 1)) }}>
                                                <i className="ti ti-chevron-left"></i>
                                            </li>
                                            <li className="page-item active "><a className="page-link">{searchFilter.pageIndex}</a></li>
                                            <li className={`page-item next disabled my-center  ${((searchFilter.pageIndex - 1) * 12 + 12) >= totalContract ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex + 1)) }}>
                                                <i className="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuContract x={x} y={y} showMenu={showMenu} setTypeOpen={setTypeOpen} infoEmployee={infoEmployee} isManage={isManage} />

            <EndContractComponent
                contractId={infoEmployee.contractId}
                typeOpen={typeOpen}
                updateListContract={updateListContract}
            />

            <CreateContractComponent
                employeeId={infoEmployee.employeeId}
                typeOpen={typeOpen}
                updateListContract={updateListContract}
            />
        </>
    );
};

export default ManageContractComponent;

