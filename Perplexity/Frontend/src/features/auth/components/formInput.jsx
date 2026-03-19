import React from 'react'
import '../style/formInput.scss'

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  error = null 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'input-error' : ''}`}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default FormInput
