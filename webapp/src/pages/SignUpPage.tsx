import React, {Fragment, FC, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import "bootswatch/dist/superhero/bootstrap.min.css"
import Button from '@mui/material/Button';
import {Container, Card , CardContent, Grid} from "@mui/material";
import Link from '@mui/material/Link';
import logo from '../img/logo-dede.svg'

interface SignUpProps{
    translate: (key: string) => string
}

const LoginPage: FC<SignUpProps> = ({ translate }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    return(
    <div>
        <Container component="main" maxWidth="sm">
        <Card className={"main"} elevation={10} style={{display: "grid"}}>
        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
            <div>
            <img  width={150} height = {150} src={logo} />
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
                        variant="outlined"
                        value={name}
                        helperText= {translate('signup.name')}
                        onChange={e => setName(e.target.value)}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                    <div>
                    <TextField
                        required
                        id = "textSurname"
                        name="surname"
                        size="small"
                        label= {translate ('signup.surname')} 
                        variant="outlined"
                        onChange={e => setSurname(e.target.value)}
                        helperText= {translate('signup.surname')}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                    <div>
                    <TextField
                        required
                        id = "textEmail"
                        name="email"
                        size="small"
                        label= {translate ('signup.email')} 
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                        helperText= {translate('signup.email')}
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
                        error = {(password != repeatedPassword)}
                        sx={{ my: 2 }}
                        /> 
                    </div>
                        </form>
                    <Button variant="contained" type="submit" sx={{ my: 2 }}>{translate('signup.signup')}</Button>
            <Link href="/login">{translate('signup.login')}</Link>
            </CardContent>
            </Card>
        </Container>
    </div>
    );
  }
  export default LoginPage;