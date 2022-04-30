import { useState, useEffect, useContext } from 'react';
import { getProducts, getProductsByName, getProductsByCategory, getProductsByPrice } from '../api/api';
import { Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';
import { Product } from '../shared/shareddtypes';
import Item from '../components/Item';
import { Grid } from "@mui/material";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/Catalog.scss';
import GoToTopButton from '../components/GoToTopButton';
import HorizontalSeparator from '../components/HorizontalSeparator';
import Footer from '../components/Footer';

interface CatalogPageProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
}

const minDistance = 10;

const Catalog = (props: CatalogPageProps) => {
    useEffect(() => {
        reloadItems();
    }, []);

    const { dispatch: { translate } } = useContext(LangContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [val, setVal] = useState('');

    const [sliderValue, setSliderValue] = useState<number[]>([100, 1000]);

    const handleSliderChange = (
        _event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setSliderValue([Math.min(newValue[0], sliderValue[1] - minDistance), sliderValue[1]]);
        } else {
            setSliderValue([sliderValue[0], Math.max(newValue[1], sliderValue[0] + minDistance)]);
        }
    };

    const reloadItems = async () => {
        setProducts(await getProducts());
    }

    async function FilterByName(name: string){
        setProducts(await getProductsByName(name));
    }

    async function FilterByCategory(category: string) {
        setProducts(await getProductsByCategory(category));
    }

    async function FilterByPrice(min: number, max: number){
        setProducts(await getProductsByPrice(min, max));
    }

    const buttonStyle = ({
        buttonStyle1: {
            borderRadius: 15,
            backgroundColor: "#e8e8e8",
            padding: "15px 20px",
            fontSize: "13px"
        },

        buttonStyle2: {
            borderRadius: 15,
            backgroundColor: "#e8e8e8",
            padding: "5px 8px",
            fontSize: "15px"
        },

        buttonStyle3: {
            borderRadius: 15,
            backgroundColor: "#e8e8e8",
            padding: "12px 20px",
            fontSize: "13px"
        },

        buttonStyle4: {
            borderRadius: 15,
            backgroundColor: "#e8e8e8",
            padding: "5px 8px",
            fontSize: "15px"
        },
    })

    return (
        <div>
            <div className='filtrosCatalog'>
                <div>
                    <Form className='filtroTextoCatalog'>
                        <div>
                            <FormControl type="search" value={val} placeholder={translate('catalog.search')} className="me-2" aria-label="Search" onChange={e => { setNameFilter(e.target.value); setVal(e.target.value) }} />
                        </div>
                        <div className="botonFiltroTexto">
                            <Button onClick={() => FilterByName(nameFilter)} style={buttonStyle.buttonStyle4}>{translate('catalog.search')}</Button>
                        </div>
                    </Form>
                </div>
                
                <div className='filtrosCategoriaCatalog'>
                    <div>
                        <Button onClick={() => FilterByCategory("Monitors")} style={buttonStyle.buttonStyle1}>{translate('category.monitors')}</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Laptop")} style={buttonStyle.buttonStyle1}>{translate('category.laptop')}</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Chairs")} style={buttonStyle.buttonStyle1}>T-Sillas</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Keyboards")} style={buttonStyle.buttonStyle1}>T-Teclados</Button>
                    </div>
                </div>

                <div>
                    <Box sx={{ width: 300 }} className='filtroPrecioCatalog'>
                        <div className='sliderBoxes'>
                            <div className="sliderIzq">
                                <TextField id="outlined-basic" variant="outlined" value={sliderValue[0] + "$"} size="small" />
                            </div>
                            <div className="toLabelCatalog">
                                <p>To</p>
                            </div>
                            <div className="sliderDer">
                                <TextField id="outlined-basic" variant="outlined" value={sliderValue[1] + "$"} size="small" />
                            </div>
                        </div>
                        <div className="segundaFilaFiltroPrecio">
                            <div className="sliderBarCatalog">
                                <Slider
                                    getAriaLabel={() => 'Minimum distance'}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="off"
                                    disableSwap
                                    max={10000}
                                />
                            </div>
                            <div className="sliderFilterButton">
                                <Button onClick={() => FilterByPrice(sliderValue[0], sliderValue[1])} style={buttonStyle.buttonStyle2}>Filtrar</Button>
                            </div>
                        </div>
                    </Box>
                </div>

                <div className='resetFiltrosCatalog'>
                    <Button onClick={() => { reloadItems(); setVal("") }} style={buttonStyle.buttonStyle3}>{translate('category.reset')}</Button>
                </div>
            </div>

            <HorizontalSeparator />
            
            <Grid className="gridCatalog">
                {products?.map((item: Product) => {
                    return (
                        <div>
                            <Item item={item} setAmount={props.setAmount} />
                        </div>
                    );
                })}
            </Grid>
            
            <GoToTopButton />
            
            <Footer />
        </div>
    );
};
export default Catalog;