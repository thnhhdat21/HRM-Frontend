import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeComponent from './component/employee/EmployeeComponent';
import HomeComponnent from './component/home/HomeComponent';
import ProfileComponnent from './component/employee/profile/ProfileComponent';
import SettingComponent from './component/setting/SettingComponent';
import ManageAccountComponent from './component/setting/ManageAccountComponent';
import ManageDepartmentComponent from './component/setting/ManageDepartmentComponent';
import ManageGroupComponent from './component/setting/ManageGroupComponent';
import GroupCRUDComponent from './component/setting/crud/GroupCRUDComponent';
import SettingJobPositionComponent from './component/setting/SettingJobPositionComponent';
import SettingDutyComponent from './component/setting/SettingDutyComponent';
import SettingWorkplaceComponent from './component/setting/SettingWorkplaceComponent';
import SettingPenaltyComponent from './component/setting/SettingPenaltyComponent';
import SettingRewardComponent from './component/setting/SettingRewardComponent';
import SettingTypeContractComponent from './component/setting/SettingTypeContractComponent';
import SettingAllowanceComponent from './component/setting/SettingAllowanceComponent';
import SettingInsuranceComponent from './component/setting/SettingInsuranceComponent';
import SettingTypeInsuranceComponent from './component/setting/SettingTypeInsuranceComponent';
import CreateNewEmployeeComponent from './component/employee/crud/CreateNewEmployeeComponent';
import TypeContractComponent from './component/contract/TypeContractComponent';
import ContractCRUDComponent from './component/contract/crud/ContractCRUDComponent';
import InsuaranceComponent from './component/insurance/InsuaranceComponent';
import InsuranceIncreaseComponent from './component/insurance/InsuaranceIncreaseComponent';
import InsuranceDecreaseComponent from './component/insurance/InsuranceDecreaseComponent';
import DecisionComponent from './component/decision/DecisionComponent';
import ApprovalComponent from './component/approval/ApprovalComponent';
import SettingApprovalComponent from './component/setting/SettingApprovalComponent';
import SalaryApprovalComponent from './component/approval/SalaryApprovalComponent';
import SalaryApprovalDetailComponent from './component/approval/SalaryApprovalDetailComponent';
import SettingOnLeaveComponent from './component/setting/SettingOnLeaveComponent';
import SettingTimeKeepingComponent from './component/setting/SettingTimeKeepingComponent';
import TimeSheetComponent from './component/timekeeping/TimeSheetComponent';
import HolidaysComponent from './component/timekeeping/HolidaysComponent';
import AutoTimeKeepingComponent from './component/timekeeping/AutoTimeKeepingComponent';
import CreateShiftComponent from './component/timekeeping/crud/CreateShiftComponent';
import WorkShiftComponent from './component/timekeeping/WorkShiftComponent';
import WorkShiftDetailComponent from './component/timekeeping/WorkShiftDetailComponent';
import OnLeaveManamentComponent from './component/timekeeping/OnLeaveManamentComponent';
import OnLeaveManageDetailComponent from './component/timekeeping/OnLeaveManageDetailComponent';
import ListAssetComponent from './component/asset/ListAssetComponent';
import AssetDetailComponent from './component/asset/crud/AssetDetailComponent';
import HistoryAssetComponent from './component/asset/crud/HistoryAssetComponent';
import ListAllocationComponent from './component/asset/ListAllocationComponent';
import ListRecallComponent from './component/asset/ListRecallComponent';
import DepreciationComponent from './component/asset/DepreciationComponent';
import PayrollDetailComponent from './component/salary/crud/PayrollDetailComponent';
import PayrollTypeComponent from './component/salary/PayrollTypeComponent';
import CreatePayrollTypeComponent from './component/salary/crud/CreatePayrollTypeComponent';
import PayrollEmployeeComponent from './component/salary/crud/PayrollEmployeeComponent';
import FormulaDetailComponent from './component/salary/crud/FormulaDetailComponent';
import PayrollComponen from './component/salary/PayrollComponen';
import TestComponent from './test/TestComponent';
import ListTaxComponent from './component/salary/ListTaxComponent';
import EmployeeTimekeeping from './component/employee/EmployeeTimekeeping';
import DetailApprovalComponent from './component/approval/crud/DetailApprovalComponent';
import EmployeeOTComponent from './component/employee/EmployeeOTComponent';
import EmployeeLeaveComponent from './component/employee/EmployeeLeaveComponent';
import SettingAssetComponent from './component/setting/asset/SettingAssetComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />

        {/* Personal */}
        <Route path='/personal/home' element={<App component={HomeComponnent} />} /> {/* Check */}
        <Route path='/personal/timekeeping' element={<App component={EmployeeTimekeeping} />} />{/* Check */}
        <Route path='/personal/list-overtime' element={<App component={EmployeeOTComponent} />} />{/* Check */}
        <Route path='/personal/list-leave' element={<App component={EmployeeLeaveComponent} />} />{/* Check */}


        {/* Manage */}
        <Route path='/admin' element={<SettingComponent />} /> {/* Check */}
        <Route path='/admin/admin-account' element={<App component={ManageAccountComponent} />} />{/* Check */}
        <Route path='/admin/admin-group' element={<App component={ManageGroupComponent} />} />{/* Check */}
        <Route path='/admin/admin-group/add' element={<App component={GroupCRUDComponent} />} />{/* Check */}
        <Route path='/admin/admin-department' element={<App component={ManageDepartmentComponent} />} />{/* Check */}

        {/* Setting */}
        {/* setting hồ sơ nhân sự */}
        <Route path='/settings/employee' element={<App component={SettingJobPositionComponent} />} />{/* Check */}
        <Route path='/settings/duty' element={<App component={SettingDutyComponent} />} />{/* Check */}
        <Route path='/settings/workplace' element={<App component={SettingWorkplaceComponent} />} />{/* Check */}
        <Route path='/settings/penalty' element={<App component={SettingPenaltyComponent} />} />{/* Check */}
        <Route path='/settings/reward' element={<App component={SettingRewardComponent} />} />{/* Check */}
        <Route path='/settings/contract' element={<App component={SettingTypeContractComponent} />} />{/* Check */}
        <Route path='/settings/allowance' element={<App component={SettingAllowanceComponent} />} /> {/* Check */}
        <Route path='/settings/insurance' element={<App component={SettingInsuranceComponent} />} /> {/* Check */}
        <Route path='/settings/type-insurance' element={<App component={SettingTypeInsuranceComponent} />} /> {/* Check */}
        <Route path='/settings/approval' element={<App component={SettingApprovalComponent} />} />{/* Check */}
        <Route path='/settings/on-leave' element={<App component={SettingOnLeaveComponent} />} /> {/* Check */}
        <Route path='/settings/timekeeping' element={<App component={SettingTimeKeepingComponent} />} />{/* Check */}
        <Route path='/settings/asset' element={<App component={SettingAssetComponent} />} /> {/* Check */}

        {/* Employee */}
        <Route path='/manage-employee/list-employee' element={<App component={EmployeeComponent} />} />{/* Check */}
        {/* Employee/contract */}
        <Route path='/manage-employee/type-contract' element={<App component={TypeContractComponent} />} /> {/* Check */}
        {/* Employee/insurance*/}
        <Route path='/manage-employee/insurance' element={<App component={InsuaranceComponent} />} /> {/* Check */}
        <Route path='/manage-employee/insurance-increase' element={<App component={InsuranceIncreaseComponent} />} /> {/* Check */}
        <Route path='/manage-employee/insurance-decrease' element={<App component={InsuranceDecreaseComponent} />} /> {/* Check */}
        {/* Employee/* Decision */}
        <Route path='/manage-employee/decision' element={<App component={DecisionComponent} />} />{/* Check */}

        <Route path='/profile-employee' element={<App component={ProfileComponnent} />} />{/* Check */}

        {/* Create employee */}
        <Route path='/manage-employee/create-employee' element={<App component={CreateNewEmployeeComponent} />} />{/* Check */}

        {/* Contract */}
        <Route path='/manage-employee/create-contract' element={<App component={ContractCRUDComponent} />} />{/* Check */}

        {/* Approval */}
        <Route path='/manage-approval/approval' element={<App component={ApprovalComponent} />} />{/* Check */}
        <Route path='/approval/detail-approval' element={<App component={DetailApprovalComponent} />} />
        {/* Approval/Salary */}
        <Route path='/manage-approval/approval-salary' element={<App component={SalaryApprovalComponent} />} />{/* Check */}
        <Route path='/manage-approval/detail-approval-salary' element={<App component={SalaryApprovalDetailComponent} />} />

        {/* timekeeping */}
        <Route path='/manage-timekeeping' element={<App component={TimeSheetComponent} />} />{/* Check */}
        <Route path='/manage-timekeepingg/holidays' element={<App component={HolidaysComponent} />} />{/* Check */}
        <Route path='/manage-timekeeping/auto-timekeeping' element={<App component={AutoTimeKeepingComponent} />} />{/* Check */}
        <Route path='/manage-timekeeping/work-shift' element={<App component={WorkShiftComponent} />} />{/* Check */}
        <Route path='/manage-timekeeping/create-work-shift' element={<App component={CreateShiftComponent} />} />{/* Check */}
        <Route path='/manage-timekeeping/work-shift-detail' element={<App component={WorkShiftDetailComponent} />} />{/* Check */}

        <Route path='/manage-timekeeping/on-leave-manage' element={<App component={OnLeaveManamentComponent} />} />{/* Check */}
        <Route path='/manage-timekeeping/on-leave-detail' element={<App component={OnLeaveManageDetailComponent} />} />{/* Check */}

        {/* Asset */}
        <Route path='/manage-asset/asset' element={<App component={ListAssetComponent} />} /> {/* Check */}
        <Route path='/manage-asset/asset-detail' element={<App component={AssetDetailComponent} />} />
        <Route path='/manage-asset/history-asset' element={<App component={HistoryAssetComponent} />} />
        <Route path='/manage-asset/list-allocation' element={<App component={ListAllocationComponent} />} /> {/* Check */}
        <Route path='/manage-asset/list-recall' element={<App component={ListRecallComponent} />} /> {/* Check */}
        <Route path='/manage-asset/list-depreciation' element={<App component={DepreciationComponent} />} /> {/* Check */}

        {/* Payroll */}
        <Route path='/manage-salary/payroll' element={<App component={PayrollComponen} />} /> {/* Check */}
        <Route path='/manage-salary/payroll-type' element={<App component={PayrollTypeComponent} />} />{/* Check */}

        <Route path='/manage-salary/payroll-type-detail' element={<App component={PayrollDetailComponent} />} />
        <Route path='/manage-salary/create-payroll-type' element={<App component={CreatePayrollTypeComponent} />} />{/* Check */}
        <Route path='/manage-salary/wage-wage' element={<App component={PayrollEmployeeComponent} />} />
        <Route path='/manage-salary/wage-wage-detail-formula' element={<App component={FormulaDetailComponent} />} />

        <Route path='/manage-salary/tax' element={<App component={ListTaxComponent} />} />{/* Check */}

        {/* Test */}
        <Route path='/test' element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
