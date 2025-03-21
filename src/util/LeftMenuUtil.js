const menuSystemSetting = [
    { name: 'Tài khoản người dùng', icon: 'fe fe-user', path: '/admin/admin-account', child: [] },
    { name: 'Phòng ban, chi nhánh', icon: 'fe fe-layers', path: '/admin/admin-department', child: [] },
    { name: 'Nhóm người dùng', icon: 'ti ti-users', path: '/admin/admin-group', child: [] },
    { name: 'Lịch sử hoạt động', icon: 'ti ti-history', path: 'path', child: [] },
]

const menuObjectSetting = [
    {
        name: 'Cài đặt chung', icon: 'ti ti-settings', path: 'setting', child: [
            { name: 'Vị trí công việc', icon: '', path: '/settings/employee' },
            { name: 'Chức vụ', icon: '', path: '/settings/duty' },
            { name: 'Nơi làm việc', icon: '', path: '/settings/workplace' },
            { name: 'Chế độ phúc lợi', icon: '', path: '/settings/reward' },
            { name: 'Phạt nội bộ', icon: '', path: '/settings/penalty' }
        ]
    },
    {
        name: 'Cài đặt đối tượng', icon: 'ti ti-adjustments', path: 'setting', child: [
            { name: 'Hồ sơ cá nhân', icon: '', path: '' },
            { name: 'Hợp đồng lao động', icon: '', path: '/settings/contract' },
            { name: 'Bảo hiểm', icon: '', path: '/settings/insurance' },
            { name: 'Quyết định', icon: '', path: '' },
            { name: 'Tài sản', icon: '', path: '/settings/asset' },
            { name: 'Đơn từ', icon: '', path: '/settings/approval' },
            { name: 'Chấm công', icon: '', path: '/settings/on-leave' },
            { name: 'Bảng lương', icon: '', path: '/settings/allowance' },
        ]
    },
]

const menuEmployeePersonal = [
    {
        name: 'Thông tin chung', icon: 'ti ti-home', path: '/personal/home', child: []
    },
    {
        name: 'Bảng công tháng', icon: 'fe fe-calendar', path: '/personal/timekeeping', child: []
    },
    {
        name: 'Bảng lương', icon: 'fe fe-dollar-sign', path: '#', child: []
    },
    {
        name: 'Đăng ký nghỉ', icon: 'ti ti-umbrella', path: '/personal/list-leave', child: []
    },
    {
        name: 'Đăng ký OT', icon: 'ti ti-clock', path: '/personal/list-overtime', child: []
    },
    {
        name: 'Đăng xuất', icon: 'ti ti-logout', path: '#', child: []
    }
]

const menuEmployeeManage = [
    {
        name: 'Hồ sơ nhân sự', icon: 'ti ti-credit-card', path: '/manage-employee/list-employee', child: [
            { name: 'Tất cả', icon: '', path: '/manage-employee/list-employee' },
            { name: 'Đang làm việc', icon: '', path: '' },
            { name: 'Nghỉ tạm thời', icon: '', path: '' },
            { name: 'Nghỉ việc', icon: '', path: '' }
        ]
    },
    {
        name: 'Hợp đồng', icon: 'ti ti-file-code', path: '/manage-employee/type-contract', child: [
            { name: 'Loại hợp đồng', icon: '', path: '/manage-employee/type-contract' },
            { name: 'Trạng thái', icon: '', path: '' },
        ]
    },
    {
        name: 'Bảo hiểm', icon: 'ti ti-shield-check', path: '/manage-employee/insurance', child: [
            { name: 'Tất cả', icon: '', path: '/manage-employee/insurance' },
            { name: 'Tăng dự kiến', icon: '', path: '/manage-employee/insurance-increase' },
            { name: 'Giảm dự kiến', icon: '', path: '/manage-employee/insurance-decrease' },
            { name: 'Lịch sử đóng', icon: '', path: '' },
        ]
    },
    {
        name: 'Quyết định', icon: 'ti ti-gift', path: '/manage-employee/decision', child: [
        ]
    },
    {
        name: 'Báo cáo', icon: 'ti ti-chart-pie', path: 'path', child: [
        ]
    },

]

const menuTimekeepingManage = [
    {
        name: 'Chấm công', icon: 'ti ti-alarm-plus', path: '/manage-timekeeping', child: [
            { name: 'Chấm công', icon: '', path: '/manage-timekeeping' },
            { name: 'Phân ca làm việc', icon: '', path: '/manage-timekeeping/work-shift' },
            { name: 'Quản lý ngày nghỉ', icon: '', path: '/manage-timekeeping/holidays' },
            { name: 'Tự động chấm công', icon: '', path: '/manage-timekeeping/auto-timekeeping' }
        ]
    },
    {
        name: 'Quản lý phép', icon: 'ti ti-server', path: '/manage-timekeeping/on-leave-manage', child: [
        ]
    },
    {
        name: 'Báo cáo', icon: 'ti ti-chart-pie', path: '#', child: [
        ]
    },

]

const menuApprovalManage = [
    {
        name: 'Đơn từ', icon: 'ti ti-clipboard-text', path: '/manage-approval/approval', child: [
            { name: 'Tất cả đơn từ', icon: '', path: '/manage-approval/approval' },
            { name: 'Đơn từ của bạn', icon: '', path: '' },
            { name: 'Đơn từ bạn duyệt', icon: '', path: '' },
            { name: 'Đơn từ phòng bạn', icon: '', path: '' }
        ]
    },
    {
        name: 'Ứng lương', icon: 'fe fe-dollar-sign', path: '/manage-approval/approval-salary', child: [
        ]
    },
]


const menuSalaryManage = [
    {
        name: 'Bảng lương', icon: 'fe fe-dollar-sign', path: '/manage-salary/payroll', child: []

    },
    {
        name: 'Loại bảng lương', icon: 'ti ti-list-check', path: '/manage-salary/payroll-type', child: []

    },
    {
        name: 'Quyết toán thuế', icon: 'ti ti-clipboard-text', path: '/manage-salary/tax', child: []

    },
    {
        name: 'Báo cáo', icon: 'ti ti-chart-pie', path: 'path', child: []

    },
]

const menuAssetManage = [
    {
        name: 'Tài sản', icon: 'ti ti-device-laptop', path: '/manage-asset/asset', child: []

    },
    {
        name: 'Cấp phát', icon: 'fe fe-shopping-bag', path: '/manage-asset/list-allocation', child: []

    },
    {
        name: 'Thu hồi', icon: 'ti ti-arrow-back-up', path: '/manage-asset/list-recall', child: []

    },
    {
        name: 'Khấu hao tài sản', icon: 'ti ti-notes', path: '/manage-asset/list-depreciation', child: []

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

// const menuSystemSetting = [
//     { name: '', icon: '', path: '', child: [] },
//     { name: '', icon: '', path: '', child: [] },
//     { name: '', icon: '', path: '', child: [] },
//     { name: '', icon: '', path: '', child: [] },

// ]
// export default menuSystemSetting;