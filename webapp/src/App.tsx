import React, { FC, useContext, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { LangContext } from './lang';
import Homepage from './components/Homepage';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from './shared/shareddtypes';

const App: FC = () => {
  const { dispatch: {translate }} = useContext(LangContext);

  const defaultUser: User =
  {
    name: "host",
    username: "host",
    password: "host",
    email: "host",
    rol: "user"
  }
  const [user, setUser] = useState<User>(defaultUser);

  const setCurrentUser = (user: User) => {
    setUser(user);
    console.log(user.email);
  };

  return (
    <Router>
      <Header fixed transparent />
      <Routes>
        <Route
          index element = 
          {
            <Homepage translate={translate}/>
          }
        />
        <Route
        path='login'
        element = 
        {
          <LoginPage setSession={setCurrentUser} translate={translate} />
        }
        />
        <Route
        path='signup'
        element =
        {
          <SignUpPage translate={translate} />
        }
        />
      </Routes>
    </Router>
    
);

}
export default App;
