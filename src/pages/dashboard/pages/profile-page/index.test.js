import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import UserProfilePage from './index';
import { MemoryRouter } from 'react-router-dom';

// Mock user data
const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  nic: '123456789V',
  phoneNum: '123456789',
  userType: 'Admin',
  orgName: 'Example Organization',
  _id: '1234567890',
  userBio: 'I am a farmer',
  address: '123 Example Street, Example City, Example Country',
  profileImage: 'https://example.com/profile.jpg',
  isVerified: 'Verified',
};

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock useAxios
jest.mock('hooks/useAxios', () => () => ({
  loading: false,
  send: jest.fn().mockResolvedValue(mockUserData),
}));

jest.mock('hooks/useFetch', () => () => ({
  isLoading: false,
  response: mockUserData,
  recall: jest.fn().mockReturnValue(null),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key, // Mock translation function
    };
  },
}));

// Mock react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Profile Page', () => {
  it('renders user data correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProfilePage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('I am a farmer')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders buttons', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProfilePage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Disable')).toBeInTheDocument();
  });

  it('opens update form when update button clicked', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProfilePage />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(screen.getByText('UPDATE YOUR DETAILS HERE')).toBeInTheDocument();
    });
  });

  it('opens confirmation box when disable button clicked and handle confirmation YES', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProfilePage />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText('Disable'));

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to disable this account?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('YES'));

    await waitFor(() => {
      expect(screen.getByText('Disabled successfully')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('OK'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('opens confirmation box when disable button clicked and handle confirmation NO', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <UserProfilePage />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText('Disable'));

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to disable this account?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('NO'));

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
