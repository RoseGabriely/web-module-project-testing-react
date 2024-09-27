import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import Display from "../Display";
import userEvent from "@testing-library/user-event";
import fetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testShow = {
  name: "testname",
  summary: "testsummary",
  seasons: [
    {
      name: "testseasons1",
      id: 1,
      episodes: [],
    },
    {
      name: "testseasons2",
      id: 2,
      episodes: [],
    },
  ],
};

test("display component renders without props", () => {
  render(<Display />);
});

test("when show data button is clicked, show component displays", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);
  const show = await screen.findByTestId("show-container");

  expect(show).toBeInTheDocument();
});
test("when fetch button is pressed, selections rendered are equal to seasons in test data", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  const seasons = await screen.findAllByTestId("season-option");

  expect(seasons.length).toBe(2);
});

test("when fetch button is pressed, displayfunc is called", async () => {
  fetchShow.mockResolvedValueOnce(testShow);
  const displayFunc = jest.fn();
  render(<Display displayFunc={displayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
