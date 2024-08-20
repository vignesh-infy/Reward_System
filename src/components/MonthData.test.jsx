import { render, screen } from "@testing-library/react";
import MonthData from "./MonthData";

describe("SelectedUserData Component", () => {
  test("renders user details correctly", () => {
    render(<MonthData month={"May"} amount={100} rewards={50} />);

    expect(screen.getByText("May")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});
