import React, { useEffect, useRef } from "react";
import {
	axisTop,
	axisRight,
	scaleBand,
	scaleLinear,
	select,
	pointer
} from "d3";
import { Card } from '@mui/material';

import './barChart.css';

/**
 * A bar chart component that displays data using D3.js.
 *
 * @component
 * @param {object} props - The props for the component.
 * @param {Array} props.data - The data to be displayed in the bar chart.
 * @param {number} props.width - The width of the chart.
 * @param {number} props.height - The height of the chart.
 * @param {string} props.property - The property of data to be used for bar heights and colors.
 * @returns {JSX.Element} The rendered React component.
 */
function BarChart({ data, width, height, property }) {
	const svgRef = useRef();
	
	useEffect(() => {
		const svg = select(svgRef.current);
		
		const container = svg._groups[0][0].parentNode;
		
		const minChg = Math.min(...data.map(e => e[property]), -1.25) - 0.25;
		const maxChg = Math.max(...data.map(e => e[property]), 1.25) + 0.25;
		
		// Set up the y-axis
		const scaleY = scaleLinear()
			.domain([minChg, maxChg])
			.range([height, 0]);
		const yAxis = axisRight(scaleY);
		svg
			.select('.yaxis')
			.call(yAxis);
		
		// Set up the xaxis
		const scaleX = scaleBand()
			.domain(data.map(({ name }) => name))
			.range([0, width])
			.padding(0.5)
			
		// Todo: tick values should be ticker symbols and should be above or below the x-axis to avoid the chart bars
		const xAxis = axisTop(scaleX)
			.tickValues(new Array(data.length).fill(""));
		svg
			.select('.xaxis')
			.style('transform', `translateY(${scaleY(0)}px)`)
			.call(xAxis);
		
		// Set up the bars
		const scaleCol = scaleLinear()
			.domain([minChg, 0, maxChg])
			.range(["red", 'orange', "green"])
			.clamp(true);
		
		// Initialize the bars with x positions and widths
		svg
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
			
			.attr('x', ({ name })=> scaleX(name))
			.attr('width', scaleX.bandwidth())
		
		// Animate the bars' heights and colors
		svg.selectAll('.bar')
			.attr('height', 0)
			.attr('y', scaleY(0))
			.attr('fill', scaleCol(0))
			
			.transition().duration((_value, index) => 100 * (index + 4))
			
			.attr('height', (datum) => scaleY(0) - scaleY(Math.abs(datum[property])))
			.attr('y', (datum) => scaleY(Math.max(0, datum[property])))
			.attr('fill', (datum) => scaleCol(datum[property]));
		
		const mouseover = (event) => {
			const datum = event.explicitOriginalTarget.__data__;
			const [x, y] = pointer(event);
			select('.tooltip')
				.style('left', `${x + 20 + container.offsetLeft}px`)
				.style('top', `${y + container.offsetTop}px`)
				.html(datum.name + `:<br>${property}: ` + datum[property])
				.style('opacity', 1);
		}
		const mousemove = (event) => {
			const [x, y] = pointer(event);
			select('.tooltip')
				.style('left', `${x + 20 + container.offsetLeft}px`)
				.style('top', `${y + container.offsetTop}px`)
		}
		const mouseleave = (event) => {
			const [x, y] = pointer(event);
			select('.tooltip')
				.style('left', `${x + 20 + container.offsetLeft}px`)
				.style('top', `${y + container.offsetTop}px`)
				.style('opacity', 0);
		}
		
		// Add the event listeners to the chart
		// Add mousemove listener to the container div so that dragging
		//     onto the tooltip doesn't jam it
		container.onmousemove = mousemove;
		container.onwheel = mousemove;
		svg.selectAll('.bar')
			.on('mouseover', mouseover)
			.on('mouseleave', mouseleave);
		
	}, [data, height, property, width]);
	
	return (
		<Card
			className='barChartContainer'
			variant='outlined'>
			<div className='tooltip' />
			<svg
				className='barChart'
				width={width}
				height={height}
				ref={svgRef}>
				<g className='yaxis' />
				<g className='xaxis' />
			</svg>
		</Card>
	);
}

export default BarChart;