import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import WeatherStation from './index';

// Mocked current weather response
const mokedCurrentWeather = [
  {
    _id: '675fb087b18597a3c1be2b32',
    deviceId: 'ELZ-0003-01',
    temperature: 29.8,
    humidity: 61,
    rainfall: 7538,
    wind_speed: 31,
    wind_direction: 180,
    light: 264,
    dateTime: '2024-12-16T04:45:59.916Z',
  },
  {
    _id: '675fb087b18597a3c1be2b32',
    deviceId: 'ELZ-0003-02',
    temperature: 30.8,
    humidity: 50,
    rainfall: 7540,
    wind_speed: 40,
    wind_direction: 90,
    light: 104,
    dateTime: '2024-12-16T04:45:59.916Z',
  },
];

// Mock useFetch
jest.mock('hooks/useFetch', () => () => ({
  loading: false,
  response: mokedCurrentWeather,
  recall: jest.fn().mockReturnValue(null),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Weather Station Page', () => {
  beforeEach(() => {
    const useSelectorMock = require('react-redux').useSelector;
    useSelectorMock.mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes('state => state.user.userType')) {
        return 'admin'; // Mocking userType as 'admin'
      }
      return {};
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Check page render properly
  it('page render correctly', async () => {
    render(
      <MemoryRouter>
        <WeatherStation />
      </MemoryRouter>
    );

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check current weather component
    expect(screen.getByText('CURRENT WEATHER')).toBeInTheDocument();
    expect(screen.getByText(currentTime)).toBeInTheDocument();

    // Check history weather component
    expect(screen.getByText('HISTORY WEATHER')).toBeInTheDocument();
  });
});
