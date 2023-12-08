import React, { useContext, } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import { ThemeContext } from '../../context/ThemeContext';

function HedgeGraph({ option, type }) {

    if (!type || !option) {
        return ( 
        <p>SELECT AN OPTION FROM SHOPPING CART AND A HEDGING STRATEGY BELOW</p>
        )
    } else {
        let x;
        let y;
       if (type == "bull") {
            x = option.bull.axes.x;
            y = option.bull.axes.y;
       } else if (type == "bear") {
        x = option.bear.axes.x;
        y = option.bear.axes.y;
       } else if (type == "straddle") {
        x = option.straddle.axes.x;
        y = option.straddle.axes.y;
       } else if (type == "strangle") {
        x = option.strangle.axes.x;
        y = option.strangle.axes.y;
       } else if (type == "strip") {
        x = option.strip.axes.x;
        y = option.strip.axes.y;
       } else {
        x = option.strap.axes.x;
        y = option.strap.axes.y;
       }

    return (
        <LineChart
            xAxis={[{ data: x }]}
            series={[
                {
                    curve: "linear",
                    data: y,
                },
            ]}
            width={500}
            height={300}
        />
    )
    }
}

export default HedgeGraph;