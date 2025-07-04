import { PerWatchContract, PerWatchDecision, PerWatchEmployee, PerWatchInsurance, PerWatchLetter, PerWatchReport, PerWatchSalary, PerWatchTimeSheet } from "./PermissionUtil";

const menuObjectSetting = [
    {
        id: 1, name: 'Cài đặt chung', icon: 'ti ti-settings', path: 'setting', child: [
            { id: 2, name: 'Tài khoản người dùng', icon: 'fe fe-user', path: '/settings/account', child: [] },
            { id: 3, name: 'Phòng ban, chi nhánh', icon: 'fe fe-layers', path: '/settings/department', child: [] },
            { id: 4, name: 'Nhóm người dùng', icon: 'ti ti-users', path: '/settings/group', child: [] },
            { id: 5, name: 'Vị trí công việc', icon: '', path: '/settings/employee-job-position' },
            { id: 6, name: 'Chức vụ', icon: '', path: '/settings/duty' },
            { id: 7, name: 'Chế độ phúc lợi', icon: '', path: '/settings/reward' },
            { id: 8, name: 'Phạt nội bộ', icon: '', path: '/settings/penalty' },
        ]
    },
    {
        id: 9, name: 'Cài đặt đối tượng', icon: 'ti ti-adjustments', path: 'setting', child: [
            { id: 10, name: 'Hợp đồng lao động', icon: '', path: '/settings/contract' },
            { id: 11, name: 'Bảo hiểm', icon: '', path: '/settings/insurance' },
            { id: 12, name: 'Đơn từ', icon: '', path: '/settings/letter-reason' },
            { id: 13, name: 'Nghỉ phép', icon: '', path: '/settings/on-leave' },
            { id: 14, name: 'Phụ cấp', icon: '', path: '/settings/allowance' },
        ]
    },
]

const menuEmployeePersonal = [
    {
        id: 15, name: 'Thông tin chung', icon: 'ti ti-home', path: '/personal/home', permissions: ['ROLE_MANAGE_SELF_EMPLOYEE', 'ADMIN'], child: []
    },
    {
        id: 16, name: 'Bảng công tháng', icon: 'fe fe-calendar', path: '/personal/timekeeping', permissions: ['ROLE_MANAGE_SELF_EMPLOYEE', 'ADMIN'], child: []
    },
    {
        id: 18, name: 'Đăng ký nghỉ', icon: 'ti ti-umbrella', path: '/personal/list-leave', permissions: ['ROLE_MANAGE_SELF_EMPLOYEE', 'ADMIN'], child: []
    },
    {
        id: 19, name: 'Đăng ký OT', icon: 'ti ti-clock', path: '/personal/list-overtime', permissions: ['ROLE_MANAGE_SELF_EMPLOYEE', 'ADMIN'], child: []
    }
]

