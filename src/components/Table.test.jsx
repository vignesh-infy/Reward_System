import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  const users = [
    { id: 1, userName: "John Doe", January: 10, February: 20, March: 30 },
    { id: 2, userName: "Jane Smith", January: 15, February: 25, March: 35 },
  ];
  const monthNames = ["January", "February", "March"];
  const onClick = jest.fn();

  test("renders table with user data", () => {
    render(<Table users={users} onClick={onClick} monthNames={monthNames} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
  });

  test("renders 'No Data found' when users array is empty", () => {
    render(<Table users={[]} onClick={onClick} monthNames={monthNames} />);

    expect(screen.getByText("No Data found")).toBeInTheDocument();
  });

  test("calls onClick with correct user when 'View Details' button is clicked", () => {
    render(<Table users={users} onClick={onClick} monthNames={monthNames} />);

    const button = screen.getAllByText("View Details")[0];
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledWith(users[0]);
  });

  test("highlights the selected user row", () => {
    render(<Table users={users} onClick={onClick} monthNames={monthNames} />);

    const button = screen.getAllByText("View Details")[0];
    fireEvent.click(button);

    const row = screen.getByText("John Doe").closest("tr");
    expect(row).toHaveClass("highlight");
  });
});
