const MANAGE_EMPLOYEE = "manage-employee"
const WATCH_EMPLOYEE = "watch-employee"
const CREATE_EMPLOYEE = "create-employee"

const MANAGE_CONTRACT = "manage-contract"
const WATCH_CONTRACT = "watch-contract"
const CREATE_CONTRACT = "create-contract"

const WATCH_INSURANCE = "watch-insurance"

const MANAGE_DECISION = "manage-decision"
const WATCH_DECISION = "watch-decision"
const CREATE_DECISION = "create-decision"

const MANAGE_LETTER = "manage-letter"
const WATCH_LETTER = "watch-letter"

const MANAGE_TIMESHEET = "manage-timesheet"
const WATCH_TIMESHEET = "watch-timesheet"

const WATCH_SALARY = "watch-salary"

const WATCH_REPORT = 'watch-report'

const COMPANY = "company"
const DEPARTMENT = "department"

const EMPLOYEE = "employee"
const CONTRACT = "contract"
const INSURANCE = "insurance"
const DECISION = "decision"
const LETTER = "letter"
const TIMESHEET = "timesheet"
const SALARY = "salary"
const REPORT = "report"



export {
    MANAGE_EMPLOYEE, WATCH_EMPLOYEE, CREATE_EMPLOYEE,
    MANAGE_CONTRACT, WATCH_CONTRACT, CREATE_CONTRACT,
    WATCH_INSURANCE,
    MANAGE_DECISION, WATCH_DECISION, CREATE_DECISION,
    MANAGE_LETTER, WATCH_LETTER, MANAGE_TIMESHEET, WATCH_TIMESHEET,
    WATCH_SALARY,
    COMPANY,
    DEPARTMENT,
    EMPLOYEE,
    DECISION,
    LETTER,
    TIMESHEET,
    SALARY,
    CONTRACT,
    INSURANCE, REPORT, WATCH_REPORT
};

const permissionWatchWithRole = {
    "company": [3, 9, 14, 19, 21, 23, 28],
    "department": [4, 10, 15, 20, 22, 24, 29],
}

export const getPermissionWatchLevel = (permission) => {
    for (const [band, keywords] of Object.entries(permissionWatchWithRole)) {
        if (keywords.includes(permission)) {
            return band;
        }
    }
    return "Khác";
};

export const checkPermission = (permissions, onChangePermissionError, isCheckedPer) => {
    var isCorrect = true;
    if (isCheckedPer[EMPLOYEE] && permissions[MANAGE_EMPLOYEE] < 99 && getPermissionWatchLevel(permissions[WATCH_EMPLOYEE]) !== COMPANY) {
        onChangePermissionError(MANAGE_EMPLOYEE, true)
        onChangePermissionError(WATCH_EMPLOYEE, true)
        isCorrect = false
    }

    if (isCheckedPer[EMPLOYEE] && permissions[CREATE_EMPLOYEE] < 99 && getPermissionWatchLevel(permissions[WATCH_EMPLOYEE]) !== COMPANY) {
        onChangePermissionError(CREATE_EMPLOYEE, true)
        onChangePermissionError(WATCH_EMPLOYEE, true)
        isCorrect = false

    }

    if (isCheckedPer[EMPLOYEE] && permissions[MANAGE_CONTRACT] < 99 && getPermissionWatchLevel(permissions[WATCH_CONTRACT]) !== COMPANY) {
        onChangePermissionError(MANAGE_CONTRACT, true)
        onChangePermissionError(WATCH_CONTRACT, true)
        isCorrect = false
    }

    if (isCheckedPer[EMPLOYEE] && permissions[CREATE_CONTRACT] < 99 && getPermissionWatchLevel(permissions[WATCH_CONTRACT]) !== COMPANY) {
        onChangePermissionError(CREATE_CONTRACT, true)
        onChangePermissionError(WATCH_CONTRACT, true)
        isCorrect = false
    }

    if (isCheckedPer[DECISION] && permissions[MANAGE_DECISION] < 99 && getPermissionWatchLevel(permissions[WATCH_DECISION]) !== COMPANY) {
        onChangePermissionError(MANAGE_DECISION, true)
        onChangePermissionError(WATCH_DECISION, true)
        isCorrect = false
    }

    if (isCheckedPer[DECISION] && permissions[CREATE_DECISION] < 99 && getPermissionWatchLevel(permissions[WATCH_DECISION]) !== COMPANY) {
        onChangePermissionError(CREATE_DECISION, true)
        onChangePermissionError(WATCH_DECISION, true)
        isCorrect = false
    }

    if (isCheckedPer[DECISION] && permissions[CREATE_DECISION] < 99 && getPermissionWatchLevel(permissions[WATCH_DECISION]) !== COMPANY) {
        onChangePermissionError(CREATE_DECISION, true)
        onChangePermissionError(WATCH_DECISION, true)
        isCorrect = false
    }

    if (isCheckedPer[LETTER] && permissions[MANAGE_LETTER] === 55 && getPermissionWatchLevel(permissions[WATCH_LETTER]) !== COMPANY) {
        onChangePermissionError(MANAGE_LETTER, true)
        onChangePermissionError(WATCH_LETTER, true)
        isCorrect = false
    } else if (isCheckedPer[LETTER] && permissions[MANAGE_LETTER] !== "" && permissions[WATCH_LETTER] === "") {
        onChangePermissionError(MANAGE_LETTER, true)
        onChangePermissionError(WATCH_LETTER, true)
        isCorrect = false
    }

    if (isCheckedPer[TIMESHEET] && !isCheckedPer[LETTER]) {
        onChangePermissionError(WATCH_TIMESHEET, true)
        onChangePermissionError(WATCH_LETTER, true)
        isCorrect = false
    }

    if (isCheckedPer[TIMESHEET] && permissions[WATCH_TIMESHEET] !== "" && (getPermissionWatchLevel(permissions[WATCH_LETTER]) !== getPermissionWatchLevel(permissions[WATCH_TIMESHEET]))) {
        onChangePermissionError(WATCH_TIMESHEET, true)
        onChangePermissionError(WATCH_LETTER, true)
        isCorrect = false
    }

    if (isCheckedPer[TIMESHEET] && permissions[MANAGE_TIMESHEET] < 99 && getPermissionWatchLevel(permissions[WATCH_TIMESHEET]) !== COMPANY) {
        onChangePermissionError(MANAGE_TIMESHEET, true)
        onChangePermissionError(WATCH_TIMESHEET, true)
        isCorrect = false
    }
    return isCorrect;
}

