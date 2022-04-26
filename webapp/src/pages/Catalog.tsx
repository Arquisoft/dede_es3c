import { useState, useEffect, useContext } from 'react';
import { getProducts, getProductsByName, getProductsByCategory, getProductsByPrice, getStockByProduct } from '../api/api';
import { Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';
import { Product } from '../shared/shareddtypes';
import Item from '../components/Item';
import { Grid } from "@mui/material";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CatalogPageProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
}

const minDistance = 10;
let aux1: number[] = [];

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

    return (
        <div>
            <Form>
                <FormControl type="search" value={val} placeholder={translate('catalog.search')} className="me-2" aria-label="Search" onChange={e => {setNameFilter(e.target.value); setVal(e.target.value)}}/>
                <Button onClick={() => FilterByName(nameFilter)} >{translate('catalog.search')}</Button>
            </Form>

            <Button onClick={() => { reloadItems(); setVal("") }}>{translate('category.reset')}</Button>
            <Button onClick={() => FilterByCategory("Monitors")}>{translate('category.monitors')}</Button>
            <Button onClick={() => FilterByCategory("Laptop")}>{translate('category.laptop')}</Button>

            <Box sx={{ width: 300 }}>
                <TextField id="outlined-basic" label="Min" variant="outlined" value={sliderValue[0] + "$"} size="small" />
                <p>To</p>
                <TextField id="outlined-basic" label="Max" variant="outlined" value={sliderValue[1] + "$"} size="small"/>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="off"
                    disableSwap
                    max={10000}
                />
                <Button onClick={() => FilterByPrice(sliderValue[0], sliderValue[1])}>Filtrar por precio</Button>
            </Box>

            <Grid container spacing={3}>
                {products?.map((item: Product) => {
                    return (
                        <Grid item key={item.name} xs={12} sm={4}>
                            <Item item={item} setAmount={props.setAmount} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};
export default Catalog;