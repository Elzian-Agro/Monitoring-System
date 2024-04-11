import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from './index';
import '@testing-library/jest-dom';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { store } from 'utils/store'; // Import your store
import { updateEmail } from '../slice/emailSlice'; // Import the action you want to dispatch
import { errorType } from 'utils/constant';

jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual for all non-hook parts
  useDispatch: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // return the key itself as the translation
    i18n: { changeLanguage: jest.fn() },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

describe('ForgotPassword Component', () => {
  const mockSetPage = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    mockSetPage.mockClear();
    axios.post.mockClear();
    mockDispatch.mockClear();
  });

  const renderWithProviders = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  };

  // Helper function to simulate form submission
  const submitForm = (email) => {
    renderWithProviders(<ForgotPassword setPage={mockSetPage} />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: email } });
    fireEvent.click(screen.getByText('Continue'));
  };

  it('renders without crashing', () => {
    renderWithProviders(<ForgotPassword setPage={mockSetPage} />);
    expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
  });

  it('validates input before allowing form submission', () => {
    renderWithProviders(<ForgotPassword setPage={mockSetPage} />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const submitButton = screen.getByText('Continue');

    // Simulate blank input
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Please Enter a Valid Email Address!')).toBeInTheDocument();

    // Simulate entering an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Please Enter a Valid Email Address!')).toBeInTheDocument();
  });

  it('allows navigation back to the login page', () => {
    renderWithProviders(<ForgotPassword setPage={mockSetPage} />);
    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);
    expect(mockSetPage).toHaveBeenCalledWith('Login');
  });

  it('submits the form and handles successful response', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    submitForm('test@example.com');

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/auth/forget-password`, {
        email: 'test@example.com',
      });
      expect(mockDispatch).toHaveBeenCalledWith(updateEmail('test@example.com'));
      expect(mockSetPage).toHaveBeenCalledWith('ResetPassword');
    });
  });

  // Add tests for different error scenarios here
  it('handles "User Not Found" error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.userNotFound.code } } });
    submitForm('nonexistent@example.com');

    await waitFor(() => {
      expect(screen.getByText(errorType.userNotFound.message)).toBeInTheDocument();
    });
  });

  it('handles "User is blocked" error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.userBlocked.code } } });
    submitForm('blockeduser@example.com');

    await waitFor(() => {
      expect(screen.getByText(errorType.userBlocked.message)).toBeInTheDocument();
    });
  });

  it('handles "Server error" case', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.serverError.code } } });
    submitForm('servererror@example.com');
    await waitFor(() => {
      expect(screen.getByText(errorType.serverError.message)).toBeInTheDocument();
    });
  });

  it('handles "Network error" case for request failure', async () => {
    axios.post.mockRejectedValue({}); // Error without a response object
    submitForm('networkerror@example.com');
    await waitFor(() => {
      expect(screen.getByText('Network error! Please try again later')).toBeInTheDocument();
    });
  });
});
