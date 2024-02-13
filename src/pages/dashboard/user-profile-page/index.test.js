import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserProfilePage from './index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userSlice from '../slice/userSlice';
import { MemoryRouter } from 'react-router-dom';

const mockUserData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  nic: '123456789V',
  phoneNum: '123456789',
  userType: 'Admin',
  orgName: 'Example Organization',
  _id: '1234567890',
  userBio: 'Lorem ipsum dolor sit amet.',
  address: '123 Example Street, Example City, Example Country',
  profileImage: 'https://example.com/profile.jpg',
};

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key, // Mock translation function
    };
  },
}));

const mockStore = createStore(userSlice, {
  user: mockUserData,
});

describe('UserProfilePage component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/user-profile-page']}>
        <Provider store={mockStore}>
          <UserProfilePage />
        </Provider>
      </MemoryRouter>
    );
  });

  test('renders user data correctly', () => {
    const userFullName = screen.getByText('John Doe');
    expect(userFullName).toBeInTheDocument();

    const userTypeText = screen.getByText('Admin');
    expect(userTypeText).toBeInTheDocument();

    const emailText = screen.getByText('john.doe@example.com');
    expect(emailText).toBeInTheDocument();

    const orgText = screen.getByText('Example Organization');
    expect(orgText).toBeInTheDocument();

    const nicText = screen.getByText('123456789V');
    expect(nicText).toBeInTheDocument();

    const phoneText = screen.getByText('123456789');
    expect(phoneText).toBeInTheDocument();

    const userBioText = screen.getByText('Lorem ipsum dolor sit amet.');
    expect(userBioText).toBeInTheDocument();

    const addressText = screen.getByText('123 Example Street, Example City, Example Country');
    expect(addressText).toBeInTheDocument();

    const imgElement = screen.getByAltText('Profile');
    expect(imgElement).toHaveAttribute('src', 'https://example.com/profile.jpg');
  });

  test('renders Update button', () => {
    const updateButton = screen.getByText('Update');
    expect(updateButton).toBeInTheDocument();
  });

  test('renders Disable button', () => {
    const disableButton = screen.getByText('Disable');
    expect(disableButton).toBeInTheDocument();
  });
});
