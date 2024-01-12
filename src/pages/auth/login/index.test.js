import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from './index';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

describe('Loging Component', () => {
  // Mock the setPage function
  const mockSetPage = jest.fn();

  it('renders without crashing', () => {
    render(<Login setPage={mockSetPage} />);
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('allows navigation to the forget password page', () => {
    render(<Login setPage={mockSetPage} />);
    const linkForgetPassword = screen.getByText('Forgot Password?');
    fireEvent.click(linkForgetPassword);
    expect(mockSetPage).toHaveBeenCalledWith('ForgotPassword');
  });

  it('handles email and password input correctly', () => {
    render(<Login setPage={mockSetPage} />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('checks user inputs before allowing form submission', () => {
    render(<Login setPage={mockSetPage} />);
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
    render(<Login setPage={mockSetPage} />);

    const rememberMeCheckbox = screen.getByLabelText('Remember me');

    fireEvent.click(rememberMeCheckbox);

    expect(rememberMeCheckbox.checked).toBe(true);
  });
});
