const menuSystemSetting = [
    { id: 1, name: 'Tài khoản người dùng', icon: 'fe fe-user', path: '/admin/admin-account', child: [] },
    { id: 2, name: 'Phòng ban, chi nhánh', icon: 'fe fe-layers', path: '/admin/admin-department', child: [] },
    { id: 3, name: 'Nhóm người dùng', icon: 'ti ti-users', path: '/admin/admin-group', child: [] },
    { id: 4, name: 'Lịch sử hoạt động', icon: 'ti ti-history', path: 'path', child: [] },
]

const menuObjectSetting = [
    {
        id: 5, name: 'Cài đặt chung', icon: 'ti ti-settings', path: 'setting', child: [
            { id: 6, name: 'Vị trí công việc', icon: '', path: '/settings/employee' },
            { id: 7, name: 'Chức vụ', icon: '', path: '/settings/duty' },
            { id: 8, name: 'Chế độ phúc lợi', icon: '', path: '/settings/reward' },
            { id: 9, name: 'Phạt nội bộ', icon: '', path: '/settings/penalty' }
        ]
    },
    {
        id: 10, name: 'Cài đặt đối tượng', icon: 'ti ti-adjustments', path: 'setting', child: [
            { id: 11, name: 'Hợp đồng lao động', icon: '', path: '/settings/contract' },
            { id: 12, name: 'Bảo hiểm', icon: '', path: '/settings/insurance' },
            { id: 13, name: 'Quyết định', icon: '', path: '' },
            { id: 14, name: 'Tài sản', icon: '', path: '/settings/asset' },
            { id: 15, name: 'Đơn từ', icon: '', path: '/settings/approval' },
            { id: 16, name: 'Chấm công', icon: '', path: '/settings/on-leave' },
            { id: 17, name: 'Bảng lương', icon: '', path: '/settings/allowance' },
        ]
    },
]

const menuEmployeePersonal = [
    {
        id: 18, name: 'Thông tin chung', icon: 'ti ti-home', path: '/personal/home', child: []
    },
    {
        id: 19, name: 'Bảng công tháng', icon: 'fe fe-calendar', path: '/personal/timekeeping', child: []
    },
    {
        id: 20, name: 'Bảng lương', icon: 'fe fe-dollar-sign', path: '#', child: []
    },
    {
        id: 21, name: 'Đăng ký nghỉ', icon: 'ti ti-umbrella', path: '/personal/list-leave', child: []
    },
    {
        id: 22, name: 'Đăng ký OT', icon: 'ti ti-clock', path: '/personal/list-overtime', child: []
    },
    {
        id: 23, name: 'Đăng xuất', icon: 'ti ti-logout', path: '#', child: []
    }
]

const menuEmployeeManage = [
    {
        id: 24, name: 'Hồ sơ nhân sự', icon: 'ti ti-credit-card', path: '/manage-employee/list-employee', child: [
            { id: 25, name: 'Tất cả', icon: '', path: '/manage-employee/list-employee', status: '' },
            { id: 26, name: 'Đang làm việc', icon: '', path: '/manage-employee/list-employee', status: '1' },
            { id: 27, name: 'Nghỉ tạm thời', icon: '', path: '/manage-employee/list-employee', status: '2' },
            { id: 28, name: 'Nghỉ việc', icon: '', path: '/manage-employee/list-employee', status: '3' }
        ]
    },
    {
        id: 29, name: 'Hợp đồng', icon: 'ti ti-file-code', path: '/manage-employee/type-contract', child: [
            { id: 31, name: 'Tất cả', icon: '', path: '/manage-employee/type-contract', status: '' },
            { id: 32, name: 'Đang hiệu lực', icon: '', path: '/manage-employee/type-contract', status: '1' },
            { id: 33, name: 'Chưa hiệu lực', icon: '', path: '/manage-employee/type-contract', status: '2' },
            { id: 34, name: 'Thanh lý', icon: '', path: '/manage-employee/type-contract', status: '3' },
        ]
    },
    {
        id: 35, name: 'Bảo hiểm', icon: 'ti ti-shield-check', path: '/manage-employee/insurance', child: [
            { id: 36, name: 'Tất cả', icon: '', path: '/manage-employee/insurance' },
            { id: 37, name: 'Tăng dự kiến', icon: '', path: '/manage-employee/insurance-increase' },
            { id: 38, name: 'Giảm dự kiến', icon: '', path: '/manage-employee/insurance-decrease' },
            { id: 39, name: 'Lịch sử đóng', icon: '', path: '' },
        ]
    },
    {
        id: 40, name: 'Quyết định', icon: 'ti ti-gift', path: '/manage-employee/decision', child: [
        ]
    },
    {
        id: 41, name: 'Báo cáo', icon: 'ti ti-chart-pie', path: 'path', child: [
        ]
    },

]

