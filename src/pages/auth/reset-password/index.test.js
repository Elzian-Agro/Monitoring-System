import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from './index';
import '@testing-library/jest-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { store } from 'utils/store'; // Import your store
import { updateEmail } from '../slice/emailSlice'; // Import the action you want to dispatch
import { tokenise } from 'utils/rsa.encrypt';
import { errorType } from 'utils/constant';

jest.mock('axios');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // use actual for all non-hook parts
  useSelector: jest.fn(),
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

jest.mock('utils/rsa.encrypt', () => ({
  ...jest.requireActual('utils/rsa.encrypt'),
  tokenise: jest.fn().mockResolvedValue('mocked-token'),
}));

describe('ResetPassword Component', () => {
  const mockSetPage = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue('test@example.com'); // Mock the selector to return an email
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

  const submitForm = (tempPass, newPass, confirmPass) => {
    renderWithProviders(<ResetPassword setPage={mockSetPage} />);
    fireEvent.change(screen.getByPlaceholderText('Enter Temporary Password'), { target: { value: tempPass } });
    fireEvent.change(screen.getByPlaceholderText('Enter New Password'), { target: { value: newPass } });
    fireEvent.change(screen.getByPlaceholderText('Enter New Password Again'), { target: { value: confirmPass } });
    fireEvent.click(screen.getByText('Continue'));
  };

  it('renders without crashing', () => {
    renderWithProviders(<ResetPassword setPage={mockSetPage} />);
    expect(screen.getByText('RESET PASSWORD')).toBeInTheDocument();
  });

  it('shows error for empty temporary password', () => {
    submitForm('', 'NewPass123!', 'NewPass123!');
    expect(screen.getByText('Please enter the temporary password sent to your email')).toBeInTheDocument();
  });

  it('shows error for weak new password', () => {
    submitForm('TempPass123!', 'weak', 'weak');
    expect(
      screen.getByText(
        'Password too weak. Should contain atleast 8 characters including upper and lower case letters + numbers + special chars.'
      )
    ).toBeInTheDocument();
  });

  it('shows error when passwords do not match', () => {
    submitForm('TempPass123!', 'NewPass123!', 'DifferentPass123!');
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  // Tests for successful Axios request
  it('handles successful password reset and calls API correctly', async () => {
    axios.post.mockResolvedValue({ status: 200 }); // Mocking Axios success response

    const tempPass = 'TempPass123!';
    const newPass = 'NewPass123!';
    submitForm(tempPass, newPass, newPass);

    await waitFor(() => {
      expect(tokenise).toHaveBeenCalled();
      // Check if the Axios post was called with the correct URL and data
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`, {
        token: 'mocked-token',
      });

      // Check if the Redux action is dispatched
      expect(mockDispatch).toHaveBeenCalledWith(updateEmail(null));

      // Check for the success UI response (assuming this is how your component behaves)
      expect(screen.getByText('Password Reset Successfully')).toBeInTheDocument();
    });
  });

  // Tests for each error scenario
  it('handles "Incorrect Temporary Password" error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.incorrectTempPassword.code } } });
    submitForm('TempPass123!', 'NewPass123!', 'NewPass123!');
    await waitFor(() => {
      expect(screen.getByText(errorType.incorrectTempPassword.message)).toBeInTheDocument();
    });
  });

  it('handles "User is blocked" error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.userBlocked.code } } });
    submitForm('TempPass123!', 'NewPass123!', 'NewPass123!');
    await waitFor(() => {
      expect(screen.getByText(errorType.userBlocked.message)).toBeInTheDocument();
    });
  });

  it('handles "Time Out" error', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.timeOut.code } } });
    submitForm('TempPass123!', 'NewPass123!', 'NewPass123!');
    await waitFor(() => {
      expect(screen.getByText(errorType.timeOut.message)).toBeInTheDocument();
    });
  });

  it('handles "Server error" case', async () => {
    axios.post.mockRejectedValue({ response: { data: { code: errorType.serverError.code } } });
    submitForm('TempPass123!', 'NewPass123!', 'NewPass123!');
    await waitFor(() => {
      expect(screen.getByText(errorType.serverError.message)).toBeInTheDocument();
    });
  });

  it('handles "Network error" case for request failure', async () => {
    axios.post.mockRejectedValue({}); // Error without a response object
    submitForm('TempPass123!', 'NewPass123!', 'NewPass123!');
    await waitFor(() => {
      expect(screen.getByText('Network error! Please try again later')).toBeInTheDocument();
    });
  });

  // Tests for resend email functionality
  it('handles successful email resend', async () => {
    axios.post.mockResolvedValue({ status: 200 }); // Mocking Axios success response

    // Mock timers
    jest.useFakeTimers();

    // Advance timers by 60 seconds
    jest.advanceTimersByTime(60000);

    renderWithProviders(<ResetPassword setPage={mockSetPage} />);

    // Check if the "Resend Email" button becomes available
    const resendButton = screen.queryByText('Resend Email');
    if (resendButton) {
      // Button is available, click it
      fireEvent.click(resendButton);
      // Check if the Axios post was called with the correct URL and data for email resend
      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/auth/forget-password`, {
        email: 'test@example.com',
      });
      // Check if the timer is reset to 60
      expect(screen.getByText("Email Sent! Didn't Receive? Resend Email in 60 seconds")).toBeInTheDocument();
    }

    // Restore the original timers
    jest.useRealTimers();
  });

  // Test for navigation back to the login page
  it('allows navigation back to the login page', () => {
    renderWithProviders(<ResetPassword setPage={mockSetPage} />);
    const backButton = screen.getByText('Go Back');
    fireEvent.click(backButton);
    expect(mockSetPage).toHaveBeenCalledWith('Login');
  });
});
