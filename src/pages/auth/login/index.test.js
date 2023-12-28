import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./index";

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
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

describe("Loging Component", () => {
  // Mock the setPage function
  const mockSetPage = jest.fn();

  it("renders without crashing", () => {
    render(<Login setPage={mockSetPage} />);
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });

  it("checks empty username before allowing form submission", () => {
    render(<Login setPage={mockSetPage} />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByText("Login");

    // Simulate blank username
    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(loginButton);
    expect(screen.getByText("emptyUsername")).toBeInTheDocument();
  });

  it("checks empty password before allowing form submission", () => {
    render(<Login setPage={mockSetPage} />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByText("Login");

    // Simulate blank password
    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(loginButton);
    expect(screen.getByText("emptyPassword")).toBeInTheDocument();
  });

  it("check loading status in login button", () => {
    render(<Login setPage={mockSetPage} />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const loginButton = screen.getByText("Login");

    // Simulate loading status
    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(loginButton);
    expect(screen.getByText("Logging in...")).toBeInTheDocument();
  });

  it("stores username and password in local storage when checkbox is clicked", () => {
    render(<Login setPage={mockSetPage} />);
    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const rememberCheckbox = screen.getByLabelText("Remember me");
    const loginButton = screen.getByText("Login");

    fireEvent.change(usernameInput, { target: { value: "testUsername" } });
    fireEvent.change(passwordInput, { target: { value: "testPassword" } });
    fireEvent.click(rememberCheckbox); // User checks the remember me
    fireEvent.click(loginButton);

    // Check if localStorage is updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "rememberedUsername",
      "testUsername"
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "rememberedPassword",
      "testPassword"
    );
  });

  it("allows navigation to the forget password page", () => {
    render(<Login setPage={mockSetPage} />);
    const linkForgetPassword = screen.getByText("Forgot Password?");
    fireEvent.click(linkForgetPassword);
    expect(mockSetPage).toHaveBeenCalledWith("ForgotPassword");
  });
});
