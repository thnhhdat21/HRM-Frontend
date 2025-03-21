import React from 'react';
import '../css/profile.css';
import ResumeComponent from './subcomponent.jsx/ResumeComponent';
import EmployeeWorkComponnent from './subcomponent.jsx/EmployeeWorkComponent';
import EmployeeInsuranceComponnent from './subcomponent.jsx/EmployeeInsuranceComponent';
import EmployeeContractComponent from './subcomponent.jsx/EmployeeContractComponent';
import EmployeeSalaryComponent from './subcomponent.jsx/EmployeeSalaryComponent';
import EmployeeReceiveComponent from './subcomponent.jsx/EmployeeReceiveComponent';
import EmployeeLayoffComponent from './subcomponent.jsx/EmployeeLayoffComponent';
import EmployeeAssetComponent from './subcomponent.jsx/EmployeeAssetComponent';
import EmployeeAttachedComponent from './subcomponent.jsx/EmployeeAttachedComponent';
const ProfileComponnent = () => {
    return (
        <>
            <div className='page-wrapper' style={{ position: "static" }}>
                < div class="header" style={{ marginTop: "55px", height: "55px", background: "#f8f9fa", zIndex: 10 }} >
                    <div class="main-header">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px' }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-resume" > Sơ yếu lý lịch</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-work" >Công việc</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-insurance" >Bảo hiểm</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-contract" >Hợp đồng</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-salary" >Lương & Phụ cấp</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-receive" >Tiếp nhận</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-layoff" >Thôi việc</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-asset" >Tài sản</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile-attached" >Đính kèm</button>
                                    </li>
                                </ul>
                            </div>
                            {/* <div style={{ marginBottom: "5px" }} class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">

                                <div className="d-flex flex-column align-items-center" style={{ fontSize: "12px", marginLeft: "30px" }}>
                                    <img src="assets/my-img/tag.png" style={{ width: "25px", padding: "5px" }} alt="" />
                                    <span >Nhãn</span>
                                </div>

                                <div className="d-flex flex-column align-items-center" style={{ fontSize: "12px", marginLeft: "30px" }}>
                                    <img src="assets/my-img/structure.png" style={{ width: "25px" }} alt="" />
                                    <span >Phòng ban</span>
                                </div>

                                <div className="d-flex flex-column align-items-center" style={{ fontSize: "12px", marginLeft: "30px" }}>
                                    <img src="assets/my-img/email.png" style={{ width: "25px", padding: "5px" }} alt="" />
                                    <span >Email/Chat</span>
                                </div>

                                <div className="d-flex flex-column align-items-center" style={{ fontSize: "12px", marginLeft: "30px" }}>
                                    <img src="assets/my-img/hssd.png" style={{ width: "25px", padding: "5px" }} alt="" />
                                    <span >HSSD</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div >
                <div class="tab-content" id="myTabContent">
                    <ResumeComponent />
                    <EmployeeWorkComponnent />
                    <EmployeeInsuranceComponnent />
                    <EmployeeContractComponent />
                    <EmployeeReceiveComponent />
                    <EmployeeAssetComponent />
                    <EmployeeAttachedComponent />
                    <EmployeeLayoffComponent />
                    <EmployeeSalaryComponent />
                </div>
            </div >
        </>
    );
};

export default ProfileComponnent;

