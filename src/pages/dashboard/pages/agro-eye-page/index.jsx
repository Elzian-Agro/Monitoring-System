import React, { useState, useEffect } from 'react';
import { IconButton, VariantButton } from '../../components/base/Button';
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import From from './agro-eye-form';
import Chart from './chart';
import Loader from '../../components/common/loader';
import Modal from 'components/common/modal';
import useFetch from 'hooks/useFetch';
import useAxios from 'hooks/useAxios';
import { useTranslation } from 'react-i18next';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const AgroEye = () => {
  const [message, setMessage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const { t } = useTranslation();
  const { send } = useAxios();
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
  const sensors = useSensors(useSensor(PointerSensor));
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (widgets && widgets.length > 0) {
      const ids = widgets.map((widget) => widget._id);
      setItems(ids);
    }
  }, [widgets]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Handle confiation and delete
  const handleConfirmationAndDelete = async (result) => {
    if (result) {
      const response = await send({
        endpoint: `widget/delete/${selectedWidget._id}`,
        method: 'PUT',
        body: { isDeleted: true },
      });
      setIsConfirmVisible(false);
      if (response) {
        setMessage('Widget deleted successfully');
        setIsAlertVisible(true);
        recall();
      }
    }
    setSelectedWidget(null);
    setIsConfirmVisible(false);
  };

  return (
    <div className='mx-5 mt-2'>
      {isFormVisible && (
        <From
          visible={isFormVisible}
          widget={selectedWidget}
          onClose={() => {
            setSelectedWidget(null);
            setIsFormVisible(false);
          }}
          formSubmission={async (message) => {
            setSelectedWidget(null);
            setMessage(message);
            setIsAlertVisible(true);
            recall();
          }}
        />
      )}

      {loader && <Loader />}

      {!isFormVisible && !loader && (
        <div className='flex flex-col shadow-lg bg-white dark:bg-secondary-dark-bg rounded-lg p-6'>
          <div className='flex justify-end'>
            <VariantButton
              text='Add New'
              Icon={PlusIcon}
              onClick={() => {
                setIsFormVisible(true);
              }}
            />
          </div>

          <div className='mt-6'>
            {widgets && widgets.length > 0 ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((id) => {
                      // Find the widget with the corresponding id
                      const widget = widgets.find((widget) => widget._id === id);

                      return (
                        <div>
                          <div className='bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-800 shadow-md shadow-black/5 p-1 w-full'>
                            <div className='flex justify-end gap-2 mr-2 py-2'>
                              <IconButton
                                color='text-blue-600'
                                Icon={PencilSquareIcon}
                                onClick={() => {
                                  setSelectedWidget(widget);
                                  setIsFormVisible(true);
                                }}
                              />
                              <IconButton
                                color='text-red-600'
                                Icon={TrashIcon}
                                onClick={() => {
                                  setSelectedWidget(widget);
                                  setIsConfirmVisible(true);
                                }}
                              />
                            </div>
                            <Chart key={id} id={id} widget={widget} />
                          </div>
                        </div>
                      );
                    })}
                  </SortableContext>
                </div>
              </DndContext>
            ) : (
              <div className='flex justify-center dark:text-white'>{t('Widgets not found')}</div>
            )}
          </div>
        </div>
      )}
      <Modal
        isOpen={isConfirmVisible}
        message='Are you sure want to delete?'
        onClose={(result) => handleConfirmationAndDelete(result)}
        type='confirmation'
      />
      <Modal
        isOpen={isAlertVisible}
        message={`${message}`}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />
    </div>
  );
};

export default AgroEye;
