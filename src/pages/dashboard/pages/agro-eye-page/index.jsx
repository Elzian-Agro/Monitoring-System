import React, { useState } from 'react';
import { VariantButton } from '../../components/base/Button';
import { PlusIcon } from '@heroicons/react/24/outline';
import From from './agro-eye-form';
import Chart from './chart';
import Loader from '../../components/common/loader';
import useFetch from 'hooks/useFetch';
import { useTranslation } from 'react-i18next';

const AgroEye = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { t } = useTranslation();
  const {
    respond: widgets,
    recall,
    loader,
  } = useFetch({
    endpoint: 'widget',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });

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

      {loader && <Loader />}

      {!isFormVisible && !loader && (
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
          <div className='mt-10'>
            {widgets && widgets.length > 0 ? (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {widgets.map((widget, index) => (
                  <Chart key={index} widget={widget} />
                ))}
              </div>
            ) : (
              <div className='flex justify-center dark:text-white'>{t('Widgets not found')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgroEye;
