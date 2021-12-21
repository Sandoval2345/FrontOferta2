import * as React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function SelectCarrera() {

    const [carrera, setCarrera] = React.useState('');

    const handleChange = (event) => {
        setCarrera(event.target.value);
    }
    
    return (
        <div>
            <formControl sx={{m:1,minWidth: 80}}>
                <InputLabel variant = 'outlined' id="selectCar-label">Carrera</InputLabel>
                <Select
                    defaultValue = {1}
                    labelId = 'selectCar-label'
                    id = 'selectCar'
                    value = {carrera}
                    label = "carrera"
                    fullWidth
                    
                    onChange = {handleChange}
                    
                >
                    <MenuItem value = {1}>ICCI</MenuItem>
                    <MenuItem value = {2}>ICI</MenuItem>
                    <MenuItem value = {3}>ITI</MenuItem>
                    <MenuItem value = {4}>Todas</MenuItem>
                </Select>
            </formControl>
        </div>
    )
}
