import { render, screen } from "@testing-library/react";
import HomePage from '../pages/HomePage';

beforeAll(async () => {

});

afterAll(async () => {

});

test('check home page text renders properly', async () => {
    render(<HomePage />)
    const linkElement = screen.getByText(/DeDesktop/i);
    expect(linkElement).toBeInTheDocument();
});