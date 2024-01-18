import React from 'react';
import PropTypes from 'prop-types';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

function TextBox({ label = null, placeholder = '', type = 'text', Icon = null, value, setValue }) {
  const isPassword = type === 'password';

  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative border-2 border-gray-300 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] rounded'>
      {label && (
        <label className='absolute top-[-12px] left-2 bg-[#F9F9FA] px-1 text-gray-400 text-sm font-regular font-zenkaku'>
          {t(label)}
        </label>
      )}
      <div className='flex items-center p-2'>
        {Icon && <Icon className='h-6 w-6 text-gray-300 mr-2' />}
        <input
          type={isPassword && showPassword ? 'text' : type}
          placeholder={t(placeholder)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='appearance-none bg-transparent border-none w-full h-full text-gray-700 p-2 leading-tight focus:outline-none'
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
  );
}

TextBox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  Icon: PropTypes.elementType,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

TextBox.defaultProps = {
  label: null,
  placeholder: '',
  type: 'text',
  Icon: null,
};

export default TextBox;
