import { useDispatch, useSelector } from "react-redux";
import { updatePageIndexFilter } from "../../../redux/slice/SearchFilterSlice";

const TableAccountComponent = ({ tabId, listAccount, ref, setSelected, countAccount }) => {
    const dispatch = useDispatch();
    const searchFilter = useSelector((state) => state.searchFilter)
    return (
        <>
            <div className={`card-body p-0 tab-pane fade ${tabId === "account-actived" ? "show active" : ""} `} id={tabId}>
                <div className="custom-datatable-filter table-responsive height-my-table">
                    <div className="table-container">
                        <table className="table" id='myTable'>
                            <thead className="thead-light">
                                <tr>
                                    <th></th>
                                    <th>Tài khoản</th>
                                    <th>Nhóm</th>
                                    <th>Mã NV</th>
                                    <th>Họ tên</th>
                                    <th>Phòng ban</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày kích hoạt</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {listAccount && listAccount.map((item, index) => (
                                    <tr onContextMenu={() => setSelected(item)}>
                                        <td></td>
                                        <td><span>{item.username}</span></td>
                                        <td><span>{item.role}</span></td>
                                        <td><span>{item.employeeCode}</span></td>
                                        <td><span>{item.fullName}</span></td>
                                        <td><span>{item.department}</span></td>
                                        <td><span>{item.createDate}</span></td>
                                        <td><span>{item.activeDate}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row pageable-center">
                    <div className="col-sm-12 col-md-5">
                        <div>Hiển thị {(() => {
                            const start = (searchFilter.pageIndex - 1) * 12 + 1;
                            const end = Math.min(searchFilter.pageIndex * 12, countAccount);
                            return `${start} - ${end}`;
                        })()} trong {countAccount} bản ghi</div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate mg-top-0">
                            <ul className="pagination">
                                <li className={`page-item previous disabled my-center ${searchFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex - 1)) }}>
                                    <i className="ti ti-chevron-left"></i>
                                </li>
                                <li className="page-item active "><a className="page-link">{searchFilter.pageIndex}</a></li>
                                <li className={`page-item next disabled my-center  ${((searchFilter.pageIndex - 1) * 12 + 12) >= countAccount ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(searchFilter.pageIndex + 1)) }}>
                                    <i className="ti ti-chevron-right"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableAccountComponent;

