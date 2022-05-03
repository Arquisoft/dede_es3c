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
        try{
            setProducts(await getProducts());
        } catch(error) {
            console.log("Error en la carga de productos");
        }
    }

    async function FilterByName(name: string){
        if (name !== ""){
            try {
                setProducts(await getProductsByName(name));
            } catch (error) {
                console.log("Error en el filtrado por nombre");
            }
        }
    }

    async function FilterByCategory(category: string) {
        try{
            setProducts(await getProductsByCategory(category));
        } catch (error) {
            console.log("Error en el filtrado por categoria");
        }
    }

    async function FilterByPrice(min: number, max: number){
        try{
            setProducts(await getProductsByPrice(min, max));
        } catch (error) {
            console.log("Error en el filtrado por precio");
        }
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
                        <Button onClick={() => FilterByCategory("Monitor")} style={buttonStyle.buttonStyle1}>{translate('category.monitors')}</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Laptop")} style={buttonStyle.buttonStyle1}>{translate('category.laptop')}</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Chair")} style={buttonStyle.buttonStyle1}>{translate('category.chairs')}</Button>
                    </div>
                    <div>
                        <Button onClick={() => FilterByCategory("Keyboard")} style={buttonStyle.buttonStyle1}>{translate('category.keyboards')}</Button>
                    </div>
                </div>

                <div>
                    <Box sx={{ width: 300 }} className='filtroPrecioCatalog'>
                        <div className='sliderBoxes'>
                            <div className="sliderIzq" aria-label='leftPrice'>
                                <TextField id="outlined-basic" variant="outlined" value={sliderValue[0] + "$"} size="small" />
                            </div>
                            <div className="toLabelCatalog">
                                {translate("catalog.separator")}
                            </div>
                            <div className="sliderDer" aria-label='rightPrice'>
                                <TextField id="outlined-basic" variant="outlined" value={sliderValue[1] + "$"} size="small" />
                            </div>
                        </div>
                        <div className="segundaFilaFiltroPrecio">
                            <div className="sliderBarCatalog" aria-label="slider">
                                <Slider
                                    getAriaLabel={() => 'Minimum distance'}
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="off"
                                    disableSwap
                                    max={2500}
                                />
                            </div>
                            <div className="sliderFilterButton">
                                <Button onClick={() => FilterByPrice(sliderValue[0], sliderValue[1])} style={buttonStyle.buttonStyle2} aria-label="priceFilterButton">{translate('catalog.price')}</Button>
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
                        <div key={item.name}>
                            <Item item={item} setAmount={props.setAmount}/>
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