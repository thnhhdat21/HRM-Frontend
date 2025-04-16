import React from 'react';

const TableBusinessBlockComponent = ({ ref, setSelectedId, listBusinessBlock, setBusinessBlockDetail }) => {

    return (
        <>
            <div class="card-body p-0 tab-pane fade" id='business-block'>
                <div class="custom-datatable-filter table-responsive">
                    <div class="table-container">
                        <table class="table" id='myTable'>
                            <thead class="thead-light">
                                <tr>
                                    <th></th>
                                    <th>Tên nghiệp vụ</th>
                                    <th>Mã nghiệp vụ</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {listBusinessBlock && listBusinessBlock.length > 0 && listBusinessBlock.map((item, index) => (
                                    <tr key={item.id} onContextMenu={() => { setSelectedId(item.id); setBusinessBlockDetail(item); }}>
                                        <td></td>
                                        <td>{item.name}</td>
                                        <td>{item.code}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableBusinessBlockComponent;

