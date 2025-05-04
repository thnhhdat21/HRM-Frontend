const LETTER_TYPE_LEAVE = 1;
const LETTER_TYPE_OVERTIME = 2;
const LETTER_TYPE_WORKTIME = 3;
const LETTER_TYPE_INOUT = 4;
const LETTER_TYPE_END_WORK = 5;


const LETTER_STATE_WAITING = 1;
const LETTER_STATE_CHECKED = 2;
const LETTER_STATE_NO_CHECK = 3;

export {
    LETTER_TYPE_LEAVE,
    LETTER_TYPE_OVERTIME,
    LETTER_TYPE_WORKTIME,
    LETTER_TYPE_INOUT,
    LETTER_TYPE_END_WORK,
    LETTER_STATE_NO_CHECK,
    LETTER_STATE_CHECKED,
    LETTER_STATE_WAITING

}



export const LetterType = new Map([
    [1, { name: "Đơn xin nghỉ", modal: "create_leave_letter" }],
    [2, { name: "Đơn đăng ký OT", modal: "create_overtime_letter" }],
    [3, { name: "Đơn đăng ký làm theo chế độ", modal: "create_worktime_letter" }],
    [4, { name: "Đơn giải trình đi muộn về sớm", modal: "create_checkin_letter" }],
    [5, { name: "Đơn thôi việc", modal: "create_endjob_letter" }],
]);

export const LetterState = new Map([
    [1, { name: "Chờ duyệt", bg: "bg-warning" }],
    [2, { name: "Đã duyệt", bg: "bg-success" }],
    [3, { name: "Không duyệt", bg: "bg-danger" }],
]);
