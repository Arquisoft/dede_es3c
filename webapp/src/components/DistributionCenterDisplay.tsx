import React, { useContext, useState } from 'react';
import { DistributionCenter, Product } from '../shared/shareddtypes';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getDistributionCenters } from '../api/api';
import { LangContext } from '../lang';

type DistributionCenterProps = {
    product: Product;
}

const DisplayDistributionCenters = (props: DistributionCenterProps) => {
    const { dispatch: { translate } } = useContext(LangContext);
    const [centers, setCenters] = useState<DistributionCenter[]>([]);
    const [distributionCenter, setDistributionCenter] = useState("");
    const getCenters = async () => {
        setCenters (await getDistributionCenters(props.product));
        };
        const handleChange = (event: SelectChangeEvent) => {
            setDistributionCenter(event.target.value as string);
            console.log(event.target.value as string);
          };
    if (centers.length === 0){
        getCenters();
        console.log(centers);
    }   
    return ( 
        <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">{translate("centers.center")}</InputLabel>
          <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={distributionCenter}
          onChange={handleChange}
          autoWidth
          label="Center">
         {centers.map ((center) => {
             return (
                <MenuItem value={center.address}>{center.address}</MenuItem>
             );
         } )}
          </Select>
        </FormControl>
        {localStorage.setItem("Center " + props.product.name, distributionCenter)}
    </div>
    );
}
export default DisplayDistributionCenters;