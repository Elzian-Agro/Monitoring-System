import React, { useState } from 'react';
import { VariantButton } from '../../components/base/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import From from './agro-eye-form';
import Chart from './chart';

const AgroEye = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className='mx-5 mt-2'>
      {isFormVisible && (
        <From
          onClose={() => {
            setIsFormVisible(false);
          }}
          visible={isFormVisible}
        />
      )}

      {!isFormVisible && (
        <div className='flex flex-col shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg p-8'>
          <div className='flex justify-end'>
            <VariantButton
              text='Add New'
              Icon={PlusIcon}
              onClick={() => {
                setIsFormVisible(true);
              }}
            />
          </div>
          <div>
            <Chart />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgroEye;
