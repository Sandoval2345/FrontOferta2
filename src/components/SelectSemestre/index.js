import * as React from 'react'
import { TextField } from '@material-ui/core';




export default function SelectSemestre() {
    
    const [Semestre, setSemestre] = React.useState({semestre:''});

    const handleChange = (event) =>{
        setSemestre(event.target.value);
    }
    return (
        <div>
            <TextField
                fullWidth
                color = 'primary'
                margin = 'normal'
                variant = 'outlined'
                label = 'Ingerese año-semestre. Ej:2021-2'
                name = 'semestre'
                value = {Semestre.semestre}
                onChange = {handleChange}
            />
        </div>
    )
}
