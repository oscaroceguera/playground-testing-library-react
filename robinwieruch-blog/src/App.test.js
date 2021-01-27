import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders App compoonent", () => {
    render(<App />);

    // implicit assertion
    // because getByText would throw error
    // if element wouldn't be there
    screen.getByText("Search:");

    // fails
    // expect(screen.getByText("Search")).toBeInTheDocument();

    // succeeds
    // explicit assertion
    // recommended
    expect(screen.getByText("Search:")).toBeInTheDocument();
  });
});

describe("Search Types", () => {
  it("render App component", () => {
    render(<App />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});

describe("Asynchronous elements", () => {
  it("render App component", async () => {
    render(<App />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});

describe("Fire Event", () => {
  it("render App component", async () => {
    render(<App />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});

describe("User Event", () => {
  it("render App component", async () => {
    render(<App />);

    // wait for the user to resolve
    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for Reactjs/)).toBeNull();

    await userEvent.type(screen.getByRole("textbox"), "Reactjs");

    expect(screen.getByText(/Searches for Reactjs/)).toBeInTheDocument();
  });
});
