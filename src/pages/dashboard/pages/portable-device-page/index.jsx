import React, { useState } from 'react';
import useFetch from 'hooks/useFetch';
import useAxios from 'hooks/useAxios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IconButton } from '../../components/base/Button';
import { TrashIcon } from '@heroicons/react/24/outline';
import Modal from 'components/common/modal';
import { messages } from 'utils/constant';
import Loader from '../../components/common/loader';

// Create custom icon using Leaflet's Icon class
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PortableDevice = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedPortableData, setSelectedPortableData] = useState(null);
  const { send } = useAxios();

  const {
    response: soilData,
    recall,
    isLoading,
  } = useFetch({
    endpoint: 'portable-device',
    method: 'GET',
    call: 1,
    requestBody: {},
    dependency: [],
  });

  // Handle confiation and delete
  const handleConfirmationAndDelete = async (result) => {
    if (result) {
      const response = await send({
        endpoint: `portable-device/${selectedPortableData._id}`,
        method: 'DELETE',
        body: { isDeleted: true },
      });
      setIsConfirmVisible(false);
      if (response) {
        recall();
        setIsAlertVisible(true);
      }
    }
    setSelectedPortableData(null);
    setIsConfirmVisible(false);
  };

  return (
    <div className='mx-5 mt-2'>
      {isLoading && <Loader />}

      {!isLoading && (
        <MapContainer center={[7.555494, 80.713784]} zoom={8} className='w-full h-[90vh]'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <div>
            {soilData?.map((data, index) => (
              <Marker key={index} position={[data.gpsValues.latitude, data.gpsValues.longitude]} icon={redIcon}>
                <Popup>
                  <div>
                    <p className='text-blue-400'>
                      <span>{data.location}</span>
                      <br />
                      <span>
                        {data.gpsValues.latitude}, {data.gpsValues.longitude}
                      </span>
                    </p>
                    <p>
                      <span>Nitrogen: {data.nitrogen} mg/kg</span>
                      <br />
                      <span>Phosphorus: {data.phosphorous} mg/kg</span>
                      <br />
                      <span>Potassium: {data.potassium} mg/kg</span>
                      <br />
                      <span>pH: {data.ph}</span>
                      <br />
                      <span>Soil Moisture: {data.soil_moisture} %RH</span>
                      <br />
                      <span>Electric Conductivity: {data.elec_conductivity} us/cm</span>
                      <br />
                      <span>Soil Temperature: {data.soil_temperature} °C</span>
                    </p>
                    <div className='flex flex-row justify-between'>
                      <p className='text-gray-400'>
                        <span>{data.deviceId}</span>
                      </p>
                      <IconButton
                        testid='delete-button'
                        color='text-red-600'
                        Icon={TrashIcon}
                        onClick={() => {
                          setSelectedPortableData(data);
                          setIsConfirmVisible(true);
                        }}
                      />
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </div>
        </MapContainer>
      )}

      <Modal
        isOpen={isConfirmVisible}
        message={messages.confirmDelete}
        onClose={(result) => handleConfirmationAndDelete(result)}
        type='confirmation'
      />
      <Modal
        isOpen={isAlertVisible}
        message={messages.portableDeviceDataDeleted}
        onClose={() => {
          setIsAlertVisible(false);
        }}
        type='alert'
      />
    </div>
  );
};

export default PortableDevice;
