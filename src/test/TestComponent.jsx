import React, { useState, useRef, useEffect } from "react";
import "./test.css"; // CSS bạn có thể tách ra như bạn làm ban đầu
import { getListJobPosition } from "../service/JobPositionService";
import { responseData } from "../util/ResponseUtil";

export default function TestComponent(selectedItem, setSelect) {
    const [listJobPosition, setListJobPosition] = useState([])
    const [mapListJob, setMapListJob] = useState(new Map())
    const [selectedJP, setSelectedJP] = useState([])

    useEffect(() => {
        getListJobPosition().then((response) => {
            responseData(response, setListJobPosition)
            if (response.data.code === 1000) {
                const list = response.data.data
                const map = new Map()
                list.map((item) => map.set(item.id, item.name))
                setMapListJob(map)
            }
        })
    }, [])

    const toggleOptions = (event) => {
        event.stopPropagation();
        document.getElementById("options-list").classList.add('show');
    }

    const handleSelected = (id, e) => {
        setSelectedJP((prev) => [...prev, id]);
        e.target.classList.add("hidden")
    }

    const removeItem = (id) => {
        setSelectedJP(prevList => prevList.filter(item => item !== id))
        const options = document.getElementById("options-list").children;
        for (let opt of options) {
            if (Number(opt.id) === id) {
                opt.classList.remove("hidden");
                break;
            }
        }
    }

    const clearAllItem = (e) => {
        e.stopPropagation();
        setSelectedJP([])
        const options = document.getElementById("options-list").children;
        for (let opt of options) {
            opt.classList.remove("hidden");
        }
        closeOptions()
    }

    function closeOptions() {
        document.getElementById("options-list").classList.remove("show");
    }

    return (
        <div class="custom-select">
            <div class="select-box" onClick={toggleOptions}>
                <div class="selected-container" id="selected-items">
                    {selectedJP.length > 0 && selectedJP.map((item, index) => (
                        <div className="selected-item">
                            {mapListJob.get(item)}
                            <span class="remove-btn" onClick={() => removeItem(item)}>&times;</span>
                        </div>
                    ))}
                </div>
                {selectedJP.length > 0 && (<span onClick={clearAllItem}>✖</span>)}
            </div>
            <div class="select-options" id="options-list">
                {
                    listJobPosition.length > 0 && listJobPosition.map((item, index) => (
                        <div id={item.id} onClick={(e) => handleSelected(item.id, e)}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    );
}
