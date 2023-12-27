import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./index";
import "@testing-library/jest-dom";

describe("LoginPage Component", () => {
  it("renders without crashing", () => {
    render(<LoginPage />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("displays the Login form by default", () => {
    render(<LoginPage />);
    expect(screen.getByText("LOG IN TO YOUR DASHBOARD")).toBeInTheDocument();
  });

  it("switches to ForgotPassword form on interaction", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Forgot Password?"));
    expect(
      screen.getByText("ENTER YOUR EMAIL FOR THE VERIFICATION PROCESS")
    ).toBeInTheDocument();
  });

  it("switches to ResetPassword form on interaction", () => {
    render(<LoginPage />);

    // Trigger the switch to the ForgotPassword form
    fireEvent.click(screen.getByText("Forgot Password?"));

    // Simulate entering a valid email
    const emailInput = screen.getByPlaceholderText("Enter your email"); // Replace with the actual placeholder text of your email input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Submit the form in ForgotPassword to trigger the switch to ResetPassword
    fireEvent.click(screen.getByText("Continue")); // Replace with the actual text of your submit button in ForgotPassword

    // Check if the ResetPassword form is displayed
    expect(
      screen.getByText("TEMPORARY PASSWORD HAS BEEN SENT TO YOUR EMAIL")
    ).toBeInTheDocument();
  });

  it("returns to Login form from ResetPassword form", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Forgot Password?"));
    fireEvent.click(screen.getByText("Continue")); 
    fireEvent.click(screen.getByText("Go Back"));
    expect(screen.getByText("LOG IN TO YOUR DASHBOARD")).toBeInTheDocument();
  });
});
