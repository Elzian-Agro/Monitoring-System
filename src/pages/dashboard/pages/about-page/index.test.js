import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUsPage from './index';
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
    render(
      <MemoryRouter>
        <AboutUsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('ELZIAN AGRO')).toBeInTheDocument();
    expect(screen.getByText('Go To Elzian Agro')).toBeInTheDocument();

    const logo = screen.getByAltText('Elzian Agro logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'logo.png');
  });
});
