import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import handleAddToCart from '../components/HandleAddToCart';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getStockByProduct } from '../api/api';
import '../styles/ItemCatalog.scss';
import Button from '@mui/material/Button';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';
import { Link } from 'react-router-dom';
import ItemDetails from '../components/ItemDetails';
import { Modal, Typography } from '@mui/material';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

let itemAux: Product;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/*function MyVerticallyCenteredModal(props: JSX.IntrinsicAttributes & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            fullscreen="true"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {itemAux.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ItemDetails item={itemAux} setAmount={() => undefined} key={itemAux.name} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}*/

const Item = (props: Props) => {
    const [itemAmount, setItemAmount] = useState<string>('0');
    const [stock, setStock] = useState<number>(0);

    const handleChange = (event: SelectChangeEvent) => {
        setItemAmount(event.target.value as string);
    };

    useEffect(() => {
        const calculateStock = async () => {
            setStock(await getStockByProduct(props.item.name));
        }

        calculateStock();

        itemAux = props.item;
    }, [props.item.name]);

    //const [modalShow, setModalShow] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




        return (
            <div>
                {/*
                    (modalShow) &&
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                */

                    (open) &&
                
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {props.item.name}
                            </Typography>
                                <ItemDetails item={props.item} setAmount={props.setAmount} />
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal> 

                }

                <Card key={props.item.name} >
                    {/*<Link to={"/products/name/" + props.item.name} key={props.item.name} className="nav-link" >
                        <CardMedia component="img" image={props.item.urlPhoto} alt={props.item.name} className="imageItemCatalog"/>
                    </Link>
                    */}
                    <Button onClick={handleOpen}>
                        <CardMedia component="img" image={props.item.urlPhoto} alt={props.item.name} className="imageItemCatalog" />
                    </Button>

                    <CardHeader title={props.item.name} titleTypographyProps={{ variant: 'h6' }} className="titleItemCatalog" />


                    <CardContent className="priceItemCatalog">
                        $ {props.item.price}
                    </CardContent>


                    <CardActions disableSpacing className='addToCartZone'>
                        <div className='stockItemCatalog'>
                            <p>Stock: {stock}</p>
                        </div>

                        {
                            (!localStorage.getItem("currentUser")?.includes("admin")) &&
                            <div className='addToCartSelectorButton'>
                                <div>
                                    <Box className="selectorItemCatalog">
                                        <FormControl fullWidth>
                                            <Select
                                                value={itemAmount}
                                                onChange={handleChange}
                                                size="small"
                                                displayEmpty
                                                autoWidth
                                            >

                                                {Array.from({ length: stock + 1 }, (_, i) => <MenuItem value={i} key={i}>{i}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div>
                                    <IconButton aria-label={"add to cart" + props.item.name} disableFocusRipple size="small" onClick={() => handleAddToCart(props.item, props.setAmount, itemAmount, stock)} className="buttonItemCatalog" disableRipple={true} >
                                        <AddShoppingCartIcon />
                                        Add to cart
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </CardActions>
                </Card>
            </div>
        );
    

        

    

    
};

export default Item;