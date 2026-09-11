import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = '',
  onChange,
  required = type !== 'search',
  placeholder = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <div className={isPassword ? 'input-with-action' : ''}>
        <input
          type={inputType}
          id={name}
          name={name}
          className='form-input'
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type='button'
            className='password-toggle-btn'
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
    </div>
  );
};
export default FormRow;
