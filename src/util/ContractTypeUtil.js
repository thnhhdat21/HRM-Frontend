const contractTypeSelect = [
    { name: 'Hợp đồng xác định thời hạn', insurance: true },
    { name: 'Hợp đồng không xác định thời hạn', insurance: true },
    { name: 'Hợp đồng thử việc', insurance: false },
    { name: 'Hợp đồng đào tạo', insurance: false },
]

const CONTRACT_HAS_NO_TERM = "Hợp đồng không xác định thời hạn";

export {
    contractTypeSelect, CONTRACT_HAS_NO_TERM
}