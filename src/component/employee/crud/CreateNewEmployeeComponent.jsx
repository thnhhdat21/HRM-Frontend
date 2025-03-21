import React from 'react';
import '../css/profile.css';
import CreateNewResumeComponent from './CreateNewResumeComponent';
import CreateNewContractComponent from './CreateNewContractComponent';
import CreateNewInsuranceComponent from './CreateNewInsuranceComponent';
import CreateNewReceiveComponent from './CreateNewReceiveComponent';
import CreateNewAttachedComponet from './CreateNewAttachedComponet';

const CreateNewEmployeeComponent = () => {
    return (
        <>
            <div className='page-wrapper'>
                <div class="content">
                    <div class="card card-body">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-resume" > Sơ yếu lý lịch</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-contract" >Hợp đồng</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-insurance" >Bảo hiểm</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-receive" >Tiếp nhận</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-attached" >Đính kèm</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <CreateNewResumeComponent />
                            <CreateNewContractComponent />
                            <CreateNewInsuranceComponent />
                            <CreateNewReceiveComponent />
                            <CreateNewAttachedComponet />
                        </div>
                    </div>

                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary">CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CreateNewEmployeeComponent;

