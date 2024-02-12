import React from 'react';
import PropTypes from 'prop-types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function TextBox({
  label = null,
  placeholder = '',
  type = 'text',
  Icon = null,
  value,
  setValue,
  error = null,
  disabled = false,
}) {
  const isPassword = type === 'password';

  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-w-60 w-60 sm:w-64 md:w-80 lg:w-full'>
      <div className='mb-2'>
        <label htmlFor={label} className='bg-white dark:bg-secondary-dark-bg text-gray-400 text-sm'>
          {t(label)}:
        </label>
      </div>
      <div className='border-2 border-b-[3px] border-gray-300 rounded'>
        <div className='flex items-center p-2'>
          {Icon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
          <input
            id={label}
            type={isPassword && showPassword ? 'text' : type}
            placeholder={t(placeholder)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            className='text-sm appearance-none bg-transparent border-none w-full h-6 text-gray-700 dark:text-white p-2 leading-tight focus:outline-none'
          />
          {isPassword && (
            <div className='ml-2 cursor-pointer' onClick={handleTogglePassword}>
              {showPassword ? (
                <EyeSlashIcon className='h-6 w-6 text-gray-300' />
              ) : (
                <EyeIcon className='h-6 w-6 text-gray-300' />
              )}
            </div>
          )}
        </div>
      </div>
      <p className='text-sm text-red-500'>{t(error)}</p>
    </div>
  );
}

TextBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  Icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextBox;
