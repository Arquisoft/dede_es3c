import { FC, useContext } from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import '../styles/Home.scss';
import { LangContext } from '../lang';

interface HomePageProps {
    setUser: (user: string) => void
}

var items = [
    {
        name: "Catalogo",
        description: "home.text.catalog",
        imageURL1: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651250805/home2_iitglp.jpg',
        imageURL2: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651250805/home1_fqvmg3.jpg',
        buttonName: "home.button.catalog",
        buttonURL: "/catalog"
    },
    {
        name: "Registrate",
        description: "home.text.register",
        imageURL1: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256624/fondo-seguridad-cibernetica-internet-coputer-ilustracion-vector-delito-cibernetico-ilustracion-vector-bloqueo-digital-eps-10_518816-259_lyoleo.webp',
        imageURL2: 'https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256624/subscribe-registration-signup-software_dqvfbc.jpg',
        buttonName: "home.button.register",
        buttonURL: "/signup"
    },
    {
        name: "About",
        description: "home.text.about",
        imageURL1: "https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256351/image_gallery_hree0f.jpg",
        imageURL2: "https://res.cloudinary.com/dg9za4xcz/image/upload/v1651256288/homeLogo_c3i79b.jpg",
        buttonName: "home.button.about",
        buttonURL: "/about"
    }
]

function Item(props: { item: { name: string; description: string; imageURL1: string; imageURL2: string; buttonName: string; buttonURL: string } }) {

    const { dispatch: { translate } } = useContext(LangContext);

    console.log(localStorage.getItem("currentUser"));

    return (
        <Paper>
            <div className="containerHome">
                <div>
                    <img alt={props.item.name + "1"} src={props.item.imageURL1} className="photoHome" aria-label="carouselImage1"/>
                </div >
                <div>
                    <img alt={props.item.name + "2"} src={props.item.imageURL2} className="photoHome" aria-label="carouselImage2"/>
                </div>
                <div className="columnHome">
                    <h3 className="textHome">{translate(props.item.description)}</h3>

                    <Button
                        style={{
                            borderRadius: 15,
                            backgroundColor: "#e8e8e8",
                            padding: "18px 36px",
                            fontSize: "18px",
                            color: "black"
                        }}
                        variant="contained"
                        onClick={() => window.location.assign(props.item.buttonURL)}
                        className="buttonHome"
                    >
                        {translate(props.item.buttonName)}
                    </Button>
                </div>
            </div>
        </Paper>
    )
}

const HomePage: FC<HomePageProps> = (props: HomePageProps) => {
    return (
        <div className="divHome">
            <Carousel className="carouselHome">
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
    )
}
export default HomePage;