import React from 'react';

const SettingAssetGroupComponent = ({ listGroup, ref, setSelected }) => {
    return (
        <>
            <div id="setting-asset-group" class="card-body p-0 tab-pane fade show active">
                <div class="custom-datatable-filter table-responsive">
                    <div class="table-container">
                        <table class="table" id='myTable'>
                            <thead class="thead-light">
                                <tr>
                                    <th class="no-sort">
                                    </th>
                                    <th>Nhóm tài sản</th>
                                    <th>Thuộc nhóm cha</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {
                                    listGroup.length > 0 && listGroup.map((item, index) => (
                                        <tr onContextMenu={() => setSelected(item)}>
                                            <td></td>
                                            <td>{item.name}</td>
                                            <td>{item.parentName}</td>
                                            <td><span className='badge'>{item.status}</span></td>                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div class="row pageable-center">
                    <div class="col-sm-12 col-md-5">
                        <div>Hiển thị 1 - 10 trong 10 bản ghi</div>
                    </div>
                    <div class="col-sm-12 col-md-7">
                        <div class="dataTables_paginate mg-top-0">
                            <ul class="pagination">
                                <li class="page-item previous disabled my-center">
                                    <i class="ti ti-chevron-left"></i>
                                </li>
                                <li class="page-item active "><a class="page-link">1</a></li>
                                <li class=" page-item next disabled my-center">
                                    <i class="ti ti-chevron-right"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default SettingAssetGroupComponent;

