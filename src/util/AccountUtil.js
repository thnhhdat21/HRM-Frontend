const ACCOUNT_ACTIVED = 1
const ACCOUNT_NOT_ACTIVE = 2
const ACCOUNT_LOCKED = 3


const generateSecureRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint32Array(8);
    window.crypto.getRandomValues(array);
    return Array.from(array, (num) => chars[num % chars.length]).join('');
};

const getStatus = (type) => {
    if (type === ACCOUNT_ACTIVED)
        return "Đã kích hoạt"
    else if (type === ACCOUNT_NOT_ACTIVE)
        return "Chưa kích hoạt"
    else
        return "Đã khóa"
}

export {
    ACCOUNT_ACTIVED, ACCOUNT_NOT_ACTIVE, ACCOUNT_LOCKED, generateSecureRandomPassword, getStatus
};
