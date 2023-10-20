import React from "react";
import { Card } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

import './enhancedbarchart.css';

/**
 * A bar chart component that displays data using D3.js.
 * @component
 * @param {object} props - The props for the component.
 * @param {Array} props.data - The data to be displayed in the bar chart.
 * @param {string} props.property - The property of data to be used for bar heights and colors.
 * @param {number} props.width - The width of the chart.
 * @param {number} props.height - The height of the chart.
 * @returns {JSX.Element} The rendered React component.
 */
function EnhancedBarChart({ data, property, width, height }) {
	const xLabels = data.map((datum) => datum.ticker);
	const barData = data.map((datum) => datum[property]);
	return (
		<Card
			className='barChartContainer'
			variant='outlined'
		>
			<BarChart
				width={width}
				height={height}
				series={[{ data: barData, title: 'hi', type: 'bar' }]}
				xAxis={[{ data: xLabels, scaleType: 'band' }]}
			/>
		</Card>
	);
}

export default EnhancedBarChart;