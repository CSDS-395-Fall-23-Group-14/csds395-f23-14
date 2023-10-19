import * as React from 'react';
import "./stock-screener/stock-screener.css";
import {Autocomplete, TextField, Button} from '@mui/material/';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';

export default function FilterMenu({item}) {
    const [show, setShow] = React.useState(false);
    const handleShow = () => {
      setShow(!show);
    };

    return(
        <div>
            <Button sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained" onClick={handleShow} >Filter<FilterListIcon /></Button>
            {
                show &&
                <div className='filterMenu'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={item.sector}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Sectors" />}
                    />
                    {/*<Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Age"
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                    </Select>*/}
                </FormControl>
            </div>
            }
        </div>
    )
}