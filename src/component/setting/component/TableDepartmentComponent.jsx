import React, { useEffect, useState } from 'react';
import DepartmentFolder from './DepartmentFolder';

const TableDepartmentComponent = ({ ref, setSelectedId, listDepartment }) => {
    return (
        <>
            <div class="card-body p-0  tab-pane fade show active" id="department">
                <div class="custom-datatable-filter table-responsive">
                    <div class="table-container">
                        <div class="grid-department header-payroll" style={{ backgroundColor: "#e5e7eb" }}>
                            <span></span>
                            <span>Tiêu đề</span>
                            <span>Cấp bậc</span>
                            <span>Khối nghiệp vụ</span>
                        </div>
                        <div ref={ref}>
                            {listDepartment && listDepartment.map((item) => <DepartmentFolder explorer={item} setSelectedId={setSelectedId} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableDepartmentComponent;

