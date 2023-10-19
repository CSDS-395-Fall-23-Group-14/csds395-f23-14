import React, { useContext } from 'react';
import "./stock-screener.css";
import {Box} from '@mui/material/';
import { EnhancedTable } from "../EnhancedTable";
import { GetStocks } from '../../context/DataContext.jsx';

export default function Stock_screener() {
    return (
        <div className="screener-wrapper">
            <h1 className="screener-h1">Stock Screener</h1>
			<div className='barCharts'>
				{/* <BarChart
					data={rows}
					width={450}
					height={300}
					property='chg_percent'
				/>
				<BarChart
					data={rows}
					width={450}
					height={300}
					property='vol'
				/>
				<BarChart
					data={rows}
					width={450}
					height={300}
					property='employees'
				/> */}
			</div>
            <Box sx={{borderBottom: 1, width: "100%", marginBottom: "4%"}}/>
            <div className="stock-list">
                <EnhancedTable item ={GetStocks()}/>
            </div>
        </div>
    );
}