const menuTimekeepingManage = [
    {
        id: 42, name: 'Chấm công', icon: 'ti ti-alarm-plus', path: '/manage-timekeeping', child: [
            { id: 43, name: 'Chấm công', icon: '', path: '/manage-timekeeping' },
            { id: 44, name: 'Phân ca làm việc', icon: '', path: '/manage-timekeeping/work-shift' },
            { id: 45, name: 'Quản lý ngày nghỉ', icon: '', path: '/manage-timekeeping/holidays' },
            { id: 46, name: 'Tự động chấm công', icon: '', path: '/manage-timekeeping/auto-timekeeping' }
        ]
    },
    {
        id: 47, name: 'Quản lý phép', icon: 'ti ti-server', path: '/manage-timekeeping/on-leave-manage', child: [
        ]
    },
    {
        id: 48, name: 'Báo cáo', icon: 'ti ti-chart-pie', path: '#', child: [
        ]
    },

]

const menuApprovalManage = [
    {
        id: 49, name: 'Đơn từ', icon: 'ti ti-clipboard-text', path: '/manage-approval/approval', child: [
            { id: 50, name: 'Tất cả đơn từ', icon: '', path: '/manage-approval/approval' },
            { id: 51, name: 'Đơn từ của bạn', icon: '', path: '' },
            { id: 52, name: 'Đơn từ bạn duyệt', icon: '', path: '' },
            { id: 53, name: 'Đơn từ phòng bạn', icon: '', path: '' }
        ]
    },
    {
        id: 54, name: 'Ứng lương', icon: 'fe fe-dollar-sign', path: '/manage-approval/approval-salary', child: [
        ]
    },
]


const menuSalaryManage = [
    {
        id: 55, name: 'Bảng lương', icon: 'fe fe-dollar-sign', path: '/manage-salary/payroll', child: []

    },
    {
        id: 56, name: 'Loại bảng lương', icon: 'ti ti-list-check', path: '/manage-salary/payroll-type', child: []

    },
    {
        id: 57, name: 'Quyết toán thuế', icon: 'ti ti-clipboard-text', path: '/manage-salary/tax', child: []

    },
    {
        id: 58, name: 'Báo cáo', icon: 'ti ti-chart-pie', path: 'path', child: []

    },
]

const menuAssetManage = [
    {
        id: 59, name: 'Tài sản', icon: 'ti ti-device-laptop', path: '/manage-asset/asset', child: []

    },
    {
        id: 60, name: 'Cấp phát', icon: 'fe fe-shopping-bag', path: '/manage-asset/list-allocation', child: []

    },
    {
        id: 61, name: 'Thu hồi', icon: 'ti ti-arrow-back-up', path: '/manage-asset/list-recall', child: []

    },
    {
        id: 62, name: 'Khấu hao tài sản', icon: 'ti ti-notes', path: '/manage-asset/list-depreciation', child: []

    },
]

export {
    menuSystemSetting,
    menuObjectSetting,
    menuEmployeePersonal,
    menuEmployeeManage,
    menuTimekeepingManage,
    menuApprovalManage,
    menuSalaryManage,
    menuAssetManage
};

export const mapPathId = new Map([
    ['/admin/admin-account', 1],
    ['/admin/admin-department', 2],
    ['/admin/admin-group', 3],
    ['path', 4],
    ['setting', 5],
    ['/settings/employee', 6],
    ['/settings/duty', 7],
    ['/settings/reward', 8],
    ['/settings/penalty', 9],
    ['setting', 10],
    ['/settings/contract', 11],
    ['/settings/insurance', 12],
    ['', 13],
    ['/settings/asset', 14],
    ['/settings/approval', 15],
    ['/settings/on-leave', 16],
    ['/settings/allowance', 17],
    ['/personal/home', 18],
    ['/personal/timekeeping', 19],
    ['#', 20],
    ['/personal/list-leave', 21],
    ['/personal/list-overtime', 22],
    ['#', 23],
    ['/manage-employee/list-employee', 24],
    ['/manage-employee/list-employee', 25],
    ['/', 26],
    ['', 27],
    ['', 28],
    ['/manage-employee/type-contract', 29],
    ['/manage-employee/type-contract', 31],
    ['', 32],
    ['', 33],
    ['', 34],
    ['/manage-employee/insurance', 35],
    ['/manage-employee/insurance', 36],
    ['/manage-employee/insurance-increase', 37],
    ['/manage-employee/insurance-decrease', 38],
    ['', 39],
    ['/manage-employee/decision', 40],
    ['path', 41],
    ['/manage-timekeeping', 42],
    ['/manage-timekeeping', 43],
    ['/manage-timekeeping/work-shift', 44],
    ['/manage-timekeeping/holidays', 45],
    ['/manage-timekeeping/auto-timekeeping', 46],
    ['/manage-timekeeping/on-leave-manage', 47],
    ['#', 48],
    ['/manage-approval/approval', 49],
    ['/manage-approval/approval', 50],
    ['', 51],
    ['', 52],
    ['', 53],
    ['/manage-approval/approval-salary', 54],
    ['/manage-salary/payroll', 55],
    ['/manage-salary/payroll-type', 56],
    ['/manage-salary/tax', 57],
    ['path', 58],
    ['/manage-asset/asset', 59],
    ['/manage-asset/list-allocation', 60],
    ['/manage-asset/list-recall', 61],
    ['/manage-asset/list-depreciation', 62]
]
);

