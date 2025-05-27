import { useState } from 'react';

const EmployeeSelect = ({ list, setSelected }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setFilteredOptions([]);
            setShowSuggestions(false);
        } else {
            const filtered = list.filter(opt =>
                `${opt.employeeName} ${opt.employeeCode}`.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setShowSuggestions(true);
        }
    };

    const handleSelect = (option) => {
        setInputValue(`${option.employeeCode}-${option.employeeName}`);
        setShowSuggestions(false);
        setSelected(option.employeeId); // chỉ gửi id ra ngoài
    };


    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <input
                type="text"
                className='form-control'
                value={inputValue}
                onChange={handleChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onFocus={() => {
                    if (filteredOptions.length > 0) setShowSuggestions(true);
                }}
                style={{ width: '100%', padding: '8px' }}
                placeholder="Nhập tên hoặc mã nhân sự..."
            />
            {showSuggestions && filteredOptions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    border: '1px solid #ccc',
                    backgroundColor: 'white',
                    zIndex: 10,
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    maxHeight: '150px',
                    overflowY: 'auto'
                }}>
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {option.employeeCode}-{option.employeeName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmployeeSelect;
