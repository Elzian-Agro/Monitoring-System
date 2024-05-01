import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import DashboardPage from './index';
import { MemoryRouter } from 'react-router-dom';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
    };
  },
}));

describe('About US Page', () => {
  it('renders user data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Weather Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Weather Prediction')).toBeInTheDocument();
    expect(screen.getByText('Disaster Alert')).toBeInTheDocument();
    expect(screen.getByText('Farmers Info Hub')).toBeInTheDocument();
  });
});
