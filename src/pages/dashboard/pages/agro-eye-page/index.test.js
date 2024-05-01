import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AgroEye from './index';
import { MemoryRouter } from 'react-router-dom';
import { messages } from 'utils/constant';

const mockedWidgets = [
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
  send: jest.fn().mockResolvedValue(mockedWidgets),
}));

// Mock useFetch
jest.mock('hooks/useFetch', () => () => ({
  isLoading: false,
  response: mockedWidgets,
  recall: jest.fn().mockReturnValue(null),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
    };
  },
}));

describe('AgroEye Page', () => {
  it('renders widget data correctly', async () => {
    render(
      <MemoryRouter>
        <AgroEye />
      </MemoryRouter>
    );

    // Find Add new widgets button
    expect(screen.getByText('Add New')).toBeInTheDocument();

    // Find the widgets
    expect(screen.getAllByText('Widget 01').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Widget 02').length).toBeGreaterThan(0);

    // Find the device factors
    expect(screen.getAllByText('ELZ-0001-01 Temperature').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ELZ-0001-01 Humidity').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ELZ-0001-01 Soil Moisture').length).toBeGreaterThan(0);
  });

  it('opens widget form  when Add New button is clicked', async () => {
    render(
      <MemoryRouter>
        <AgroEye />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Add New'));

    // Wait for load widget form
    await waitFor(() => {
      expect(screen.getByText('NEW WIDGET CREATION')).toBeInTheDocument();
    });

    // Simulate Submit form
    fireEvent.click(screen.getByText('Submit'));

    // Assuming an alert is shown after creating
    await waitFor(() => {
      expect(screen.getByText(messages.widgetCreated)).toBeInTheDocument();
    });
  });

  it('opens update form when update button is clicked', async () => {
    render(
      <MemoryRouter>
        <AgroEye />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTestId('update-button')[0]);

    // Wait for widget form open
    await waitFor(() => {
      expect(screen.getByText('UPDATE WIDGET DETAILS')).toBeInTheDocument();
    });

    // Simulate update form
    fireEvent.click(screen.getByText('Update'));

    // Assuming an alert is shown after updating
    await waitFor(() => {
      expect(screen.getByText(messages.widgetUpdated)).toBeInTheDocument();
    });
  });

  it('opens confirmation modal when delete button is clicked and confirms deletion', async () => {
    render(
      <MemoryRouter>
        <AgroEye />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTestId('delete-button')[0]);

    await waitFor(() => {
      expect(screen.getByText(messages.confirmDelete)).toBeInTheDocument();
    });

    // Simulate user confirming the deletion
    fireEvent.click(screen.getByText('YES'));

    await waitFor(() => {
      // Assuming an alert is shown after deletion
      expect(screen.getByText(messages.widgetDeleted)).toBeInTheDocument();
    });
  });
});
