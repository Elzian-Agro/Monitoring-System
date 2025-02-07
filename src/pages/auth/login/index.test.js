import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../components/common/container';
import axios from 'axios';
import { store } from 'utils/store';
import { tokenise } from 'utils/rsa.encrypt';
import { errorType } from 'utils/constant';

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

jest.mock('utils/rsa.encrypt', () => ({
  ...jest.requireActual('utils/rsa.encrypt'),
  tokenise: jest.fn().mockResolvedValue('mocked-token'),
}));

describe('LoginPage Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  const renderWithProviders = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  };

  const setupLoginForm = () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Login');
    return { emailInput, passwordInput, loginButton };
  };

  it('renders the login form by default', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('navigates to Forgot Password page', () => {
    renderWithProviders(<LoginPage />);

    const forgotPasswordLink = screen.getByText('Forgot Password?');

    fireEvent.click(forgotPasswordLink);
    expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
  });

  it('handles email and password input correctly', () => {
    const { emailInput, passwordInput } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('checks user inputs before allowing form submission', () => {
    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    // Simulate blank email
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please enter the credentials')).toBeInTheDocument();

    // Simulate invalid email
    fireEvent.change(emailInput, { target: { value: 'invalidemail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456789' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please Enter a Valid Email Address!')).toBeInTheDocument();

    // Simulate blank password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);
    expect(screen.getByText('Please enter the credentials')).toBeInTheDocument();
  });

  it('toggles the "Remember me" checkbox', () => {
    renderWithProviders(<LoginPage />);

    const rememberMeCheckbox = screen.getByLabelText('Remember me');

    // Simulate click checkbox
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox.checked).toBe(true);
  });

  it('displays error message for invalid credentials', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.invalidCredentials.code } } });

    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(tokenise).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        token: 'mocked-token',
      });
      expect(screen.getByText(errorType.invalidCredentials.message)).toBeInTheDocument();
    });
  });

  it('displays error message for time out', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.timeOut.code } } });

    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorType.timeOut.message)).toBeInTheDocument();
    });
  });

  it('displays error message for server error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.serverError.code } } });
    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(errorType.serverError.message)).toBeInTheDocument();
    });
  });

  it('display error message for network error', async () => {
    axios.post.mockRejectedValue({}); // Error without a response object

    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Network error! Please try again later')).toBeInTheDocument();
    });
  });

  it('sucssesfull login', async () => {
    axios.post.mockResolvedValue({
      data: {
        accessToken: 'mocked-access-token',
        refreshToken: 'mocked-refresh-token',
      },
    });

    const { emailInput, passwordInput, loginButton } = setupLoginForm();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(tokenise).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        token: 'mocked-token',
      });
      expect(localStorage.getItem('jwtAccessToken')).toBe('mocked-access-token');
      expect(localStorage.getItem('jwtRefreshToken')).toBe('mocked-refresh-token');
    });
  });
});
