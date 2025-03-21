import React, { useRef } from 'react';
import SettingAssetGroupComponent from './subcomponent/SettingAssetGroupComponent';
import SettingUntilAssetComponent from './subcomponent/SettingUntilAssetComponent';

const SettingAssetComponent = () => {
    return (
        <>
            <div class="page-wrapper" style={{ position: 'static' }}>
                <div class="content">
                    <div class="card">
                        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className='d-flex category-list-employ' style={{ gap: '20px', fontSize: '14px', fontWeight: 500 }}>
                                <ul class="nav ">
                                    <li class="nav-item" role="presentation" className='nav-profile'>
                                        <button class="nav-link nav-link-profile active" id="info-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-group" >Nhóm tài sản</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" >Đơn vị</button>
                                    </li>
                                </ul>
                            </div>

                            <div class="mb-2 dropdown profile-dropdown">
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#crud_asset_group">
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                            </div>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <SettingAssetGroupComponent />
                            <SettingUntilAssetComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingAssetComponent;

