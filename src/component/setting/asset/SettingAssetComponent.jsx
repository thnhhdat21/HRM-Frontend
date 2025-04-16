import React, { use, useEffect, useRef, useState } from 'react';
import SettingAssetGroupComponent from './subcomponent/SettingAssetGroupComponent';
import SettingUntilAssetComponent from './subcomponent/SettingUntilAssetComponent';
import useRightClickMenu from '../../../hooks/useRightClickMenu';
import ContextMenuTwoItem from '../../../contextmenu/ContextMenuTwoItem';
import { deleteAssetGroup, getListAssetGroup } from '../../../service/AssetGroupService';
import { responseData, responseDelete } from '../../../util/ResponseUtil';
import { deleteAssetUnit, getListAssetUnit } from '../../../service/AssetUnitService';
import AssetGroupCRUDComponent from '../crud/AssetGroupCRUDComponent';
import UnitAssetCRUDComponent from '../crud/UnitAssetCRUDComponent';

const SettingAssetComponent = () => {
    const tableGroupRef = useRef(null)
    const tableUnitRef = useRef(null)
    const [tableRef, setTabledRef] = useState(tableGroupRef);
    const { x, y, showMenu } = useRightClickMenu(tableRef, 220, 100);
    const [selected, setSelected] = useState("");
    const [typeNav, setTypeNav] = useState("group");
    const [typeOpen, setTypeOpen] = useState([]);
    const [modalId, setModalId] = useState("crud_asset_group");
    const [listUnit, setListUnit] = useState({})
    const [listGroup, setListGroup] = useState({})

    useEffect(() => {
        getListAssetGroup().then((response) => {
            responseData(response, setListGroup)
        })

        getListAssetUnit().then((response) => {
            responseData(response, setListUnit)
        })
    }, [])

    const handleDeleteAssetGroup = () => {
        deleteAssetGroup(selected.id).then(response => {
            responseDelete(response, setListGroup, selected.id)
        });
    }

    const handleDeleteAssetUnit = () => {
        deleteAssetUnit(selected.id).then(response => {
            responseDelete(response, setListUnit, selected.id)
        });
    }

    const handleNav = (name) => {
        if (name === "group") {
            setTabledRef(tableGroupRef)
            setTypeNav("group")
            setModalId("crud_asset_group")
        } else {
            setTabledRef(tableUnitRef)
            setTypeNav("unit")
            setModalId("crud_unit_asset")
        }
    }

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
                                            data-bs-target="#setting-asset-group" onClick={() => handleNav("group")} >Nhóm tài sản</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link nav-link-profile " id="address-tab" data-bs-toggle="tab"
                                            data-bs-target="#setting-asset-unit" onClick={() => handleNav("unit")}>Đơn vị</button>
                                    </li>
                                </ul>
                            </div>

                            <div class="mb-2 dropdown profile-dropdown">
                                <a href="#" class="btn btn-danger d-flex align-items-center" data-bs-toggle="modal" data-bs-target={`#${modalId}`}
                                    onClick={() => setTypeOpen(prevList => [...prevList, "open"])}>
                                    <i class="ti ti-circle-plus" style={{ fontSize: "20px" }} />
                                </a>
                            </div>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <SettingAssetGroupComponent listGroup={listGroup} ref={tableGroupRef} setSelected={setSelected} />
                            <SettingUntilAssetComponent listUnit={listUnit} ref={tableUnitRef} setSelected={setSelected} />
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuTwoItem x={x} y={y} showMenu={showMenu} modalId={modalId} handleDelete={typeNav === "group" ? handleDeleteAssetGroup : handleDeleteAssetUnit} setTypeOpen={setTypeOpen} />
            <AssetGroupCRUDComponent typeOpen={typeOpen} typeNav={typeNav} selected={selected} listGroup={listGroup} setListGroup={setListGroup} />
            <UnitAssetCRUDComponent typeOpen={typeOpen} typeNav={typeNav} selected={selected} setListUnit={setListUnit} />
        </>
    );
};

export default SettingAssetComponent;

