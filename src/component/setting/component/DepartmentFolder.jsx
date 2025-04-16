import React, { useState } from 'react';

const DepartmentFolder = ({ explorer, setSelectedId }) => {
    const [expand, setExpand] = useState(true);
    return (
        <>
            {
                explorer && (<>
                    <div class="grid-department"
                        onContextMenu={(e) => { e.preventDefault(); setSelectedId(explorer.id); }}
                    >
                        <span></span>
                        <span
                            onClick={() => setExpand(!expand)}
                            style={{ cursor: explorer.children ? "pointer" : 'default' }}
                            className={`${explorer.children ? "span-department" : ""}`}>
                            <i className={`${explorer.children ? "ti ti-folder" : ""}`} style={{ marginRight: "5px" }} />
                            {explorer.name}
                        </span>
                        <span>{explorer.departmentLevel}</span>
                        <span>{explorer.businessBlock}</span>
                    </div>
                    <div style={{ display: expand ? "block" : "none", paddingLeft: 20 }}>
                        {explorer.children && explorer.children.map((explorer) => (
                            <DepartmentFolder explorer={explorer} setSelectedId={setSelectedId} />
                        ))}
                    </div> </>)
            }
        </>
    );
};

export default DepartmentFolder;
