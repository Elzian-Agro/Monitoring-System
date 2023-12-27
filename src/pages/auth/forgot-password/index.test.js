import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "./index";
import "@testing-library/jest-dom";

describe("ForgotPassword Component", () => {
  // Mock the setPage function
  const mockSetPage = jest.fn();

  it("renders without crashing", () => {
    render(<ForgotPassword setPage={mockSetPage} />);
    expect(screen.getByText("FORGOT PASSWORD?")).toBeInTheDocument();
  });

  it("validates input before allowing form submission", () => {
    render(<ForgotPassword setPage={mockSetPage} />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const submitButton = screen.getByText("Continue");

    // Simulate blank input
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(
      screen.getByText("Please Enter a Valid Email Address!")
    ).toBeInTheDocument();

    // Simulate entering an invalid email
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(submitButton);
    expect(
      screen.getByText("Please Enter a Valid Email Address!")
    ).toBeInTheDocument();

    // Simulate entering a valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);
    expect(mockSetPage).toHaveBeenCalledWith("ResetPassword");
  });

  it("allows navigation back to the login page", () => {
    render(<ForgotPassword setPage={mockSetPage} />);
    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);
    expect(mockSetPage).toHaveBeenCalledWith("Login");
  });
});
