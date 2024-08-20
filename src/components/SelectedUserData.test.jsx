import { render, screen } from "@testing-library/react";
import SelectedUserData from "./SelectedUserData";

describe("SelectedUserData Component", () => {
  const user = { id: 1, userName: "John Doe", January: 10, February: 20, March: 30 };
  const userData = {
    transactions: {
      January: 100,
      February: 200,
      March: 300,
    },
  };
  const monthNames = ["January", "February", "March"];

  test("renders user details correctly", () => {
    render(<SelectedUserData user={user} userData={userData} monthNames={monthNames} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("handles missing transaction data gracefully", () => {
    const incompleteUserData = {
      transactions: {
        January: 100,
        March: 300,
      },
    };
    render(<SelectedUserData user={user} userData={incompleteUserData} monthNames={monthNames} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.queryByText("200")).not.toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  test("calculates and displays total rewards correctly", () => {
    render(<SelectedUserData user={user} userData={userData} monthNames={monthNames} />);
    
    expect(screen.getByText("Total Rewards:")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
  });
});