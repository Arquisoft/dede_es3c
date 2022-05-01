import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Product } from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from '@mui/material';
import ItemDetails from './ItemDetails';
import DisplayRelatedProducts from './DisplayRelatedProducts';

type Props = {
    item: Product;
    setAmount: (amount: string) => void
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RelatedProduct = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {
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
                        <h2>Productos relacionados:</h2>
                        <DisplayRelatedProducts item={props.item} setAmount={props.setAmount} />
                    </Box>
                </Modal>
            }

            <Card key={props.item.name}>
                <CardHeader title={props.item.name} />

                <Button onClick={handleOpen}>
                    <CardMedia component="img" width="200" height="200" src={props.item.urlPhoto} alt={props.item.name} />
                </Button>

                <CardContent>
                    $ {props.item.price}
                </CardContent>
            </Card>
        </div>
    );
};

export default RelatedProduct;