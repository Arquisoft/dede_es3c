import React, { useState } from 'react';
import { DistributionCenter, Product } from '../shared/shareddtypes';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme } from '@mui/material';
import { getDistributionCenters } from '../api/api';

type DistributionCenterProps = {
    product: Product;
}

const DisplayDistributionCenters = (props: DistributionCenterProps) => {
    const [centers, setCenters] = useState<DistributionCenter[]>([]);
    const [distributionCenter, setDistributionCenter] = useState("");
    const getCenters = async () => {
        setCenters (await getDistributionCenters(props.product));
        };
        const handleChange = (event: SelectChangeEvent) => {
            setDistributionCenter(event.target.value as string);
            console.log(event.target.value as string);
          };
    if (centers.length == 0){
        getCenters();
        console.log(centers);
    }   
    return ( 
        <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Center</InputLabel>
          <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={distributionCenter}
          onChange={handleChange}
          autoWidth
          label="Center">
         {centers.map ((center, i ) => {
             {localStorage.setItem("Center"+i, center.address)}
             return (
                <MenuItem value={center.address}>{center.address}</MenuItem>
             );
         } )}
          </Select>
        </FormControl>
    </div>
    );
}
export default DisplayDistributionCenters;