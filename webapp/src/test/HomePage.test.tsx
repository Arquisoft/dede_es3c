import { render, screen } from "@testing-library/react";
import HomePage from '../pages/HomePage';
import LangState from "../lang";
import UserState from "../User";
import React from "react";
test('check home page text renders properly (english)', async () => {
    render(
        <React.StrictMode>
        <UserState>
        <LangState>
          <HomePage setUser={() => "user"}/>
        </LangState>
        </UserState>
      </React.StrictMode>,
   )
    const linkElement = screen.getByText(/DeDesktop is the result of the effort and dedication of the es3c group of the Software Architecture subject./i);
    const linkButton = screen.getByText(/See all our products in our catalog/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkButton).toBeInTheDocument();
});