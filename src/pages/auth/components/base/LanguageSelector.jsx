import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  // State to hold the selected language
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  // Language options
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'si', label: 'සිංහල' },
    { value: 'ta', label: 'தமிழ்' },
  ];

  // Handle language change
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className='max-w-xs text-[14px] text-normal text-[#212121] font-zenkaku'>
      <select
        className='block w-full px-4 py-2 mt-2 bg-[#F9F9FA] border border-gray-300 rounded-md shadow-sm outline-none'
        value={selectedLanguage}
        onChange={handleLanguageChange}>
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
