import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgroEye from './index';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

const mockedResponse = [
  {
    _id: '6625f5492151cfa14811e79e',
    userId: '659b88d3fcf416d1f89e79e8',
    name: 'Widget 01',
    chartType: 'line',
    devices: [
      {
        deviceId: 'ELZ-0001-01',
        factors: ['Temperature', 'Soil Moisture', 'Humidity', 'Gas Detection'],
        _id: '6625f5492151cfa14811e79f',
      },
    ],
    startDateTime: '2024-04-22T05:22:00.000Z',
    endDateTime: '2024-04-22T06:30:00.000Z',
    timeGap: 300000,
    order: 2,
    isDeleted: false,
    sensorData: [
      {
        'ELZ-0001-01': [
          {
            timestamp: '2024-04-22T05:22:00.000Z',
            Temperature: 24.1,
            'Soil Moisture': 603,
            Humidity: 14.5,
            'Gas Detection': 894,
          },
          {
            timestamp: '2024-04-22T05:27:00.000Z',
            Temperature: 32.6,
            'Soil Moisture': 481.8,
            Humidity: 49.2,
            'Gas Detection': 694.2,
          },
        ],
      },
    ],
  },
  {
    _id: '663112abaa27807729ff7399',
    userId: '659b88d3fcf416d1f89e79e8',
    name: 'Widget 02',
    chartType: 'bar',
    devices: [
      {
        deviceId: 'ELZ-0001-01',
        factors: ['Temperature', 'Soil Moisture'],
        _id: '663112abaa27807729ff739a',
      },
    ],
    startDateTime: '2024-04-22T05:20:00.000Z',
    endDateTime: '2024-04-22T06:30:00.000Z',
    timeGap: 300000,
    order: 1,
    isDeleted: false,
    sensorData: [
      {
        'ELZ-0001-01': [
          {
            timestamp: '2024-04-22T05:25:00.000Z',
            Temperature: 25,
            'Soil Moisture': 526,
          },
        ],
      },
    ],
  },
];

// Mock react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Mock useAxios
jest.mock('hooks/useAxios', () => () => ({
  loading: false,
  send: jest.fn().mockResolvedValue(mockedResponse),
}));

jest.mock('hooks/useFetch', () => () => ({
  isLoading: false,
  response: mockedResponse,
  recall: jest.fn().mockReturnValue(null),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key, // Mock translation function
    };
  },
}));

describe('AgroEye Page', () => {
  it('renders user data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AgroEye />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Add New')).toBeInTheDocument();

    expect(screen.getAllByText('Widget 01').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Widget 02').length).toBeGreaterThan(0);

    expect(screen.getAllByText('ELZ-0001-01 Temperature').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ELZ-0001-01 Humidity').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ELZ-0001-01 Soil Moisture').length).toBeGreaterThan(0);
  });
});
