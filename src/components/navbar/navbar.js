
import React from "react";
import logo1 from "../../images/EZ$-logo-transparent.png";
import "./navbar.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import {Box, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



export default function Navbar() {
    return(
        <div className="wrapper">
            <div className="navbar-left">
                <div className="logo-wrapper">
                    <img src={logo1} height={60}></img>
                </div>
            </div>
            <div className="navbar-center">
                <div className="search-wrapper">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField InputProps={{ sx: {borderRadius: 10, '&.Mui-focused fieldset': {borderColor: 'yellow'}}}} id="outlined-basic" size="small" label="Search" variant="outlined" />
                    </Box>
                </div>
                <div className="tab-menu">
                    <Box sx={{ width:'100%'}}>
                        <TabContext>
                            <Box sx={{border: 1, borderColor: 'divider', maxWidth: {sm: 600}}}>
                                <Tabs variant="scrollable">
                                    <Tab label='Products'/>
                                    <Tab label='Community'/>
                                    <Tab label='Markets'/>
                                    <Tab label='News'/>
                                    <Tab label='Brokers'/>
                                    <Tab label='More'/>
                                </Tabs>
                            </Box>
                        </TabContext>
                    </Box>
                </div>
            </div>
            <div className="navbar-right">
                <div className="user-icon">
                    <IconButton>
                        <PersonIcon fontSize="large"/>
                    </IconButton>
                </div>
                <Button variant="outlined" sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}>Get Started</Button>
            </div>
        </div>
    );
}