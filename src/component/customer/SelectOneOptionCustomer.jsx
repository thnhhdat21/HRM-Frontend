import { convertDateTime } from '../../util/TimeUtil';

const SelectOneOptionCustomer = ({ listItem, name, values, setValues, elementId }) => {
    const toggleOptions = (event) => {
        event.stopPropagation();
        document.getElementById(elementId).classList.add('show');
    }

    const handleSelected = (item, e) => {
        e.target.classList.add("hidden")
        setValues({ ...values, [name]: item.value })

    }

    const clearAllItem = (e) => {
        e.stopPropagation();
        setValues({ ...values, [name]: '' })
        closeOptions()
    }

    function closeOptions() {
        document.getElementById(elementId).classList.remove("show");
    }


    const styleBottom = () => {
        return {
            maxHeight: "200px",
            zIndex: 9999
        }
    }

    return (
        <div className="custom-select">
            <div className="select-box" onClick={toggleOptions}>
                <div className="selected-container" id="selected-items">
                    <span>{values[name] ? convertDateTime(values[name]) : "Chọn"}</span>
                </div>
                {values[name] && (<span onClick={clearAllItem}>✖</span>)}
            </div>
            <div className="select-options" id={elementId} style={styleBottom()}>
                {
                    listItem.length > 0 && listItem.map((item, index) => (
                        <div id={item.id} className={`${values[name] === item.value ? "hidden" : ""}`} onClick={(e) => handleSelected(item, e)}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default SelectOneOptionCustomer;

