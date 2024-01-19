import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './index'; // Update the path to your component
import axios from 'axios';
import { store } from 'store/store'; // Import your store

jest.mock('axios');

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key, // return the key itself as the translation
      i18n: { changeLanguage: jest.fn() },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    axios.mockClear();
  });

  const renderWithProviders = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  };

  it('renders the login form by default', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('navigates to Forgot Password page', () => {
    renderWithProviders(<LoginPage />);

    // Assuming 'Forgot Password?' is a button or link in your component
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    fireEvent.click(forgotPasswordLink);

    // Adjust this to match the text/content you expect to see in Forgot Password page
    expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
  });

});
