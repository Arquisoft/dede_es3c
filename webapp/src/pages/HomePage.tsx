import { FC, useState, useContext } from "react";
import Header from "../components/Header";
import logo from '../img/logo-dede.svg';
import { Container, Card, CardContent } from "@mui/material";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import { LangContext } from '../lang';

interface HomePageProps {
    translate: (key: string) => string
    setUser: (user: string) => void
}

const HomePage: FC<HomePageProps> = (props: HomePageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [page, setPage] = useState('');

    if(page === 'catalog'){
        return(
            <Navigate to="/catalog" />
        )
    }
    else if (page === 'login'){
        return (
            <Navigate to="/login" />
        )
    }
    else if (page === 'signup'){
        return (
            <Navigate to="/signup" />
        )
    }
    else{
        return (
            <div>
                <Header setUser={props.setUser} />
                <Container component="main" maxWidth="sm">
                    <Card className={"main"} elevation={10} style={{ display: "grid" }}>
                        <CardContent style={{ display: "grid", margin: "auto", textAlign: "center" }}>
                            <div>
                                <img width={400} height={400} src={logo} />
                            </div>
                            <p>{translate('home.p1')}</p>
                            <p>
                                {translate('home.p2')}
                                {translate('home.p3')}
                            </p>
                            <p>{translate('home.p4')}</p>
                            <Button onClick={() => setPage('catalog')} type="submit" variant="contained" sx={{ my: 2 }}>{translate('home.catalog')}</Button>
                            <Button onClick={() => setPage('login')} variant="contained" sx={{ my: 2 }}>{translate('home.register')}</Button>
                            <Button onClick={() => setPage('signup')} variant="contained" sx={{ my: 2 }}>{translate('home.login')}</Button>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }

    
}
export default HomePage;