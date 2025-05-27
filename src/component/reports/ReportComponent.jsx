import { useDispatch } from "react-redux";
import { updateTitleHeader, } from "../../redux/slice/TitleHeaderSlice";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, Legend, LinearScale, Title, Chart as ChartJS, Tooltip, PointElement, LineElement } from "chart.js";
import { useEffect, useState } from "react";
import { responseData } from "../../util/ResponseUtil";
import { reportCountEmployeeAPI, reportSalaryDepartmentAPI } from "../../service/Manage/ManageReportService";
import dayjs from 'dayjs';
import { DatePicker } from "antd";
import customLocale from "../../util/month-locale";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,     // ✅ cần thêm
    LineElement,
    Title,
    Tooltip,
    Legend
);



const ReportComponent = () => {
    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Báo cáo - Thống kê", subTitle: "" }))
    const [reportSalaryDepartment, setReportSalaryDepartment] = useState([])
    const [reportCountEmployee, setReportCountEmployee] = useState([])
    const [monthValue, setMonthValue] = useState(dayjs().subtract(1, 'month'));
    const [yearMonthDisplay, setYearMonthDisplay] = useState("");
    const [open, setOpen] = useState(false);
    const handleIconClick = () => {
        setOpen(true);
    };

    const handleMonthChange = (date) => {
        if (date) {
            setMonthValue(date);
        }
        setOpen(false); // Đóng popup sau khi chọn
    };

    const getReportSalaryDepartment = (yearMonth) => {
        reportSalaryDepartmentAPI(yearMonth).then((reponse) => {
            responseData(reponse, setReportSalaryDepartment)
        })
    }


    const getReportCountEmployee = () => {
        reportCountEmployeeAPI().then((reponse) => {
            responseData(reponse, setReportCountEmployee)
        })
    }

    useEffect(() => {
        const today = new Date();
        getReportCountEmployee()
        getReportSalaryDepartment(`${today.getFullYear()}-${String(today.getMonth()).padStart(2, '0')}`)
    }, [])

    useEffect(() => {
        if (monthValue) {
            const formattedMonthDisplay = monthValue.format('MM/YYYY');
            const fommattedMonthValue = monthValue.format('YYYY-MM')
            getReportSalaryDepartment(fommattedMonthValue)
            setYearMonthDisplay(formattedMonthDisplay)
        }
    }, [monthValue])


    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-xl-12 col-md-8">
                            <div className="card-body">
                                <div class="card">
                                    <div class="card-header border-0 pb-0">
                                        <div
                                            class="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-2">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <h5 class="mb-1">Thống kê số lượng nhân sự theo phòng ban </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body" >
                                        <div className="card" >
                                            <Bar
                                                data={{
                                                    labels: reportCountEmployee.map((data) => data.department),
                                                    datasets: [
                                                        {
                                                            label: "Số lượng nhân sự",
                                                            data: reportCountEmployee.map((data) => data.count),
                                                            backgroundColor: ["rgb(229, 2, 19)"]
                                                        }
                                                    ],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header border-0 pb-0">
                                        <div
                                            class="d-flex align-items-center justify-content-between border-bottom flex-wrap row-gap-3 pb-2">
                                            <div class="d-flex align-items-center">
                                                <h5 class="mb-1">Thống kê lương phòng ban tháng {yearMonthDisplay} </h5>
                                            </div>
                                            <div className="d-flex flex-column align-items-center icon-header-2" style={{ fontSize: "12px", position: "relative" }}
                                                onClick={handleIconClick} >
                                                <i className='fe fe-calendar' style={{ fontSize: "20px", cursor: "pointer" }} />
                                                <span style={{ whiteSpace: 'nowrap' }}>{monthValue ? monthValue.format('MM/YYYY') : 'Tháng'} </span>
                                                <div style={{ position: 'absolute', top: 0, left: "30px", opacity: 0, pointerEvents: 'none' }}>
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
                                    <div class="card-body">
                                        <div className="card">
                                            <Bar
                                                data={{
                                                    labels: reportSalaryDepartment.map((data) => data.department),
                                                    datasets: [
                                                        {
                                                            label: "Tiền lương thực lĩnh",
                                                            data: reportSalaryDepartment.map((data) => data.sumSalary),
                                                            backgroundColor: ["rgb(32, 44, 75)"]
                                                        }
                                                    ],
                                                }}
                                            />
                                        </div>
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

export default ReportComponent;

