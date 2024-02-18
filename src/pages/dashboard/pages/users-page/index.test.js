import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManageUsers from './index';
import { act } from 'react-dom/test-utils'; // Import act
import { downloadCSV } from '../../utils/download';

const mockedResponse = [
  {
    _id: '65c09878dc850e48b6121d95',
    firstName: 'matheesha',
    lastName: 'prabhath',
    email: 'matheesha@gmail.com',
    nic: '990470979V',
    orgName: 'Elzian',
    phoneNum: 761111111,
    userType: 'farmer',
    isDisabled: false,
    address: 'No 1, Colombo',
  },
  {
    _id: '65c267723262b9d512f24b63',
    firstName: 'dev',
    lastName: 'esk',
    email: 'devsk@gmail.com',
    nic: '789654121V',
    orgName: 'dev',
    phoneNum: 789632145,
    userType: 'farmer',
    isDisabled: false,
    address: 'No 1, Colombo',
  },
  {
    _id: '65c2717c3262b9d512f2b011',
    firstName: 'tkdsa',
    lastName: 'des',
    email: 'tkdka@gmail.com',
    nic: '784596321458',
    orgName: 'tkd',
    phoneNum: 789632145,
    userType: 'farmer',
    isDisabled: false,
    address: 'No 1, Colombo',
  },
];

// Mock Redux and useAxios hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock('hooks/useAxios', () => () => ({
  loading: false,
  send: jest.fn().mockResolvedValue(mockedResponse),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key, // Mock translation function
    };
  },
}));

jest.mock('../../utils/download', () => ({
  downloadCSV: jest.fn(),
}));

describe('ManageUsers Component', () => {
  it('fetches users on component mount', async () => {
    await act(async () => {
      // Wrap the rendering and the subsequent operations in act
      render(<ManageUsers />);
    });

    await waitFor(() => {
      // Your assertion here. Example:
      expect(screen.getByText('FIRST NAME')).toBeInTheDocument();
    });
  });

  // For other operations that involve user interaction:
  it('opens form modal when Add User is clicked', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    await act(async () => {
      const addButton = screen.getByText('Add User');
      addButton.click(); // Assuming this triggers state updates
    });

    await waitFor(() => {
      // Assertions can be outside act if they happen after all state updates are done
      expect(screen.getByText('Submit')).toBeInTheDocument(); // Assuming your form has a Close button
    });
  });

  it('triggers download CSV on button click', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    // Verify that the downloadCSV function was called
    expect(downloadCSV).toHaveBeenCalled();
  });

  it('search users correctly', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    await act(async () => {
      // Simulate typing into the search box
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'dev' } });
    });

    await waitFor(() => {
      // Assuming the display logic for users includes showing the email
      expect(screen.getByText('devsk@gmail.com')).toBeInTheDocument();
      expect(screen.queryByText('matheesha@gmail.com')).not.toBeInTheDocument(); // Not visible because of filtering
    });
  });

  it('displays a no results message when the search yields no matches', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    // Perform a search that will yield no results
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'nonexistentuser' } });

    await waitFor(() => {
      expect(screen.getByText('There are no records to display')).toBeInTheDocument();
    });
  });

  it('shows confirmation modal on delete and deletes user on confirm', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    // Click the delete button of the first user
    const deleteButtons = screen.getAllByText('Delete'); // Assuming there's a Delete button text per user
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      // Check if the confirmation modal is displayed
      expect(screen.getByText('Are you sure want to delete?')).toBeInTheDocument();
    });

    // Simulate user confirming the deletion
    await act(async () => {
      fireEvent.click(screen.getByText('YES')); // Assuming your confirmation modal has a Yes button
    });

    await waitFor(() => {
      // Assuming an alert is shown after deletion
      expect(screen.getByText('User deleted successfully')).toBeInTheDocument();
    });
  });

  it('opens edit form with selected user data on Edit button click and edits user on confirm', async () => {
    await act(async () => {
      render(<ManageUsers />);
    });

    // Assuming your users are rendered and there is an "Edit" button for each
    const editButtons = screen.getAllByText('Edit');
    expect(editButtons[0]).toBeInTheDocument();

    // Simulate clicking the first "Edit" button
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      // Check if the form modal is visible with the expected user data
      // This might require inspecting form fields to see if they contain the user's information
      const updateButton = screen.getByText('Update');
      fireEvent.click(updateButton);
    });

    await waitFor(() => {
      expect(screen.getByText('User details updated successfully')).toBeInTheDocument();
    });
  });
});
