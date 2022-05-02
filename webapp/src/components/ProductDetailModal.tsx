import Box from '@mui/material/Box';
import '../styles/ItemCatalog.scss';
import ItemDetails from '../components/ItemDetails';
import { Modal, Typography } from '@mui/material';
import DisplayRelatedProducts from '../components/DisplayRelatedProducts'
import React from 'react';
import { Product } from '../shared/shareddtypes';

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
    overflow: "scroll",
    height: "90%"
};

type Props = {
    item: Product;
    setAmount: (amount: string) => void
    setOpen: (open: boolean) => void
    open: boolean;
};

const ProductDetailModal = (props: Props) => {
    const handleClose = () => props.setOpen(false);

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ItemDetails item={props.item} setAmount={props.setAmount} />
                <Typography id="modal-modal-title" variant="h5" component="h1" color="black">
                    <p>Productos relacionados:</p>
                </Typography>

                <DisplayRelatedProducts item={props.item} setAmount={props.setAmount} />
            </Box>
        </Modal>
    );
    
}

export default ProductDetailModal;