export const clearPermissionError = (per, onChangePermissionError) => {
    if (per === MANAGE_EMPLOYEE || per === WATCH_EMPLOYEE || per === CREATE_EMPLOYEE) {
        onChangePermissionError(MANAGE_EMPLOYEE, false)
        onChangePermissionError(WATCH_EMPLOYEE, false)
        onChangePermissionError(CREATE_EMPLOYEE, false)
    } else if (per === MANAGE_CONTRACT || per === WATCH_CONTRACT || per === CREATE_CONTRACT) {
        onChangePermissionError(MANAGE_CONTRACT, false)
        onChangePermissionError(WATCH_CONTRACT, false)
        onChangePermissionError(CREATE_CONTRACT, false)
    } else if (per === MANAGE_DECISION || per === WATCH_DECISION || per === CREATE_DECISION) {
        onChangePermissionError(MANAGE_DECISION, false)
        onChangePermissionError(WATCH_DECISION, false)
        onChangePermissionError(CREATE_DECISION, false)
    } else if (per === MANAGE_LETTER || per === WATCH_LETTER) {
        onChangePermissionError(MANAGE_LETTER, false)
        onChangePermissionError(WATCH_LETTER, false)
    } else if (per === MANAGE_TIMESHEET || per === WATCH_TIMESHEET) {
        onChangePermissionError(MANAGE_TIMESHEET, false)
        onChangePermissionError(WATCH_TIMESHEET, false)
    }
}

export const checkPermissionIsEmpty = (list) => {
    if (list.size === 0) {
        return true
    } if (list.size === 1 && (list.has('') || list.has(99))) {
        return true
    } if (list.size === 2 && (list.has('') && list.has(99))) {
        return true
    }
    return false;
}

export const PerWatchAdmin = ['ADMIN']
export const PerWatchEmployee = ['ADMIN', 'ROLE_WATCH_EMPLOYEE_COMPANY', 'ROLE_WATCH_EMPLOYEE_DEPARTMENT']
export const PerWatchContract = ['ADMIN', 'ROLE_WATCH_CONTRACT_COMPANY', 'ROLE_WATCH_CONTRACT_DEPARTMENT']
export const PerWatchInsurance = ['ADMIN', 'ROLE_WATCH_INSURANCE_COMPANY', 'ROLE_WATCH_INSURANCE_DEPARTMENT']
export const PerWatchDecision = ['ADMIN', 'ROLE_WATCH_DECISION_COMPANY', 'ROLE_WATCH_DECISION_DEPARTMENT']
export const PerWatchLetter = ['ADMIN', 'ROLE_WATCH_LETTER_COMPANY', 'ROLE_WATCH_LETTER_DEPARTMENT']
export const PerWatchTimeSheet = ['ADMIN', 'ROLE_WATCH_TIMESHEET_COMPANY', 'ROLE_WATCH_TIMESHEET_DEPARTMENT']
export const PerWatchSalary = ['ADMIN', 'ROLE_WATCH_SALARY_COMPANY', 'ROLE_WATCH_SALARY_DEPARTMENT']
export const PerWatchReport = ['ADMIN', 'ROLE_WATCH_REPORT']

export const PerManageAdmin = ['ADMIN']
export const PerManageEmployee = ['ADMIN', 'ROLE_MANAGE_EMPLOYEE']
export const PerManageContract = ['ADMIN', 'ROLE_MANAGE_CONTRACT',]
export const PerManageDecision = ['ADMIN', 'ROLE_MANAGE_DECISION']
export const PerManageLetter = ['ADMIN', 'ROLE_MANAGE_LETTER_COMPANY', 'ROLE_MANAGE_LETTER_DEPARTMENT']
export const PerManageTimeSheet = ['ADMIN', 'ROLE_MANAGE_TIMESHEET']


export const editPermissions = (isCheckedPer, permissionDetail) => {
    let permissionTmp = permissionDetail;
    console.log(permissionTmp)
    for (const key in permissionTmp) {
        if ((key.includes(SALARY) && isCheckedPer.salary === false) ||
            (key.includes(EMPLOYEE) && isCheckedPer.employee === false) ||
            (key.includes(DECISION) && isCheckedPer.decision === false) ||
            (key.includes(LETTER) && isCheckedPer.letter === false) ||
            (key.includes(TIMESHEET) && isCheckedPer.timesheet === false) ||
            (key.includes(REPORT) && isCheckedPer.report === false)) {

            const perm = permissionTmp[key];
            if (perm.roleHasPermissionId != null) {
                perm.isUpdate = "delete";
            } else {
                delete permissionTmp[key];
            }
        }
    }
    return permissionTmp;
}