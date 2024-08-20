import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import * as firebase from "firebase/app";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test("Render App and initialize firebase", async () => {
  render(<App />);

  expect(firebase.getApps().length).toBeGreaterThan(0);
});

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn((auth, email, password) => {
    if (email === "test@a.com" && password === "123456") {
      return Promise.resolve({ user: { email } });
    } else {
      return Promise.reject(new Error("Invalid credentials"));
    }
  }),
}));

test("Sign in", async () => {
  render(<App />);
  userEvent.type(screen.getByText("email"), "test@a.com");
  userEvent.type(screen.getByText("password"), "123456");
  userEvent.click(screen.getByRole("button"));

  const auth = getAuth();

  const user = await signInWithEmailAndPassword(auth, "test@a.com", "123456");
  expect(user.user).toBeTruthy();
});
