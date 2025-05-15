import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateNewResumeComponent = ({ valuesResume, setValuesResume, rowFamily, setRowFamily, rowEducation, setRowEducation,
    isUpdateFamily,
    setIsUpdateFamily,
    isUpdateEdu,
    setIsUpdateEdu,
}) => {
    //resume
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setValuesResume({
            ...valuesResume, [event.target.name]: file ? file : undefined
        })
    };
    const handleFileChangeCCCD = (event, setImage) => {
        const file = event.target.files?.[0];
        setValuesResume({ ...valuesResume, [setImage]: (file ? file : undefined) })
    };

    const onChangeReSume = (e) => {
        setValuesResume({ ...valuesResume, [e.target.name]: e.target.value })
    }

    //family
    const addRowFamily = () => {
        setRowFamily([...rowFamily, {
            id: uuidv4(),
            fullName: "",
            relationShip: "",
            dateOfBirth: "",
            identityCard: "",
            issueDateCCCD: "",
            placeCCCD: "",
            phoneNumber: "",
            dependent: false,
            taxCode: "",
            isUpdate: "update"
        }]);
    };

    //education
    const addRowEducation = () => {
        setRowEducation([...rowEducation, {
            id: uuidv4(),
            toMonth: "",
            fromMonth: "",
            level: "",
            placeTraining: "",
            major: "",
            methodTraining: "",
            isUpdate: "update"
        }]);
    };

    const onChangeInputCreate = (index, event, setRows) => {
        const { name, value } = event.target;
        setRows(prevRows =>
            prevRows.map((row, i) =>
                i === index ? { ...row, [name]: value } : row
            )
        );
    }

    const removeRow = (id, setRows, rows) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <>
            <div class="tab-pane fade active show" id="create-employee-resume">
                <div class="col-md-12 mt-2" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin chung</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-2">
                        <div class="mb-3">
                            <div class="image-section" style={{ margin: 0 }}>
                                <div className='update-avatar'>
                                    <img
                                        src={valuesResume.avatar instanceof File || valuesResume.avatar instanceof Blob
                                            ? URL.createObjectURL(valuesResume.avatar) : undefined}
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
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Họ và tên </label>
                            <input type="text" class="form-control" placeholder='Nhập họ và tên' name='fullName' value={valuesResume.fullName} onChange={onChangeReSume} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nơi sinh </label>
                            <input type="text" class="form-control" placeholder='Nhập nơi sinh' name='placeOfBirth' value={valuesResume.placeOfBirth} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Ngày sinh </label>
                            <input type="date" class="form-control" name='dateOfBirth' value={valuesResume.dateOfBirth} onChange={onChangeReSume} />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Nơi ở hiện tại </label>
                            <input type="text" class="form-control" placeholder='Nơi ở hiện tại' style={{ width: "202%" }} name='currentAddress' value={valuesResume.currentAddress} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Giới tính</label>
                            <select class="form-control" name='gender' value={valuesResume.gender} onChange={onChangeReSume}>
                                <option value={""}>Giới tính</option>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">CMT/Căn cước/Hộ chiếu </label>
                            <input type="email" class="form-control " placeholder='CMT/Căn cước/Hộ chiếu' name='identityCard' value={valuesResume.identityCard} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày cấp </label>
                            <input type="date" class="form-control " name='issueDateCCCD' value={valuesResume.issueDateCCCD} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Nơi cấp</label>
                            <input type="text" class="form-control " placeholder='Nhập nơi cấp' name='placeCCCD' value={valuesResume.placeCCCD} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>
                <div className="image-section">
                    <div className="image-box">
                        <div className='update-avatar'>
                            <img
                                src={valuesResume.fontIdentityCard instanceof File || valuesResume.fontIdentityCard instanceof Blob
                                    ? URL.createObjectURL(valuesResume.fontIdentityCard) : undefined}
                                alt="Ảnh CCCD/CMND mặt trước"
                                style={{ width: "100%", height: "auto" }}
                            />
                            <div className="overlay"></div>
                            <span onClick={() => document.getElementById('fileInputFont').click()} className='edit-text'><i className='ti ti-plus' /></span>
                            <input
                                type="file"
                                id="fileInputFont"
                                style={{ display: 'none' }}
                                accept="image/*"
                                name='avatar'
                                onChange={(e) => handleFileChangeCCCD(e, "fontIdentityCard")} />
                        </div>
                    </div>
                    <div className="image-box">
                        <div className='update-avatar'>
                            <img
                                src={valuesResume.backIdentityCard instanceof File || valuesResume.backIdentityCard instanceof Blob
                                    ? URL.createObjectURL(valuesResume.backIdentityCard) : undefined}
                                alt="Ảnh CCCD/CMND mặt sau"
                                style={{ width: "100%", height: "auto" }}
                            />
                            <div className="overlay"></div>
                            <span onClick={() => document.getElementById('fileInputBack').click()} className='edit-text'><i className='ti ti-plus' /></span>
                            <input
                                type="file"
                                id="fileInputBack"
                                style={{ display: 'none' }}
                                accept="image/*"
                                name='avatar'
                                onChange={(e) => handleFileChangeCCCD(e, "backIdentityCard")} />
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Quốc tịch </label>
                            <input type="email" class="form-control " placeholder='Nhập tên quốc tịch' name='nation' value={valuesResume.nation} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tình trạng hôn nhân </label>
                            <select class="form-control" name='marriageStatus' value={valuesResume.marriageStatus} onChange={onChangeReSume}>
                                <option value={""}>Tình trạng</option>
                                <option value={true}>Đã kết hôn</option>
                                <option value={false}>Chưa kết hôn</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Dân tộc </label>
                            <input type="text" class="form-control " placeholder='Nhập dân tộc' name='religion' value={valuesResume.religion} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tôn giáo </label>
                            <input type="text" class="form-control " placeholder='Nhập tôn giáo' name='ethnic' value={valuesResume.ethnic} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Số tài khoản </label>
                            <input type="text" class="form-control " placeholder='Nhập số tài khoản' name='accountBank' value={valuesResume.accountBank} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Tên tài khoản </label>
                            <input type="text" class="form-control " placeholder='Nhập tên tài khoản' name='bankAccountName' value={valuesResume.bankAccountName} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngân hàng </label>
                            <input type="text" class="form-control " placeholder='Nhập tên ngân hàng' name='bankName' value={valuesResume.bankName} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Mã số thuế</label>
                            <input type="text" class="form-control " placeholder='Nhập mã số thuế' name='taxCode' value={valuesResume.taxCode} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Ngày vào </label>
                            <input type="date" class="form-control " name='dateJoin' value={valuesResume.dateJoin} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>
                <div class="col-md-12" style={{ fontSize: "20px" }}>
                    <i className='ti ti-chevron-down text-danger' /> <label class="form-label text-danger" >Thông tin liên hệ</label>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Điện thoại </label>
                            <input type="text" class="form-control " placeholder='Nhập số điện thoại' name='phoneNumber' value={valuesResume.phoneNumber} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Email </label>
                            <input type="text" class="form-control " placeholder='Nhập email' name='email' value={valuesResume.email} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Nguyên quán </label>
                            <input type="text" class="form-control " placeholder='Nhập nguyên quán' name='homeTown' value={valuesResume.homeTown} onChange={onChangeReSume} />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Thường trú </label>
                            <input type="text" class="form-control " placeholder='Nhập thường trú' name='permanentAddress' value={valuesResume.permanentAddress} onChange={onChangeReSume} />
                        </div>
                    </div>
                </div>

                <div class="col-md-12" style={{ fontSize: "20px" }}
                    onClick={() => setIsUpdateFamily(!isUpdateFamily)}
                >
                    <i className={` ${isUpdateFamily ? "ti ti-chevron-down" : "ti ti-chevron-up"}  text-danger `} /> <label class="form-label text-danger" style={{ cursor: 'pointer' }}>Thông tin gia đình & người phụ thuộc</label>
                </div>

                <div className={`row ${isUpdateFamily ? "" : "hidden"}`} style={{ marginLeft: "0px" }}>
                    <table class="table table-add table-leave">
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>Mối QH</th>
                                <th style={{ width: "15%" }}>Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th style={{ width: "15%" }}>CMT/Căn cước</th>
                                <th>Ngày cấp</th>
                                <th >Nơi cấp</th>
                                <th>Điện thoại</th>
                                <th>Phụ thuộc</th>
                                <th>Mã số thuế</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowFamily.map((row, index) => (
                                <tr key={row.id}>
                                    <td>
                                        <select className="form-control" value={row.relationShip} name='relationShip' onChange={(e) => onChangeInputCreate(index, e, setRowFamily)}>
                                            <option value="" selected hidden>Chọn</option>
                                            <option value={"Ông"}>Ông</option>
                                            <option value={"Bà"}>Bà</option>
                                            <option value={"Bố"}>Bố</option>
                                            <option value={"Mẹ"}>Mẹ</option>
                                            <option value={"Anh"}>Anh</option>
                                            <option value={"Chị"}>Chị</option>
                                            <option value={"Em"}>Em</option>
                                            <option value={"Con"}>Con</option>
                                        </select>
                                    </td>
                                    <td><input type="text" className="form-control" name='fullName' value={row.fullName} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td><input type="date" className="form-control" name='dateOfBirth' value={row.dateOfBirth} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td><input type="text" className="form-control" name='identityCard' value={row.identityCard} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td><input type="date" className="form-control" name='issueDateCCCD' value={row.issueDateCCCD} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td><input type="text" className="form-control" name='placeCCCD' value={row.placeCCCD} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td><input type="text" className="form-control" name='phoneNumber' value={row.phoneNumber} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td>
                                        <select className="form-control" value={row.dependent} name='dependent' onChange={(e) => onChangeInputCreate(index, e, setRowFamily)}>
                                            <option value="" selected hidden>Chọn</option>
                                            <option value={true}>Có</option>
                                            <option value={false}>Không</option>
                                        </select>
                                    </td>
                                    <td><input type="text" className="form-control" name='taxCode' value={row.taxCode} onChange={(e) => onChangeInputCreate(index, e, setRowFamily)} /></td>
                                    <td>
                                        <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={(e) => removeRow(row.id, setRowFamily, rowFamily)}>
                                            <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="col-md-1 mt-2">
                        <div class="d-flex justify-content-start">
                            <div class="mb-2 circle" style={{ cursor: "pointer" }}>
                                <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRowFamily} />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12 mt-4" style={{ fontSize: "20px" }}
                    onClick={() => setIsUpdateEdu(!isUpdateEdu)}
                >
                    <i className={` ${isUpdateEdu ? "ti ti-chevron-down" : "ti ti-chevron-up"}  text-danger `} /> <label class="form-label text-danger" style={{ cursor: 'pointer' }}>Quá trình học tập</label>
                </div>

                <div className={`row ${isUpdateEdu ? "" : "hidden"}`} style={{ marginLeft: "0px" }}>
                    <table class="table table-add table-leave">
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>Từ tháng</th>
                                <th style={{ width: "10%" }}>Đến Tháng</th>
                                <th style={{ width: "10%" }}>Trình độ học vấn</th>
                                <th >Nơi đào tạo</th>
                                <th>Chuyên ngành</th>
                                <th style={{ width: "10%" }}>Hình thức đào tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowEducation.map((row, index) => (
                                <tr key={row.id}>
                                    <td><input type="month" className="form-control" name='toMonth' value={row.toMonth} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td><input type="month" className="form-control" name='fromMonth' value={row.fromMonth} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td><input type="text" className="form-control" name='level' value={row.level} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td><input type="text" className="form-control" name='placeTraining' value={row.placeTraining} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td><input type="text" className="form-control" name='major' value={row.major} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td><input type="text" className="form-control" name='methodTraining' value={row.methodTraining} onChange={(e) => onChangeInputCreate(index, e, setRowEducation)} /></td>
                                    <td>
                                        <div class="col-md-1 d-flex align-items-center" style={{ cursor: "pointer" }} onClick={(e) => removeRow(row.id, setRowEducation, rowEducation)}>
                                            <i class="ti ti-x " style={{ fontSize: "20px" }}></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="col-md-1 mt-2">
                        <div class="d-flex justify-content-start">
                            <div class="mb-2 circle" style={{ cursor: "pointer" }}>
                                <i className='ti ti-plus' style={{ cursor: "pointer" }} onClick={addRowEducation} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateNewResumeComponent;

