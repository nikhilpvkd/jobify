import React from "react";

const FormRow = ({ value, name, type, labelText, handleChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                className="form-input"
            />
        </div>
    );
};

export default FormRow;
