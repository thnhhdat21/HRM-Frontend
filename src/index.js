import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeComponent from './component/employee/EmployeeComponent';
import HomeComponnent from './component/home/HomeComponent';
import ProfileComponnent from './component/employee/profile/ProfileComponent';
import ManageDepartmentComponent from './component/setting/department/ManageDepartmentComponent';
import SettingJobPositionComponent from './component/setting/jobposition/SettingJobPositionComponent';
import SettingPenaltyComponent from './component/setting/decision/SettingPenaltyComponent';
import SettingRewardComponent from './component/setting/decision/SettingRewardComponent';
import SettingTypeContractComponent from './component/setting/typecontract/SettingTypeContractComponent';
import SettingInsuranceComponent from './component/setting/insurance/SettingInsuranceComponent';
import CreateNewEmployeeComponent from './component/employee/crud/CreateNewEmployeeComponent';
import ContractCRUDComponent from './component/contract/crud/ContractCRUDComponent';
import InsuaranceComponent from './component/insurance/InsuaranceComponent';
import SettingOnLeaveComponent from './component/setting/onleave/SettingOnLeaveComponent';
import TimeSheetComponent from './component/timekeeping/TimeSheetComponent';
import HolidaysComponent from './component/timekeeping/HolidaysComponent';
import OnLeaveManamentComponent from './component/timekeeping/OnLeaveManamentComponent';
import PayrollComponen from './component/salary/PayrollComponen';
import ListTaxComponent from './component/salary/ListTaxComponent';
import EmployeeTimekeeping from './component/employee/EmployeeTimekeeping';
import EmployeeOTComponent from './component/employee/EmployeeOTComponent';
import EmployeeLeaveComponent from './component/employee/EmployeeLeaveComponent';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import DetailDecisionComponent from './component/decision/DetailDecisionComponent';
import SettingLetterReasonComponent from './component/setting/letter/SettingLetterReasonComponent';
import DetailLetterComponent from './component/letter/DetailLetterComponent';
import PayrollEmployeeComponent from './component/salary/PayrollEmployeeComponent';
import LoginComponent from './component/authentication/LoginComponent';
import ManageRoutes from './routes/ManageRoutes';
import NoAuthozComponent from './component/common/NoAuthozComponent';
import { PerWatchAdmin, PerWatchContract, PerWatchDecision, PerWatchEmployee, PerWatchInsurance, PerWatchLetter, PerWatchReport, PerWatchSalary, PerWatchTimeSheet } from './util/PermissionUtil';
import ManageContractComponent from './component/contract/ManageContractComponent';
import ManageDecisionComponent from './component/decision/ManageDecisionComponent';
import ManageLetterComponent from './component/letter/ManageLetterComponent';
import ManageAccountComponent from './component/setting/account/ManageAccountComponent';
import SettingAllowanceComponent from './component/setting/allowance/SettingAllowanceComponent';
import GroupCRUDComponent from './component/setting/group/GroupCRUDComponent';
import ManageGroupComponent from './component/setting/group/ManageGroupComponent';
import SettingDutyComponent from './component/setting/duty/SettingDutyComponent';
import ReportComponent from './component/reports/ReportComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/no-authorization' element={<NoAuthozComponent />} />

        {/* Personal */}
        <Route path="/" element={<App />}>
          <Route path='personal/home' element={<HomeComponnent />} />
          <Route path='personal/timekeeping' element={<EmployeeTimekeeping />} />
          <Route path='personal/list-overtime' element={<EmployeeOTComponent />} />
          <Route path='personal/list-leave' element={<EmployeeLeaveComponent />} />
          <Route path='/profile-employee' element={<ProfileComponnent />} />

          <Route element={<ManageRoutes allowedRoles={PerWatchAdmin} />}>
            <Route path="/settings/account" element={<ManageAccountComponent />} />
            <Route path="/settings/group" element={<ManageGroupComponent />} />
            <Route path="/settings/group/add" element={<GroupCRUDComponent />} />
            <Route path="/settings/department" element={<ManageDepartmentComponent />} />
            <Route path="/settings/employee-job-position" element={<SettingJobPositionComponent />} />
            <Route path="/settings/duty" element={<SettingDutyComponent />} />
            <Route path="/settings/penalty" element={<SettingPenaltyComponent />} />
            <Route path="/settings/reward" element={<SettingRewardComponent />} />
            <Route path="/settings/contract" element={<SettingTypeContractComponent />} />
            <Route path="/settings/allowance" element={<SettingAllowanceComponent />} />
            <Route path="/settings/insurance" element={<SettingInsuranceComponent />} />
            <Route path="/settings/letter-reason" element={<SettingLetterReasonComponent />} />
            <Route path="/settings/on-leave" element={<SettingOnLeaveComponent />} />
          </Route>

          {/* Employee */}
          <Route element={<ManageRoutes allowedRoles={PerWatchEmployee} />}>
            <Route path='/manage-employee/list-employee' element={<EmployeeComponent />} />
            <Route path='/manage-employee/create-employee' element={<CreateNewEmployeeComponent />} />
          </Route>

          {/* Contract */}
          <Route element={<ManageRoutes allowedRoles={PerWatchContract} />}>
            <Route path='/manage-contract/type-contract' element={<ManageContractComponent />} />
            <Route path='/manage-contract/create-contract' element={<ContractCRUDComponent />} />
          </Route>

          {/* Insurance*/}
          <Route element={<ManageRoutes allowedRoles={PerWatchInsurance} />}>
            <Route path='/manage-insurance/insurance' element={<InsuaranceComponent />} />
          </Route>

          {/*Decision */}
          <Route element={<ManageRoutes allowedRoles={PerWatchDecision} />}>
            <Route path='/manage-decision/decision' element={<ManageDecisionComponent />} />
            <Route path='/manage-decision/decision-detail' element={<DetailDecisionComponent />} />
          </Route>

          {/* letter */}
          <Route element={<ManageRoutes allowedRoles={PerWatchLetter} />}>
            <Route path='/manage-letter/letter' element={<ManageLetterComponent />} />
            <Route path='/manage-letter/letter-detail' element={<DetailLetterComponent />} />
          </Route>

          {/* timekeeping */}
          <Route element={<ManageRoutes allowedRoles={PerWatchTimeSheet} />}>
            <Route path='/manage-timekeeping' element={<TimeSheetComponent />} />
            <Route path='/manage-timekeeping/holidays' element={<HolidaysComponent />} />
            <Route path='/manage-timekeeping/on-leave-manage' element={<OnLeaveManamentComponent />} />
          </Route>

          {/* Salary */}
          <Route element={<ManageRoutes allowedRoles={PerWatchSalary} />}>
            <Route path='/manage-salary/payroll' element={<PayrollComponen />} />
            <Route path='/manage-salary/table-salary-detail' element={<PayrollEmployeeComponent />} />
            <Route path='/manage-salary/tax' element={<ListTaxComponent />} />
          </Route>

          <Route element={<ManageRoutes allowedRoles={PerWatchReport} />}>
            <Route path='/manage-report' element={<ReportComponent />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
