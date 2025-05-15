import React, { useState } from 'react';
import '../css/profile.css';
import CreateNewResumeComponent from './CreateNewResumeComponent';
import CreateNewContractComponent from './CreateNewContractComponent';
import CreateNewInsuranceComponent from './CreateNewInsuranceComponent';
import { useDispatch } from 'react-redux';
import { updateTitleHeader } from '../../../redux/slice/TitleHeaderSlice';
import { toast } from 'react-toastify';
import { createEmployee, updateResumeProfile } from '../../../service/EmployeeService';
import { v4 as uuidv4 } from 'uuid';
import { checkValidatorEducation } from '../../../util/EducationUtil';
import { checkValidatorResume } from '../../../util/EmployeeUtil';
import { checkValidatorFamily } from '../../../util/FamilyUtil';
import { checkValidatorAllowanceContract, checkValidatorContract, CONTRACT_CREATE_NEW } from '../../../util/ContractUtil';
import { checkValidatorInsurance } from '../../../util/InsuranceUtil';
import Cookies from 'js-cookie';
import { PerManageContract } from '../../../util/PermissionUtil';

const CreateNewEmployeeComponent = () => {
    //lay role
    const roleString = Cookies.get('permissions');
    let roles = new Set();

    if (roleString) {
        const parsedRoles = roleString.split(',');
        roles = new Set(parsedRoles);
    }


    const dispatch = useDispatch();
    dispatch(updateTitleHeader({ title: "Tạo mới hồ sơ nhân sự", subTitle: "" }))
    const [isUpdateFamily, setIsUpdateFamily] = useState(true);
    const [isUpdateEdu, setIsUpdateEdu] = useState(true);
    const [isCreateContract, setIsCreateContract] = useState(false);
    const [isCreateInsurance, setIsCreateInsurance] = useState(false);

    //Nhân thân
    const [rowFamilys, setRowFamilys] = useState([{
        id: uuidv4(),
        fullName: "",
        relationShip: "",
        dateOfBirth: "",
        identityCard: "",
        issueDateCCCD: "",
        placeCCCD: "",
        phoneNumber: "",
        dependent: 0,
        taxCode: "",
        isUpdate: "update"
    }]);
    //Học vấn
    const [rowsEducation, setRowsEducation] = useState([{
        id: uuidv4(),
        toMonth: "",
        fromMonth: "",
        level: "",
        placeTraining: "",
        major: "",
        methodTraining: "",
        isUpdate: "update"
    }]);
    //Sơ yếu lý lịch
    const [valuesResume, setValuesResume] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        marriageStatus: "",
        nation: "",
        phoneNumber: "",
        religion: "", // tôn giáo
        ethnic: "", // dân tộc
        identityCard: "",
        issueDateCCCD: "",
        placeCCCD: "",
        placeOfBirth: "",
        homeTown: "", // nguyên quán
        permanentAddress: "", // thường trú
        currentAddress: "",// chỗ ở hiện tại
        taxCode: "",
        bankAccountName: "",
        accountBank: "",
        bankName: "",
        dateJoin: "",
        email: "",
        avatar: "",
        backIdentityCard: "",
        fontIdentityCard: ""
    })
    //Hợp đồng
    const [contractDetail, setContractDetail] = useState({
        employeeName: "",
        employeeCode: "",
        contractCode: "",
        contractType: "",
        department: "",
        jobPosition: "",
        contractMethod: null,
        salaryGross: "",
        dateStart: "",
        dateEnd: "",
        dateSign: "",
        createType: CONTRACT_CREATE_NEW
    })
    //Phụ cấp
    const [allowances, setAllowances] = useState([])

    //bảo hiểm
    const [insurance, setInsurance] = useState({
        insuranceNumber: "",
        insuranceCard: ""
    })

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("click")
        var isCorrect = false;
        isCorrect = checkValidatorResume(valuesResume);
        var valuesEdu = [];
        var valuesFami = [];
        var contractCreate = null;
        var insuranceRequest = null;
        if (isUpdateFamily) {
            for (const element of rowFamilys) {
                if (!checkValidatorFamily(element)) {
                    isCorrect = false;
                    return;
                }
            }
            valuesEdu = rowsEducation.map(item => ({
                ...item,
                id: null,
                toMonth: item.toMonth + "-01",
                fromMonth: item.fromMonth + "-01",
            }))
        }

        if (isUpdateFamily) {
            for (const element of rowsEducation) {
                if (!checkValidatorEducation(element)) {
                    isCorrect = false;
                    return;
                }
            }
            valuesFami = rowFamilys.map(({ id, ...rest }) => ({ ...rest }))
        }

        if (isCreateContract) {
            isCorrect = checkValidatorContract(contractDetail);
            if (!isCorrect) {
                return;
            }

            for (const element of allowances) {
                if (element.isUpdate !== "delete") {
                    if (!checkValidatorAllowanceContract(element)) {
                        isCorrect = false;
                        break;
                    }
                }
            }
            const updatedList = allowances.map(item => ({
                ...item,
                id: (typeof item.id === 'number' && !isNaN(item.id)) ? item.id : null
            }));
            contractCreate = { ...contractDetail, ["allowances"]: updatedList };
        }

        if (isCreateInsurance) {
            isCorrect = checkValidatorInsurance(insurance);
            if (!isCorrect) {
                return;
            }
            insuranceRequest = insurance
        }

        console.log(isCorrect)
        if (isCorrect) {
            createEmployee(valuesResume, valuesEdu, valuesFami, contractCreate, insuranceRequest).then((response) => {
                if (response.data.code === 1000) {
                    toast.success("Cập nhật thành công")
                } else if (response.data.code > 1000) {
                    toast.info(response.data.message)
                } else {
                    toast.error("Bảo trì hệ thống")
                }
            })
        }
    }

    return (
        <>
            <div className='page-wrapper'>
                <div class="content">
                    <div class="card card-body">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list-2">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-resume" > Sơ yếu lý lịch</button>
                                    </li>
                                    {
                                        PerManageContract.some((role) => roles.has(role)) && (
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                                    data-bs-target="#create-employee-contract" >Hợp đồng</button>
                                            </li>
                                        )
                                    }
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile" id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#create-employee-insurance" >Bảo hiểm</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <CreateNewResumeComponent
                                valuesResume={valuesResume}
                                setValuesResume={setValuesResume}
                                rowFamily={rowFamilys}
                                setRowFamily={setRowFamilys}
                                rowEducation={rowsEducation}
                                setRowEducation={setRowsEducation}
                                isUpdateFamily={isUpdateFamily}
                                setIsUpdateFamily={setIsUpdateFamily}
                                isUpdateEdu={isUpdateEdu}
                                setIsUpdateEdu={setIsUpdateEdu}
                            />

                            <CreateNewContractComponent
                                isCreateContract={isCreateContract}
                                setIsCreateContract={setIsCreateContract}
                                contractDetail={contractDetail}
                                setContractDetail={setContractDetail}
                                allowances={allowances}
                                setAllowances={setAllowances}
                            />
                            <CreateNewInsuranceComponent
                                insurance={insurance}
                                setInsurance={setInsurance}
                                isCreateInsurance={isCreateInsurance}
                                setIsCreateInsurance={setIsCreateInsurance}
                            />
                        </div>
                    </div>

                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <button type="submit" class="btn btn-primary" onClick={handleUpdate}>CẬP NHẬT</button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CreateNewEmployeeComponent;

