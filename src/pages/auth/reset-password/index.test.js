import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassword from "./index"; 
import "@testing-library/jest-dom";

describe("ResetPassword Component", () => {
  const mockSetPage = jest.fn();

  const setup = () => {
    render(<ResetPassword setPage={mockSetPage} />);
    const tempPassInput = screen.getByPlaceholderText(
      "Enter Temporary Password"
    );
    const newPasswordInput = screen.getByPlaceholderText("Enter New Password");
    const confirmPassInput = screen.getByPlaceholderText(
      "Enter New Password Again"
    );
    const submitButton = screen.getByText("Continue");
    return { tempPassInput, newPasswordInput, confirmPassInput, submitButton };
  };

  it("renders without crashing", () => {
    setup();
    expect(screen.getByText("RESET PASSWORD")).toBeInTheDocument();
  });

  it("shows an error for empty temporary password", () => {
    const { submitButton } = setup();
    fireEvent.click(submitButton);
    expect(screen.getByText("Invalid Field Input")).toBeInTheDocument();
  });

  it("shows an error for weak new password", () => {
    const { tempPassInput, newPasswordInput, confirmPassInput, submitButton } = setup();
    fireEvent.change(tempPassInput, { target: { value: "validTempPass" } });
    fireEvent.change(newPasswordInput, { target: { value: "weak" } });
    fireEvent.change(confirmPassInput, {target: { value: "weak" } });
    fireEvent.click(submitButton);
    expect(
      screen.getByText(
        "Password too weak. At least 8 letters or numbers + special chars."
      )
    ).toBeInTheDocument();
  });

  it("shows an error when new password and confirmation do not match", () => {
    const { tempPassInput, newPasswordInput, confirmPassInput, submitButton } =
      setup();
    fireEvent.change(tempPassInput, { target: { value: "validTempPass" } });
    fireEvent.change(newPasswordInput, {
      target: { value: "ValidNewPass123!" },
    });
    fireEvent.change(confirmPassInput, {
      target: { value: "DifferentNewPass123!" },
    });
    fireEvent.click(submitButton);
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

//   it("submits the form with valid data", () => {
//     const { tempPassInput, newPasswordInput, confirmPassInput, submitButton } =
//       setup();
//     fireEvent.change(tempPassInput, { target: { value: "validTempPass" } });
//     fireEvent.change(newPasswordInput, {
//       target: { value: "ValidNewPass123!" },
//     });
//     fireEvent.change(confirmPassInput, {
//       target: { value: "ValidNewPass123!" },
//     });
//     fireEvent.click(submitButton);
    
//   });

  it("allows navigation back to the login page", () => {
    setup();
    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);
    expect(mockSetPage).toHaveBeenCalledWith("Login");
  });
});
