import React, {FC, useState, useContext} from "react";
import TextField from '@mui/material/TextField';
import "bootswatch/dist/morph/bootstrap.min.css"
import {Container, Card , CardContent} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import logo from '../img/logo-dede.svg'
import {checkUser, signup } from "../api/api";
import { User } from "../shared/shareddtypes";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { LangContext } from '../lang';
import '../styles/Signup.scss';
import Footer from '../components/Footer';

interface SignUpProps{
    setUser: (user:string) => void
}

const SignUpPage: FC<SignUpProps> = (props: SignUpProps) => {

    const { dispatch: { translate } } = useContext(LangContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [exists, setExists] = useState(0);
    const [registered, setRegistered] = useState(false);
    const [pulsed, setPulsed] = useState (false);

    const isBlank = (text: string) => 
    {
        return(text.length === 0);
    }

    const register = async () => {
        setPulsed(true);

        const user:User = 
        {
            username:name,
            password:password,
            email:email,
            rol:"Client"
        }

        if (!isBlank(user.username) || !isBlank(user.password) || !isBlank(user.email) || !isBlank(repeatedPassword)){
           const found = await checkUser(name, password);
           if (!found){
                const token = await signup(name, password, email);
                setRegistered(true);
                props.setUser(name);
                localStorage.setItem("token", token);
            } else {
                setExists(2);
        } 
    }
    }
    if (registered || localStorage.getItem("currentUser") !== "not logged"){
        return (<Navigate to="/catalog" />);
    } else {
    return(
        <div>
        <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
            <div>
                <img  alt="Logo" width={200} height={200} src={logo} />
            </div>
                <h1>{translate('signup.h1')}</h1>
                <h2>{translate('signup.h2')}</h2>
                <form>
                <div>
                    <TextField
                        id = "textName"
                        required
                        size="small"
                        name="name"
                        label= {translate ('signup.name')} 
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        variant="outlined"
                        value={name}
                        helperText= {translate('signup.name')}
                        onChange={e => setName(e.target.value)}
                        error = {exists === 2 || (pulsed && name.length === 0)}
                        sx={{ my: 2 }}
                        
                        /> 
                    </div>
                    <div>
                    <TextField
                        required
                        id = "textEmail"
                        name="email"
                        size="small"
                        value = {email}
                        label= {translate ('signup.email')} 
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        helperText= {translate('signup.email')}
                        error = {(pulsed && email.length === 0)}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                    <div> 
                    <TextField
                        required
                        id = "textPassword"
                        name="password"
                        type = "password"
                        size="small"
                        label= {translate ('signup.pass')} 
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                        helperText= {translate('signup.pass')}
                        error = {(pulsed && password.length === 0)}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                    <div>
                    <TextField
                        required
                        id = "textRepeatPassword"
                        name="rPassword"
                        type = "password"
                        size="small"
                        label= {translate ('signup.passwd')} 
                        variant="outlined"
                        onChange={e => setRepeatedPassword(e.target.value)}
                        helperText= {translate('signup.passwd')}
                        error = {(password !== repeatedPassword) || (pulsed && repeatedPassword.length === 0)}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                        </form>
                    <Button 
                    onClick={ () => register()} 
                    variant="contained" 
                    type="submit"
                    color="primary"
                    style={{
                        borderRadius: 15,
                        backgroundColor: "#e8e8e8",
                        padding: "18px 36px",
                        fontSize: "16px"
                    }}
                     >{translate('signup.signup')}</Button>
                <Link to="/login" className="goToLoginSignup">{translate('signup.login')}</Link>
                </CardContent>
            </Card>
        </Container>

        <div className="footerPositionSignup">
            <Footer />
        </div>
    </div>
    );
  }
}

  export default SignUpPage;