import React, { useEffect, useState } from 'react';
import './css/setting-style.css';
import { v4 as uuidv4 } from 'uuid';
import { InsuranceTypeDir } from '../../util/InsuranceUtil';
import { responseData } from '../../util/ResponseUtil';
import { createInsuranceRatio, deleteInsuranceRatio, getInsuranceRatioDetail, getInsuranceRatios, updateInsuranceRatio } from '../../service/InsuranceRatioService';
import { toast } from 'react-toastify';

const SettingTypeInsuranceComponent = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [insuranceTab, setInsuranceTab] = useState({})
    const [insuranceDetail, setInsuranceDetail] = useState({})

    const [mapInsuranceUpdate, setMapInsuranceUpdate] = useState(new Map())
    const [mapInsuranceCreate, setMapInsuranceCreate] = useState(new Map())
    const [listInsuranceDelete, setListInsuranceDelete] = useState([])

    const handleClickNav = (id) => {
        setActiveIndex(id)
    }

    const addRow = () => {
        const id = uuidv4()
        setActiveIndex(id)
        setInsuranceTab([...insuranceTab, { id: id }]);
        setMapInsuranceCreate(prev => prev.set(id, {
            dateStart: getMonthYear(new Date()), ratios: [
                {
                    "type": 1,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 2,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 3,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 4,
                    "ratio": "",
                    "companyPay": ""
                }
            ]
        }));
    };

    const removeRow = (e, id, index) => {
        e.stopPropagation();
        const insuranceUpdate = insuranceTab.filter(row => row.id !== id)
        setInsuranceTab(insuranceUpdate);
        setMapInsuranceUpdate(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
        setListInsuranceDelete(prev => [...prev, id]);

        if (activeIndex === id) {
            if (insuranceUpdate.length === 0) {
                addRowWhenRemoveTab(insuranceUpdate);
            } else {
                const nextIndex = index > insuranceUpdate.length - 1 ? index - 1 : index;
                setActiveIndex(insuranceUpdate.at(nextIndex)?.id);
            }
        }

    };

    const addRowWhenRemoveTab = (insuranceUpdate) => {
        const id = uuidv4()
        setActiveIndex(id)
        setInsuranceTab([...insuranceUpdate, { id: id }]);
        setMapInsuranceCreate(prev => prev.set(id, {
            dateStart: getMonthYear(new Date()), ratios: [
                {
                    "type": 1,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 2,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 3,
                    "ratio": "",
                    "companyPay": ""
                },
                {
                    "type": 4,
                    "ratio": "",
                    "companyPay": ""
                }
            ]
        }));
    }
    const handleReloadTab = () => {
        getInsuranceRatios().then((response) => {
            responseData(response, setInsuranceTab)

            if (response.data.code === 1000) {
                const item = response.data.data.at(0)
                setActiveIndex(item["id"])
            }
        })
    }

    useEffect(() => {
        handleReloadTab()
    }, [])

    useEffect(() => {
        if (activeIndex && Number.isInteger(activeIndex)) {
            getInsuranceRatioDetail(activeIndex).then((response) => {
                responseData(response, setInsuranceDetail)
                if (response.data.code === 1000 && !mapInsuranceUpdate.get(activeIndex)) {
                    const item = response.data.data
                    setMapInsuranceUpdate(prev => prev.set(item.id, item));
                }
            })
        }
    }, [activeIndex])

    const onChangeInput = (index, e) => {
        const { name, value } = e.target;

        const current = mapInsuranceUpdate.get(activeIndex);
        if (!current) return;

        const update = Number(value) !== Number(insuranceDetail.ratios[index][name])
        const updatedRatios = [...current.ratios];
        updatedRatios[index] = {
            ...updatedRatios[index],
            [name]: parseFloat(value),
            hasUpdate: update,
            error: {
                ...(updatedRatios[index].error || {}),
                [name]: false
            }
        };

        mapInsuranceUpdate.set(activeIndex, {
            ...current,
            ratios: updatedRatios,
        });

        setMapInsuranceUpdate(new Map(mapInsuranceUpdate));
    };


    const onChangeInputCreate = (index, e) => {
        const { name, value } = e.target;

        const current = mapInsuranceCreate.get(activeIndex);
        if (!current) return;

        const updatedRatios = [...current.ratios];
        updatedRatios[index] = {
            ...updatedRatios[index],
            [name]: parseFloat(value),
            error: {
                ...(updatedRatios[index].error || {}),
                [name]: false
            }
        };

        mapInsuranceCreate.set(activeIndex, {
            ...current,
            ratios: updatedRatios,
        });

        setMapInsuranceCreate(new Map(mapInsuranceCreate));
    };

    const onChangeDateCreate = (e) => {
        const { name, value } = e.target;

        const current = mapInsuranceCreate.get(activeIndex);
        if (!current) return;

        mapInsuranceCreate.set(activeIndex, {
            ...current,
            [name]: (value),
        });

        setMapInsuranceCreate(new Map(mapInsuranceCreate));
    };

    const onChangeDateUpdate = (e) => {
        const { name, value } = e.target;

        const current = mapInsuranceUpdate.get(activeIndex);
        if (!current) return;

        mapInsuranceUpdate.set(activeIndex, {
            ...current,
            [name]: (value),
        });

        setMapInsuranceUpdate(new Map(mapInsuranceUpdate));
    };

    const getMonthYear = (date) => {
        const month = `${date.getMonth() + 1}`.padStart(2, "0");
        const year = date.getFullYear();
        return `${year}-${month}`;
    };

    const handleClickUpdateAndCreate = async () => {
        const isCorrectUpdate = handleValidateInputs(mapInsuranceUpdate, setMapInsuranceUpdate);
        const isCorrectCreate = handleValidateInputs(mapInsuranceCreate, setMapInsuranceCreate);

        if (isCorrectCreate && isCorrectUpdate) {

            const listUpdate = [...mapInsuranceUpdate.values()];
            const listCreate = [...mapInsuranceCreate.values()];
            const listDelete = listInsuranceDelete;

            if (listUpdate.length > 0) {
                const response = await updateInsuranceRatio(listUpdate);
                if (response.data.code > 1000 || response.data.code < 1000) {
                    toast.error("Bảo trì hệ thống");
                    return;
                }
            }

            if (listCreate.length > 0) {
                const response = await createInsuranceRatio(listCreate);
                if (response.data.code > 1000 || response.data.code < 1000) {
                    toast.error("Bảo trì hệ thống");
                    return;
                }
            }

            if (listDelete.length > 0) {
                const response = await deleteInsuranceRatio(listDelete);
                if (response.data.code > 1000 || response.data.code < 1000) {
                    toast.error("Bảo trì hệ thống");
                    return;
                }
            }
            handleReloadTab()
            toast.success("Cập nhật thành công!");
        }
    };

    const handleValidateInputs = (mapInsurance, setMapInsurance) => {
        const newMap = new Map(mapInsurance);
        let first = true;
        let isCorret = true;
        newMap.forEach((value, key) => {
            const updatedRatios = value.ratios.map(item => {
                const ratioError = item.ratio === '' || item.ratio === null || isNaN(item.ratio);
                const companyPayError = item.companyPay === '' || item.companyPay === null || isNaN(item.companyPay);
                if (first && (ratioError || companyPayError)) {
                    setActiveIndex(key)
                    toast.error("Vui lòng điền đầy đủ các trường trong tất cả các tab!");
                    first = false
                    isCorret = false
                }

                return {
                    ...item,
                    error: {
                        ratio: ratioError,
                        companyPay: companyPayError
                    }
                };
            });

            newMap.set(key, {
                ...value,
                ratios: updatedRatios
            });
        });

        setMapInsurance(newMap);
        return isCorret;
    };


    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="card card-body">
                        <div class=" d-flex align-items-center justify-content-between flex-wrap row-gap-3 p-categoty-list">
                            <div className="tab-container d-flex">
                                {insuranceTab.length > 0 && insuranceTab.map((item, index) => (
                                    <>
                                        <div key={index} className={`tab-type ${activeIndex === item.id ? "active-tab-type" : ""}`}
                                            onClick={() => handleClickNav(item.id)}>
                                            <span>{item.dateStart || "Thẻ mới"}</span>
                                            <i className="ti ti-x close-icon" style={{ display: insuranceTab.length === 1 && !Number.isInteger(item.id) ? 'none' : "" }} onClick={(e) => removeRow(e, item.id, index)}></i>
                                        </div>
                                    </>
                                ))}
                                <div className="tab-type active-tab-type tab-plus" onClick={addRow}>
                                    <i className='ti ti-plus' />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-3">
                                <div class="mb-3">
                                    <label class="form-label">Từ tháng</label>
                                    {
                                        Number.isInteger(activeIndex) ?
                                            (<input type="month" class="form-control input-rtl" value={mapInsuranceUpdate.get(activeIndex) && mapInsuranceUpdate.get(activeIndex)["dateStart"]}
                                                name='dateStart' onChange={onChangeDateUpdate}
                                            />) : (<input type="month" class="form-control input-rtl" value={mapInsuranceCreate.get(activeIndex) && mapInsuranceCreate.get(activeIndex)["dateStart"]}
                                                name='dateStart' onChange={onChangeDateCreate}
                                            />)
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            mapInsuranceUpdate.get(activeIndex) && mapInsuranceUpdate.get(activeIndex).ratios.map((item, index) => (
                                <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">{InsuranceTypeDir[item.type]} </label>
                                            <input id={`${item.id}_${item.type}`} type="number" step={0.1} min={0} className={`form-control input-rtl ${item.error?.ratio ? 'input-error' : ''}`} name='ratio' value={item.ratio} onChange={(e) => onChangeInput(index, e)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">Công ty đóng </label>
                                            <input id={`${item.id}_${item.type}_${item.type}`} type="number" step={0.1} className={`form-control input-rtl ${item.error?.companyPay ? 'input-error' : ''}`} name='companyPay' value={item.companyPay} onChange={(e) => onChangeInput(index, e)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">Người lao động</label>
                                            <input type="number" step={0.1} class="form-control input-rtl readonly-input" readOnly value={item.ratio - item.companyPay} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            mapInsuranceCreate && mapInsuranceCreate.get(activeIndex) && mapInsuranceCreate.get(activeIndex).ratios.map((item, index) => (
                                <div class="row mt-2" style={{ marginLeft: "10px" }}>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">{InsuranceTypeDir[item.type]} </label>
                                            <input id={`${item.id}_${item.type}`} type="number" step={0.1} min={0} className={`form-control input-rtl ${item.error?.ratio ? 'input-error' : ''}`} name='ratio' value={item.ratio} onChange={(e) => onChangeInputCreate(index, e)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">Công ty đóng </label>
                                            <input id={`${item.id}_${item.type}_${item.type}`} type="number" step={0.1} className={`form-control input-rtl ${item.error?.companyPay ? 'input-error' : ''}`} name='companyPay' value={item.companyPay} onChange={(e) => onChangeInputCreate(index, e)} />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="mb-3">
                                            <label class="form-label">Người lao động</label>
                                            <input type="number" step={0.1} class="form-control input-rtl readonly-input" readOnly value={item.ratio - item.companyPay} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div class="modal-footer mt-5">
                        <button type="button" class="btn btn-outline-light border me-2"
                            data-bs-dismiss="modal">HỦY BỎ</button>
                        <div type="submit" class="btn btn-primary" onClick={handleClickUpdateAndCreate}>CẬP NHẬT</div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default SettingTypeInsuranceComponent;

