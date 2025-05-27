import { useEffect, useState } from 'react';
import { updateResumeProfile } from '../../../../service/EmployeeService';
import { toast } from 'react-toastify';

const UpdateResumeComponent = ({ resume, openModal, updateResume }) => {
    const modalId = "update-resume";
    const [avatarPrev, setAvatarPrev] = useState(null);
    const [values, setValues] = useState({
        id: "",
        avatar: "",
        fullName: "",
        employeeCode: "",
        dateOfBirth: "",
        type: "",
        gender: "",
        marriageStatus: "",
        nation: "",
        phoneNumber: "",
        email: "",
        placeOfBirth: "",
        religion: "",
        ethnic: "",
        identityCard: "",
        issueDateCCCD: "",
        placeCCCD: "",
        homeTown: "",
        permanentAddress: "",
        currentAddress: "",
        taxCode: "",
        bankAccountName: "",
        accountBank: "",
        bankName: "",
    })

    console.log(resume)

    useEffect(() => {
        if (openModal.at(-1) === `#${modalId}`) {
            setValues({
                id: resume.id,
                fullName: resume.fullName,
                employeeCode: resume.employeeCode,
                dateOfBirth: resume.dateOfBirth,
                type: resume.type,
                gender: resume.gender === "Nam" ? 1 : 0,
                marriageStatus: resume.marriageStatus === "Kết hôn" ? 1 : 0,
                nation: resume.nation,
                phoneNumber: resume.phoneNumber,
                email: resume.email,
                placeOfBirth: resume.placeOfBirth,
                religion: resume.religion,
                ethnic: resume.ethnic,
                identityCard: resume.identityCard,
                issueDateCCCD: resume.issueDateCCCD,
                placeCCCD: resume.placeCCCD,
                homeTown: resume.homeTown,
                permanentAddress: resume.permanentAddress,
                currentAddress: resume.currentAddress,
                taxCode: resume.taxCode,
                bankAccountName: resume.bankAccountName,
                accountBank: resume.accountBank,
                bankName: resume.bankName,
                avatar: resume.avatar,
            });
            setAvatarPrev(resume.avatar)
        };
    }, [openModal])

    const onChangeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setValues({
            ...values, [event.target.name]: file ? file : undefined
        })
    };

    const handleUpdateResume = (e) => {
        e.preventDefault();
        console.log(values)
        const isCorrect = checkValidator(values);
        const isUpdateAvatar = avatarPrev !== values.avatar;
        if (isCorrect) {
            updateResumeProfile(values, isUpdateAvatar).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công")
                    updateResume()
                    document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
                }
            })
        }
    }

    const checkValidator = (values) => {
        if (values.fullName === null || values.fullName.trim().length === 0) {
            toast.error("Yêu cầu nhập họ và tên!")
            return false;
        } else if (values.nation === null || values.nation.trim().length === 0) {
            toast.error("Yêu cầu nhập quốc tịch!")
            return false;
        } else if (values.phoneNumber === null || values.phoneNumber.trim().length === 0) {
            toast.error("Yêu cầu nhập số điện thoại!")
            return false;
        } else if (values.identityCard === null || values.identityCard.trim().length === 0) {
            toast.error("Yêu cầu nhập CMT/Căn cước/Hộ chiếu!")
            return false;
        } else if (values.issueDateCCCD === null || !values.issueDateCCCD || values.issueDateCCCD.trim().length === 0) {
            toast.error("Yêu cầu nhập ngày cấp CMT/Căn cước/Hộ chiếu!")
            return false;
        } else if (values.placeCCCD === null || values.placeCCCD.trim().length === 0) {
            toast.error("Yêu cầu nhập nơi cấp CMT/Căn cước/Hộ chiếu!")
            return false;
        } else if (values.taxCode === null || values.taxCode.trim().length === 0) {
            toast.error("Yêu cầu nhập mã số thuế")
            return false;
        }
        return true
    }

    return (
        <>
            <div className="modal fade" id={modalId}>
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="d-flex align-items-center">
                                <h4 className="modal-title me-2">Cập nhật sơ yếu lý lịch</h4>
                            </div>
                            <button type="button" className="btn-close custom-btn-close" data-bs-dismiss="modal"
                                aria-label="Close">
                                <i className="ti ti-x"></i>
                            </button>
                        </div>

                        <div className="modal-body overflow-modal-crud">
                            <div className="profile-info">
                                <div className='update-avatar update-avatar-resume'>
                                    <img
                                        src={values.avatar instanceof File || values.avatar instanceof Blob
                                            ? URL.createObjectURL(values.avatar) : undefined}
                                        alt="Ảnh nhân viên"
                                        style={{ width: "150px", height: "auto" }}
                                    />
                                    <div className="overlay"></div>
                                    <span onClick={() => document.getElementById('fileInput').click()} className='edit-text'><i className='ti ti-plus' /></span>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        name='avatar'
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <table className="table borderless profile-details update-resume-modal-f ">
                                    <tbody>
                                        <tr>
                                            <th>Họ và tên<span className="text-danger"> *</span></th>
                                            <td>
                                                <input type="text" className="form-control" value={values.fullName || ""} name='fullName' onChange={onChangeInput} />
                                            </td>
                                            <th>Mã NV</th>
                                            <td>
                                                <input type="text" className="form-control readonly-input" value={values.employeeCode || ""} e='employeeCode' onChange={onChangeInput} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Ngày sinh</th>
                                            <td>
                                                <input type="date" className="form-control" value={values.dateOfBirth || ""} name='dateOfBirth' onChange={onChangeInput} />
                                            </td>
                                            <th>Giới tính</th>
                                            <td>
                                                <select className="form-control" value={values.gender} name='gender' onChange={onChangeInput}>
                                                    <option value="" selected hidden>Chọn</option>
                                                    <option value={1}>Nam</option>
                                                    <option value={0}>Nữ</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TT hôn nhân</th>
                                            <td>
                                                <select className="form-control" value={values.marriageStatus} name='marriageStatus' onChange={onChangeInput}>
                                                    <option value="" selected hidden>Chọn</option>
                                                    <option value={1}>Kết hôn</option>
                                                    <option value={0}>Chưa kết hôn</option>
                                                </select>
                                            </td>
                                            <th>Quốc tịch<span className="text-danger"> *</span></th>
                                            <td>
                                                <input type="text" className="form-control" value={values.nation || ""} name='nation' onChange={onChangeInput} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Điện thoại<span className="text-danger"> *</span></th>
                                            <td>
                                                <input type="text" className="form-control" value={values.phoneNumber || ""} name='phoneNumber' onChange={onChangeInput} />
                                            </td>
                                            <th>Email</th>
                                            <td>
                                                <input type="text" className="form-control readonly-input" value={values.email || ""} name='email' onChange={onChangeInput} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TT hồ sơ</th>
                                            <td>
                                                <select className="form-control" value={values.type || ""} name='type' onChange={onChangeInput}>
                                                    <option value="" selected hidden>Chọn</option>
                                                    <option value={1}>Thử việc</option>
                                                    <option value={2}>Chính thức</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile-header">Thông tin khác</div>
                            <div >
                                <div className="grid-update-resume ">
                                    <span>Nơi sinh</span>
                                    <input type="text" className="form-control" value={values.placeOfBirth || ""} name='placeOfBirth' onChange={onChangeInput} />
                                    <span>Dân tộc</span>
                                    <input type="text" className="form-control" value={values.religion || ""} name='religion' onChange={onChangeInput} />
                                    <span>Tôn giáo</span>
                                    <input type="text" className="form-control" value={values.ethnic || ""} name='ethnic' onChange={onChangeInput} />
                                </div>
                            </div>
                            <table className="table profile-details update-resume-modal">
                                <tbody>
                                    <tr>
                                        <th >CMT/Căn cước/Hộ chiếu <span className="text-danger"> *</span></th>
                                        <td colSpan={5}>
                                            <input type="text" className="form-control" value={values.identityCard || ""} name='identityCard' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Ngày cấp <span className="text-danger"> *</span></th>
                                        <td style={{ width: "155px" }}>
                                            <input type="date" className="form-control" value={values.issueDateCCCD || ""} name='issueDateCCCD' onChange={onChangeInput} />
                                        </td>
                                        <th style={{ width: "80px" }}> Nơi cấp <span className="text-danger"> *</span></th>
                                        <td >
                                            <input type="text" className="form-control" value={values.placeCCCD || ""} name='placeCCCD' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                    <tr >
                                        <th>Nguyên quán</th>
                                        <td colSpan={5}>
                                            <input type="text" className="form-control" value={values.homeTown || ""} name='homeTown' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>[Thường trú] Địa chỉ</th>
                                        <td colSpan={5}>
                                            <input type="text" className="form-control" value={values.permanentAddress || ""} name='permanentAddress' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>[Chỗ ở hiện nay] Địa chỉ</th>
                                        <td colSpan={5}>
                                            <input type="text" className="form-control" value={values.currentAddress || ""} name='currentAddress' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Mã số thuế cá nhân<span className="text-danger"> *</span></th>
                                        <td colSpan={5}>
                                            <input type="text" className="form-control" value={values.taxCode || ""} name='taxCode' onChange={onChangeInput} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div >
                                <div className="grid-update-resume " style={{ paddingTop: "5px" }}>
                                    <span>Tên tài khoản</span>
                                    <input type="text" className="form-control" value={values.bankAccountName || ""} name='bankAccountName' onChange={onChangeInput} />
                                    <span>Số tài khoản</span>
                                    <input type="text" className="form-control" value={values.accountBank || ""} name='accountBank' onChange={onChangeInput} />
                                    <span>Ngân hàng</span>
                                    <input type="text" className="form-control" value={values.bankName || ""} name='bankName' onChange={onChangeInput} />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-light border me-2"
                                data-bs-dismiss="modal">HỦY BỎ</button>
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateResume}>CẬP NHẬT </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateResumeComponent;

