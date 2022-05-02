import React from "react";
import { render, screen } from "@testing-library/react";
import LangState from '../lang';
import UserState from '../User';
import { MemoryRouter as Router } from 'react-router-dom';
import AboutPage from "../pages/AboutPage";

test('Catalog renders properly', async () => {

    render(
        <React.StrictMode>
            <Router>
                <UserState>
                    <LangState>
                        <AboutPage />
                    </LangState>
                </UserState>
            </Router>

        </React.StrictMode>,
    )

    let linkElement = screen.getByLabelText(/LogoDeDesktop/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByAltText(/imagenFacultad/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByAltText(/imagenArquisoft/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByAltText(/imagenGit/i);
    expect(linkElement).toBeInTheDocument();

    linkElement = screen.getByText(/What is DeDesktop?/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/DeDesktop is the group work developed by Sonia, Nuria, Sergio and Alejandro for the Software Architecture subject./i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/In it, a store of computer products has been developed in React-Typescript and Node.js./i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/What can we expect from this project?/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/DeDesktop has most of the features that a conventional online store would have. In it we can register as users, access a session with our username, see the product catalog or make purchases among other features. The main difference with other stores is how we treat the data of our customers. We try to have the greatest possible decentralization of customer information. For this, the project has been developed with a very innovative technology called Solid./i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/More information/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/From the following links you can access the project documentation and the repository where it has been developed:/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Project repository on GitHub/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/Project documentation on GitHub/i);
    expect(linkElement).toBeInTheDocument();
    
});
