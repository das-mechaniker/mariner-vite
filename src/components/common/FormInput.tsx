import React, { useState, useEffect } from 'react';
import { ValidationResult } from '../../utils/validation';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  validate?: (value: string) => ValidationResult;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  validate,
  validateOnChange = false,
  validateOnBlur = true,
  errorMessage,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  disabled = false,
  autoComplete,
}) => {
  const [error, setError] = useState<string | undefined>(errorMessage);
  const [touched, setTouched] = useState(false);

  // Update error message from props
  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (validateOnChange && validate && touched) {
      const result = validate(newValue);
      setError(result.isValid ? undefined : result.message);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    
    if (validateOnBlur && validate) {
      const result = validate(value);
      setError(result.isValid ? undefined : result.message);
    }
  };

  const baseInputClasses = 'block w-full px-4 py-2 mt-1 text-gray-900 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1';
  const errorInputClasses = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';
  const disabledInputClasses = 'bg-gray-100 cursor-not-allowed text-gray-500';
  
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${required ? 'required' : ''} ${labelClassName}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          ${baseInputClasses}
          ${error ? errorInputClasses : ''}
          ${disabled ? disabledInputClasses : ''}
          ${inputClassName}
        `}
      />
      
      {error && (
        <p
          id={`${id}-error`}
          className={`mt-1 text-sm text-red-600 ${errorClassName}`}
          data-testid={`${id}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput; 