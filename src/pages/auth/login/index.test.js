import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../components/common/container';
import axios from 'axios';
import { store } from 'store/store';

jest.mock('axios');

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
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

  it('handles email and password input correctly', () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('checks user inputs before allowing form submission', () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Login');

    // Simulate blank email
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please enter the email')).toBeInTheDocument();

    // Simulate invalid email
    fireEvent.change(emailInput, { target: { value: 'invalidemail.com' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please Enter a Valid Email Address!')).toBeInTheDocument();

    // Simulate blank password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please enter the password')).toBeInTheDocument();
  });

  it('toggles the "Remember me" checkbox', () => {
    renderWithProviders(<LoginPage />);

    const rememberMeCheckbox = screen.getByLabelText('Remember me');

    // Simulate click checkbox
    fireEvent.click(rememberMeCheckbox);

    expect(rememberMeCheckbox.checked).toBe(true);
  });
});
