import React, { useEffect, useState } from 'react';
import UnitAssetCRUDComponent from '../../crud/UnitAssetCRUDComponent';
import { responseData } from '../../../../util/ResponseUtil';
import { getListAssetUnit } from '../../../../service/AssetUnitService';

const SettingUntilAssetComponent = ({ listUnit, ref, setSelected }) => {

    return (
        <>
            <div id='setting-asset-unit' class="card-body p-0 tab-pane fade">
                <div class="custom-datatable-filter table-responsive">
                    <div class="table-container">
                        <table class="table" id='myTable'>
                            <thead class="thead-light">
                                <tr>
                                    <th class="no-sort">

                                    </th>
                                    <th>Đơn vị</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody ref={ref}>
                                {
                                    listUnit.length > 0 && listUnit.map((item, index) => (
                                        <tr onContextMenu={() => setSelected(item)}>
                                            <td></td>
                                            <td>{item.name}</td>
                                            <td><span className='badge'>{item.status}</span></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingUntilAssetComponent;

