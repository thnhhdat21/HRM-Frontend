import React, { useEffect, useState } from 'react';

const SelectCustomer = ({ listSelectedPrev, listItem, selectedItem, setSelectedItem }) => {
    const [mapListJob, setMapListJob] = useState(new Map())
    useEffect(() => {
        if (listItem.length > 0) {
            const map = new Map()
            listItem.map((item) => map.set(item.id, item.name))
            setMapListJob(map)
        }
    }, [listItem])

    const toggleOptions = (event) => {
        event.stopPropagation();
        document.getElementById("options-list").classList.add('show');
    }

    const handleSelected = (id, e) => {
        setSelectedItem((prev) => [...prev, id]);
        e.target.classList.add("hidden")
    }

    const removeItem = (id) => {
        setSelectedItem(prevList => prevList.filter(item => item !== id))
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
        setSelectedItem([])
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
                    {selectedItem.length > 0 && selectedItem.map((item, index) => (
                        <div className="selected-item">
                            {mapListJob.get(item)}
                            <span class="remove-btn" onClick={() => removeItem(item)}>&times;</span>
                        </div>
                    ))}
                </div>
                {selectedItem.length > 0 && (<span onClick={clearAllItem}>✖</span>)}
            </div>
            <div class="select-options" id="options-list" style={{ top: listItem.length - selectedItem.length >= 5 ? "-200px" : `${-1 * (listItem.length - selectedItem.length) * 42}px` }}>
                {
                    listItem.length > 0 && listItem.map((item, index) => (
                        <div id={item.id} className={`${listSelectedPrev.includes(item.id) ? "hidden" : ""}`} onClick={(e) => handleSelected(item.id, e)}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default SelectCustomer;

