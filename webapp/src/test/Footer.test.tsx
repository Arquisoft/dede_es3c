import React from "react";
import { render, screen } from "@testing-library/react";
import LangState from '../lang';
import UserState from '../User';
import { MemoryRouter as Router } from 'react-router-dom';
import Footer from "../components/Footer";

test('Catalog renders properly', async () => {

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <Footer />
                    </LangState>
                </UserState>
            </Router>

        </React.StrictMode>,
    )

    let linkElement = screen.getByText(/Who are we?/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/About us/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Contact us/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Sonia - UO276237@uniovi.es/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Nuria - UO277418@uniovi.es/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Sergio - UO276341@uniovi.es/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Alejandro - UO232627@uniovi.es/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByLabelText(/imagenUniovi/i);
    expect(linkElement).toBeInTheDocument();
});