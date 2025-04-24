import React, { useState } from 'react';

const EmployeeOfDepartment = ({ explorer, setInfoEmployee }) => {
    const [expand, setExpand] = useState(true);

    const handleContextMenuFirst = (list) => {
        if (list) {
            setInfoEmployee({
                employeeId: list.at(0).id,
                employeeName: list.at(0).fullName,
                accountStatus: list.at(0).accountStatus,
                accountId: list.at(0).accountId,
                department: list.at(0).department
            })
        }
    }

    const handleContextMenu = (item) => {
        setInfoEmployee({
            employeeId: item.id,
            employeeName: item.fullName,
            accountStatus: item.accountStatus,
            accountId: item.accountId,
            department: item.department
        })
    }

    return (
        explorer && (<>
            <div className='title-employee-department' onClick={() => setExpand(!expand)}
                onContextMenu={() => handleContextMenuFirst(explorer.employees)}
            >
                <i className={`ti ${expand ? "ti-chevron-down" : "ti-chevron-up"}  text-danger`} />
                <label class="form-label text-danger" >{explorer.department || "Khác"}</label>
            </div>
            <div style={{ display: expand ? "block" : "none" }} >
                {explorer.employees && explorer.employees.map((item, index) => (
                    <div
                        onContextMenu={(e) => handleContextMenu(item)}
                        class="grid-list-employee child">
                        <span></span>
                        <span>{item.code}</span>
                        <span>{item.fullName}</span>
                        <span>{item.department}</span>
                        <span>{item.jobPosition}</span>
                        <span>{item.duty}</span>
                        <span>{item.dateJoin}</span>
                        <span>{item.dateOfBirth}</span>
                        <span>{item.gender}</span>
                    </div>
                ))}
            </div>
        </>)
    )
}

export default EmployeeOfDepartment;