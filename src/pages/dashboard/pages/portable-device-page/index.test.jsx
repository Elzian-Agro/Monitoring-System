import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import PortableDevice from './index';
import { MemoryRouter } from 'react-router-dom';

const mockedResponse = [
  {
    _id: '669f4bdd4e22190874f5aa61',
    deviceId: 'ELZ-0002-01',
    location: 'MATARA',
    gpsValues: {
      latitude: 5.94782,
      longitude: 80.548291,
      _id: '669f4bdd4e22190874f5aa62',
    },
    nitrogen: 0.1,
    phosphorus: 0.2,
    potassium: 0.1,
    ph: 7,
    soil_moisture: 45,
    electric_conductivity: 0.5,
    soil_temperature: 30,
  },
  {
    _id: '669f4bdd4e22190874f5aa5d',
    deviceId: 'ELZ-0002-02',
    location: 'MATARA',
    gpsValues: {
      latitude: 5.94782,
      longitude: 80.548291,
      _id: '669f4bdd4e22190874f5aa62',
    },
    nitrogen: 0.1,
    phosphorus: 0.2,
    potassium: 0.1,
    ph: 7,
    soil_moisture: 45,
    electric_conductivity: 0.5,
    soil_temperature: 30,
  },
];

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
    };
  },
}));

// Mock Redux and useAxios hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock('hooks/useFetch', () => () => ({
  loading: false,
  response: mockedResponse,
  recall: jest.fn().mockReturnValue(null),
}));

describe('Portable Device Page', () => {
  it('renders data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PortableDevice />
        </MemoryRouter>
      );
    });
  });
});
