import React, { useEffect, useState } from 'react';
import { getInsuranceNumber, getResumeProfile, updateIdentityCard } from '../../../../service/EmployeeService';
import { responseData, responseData_ReturnInfo } from '../../../../util/ResponseUtil';
import { getFamilyOfEmployee } from '../../../../service/FamilyService';
import { getEducationProfile } from '../../../../service/EducationService';
import UpdateResumeComponent from '../update/UpdateResumeComponent';
import { toast } from 'react-toastify';
import UpdateFamilyComponent from '../update/UpdateFamilyComponent';
import { convertDate } from '../../../../util/TimeUtil';
import UpdateEducationComponent from '../update/UpdateEducationComponent';
import { PROFILE_RESUME } from '../../../../util/EmployeeUtil';
import UpdateNumberInsuranceComponent from '../../crud/UpdateNumberInsuranceComponent';
import Cookies from 'js-cookie';
import { PerManageEmployee } from '../../../../util/PermissionUtil';
const ResumeComponent = ({ employeeId, navId, handleGetFile }) => {
    //Lấy role 
    const roleString = Cookies.get('permissions');
    const currentAccountLogin = Cookies.get('employeeId');
    let roles = new Set();

    let isUpdateInfo = false;

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
        isUpdateInfo = PerManageEmployee.some(role => roles.has(role)) || currentAccountLogin === employeeId
    }

    const [resume, setResume] = useState({})
    const [family, setFamily] = useState([])
    const [education, setEducation] = useState([])
    const [insurance, setInsurance] = useState({})
    const [hasFetched, setHasFetched] = useState(false);
    const [openModal, setOpenModal] = useState([])
    const [isUpdateIdentiry, setIsUpdateIdentiry] = useState(false);

    const [fontIDCPrev, setFontIDCPrev] = useState(null)
    const [backIDCPrev, setBackIDCPrev] = useState(null)

    const [fontIdentityCard, setFontIdentityCard] = useState(null)
    const [backIdentityCard, setBackIdentityCard] = useState(null)

    // lần đầu vào resume-profile
    useEffect(() => {
        if (Number(navId) === PROFILE_RESUME && !hasFetched) {
            setHasFetched(true);
            const fetchAll = async () => {
                const resumeRes = await getResumeProfile(employeeId);
                if (resumeRes.data.code === 1000) {
                    const resume = resumeRes.data.data;
                    resume.avatar = await handleGetFile(resume.avatar);
                    const fontIDCPrev = await handleGetFile(resume.fontImageCCCD);
                    const backIDCPrev = await handleGetFile(resume.backImageCCCD)
                    setFontIDCPrev(fontIDCPrev)
                    setBackIDCPrev(backIDCPrev)
                    setFontIdentityCard(fontIDCPrev);
                    setBackIdentityCard(backIDCPrev);
                    setResume(resume);
                } else if (resumeRes.data.code > 1000) {
                    setResume({});
                    toast.info(resumeRes.data.message);
                } else {
                    toast.error("Bảo trì hệ thống");
                }

                const familyRes = await getFamilyOfEmployee(employeeId);
                responseData_ReturnInfo(familyRes, setFamily);

                const eduRes = await getEducationProfile(employeeId);
                responseData_ReturnInfo(eduRes, setEducation);

                const insuRes = await getInsuranceNumber(employeeId);
                responseData(insuRes, setInsurance);
            };
            fetchAll();
        }
    }, [navId]);

    const updateResume = async () => {
        const resumeRes = await getResumeProfile(employeeId);
        if (resumeRes.data.code === 1000) {
            const resume = resumeRes.data.data;
            resume.avatar = await handleGetFile(resume.avatar);
            setResume(resume);
        } else if (resumeRes.data.code > 1000) {
            setResume({});
            toast.error(resumeRes.data.message);
        } else {
            toast.error("Bảo trì hệ thống");
        }
    }

    const updateFamily = () => {
        getFamilyOfEmployee(employeeId).then((response) => {
            responseData(response, setFamily);
        })
    }

    const updateEducation = () => {
        getEducationProfile(employeeId).then((response) => {
            responseData(response, setEducation);
        })
    }

    const updateInsurance = () => {
        getInsuranceNumber(employeeId).then((response) => {
            responseData(response, setInsurance);
        })
    }

    const handleOpenModal = (modalId) => {
        setOpenModal([...openModal, modalId]);
    };

    const handleFileChange = (event, setImage) => {
        const file = event.target.files?.[0];
        setImage(file ? file : undefined)
    };

    const handleClickUpdateIDC = (e) => {
        e.preventDefault()
        const updateFont = fontIDCPrev !== fontIdentityCard ? fontIdentityCard : null
        const updateBack = backIDCPrev !== backIdentityCard ? backIdentityCard : null
        if (updateFont === null && updateBack == null) {
            toast.info("Không có sự thay đổi nào!")
        } else {
            updateIdentityCard(employeeId, updateFont, updateBack).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công")
                    setIsUpdateIdentiry(false)
                    setFontIDCPrev(fontIdentityCard);
                    setBackIDCPrev(backIdentityCard);
                }
            })
        }
    }
    return (
        <>
            <div className={`mt-5 tab-pane fade ${navId === PROFILE_RESUME ? "show active" : ""} `} id="profile-resume">
                <div className="profile-container">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Sơ yếu lý lịch</div>
                        {
                            isUpdateInfo && (
                                <div className='update-infomation' style={{ marginRight: "10px" }} data-bs-toggle="modal" data-bs-target="#update-resume"
                                    onClick={() => handleOpenModal("#update-resume")}>
                                    <i className='ti ti-edit' style={{ fontSize: "25px" }} />
                                </div>
                            )
                        }
                    </div>
                    <div className="profile-info">
                        <img
                            src={resume.avatar instanceof File || resume.avatar instanceof Blob
                                ? URL.createObjectURL(resume.avatar) : undefined}
                            alt="Ảnh nhân viên"
                            className="profile-img" />
                        <table className="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th>Họ và tên</th>
                                    <td>{resume.fullName || ""}</td>
                                    <th>Mã nhân viên</th>
                                    <td>{resume.employeeCode || ""}</td>
                                </tr>
                                <tr>
                                    <th>Ngày sinh</th>
                                    <td>{convertDate(resume.dateOfBirth) || ""}</td>
                                    <th>Giới tính</th>
                                    <td>{resume.gender || ""}</td>
                                </tr>
                                <tr>
                                    <th>Tình trạng hôn nhân</th>
                                    <td>{resume.marriageStatus || ""}</td>
                                    <th>Quốc tịch</th>
                                    <td>{resume.nation || ""}</td>
                                </tr>
                                <tr>
                                    <th>Điện thoại</th>
                                    <td>{resume.phoneNumber || ""}</td>
                                    <th>Email</th>
                                    <td>{resume.email || ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" mt-4">
                        <table className="table borderless profile-details">
                            <tbody>
                                <tr>
                                    <th>Dân tộc</th>
                                    <td>{resume.religion || ""}</td>
                                    <th>Tôn giáo</th>
                                    <td>{resume.ethnic || ""}</td>
                                </tr>
                                <tr>
                                    <th>CMT/Căn cước/Hộ chiếu</th>
                                    <td>{resume.identityCard || ""}</td>
                                    <th>Ngày cấp, Nơi cấp</th>
                                    <td>{resume.issueDateCCCD && resume.placeCCCD ? convertDate(resume.issueDateCCCD) + ", tại " + resume.placeCCCD : ""}</td>
                                </tr>
                                <tr>
                                    <th>Nơi sinh</th>
                                    <td>{resume.placeOfBirth}</td>
                                    <th>Nguyên quán</th>
                                    <td>{resume.homeTown || ''}</td>
                                </tr>
                                <tr>
                                    <th>[Thường trú] Địa chỉ</th>
                                    <td>{resume.permanentAddress || ''}</td>
                                    <th>[Chỗ ở hiện nay] Địa chỉ</th>
                                    <td>{resume.currentAddress || ''}</td>
                                </tr>
                                <tr>
                                    <th>Mã số thuế cá nhân</th>
                                    <td>{resume.taxCode || ''}</td>
                                    <th>TK ngân hàng</th>
                                    <td> {resume.bankAccountName ? resume.bankAccountName.toUpperCase() + ", " : ''} {resume.accountBank ? resume.accountBank + ", " : ''} {resume.bankName || ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="profile-container mt-4">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Thông tin gia đình & người phụ thuộc</div>
                        {
                            isUpdateInfo && (
                                <div className='update-infomation' style={{ marginRight: "10px" }} data-bs-toggle="modal" data-bs-target="#update-family"
                                    onClick={() => handleOpenModal("#update-family")}>
                                    <i className='ti ti-edit' style={{ fontSize: "25px" }} />
                                </div>
                            )
                        }

                    </div>
                    <table className="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th>Mối quan hệ</th>
                                <th>Họ và tên</th>
                                <th>Năm sinh</th>
                                <th>CMT/Căn cước</th>
                                <th>Ngày cấp</th>
                                <th>Nơi cấp</th>
                                <th>Điện thoại</th>
                                <th>Người phụ thuộc</th>
                                <th>Mã số thuế</th>
                            </tr>
                            {family.length > 0 && family.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.relationShip}</td>
                                    <td>{item.fullName}</td>
                                    <td>{convertDate(item.dateOfBirth)}</td>
                                    <td>{item.identityCard}</td>
                                    <td>{convertDate(item.issueDateCCCD)}</td>
                                    <td>{item.placeCCCD}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.dependent ? "Có" : "Không"}</td>
                                    <td>{item.taxCode}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="profile-container mt-4">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Trình độ học vấn</div>
                        {
                            isUpdateInfo && (
                                <div className='update-infomation' style={{ marginRight: "10px" }} data-bs-toggle="modal" data-bs-target="#update-education"
                                    onClick={() => handleOpenModal("#update-education")}>
                                    <i className='ti ti-edit' style={{ fontSize: "25px" }} />
                                </div>
                            )
                        }

                    </div>
                    <table className="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th>Từ tháng</th>
                                <th>Đến tháng</th>
                                <th>Trình độ học vấn</th>
                                <th>Nơi đào tạo</th>
                                <th>Chuyên ngành</th>
                                <th>Hình thức đào tạo</th>
                            </tr>
                            {education.length > 0 && education.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.toMonth}</td>
                                    <td>{item.fromMonth}</td>
                                    <td>{item.level}</td>
                                    <td>{item.placeTraining}</td>
                                    <td>{item.major}</td>
                                    <td>{item.methodTraining}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="profile-container mt-4">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Thông tin khác</div>
                        {
                            isUpdateInfo && (
                                <div className='update-infomation' style={{ marginRight: "10px" }} data-bs-toggle="modal" data-bs-target="#update-number-insurance"
                                    onClick={() => handleOpenModal("update-number-insurance")}>
                                    <i className='ti ti-edit' style={{ fontSize: "25px" }} />
                                </div>
                            )
                        }

                    </div>
                    <table className="table borderless profile-details">
                        <tbody>
                            <tr>
                                <th style={{ width: "25%" }}>Số sổ bảo hiểm</th>
                                <td style={{ width: "25%" }}>{insurance.insuranceNumber || ""}</td>
                                <th style={{ width: "25%" }}>Số thẻ BHYT</th>
                                <td style={{ width: "25%" }}>{insurance.insuranceCard || ""}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="profile-container mt-4">
                    <div className="d-flex align-items-center justify-content-between profile-header">
                        <div>Ảnh chứng minh thư nhân dân</div>
                        <div className='update-infomation' style={{ marginRight: "10px" }}>
                            {
                                !isUpdateIdentiry && isUpdateInfo ? <i className='ti ti-edit' style={{ fontSize: "25px" }} onClick={() => setIsUpdateIdentiry(true)} /> :
                                    (
                                        <>
                                            <button type="button" className="btn btn-outline-light border me-2" onClick={() => setIsUpdateIdentiry(false)}>HỦY BỎ</button>

                                            <button type="submit" className="btn btn-primary" onClick={handleClickUpdateIDC}>CẬP NHẬT </button>
                                        </>
                                    )
                            }

                        </div>
                    </div>
                    <div className="image-section">
                        <div className="image-box">
                            <div className='update-avatar'>
                                <img
                                    src={fontIdentityCard instanceof File || fontIdentityCard instanceof Blob
                                        ? URL.createObjectURL(fontIdentityCard) : undefined}
                                    alt="Ảnh CCCD/CMND mặt trước"
                                    style={{ width: "100%", height: "auto" }}
                                />
                                {isUpdateIdentiry && (
                                    <>
                                        <div className="overlay"></div>
                                        <span onClick={() => document.getElementById('fileInputFont').click()} className='edit-text'><i className='ti ti-plus' /></span>
                                        <input
                                            type="file"
                                            id="fileInputFont"
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            name='avatar'
                                            onChange={(e) => handleFileChange(e, setFontIdentityCard)} />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="image-box">
                            <div className='update-avatar'>
                                <img
                                    src={backIdentityCard instanceof File || backIdentityCard instanceof Blob
                                        ? URL.createObjectURL(backIdentityCard) : undefined}
                                    alt="Ảnh CCCD/CMND mặt sau"
                                    style={{ width: "100%", height: "auto" }}
                                />
                                {
                                    isUpdateIdentiry && (
                                        <>
                                            <div className="overlay"></div>
                                            <span onClick={() => document.getElementById('fileInputBack').click()} className='edit-text'><i className='ti ti-plus' /></span>
                                            <input
                                                type="file"
                                                id="fileInputBack"
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                name='avatar'
                                                onChange={(e) => handleFileChange(e, setBackIdentityCard)} />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <UpdateResumeComponent resume={resume} openModal={openModal} updateResume={updateResume} />
            <UpdateFamilyComponent employeeId={employeeId} family={family} openModal={openModal} updateFamily={updateFamily} />
            <UpdateEducationComponent employeeId={employeeId} education={education} openModal={openModal} updateEducation={updateEducation} />
            <UpdateNumberInsuranceComponent employeeId={employeeId} typeOpen={openModal} updateInsurace={updateInsurance} />
        </>
    );
};

export default ResumeComponent;

