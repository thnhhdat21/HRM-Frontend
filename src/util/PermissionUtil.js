const MANAGE_EMPLOYEE = "manage-employee"
const WATCH_EMPLOYEE = "watch-employee"
const CREATE_EMPLOYEE = "create-employee"
const MANAGE_PAYROLL = "manage-payroll"
const WATCH_PAYROLL = "watch-payroll"
const CREATE_PAYROLL = "create-payroll"
const MANAGE_TIMEKEEPING = "manage-timekeeping"
const WATCH_TIMEKEEPING = "watch-timekeeping"
const CREATE_TIMEKEEPING = "create-timekeeping"
const MANAGE_APPROVAL = "manage-approval"
const WATCH_APPROVAL = "watch-approval"
const CREATE_APPROVAL = "create-approval"
const MANAGE_ASSET = "manage-asset"
const WATCH_ASSET = "watch-asset"
const CREATE_ASSET = "create-asset"

const permissions = [
    [MANAGE_EMPLOYEE, WATCH_EMPLOYEE, CREATE_EMPLOYEE],
    [MANAGE_PAYROLL, WATCH_PAYROLL, CREATE_PAYROLL],
    [MANAGE_TIMEKEEPING, WATCH_TIMEKEEPING, CREATE_TIMEKEEPING],
    [MANAGE_APPROVAL, WATCH_APPROVAL, CREATE_APPROVAL],
    [MANAGE_ASSET, WATCH_ASSET, CREATE_ASSET]
];


//Quyền tạo mới ứng với quyền xemm
const permissionCreate = {
    3: '5',
    4: '6',
    9: '11',
    10: '12',
    15: '17',
    16: '18',
    21: '23',
    22: '24',
    27: '29',
    28: '30'
}

const PermissionType = (key) => {
    if (key % 2 === 1)
        return 2
    return 1
}


const permissionWithRole = {
    "manage-employee": [1, 2],
    "watch-employee": [3, 4],
    "create-employee": [5, 6],
    "manage-payroll": [7, 8],
    "watch-payroll": [9, 10],
    "create-payroll": [11, 12],
    "manage-timekeeping": [13, 14],
    "watch-timekeeping": [15, 16],
    "create-timekeeping": [17, 18],
    "manage-approval": [19, 20],
    "watch-approval": [21, 22],
    "create-approval": [23, 24],
    "manage-asset": [25, 26],
    "watch-asset": [27, 28],
    "create-asset": [29, 30],
}

export const getSelectedPermission = (permission) => {
    for (const [band, keywords] of Object.entries(permissionWithRole)) {
        if (keywords.includes(permission)) {
            return band;
        }
    }
    return "Khác";
};

export {
    MANAGE_EMPLOYEE, WATCH_EMPLOYEE, CREATE_EMPLOYEE,
    MANAGE_PAYROLL, WATCH_PAYROLL, CREATE_PAYROLL,
    MANAGE_TIMEKEEPING, WATCH_TIMEKEEPING, CREATE_TIMEKEEPING,
    MANAGE_APPROVAL, WATCH_APPROVAL, CREATE_APPROVAL,
    MANAGE_ASSET, WATCH_ASSET, CREATE_ASSET,
    PermissionType, permissions, permissionCreate
};
