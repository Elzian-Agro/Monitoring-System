import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherComponent from './index';
import { MemoryRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
    };
  },
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

// Mock useAxios
jest.mock('hooks/useAxios', () => () => ({
  loading: false,
  send: jest.fn().mockResolvedValueOnce({ code: 14015, message: 'Profile updated successfully' }),
}));

// Mock Axios GET request
jest.mock('axios', () => ({
  get: jest.fn((url) => {
    if (url.includes('geo')) {
      // Mock response for location data
      return Promise.resolve({
        data: [
          {
            name: 'Mock City',
            state: 'Mock State',
            country: 'Mock Country',
          },
        ],
      });
    } else if (url.includes('forecast')) {
      // Mock response for weather data
      return Promise.resolve({
        data: {
          list: [
            {
              dt_txt: '2024-05-10 12:00:00',
              main: {
                temp: 20,
                feels_like: 18,
                humidity: 50,
                pressure: 1015,
              },
              wind: {
                speed: 3,
                deg: 180,
              },
              visibility: 10000,
              weather: [
                {
                  description: 'clear sky',
                  icon: '01d',
                },
              ],
            },
          ],
        },
      });
    }
  }),
}));

describe('Weather Page', () => {
  it('renders weather data correctly', async () => {
    // Mock user location data and theme
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          location: {
            latitude: 123.45,
            longitude: 67.89,
          },
        },
        dashboardLayout: {
          theme: '',
        },
      })
    );

    render(
      <MemoryRouter>
        <WeatherComponent />
      </MemoryRouter>
    );

    // Find Add new widgets button
    expect(screen.getByText('Change')).toBeInTheDocument();

    // Check if the location is rendered correctly
    await waitFor(() => {
      expect(screen.getByText('Mock City, Mock State, Mock Country')).toBeInTheDocument();
    });
  });

  it('opens form when change button is clicked', async () => {
    render(
      <MemoryRouter>
        <WeatherComponent />
      </MemoryRouter>
    );

    // Simulate change button click
    fireEvent.click(screen.getByText('Change'));

    // Hide the "Change" button and display form
    await waitFor(() => {
      expect(screen.queryByText('Change')).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Latitude')).toBeInTheDocument();
    });

    // Simulate form submission by clicking submit button
    fireEvent.click(screen.getByText('Submit'));

    // Display the "Change" button and hide form
    await waitFor(() => {
      expect(screen.getByText('Change')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText('Latitude')).not.toBeInTheDocument();
    });
  });
});
