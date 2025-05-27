import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTitleHeader } from '../../redux/slice/TitleHeaderSlice';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import customLocale from '../../util/month-locale';
import { convertMonth } from '../../util/TimeUtil';
import { updatePageIndexFilter, updateYearMonthFilter } from '../../redux/slice/SearchFilterSlice';
import { getCountInsurance, getListInsurance } from '../../service/Manage/ManageInsuranceService';
import { responseData } from '../../util/ResponseUtil';

const InsuaranceComponent = () => {
    const dispatch = useDispatch();
    const insuranceFilter = useSelector((state) => state.searchFilter);
    const [open, setOpen] = useState(false);
    const [monthValue, setMonthValue] = useState(dayjs());
    const [listInsurance, setListInsurance] = useState([])
    const [insuranceTotal, setInsuranceTotal] = useState(0)


    useEffect(() => {
        if (monthValue) {
            const formattedMonthDisplay = monthValue.format('MM/YYYY');
            const fommattedMonthValue = monthValue.format('YYYY-MM')
            dispatch(updateTitleHeader({ title: "Danh sách bảo hiểm tháng " + formattedMonthDisplay, subTitle: "" }))
            dispatch(updateYearMonthFilter(fommattedMonthValue))
        }
    }, [monthValue])

    const handleIconClick = () => {
        setOpen(true);
    };

    const handleMonthChange = (date) => {
        if (date) {
            setMonthValue(date);
        }
        setOpen(false); // Đóng popup sau khi chọn
    };

    useEffect(() => {
        if (insuranceFilter.yearMonth) {
            getCountInsurance(insuranceFilter).then((response) => {
                if (response.data.code === 1000) {
                    setInsuranceTotal(response.data.data)
                }
            })
        }
    }, [
        insuranceFilter.name,
        JSON.stringify(insuranceFilter.department || []),
        JSON.stringify(insuranceFilter.jobPosition || []),
        JSON.stringify(insuranceFilter.duty || []),
        insuranceFilter.dateJoin || '',
        insuranceFilter.yearMonth ||
        insuranceFilter.status])

    useEffect(() => {
        if (insuranceFilter.yearMonth) {
            getListInsurance(insuranceFilter).then((response) => {
                responseData(response, setListInsurance)
            })
        }
    }, [insuranceFilter])

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="card">
                        <div className="card-header  flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ align-items-center justify-content-between ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                    <ul className="nav ">
                                        <li className="nav-item nav-profile" role="presentation" style={{}}>
                                            <button className="nav-link nav-link-profile active" id="info-tab"
                                            >Danh sách tháng {convertMonth(insuranceFilter.yearMonth)}</button>
                                        </li>
                                    </ul>
                                    <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", position: "relative", marginRight: "50px" }}
                                        onClick={handleIconClick} >
                                        <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                        <span style={{ whiteSpace: 'nowrap' }}>{monthValue ? monthValue.format('MM/YYYY') : 'Tháng'} </span>
                                        <div style={{ position: 'absolute', top: 0, left: "80px", opacity: 0, pointerEvents: 'none' }}>
                                            <DatePicker
                                                open={open}
                                                onOpenChange={setOpen}
                                                picker="month"
                                                value={monthValue}
                                                onChange={handleMonthChange}
                                                format="MM/YYYY"
                                                locale={customLocale}
                                                allowClear={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="custom-datatable-filter table-responsive height-my-table">
                                <div className="table-container">
                                    <table className="table" id='myTable'>
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Mã NV</th>
                                                <th>Họ và tên</th>
                                                <th>Phòng ban</th>
                                                <th>Vị trí</th>
                                                <th>Chức vụ</th>
                                                <th>Số sổ BH</th>
                                                <th>Số thẻ BHYT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listInsurance.length > 0 && listInsurance.map((item, index) => (
                                                <tr>
                                                    <td>{item.code}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.department}</td>
                                                    <td>{item.jobPosition}</td>
                                                    <td>{item.duty}</td>
                                                    <td>{item.insuranceNumber}</td>
                                                    <td>{item.insuranceCard}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="row pageable-center">
                                <div className="col-sm-12 col-md-5">
                                    <div>Hiển thị {(() => {
                                        const start = (insuranceFilter.pageIndex - 1) * 12 + 1;
                                        const end = Math.min(insuranceFilter.pageIndex * 12, insuranceTotal);
                                        return `${start} - ${end}`;
                                    })()} trong {insuranceTotal} bản ghi</div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="dataTables_paginate mg-top-0">
                                        <ul className="pagination">
                                            <li className={`page-item previous disabled my-center ${insuranceFilter.pageIndex === 1 ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(insuranceFilter.pageIndex - 1)) }}>
                                                <i className="ti ti-chevron-left"></i>
                                            </li>
                                            <li className="page-item active "><a className="page-link">{insuranceFilter.pageIndex}</a></li>
                                            <li className={`page-item next disabled my-center  ${((insuranceFilter.pageIndex - 1) * 12 + 12) >= insuranceTotal ? "hidden" : ""}`} onClick={() => { dispatch(updatePageIndexFilter(insuranceFilter.pageIndex + 1)) }}>
                                                <i className="ti ti-chevron-right"></i>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default InsuaranceComponent;

