import { FC, useState, useContext, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { LangContext } from '../lang';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import '../styles/Home.scss';

interface HomePageProps {
    setUser: (user: string) => void
}

var items = [
    {
        name: "Conoce nuestros productos",
        description: "Conoce nuestros productos",
        imageURL1: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651250805/home2_iitglp.jpg',
        imageURL2: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651250805/home1_fqvmg3.jpg',
        buttonName: "CATÁLOGO",
        buttonURL: "/catalog"
    },
    {
        name: "Registrate",
        description: "Aún no te has registrado?",
        imageURL1: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256624/fondo-seguridad-cibernetica-internet-coputer-ilustracion-vector-delito-cibernetico-ilustracion-vector-bloqueo-digital-eps-10_518816-259_lyoleo.webp',
        imageURL2: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256624/subscribe-registration-signup-software_dqvfbc.jpg',
        buttonName: "REGÍSTRATE",
        buttonURL: "/signup"
    },
    {
        name: "Sobre nosotros",
        description: "Conoce más acerca de nosotros",
        imageURL1: "https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256351/image_gallery_hree0f.jpg",
        imageURL2: "https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256288/homeLogo_c3i79b.jpg",
        buttonName: "Sobre nosotros",
        buttonURL: "/about"
    }
]

function Item(props: { item: { name: string; description: string; imageURL1: string; imageURL2: string; buttonName: string; buttonURL: string } }) {
    return (
        <Paper>
            <div className="container">
                <div>
                    <img alt={props.item.name + "1"} src={props.item.imageURL1} className="photo" />
                </div >
                    <div>
                    <img alt={props.item.name + "2"} src={props.item.imageURL2} className="photo" />
                </div>
                <div className="column">
                    <h3>{props.item.description}</h3>

                    <Button
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#e8e8e8",
                            padding: "18px 36px",
                            fontSize: "18px"
                        }}
                        variant="contained"
                        onClick={() => window.location.assign(props.item.buttonURL)}
                    >
                        {props.item.buttonName}
                    </Button>

                    {(props.item.buttonName === "REGÍSTRATE") &&
                        <h3>Ya eres miembro?</h3>
                    }
                    {(props.item.buttonName === "REGÍSTRATE") &&
                        <Button 
                            style={{
                                borderRadius: 35,
                                backgroundColor: "#e8e8e8",
                                padding: "18px 36px",
                                fontSize: "18px"
                            }}
                            variant="contained"
                            onClick={() => window.location.assign(props.item.buttonURL)}
                        >
                            LOGIN
                        </Button>
                    }
                </div>
            </div>
        </Paper>
    )
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
            <div className="homeDiv">
                <Carousel className="carousel">
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            </div>
        )
    }
}
export default HomePage;