const menuEmployeeManage = [
    {
        id: 21, name: 'Hồ sơ nhân sự', icon: 'ti ti-credit-card', path: '/manage-employee/list-employee',
        permissions: PerWatchEmployee,
        child: [
            { id: 22, name: 'Tất cả', icon: '', path: '/manage-employee/list-employee', status: '' },
            { id: 23, name: 'Đang làm việc', icon: '', path: '/manage-employee/list-employee', status: '1' },
            { id: 24, name: 'Nghỉ tạm thời', icon: '', path: '/manage-employee/list-employee', status: '2' },
            { id: 25, name: 'Nghỉ việc', icon: '', path: '/manage-employee/list-employee', status: '3' }
        ]
    },
    {
        id: 26, name: 'Hợp đồng', icon: 'ti ti-file-code', path: '/manage-contract/type-contract',
        permissions: PerWatchContract,
        child: [
            { id: 27, name: 'Tất cả', icon: '', path: '/manage-contract/type-contract', status: '' },
            { id: 28, name: 'Đang hiệu lực', icon: '', path: '/manage-contract/type-contract', status: '1' },
            { id: 29, name: 'Chưa hiệu lực', icon: '', path: '/manage-contract/type-contract', status: '2' },
            { id: 30, name: 'Thanh lý', icon: '', path: '/manage-contract/type-contract', status: '3' },
        ]
    },
    {
        id: 31, name: 'Bảo hiểm', icon: 'ti ti-shield-check', path: '/manage-insurance/insurance',
        permissions: PerWatchInsurance,
        child: [
            { id: 32, name: 'Tất cả', icon: '', path: '/manage-insurance/insurance' },
            { id: 33, name: 'Tăng dự kiến', icon: '', path: '/manage-insurance/insurance', status: '2' },
            { id: 34, name: 'Giảm dự kiến', icon: '', path: '/manage-insurance/insurance', status: '3' },
        ]
    },
    {
        id: 35, name: 'Quyết định', icon: 'ti ti-gift', path: '/manage-decision/decision',
        permissions: PerWatchDecision,
        child: []
    },
    {
        id: 36, name: 'Đơn từ', icon: 'ti ti-clipboard-text', path: '/manage-letter/letter',
        permissions: PerWatchLetter,
        child: []
    },
    {
        id: 41, name: 'Quản lý chấm công', icon: 'ti ti-alarm-plus', path: '/manage-timekeeping',
        permissions: PerWatchTimeSheet,
        child: [
            { id: 42, name: 'Bảng chấm công', icon: '', path: '/manage-timekeeping' },
            { id: 43, name: 'Quản lý phép', icon: '', path: '/manage-timekeeping/on-leave-manage' },
            { id: 49, name: 'Quản lý ngày nghỉ', icon: '', path: '/manage-timekeeping/holidays' }
        ]
    },
    {
        id: 44, name: 'Quản lý lương', icon: 'fe fe-dollar-sign', path: '/manage-salary/payroll',
        permissions: PerWatchSalary,
        child: [
            { id: 45, name: 'Bảng lương', icon: 'fe fe-dollar-sign', path: '/manage-salary/payroll' },
            { id: 47, name: 'Quyết toán thuế', icon: 'ti ti-clipboard-text', path: '/manage-salary/tax' }
        ]
    },
    {
        id: 48, name: 'Báo cáo', icon: 'ti ti-chart-pie', path: '/manage-report',
        permissions: PerWatchReport,
        child: []
    },
]

export {
    menuObjectSetting,
    menuEmployeePersonal,
    menuEmployeeManage,
};
export const mapPathId = new Map([
    ['/settings/account', 2],
    ['/settings/department', 3],
    ['/settings/group', 4],
    ['/settings/employee-job-position', 5],
    ['/settings/duty', 6],
    ['/settings/reward', 7],
    ['/settings/penalty', 8],
    ['/settings/contract', 10],
    ['/settings/insurance', 11],
    ['/settings/letter-reason', 12],
    ['/settings/on-leave', 13],
    ['/settings/allowance', 14],
    ['/personal/home', 15],
    ['/personal/timekeeping', 16],
    ['/personal/list-leave', 18],
    ['/personal/list-overtime', 19],
    ['#', 20],
    ['/manage-employee/list-employee', 22], // xuất hiện ở nhiều nơi nhưng lấy id nhỏ nhất
    ['/manage-contract/type-contract', 27],
    ['/manage-insurance/insurance', 32],
    ['/manage-decision/decision', 35],
    ['/manage-letter/letter', 37],
    ['/manage-timekeeping', 42],
    ['/manage-timekeeping/on-leave-manage', 43],
    ['/manage-salary/payroll', 45],
    ['/manage-salary/tax', 47],
    ['/manage-timekeeping/holidays', 49],
    ['path', 48], // không rõ nên có thể cần sửa lại
])

export const pathPermissionList = [
    { path: '/manage-employee/list-employee', permissions: PerWatchEmployee },
    { path: '/manage-contract/type-contract', permissions: PerWatchContract },
    { path: '/manage-insurance/insurance', permissions: PerWatchInsurance },
    { path: '/manage-decision/decision', permissions: PerWatchDecision },
    { path: '/manage-letter/letter', permissions: PerWatchLetter },
    { path: '/manage-timekeeping', permissions: PerWatchTimeSheet },
    { path: '/manage-salary/payroll', permissions: PerWatchSalary },
    { path: 'path', permissions: [] }
];




