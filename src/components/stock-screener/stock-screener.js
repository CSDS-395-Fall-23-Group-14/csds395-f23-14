import { BorderBottom } from "@mui/icons-material";
import "./stock-screener.css";
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import DownloadIcon from '@mui/icons-material/Download';

export default function Stock_screener() {
    return (
        <div className="screener-wrapper">
            <h1 className="screener-h1">Stock Screener</h1>
            <Box sx={{borderBottom: 1, width: "100%"}}/>
            <div className="screener-buttons">
                <ButtonGroup size="small" variant="outlined">
                    <Button sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}><RefreshIcon/></Button>
                    <Button size="small" sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}><MoreVertIcon/></Button>
                </ButtonGroup>
                <ButtonGroup size="small" variant="outlined" >
                    <Button sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}>Overview <ExpandMoreIcon/></Button>
                    <Button size="small" sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}><ViewCarouselIcon/></Button>
                </ButtonGroup>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Overview</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Performance</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Extended Hours</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Dividends</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Margins</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Income Statement</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Balance Sheet</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Oscillators</Button>
                <Button size="small" sx={{borderColor: "gray", color: "gray", '&:hover': {backgroundColor: "white", color: "gray"}, boxShadow: "none", border: "1px solid",backgroundColor: "white"}} variant="contained">Trend-Following</Button>
                <ButtonGroup size="small" variant="outlined">
                    <Button sx={{borderColor: 'gray', color: "gray", '&:hover': {borderColor: "gray"}}}><DownloadIcon/></Button>
                </ButtonGroup>
            </div>
            <Box sx={{borderBottom: 1, width: "100%", margin: "1rem 0"}}/>
        </div>
    );
}