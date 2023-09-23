import React, { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select,
  pointer
} from "d3";

import './barChart.css';

function BarChart({ data, width, height }) {
  const svgRef = useRef();
  
  useEffect(() => {
    const svg = select(svgRef.current);
    
    const minChg = Math.min(...data.map(e => e.chg_percent), -1.25) - 0.25;
    const maxChg = Math.max(...data.map(e => e.chg_percent), 1.25) + 0.25;
    
    // Set up the y-axis
    const scaleY = scaleLinear()
      .domain([minChg, maxChg])
      .range([height, 0]);
    const yAxis = axisLeft(scaleY);
    svg
      .select('.yaxis')
      .call(yAxis);
    
    // Set up the xaxis
    const scaleX = scaleBand()
      .domain(data.map(({ name }) => name))
      .range([0, width])
      .padding(0.5)
      
    // Todo: tick values should be ticker symbols and should be above or below the x-axis to avoid the chart bars
    const xAxis = axisBottom(scaleX)
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
      
      .attr('height', ({ chg_percent }) => scaleY(0) - scaleY(Math.abs(chg_percent)))
      .attr('y', ({ chg_percent }) => scaleY(Math.max(0, chg_percent)))
      .attr('fill', ({ chg_percent }) => scaleCol(chg_percent));
    
    const tooltip = select('.tooltip')
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");
    
    const mouseover = (event) => {
      const {name, chg_percent} = event.explicitOriginalTarget.__data__;
      const [x, y] = pointer(event);
      tooltip
        .style('left', `${x + 20}px`)
        .style('top', `${y}px`)
        .html(name + ":<br>Chg Percent: " + chg_percent)
        .style('opacity', 1);
    }
    const mousemove = (event) => {
      const [x, y] = pointer(event);
      tooltip
        .style('left', `${x + 20}px`)
        .style('top', `${y}px`)
    }
    const mouseleave = (event) => {
      const [x, y] = pointer(event);
      tooltip
        .style('left', `${x + 20}px`)
        .style('top', `${y}px`)
        .style('opacity', 0);
    }
    
    // Add the event listeners to the chart
    // Add mousemove listener to the container div so that dragging
    //     onto the tooltip doesn't jam it
    select('.barChartContainer')
      .on('mousemove', mousemove)
      .on('scroll', mousemove);
    svg.selectAll('.bar')
      .on('mouseover', mouseover)
      .on('mouseleave', mouseleave);
    
  }, [data, height, width]);
  
  return (
    <div className='barChartContainer'>
      <div className='tooltip' />
      <svg
        className='barChart'
        width={width}
        height={height}
        ref={svgRef}>
        <g className='yaxis' />
        <g className='xaxis' />
      </svg>
    </div>
  );
}

export default BarChart;