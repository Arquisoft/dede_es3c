import React from 'react';
import { Product } from '../shared/shareddtypes';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Collapse, Grid, styled } from "@mui/material";

type ProductsType = {
    products: Product[]
}

const DisplayProducts = (products: ProductsType) => {
    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = React.useState(false);
    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (i: React.SetStateAction<number>) => {
        setExpandedId(expandedId === i ? -1 : i);
        setExpanded(expandedId === -1 ? true : false);
    };

    return (
        <Grid container spacing={2}>
            {products.products.map(
                (info, i) => {
                    return (
                        <Grid item xs={12} sm={4} md={2}>
                            <Card key={info.name}>
                                <CardHeader title={info.name} />
                                <CardMedia component="img" width="200" height="200" src={info.urlPhoto} alt={info.name} />
                                <CardContent>
                                    Price: {info.price}
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to cart" disableFocusRipple size="small">
                                        <AddShoppingCartIcon />
                                    </IconButton>
                                    <ExpandMore expand={expanded} onClick={() => handleExpandClick(i)} aria-expanded={expanded} aria-label="show more" size="small">
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>
                                            {info.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    );
                }
            )}
        </Grid>
    );
}
export default DisplayProducts;