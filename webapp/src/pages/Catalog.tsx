import { useState, useEffect, useContext } from 'react';
import { getProducts, getProductsByName, getProductsByCategory } from '../api/api';
import { Form, FormControl } from "react-bootstrap";
import Button from '@mui/material/Button';
import { LangContext } from '../lang';
import { Product } from '../shared/shareddtypes';
import Item from '../components/Item';
import { Grid } from "@mui/material";

interface CatalogPageProps {
    setUser: (user: string) => void
    setAmount: (amount: string) => void
}

const Catalog = (props: CatalogPageProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [val, setVal] = useState('');

    const reloadItems = async () => {
        setProducts(await getProducts());
    }

    async function FilterByName(name: string){
        setProducts(await getProductsByName(name));
    }

    async function FilterByCategory(category: string) {
        setProducts(await getProductsByCategory(category));
    }

    useEffect(() => {
        reloadItems();
    }, []);

    return (
        <div>
            <Form>
                <FormControl type="search" value={val} placeholder={translate('catalog.search')} className="me-2" aria-label="Search" onChange={e => {setNameFilter(e.target.value); setVal(e.target.value)}}/>
                <Button onClick={() => FilterByName(nameFilter)} >{translate('catalog.search')}</Button>
            </Form>

            <Button onClick={() => { reloadItems(); setVal("") }}>{translate('category.reset')}</Button>
            <Button onClick={() => FilterByCategory("Monitors")}>{translate('category.monitors')}</Button>
            <Button onClick={() => FilterByCategory("Laptop")}>{translate('category.laptop')}</Button>           

            <Grid container spacing={3}>
                {products?.map((item: Product) => {
                    return (
                        <Grid item key={item.name} xs={12} sm={4}>
                            <Item item={item} setAmount={props.setAmount}/>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};
export default Catalog;