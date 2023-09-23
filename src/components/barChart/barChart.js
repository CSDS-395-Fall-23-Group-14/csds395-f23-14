import React, { useState, useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select
} from "d3";

import './barChart.css';

function ToolTip({ datum, x, y }) {
  return <text x={`${x}`} y={`${y}`}>
    {datum.chg_percent}
  </text>
}

function BarChart({ data, width, height }) {
  // const [ hoveredBar, setHoveredBar ] = useState(null);
  const svgRef = useRef();
  
  useEffect(() => {
    const minChg = Math.min(...data.map(e => e.chg_percent), -1.25) - 0.25;
    const maxChg = Math.max(...data.map(e => e.chg_percent), 1.25) + 0.25;
    
    const svg = select(svgRef.current);
    
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
      .padding(0.5);
    const xAxis = axisBottom(scaleX).ticks(data.length);
    svg
      .select('.xaxis')
      .style('transform', `translateY(${scaleY(0)}px)`)
      .call(xAxis);
    
    // Set up the bars
    const scaleCol = scaleLinear()
      .domain([minChg, 0, maxChg])
      .range(["red", 'orange', "green"])
      .clamp(true);
    
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      
      .attr('x', ({ name })=> scaleX(name))
      .attr('width', scaleX.bandwidth())
    
    // Animate the bars and colors
    svg.selectAll('.bar')
      .attr('height', 0)
      .attr('y', scaleY(0))
      .attr('fill', scaleCol(0))
      
      .transition().duration((value, index) => 100 * (index + 4))
      
      .attr('height', ({ chg_percent }) => scaleY(0) - scaleY(Math.abs(chg_percent)))
      .attr('y', ({ chg_percent }) => scaleY(Math.max(0, chg_percent)))
      .attr('fill', ({ chg_percent }) => scaleCol(chg_percent));
      
  }, [data, height, width]);
  
  useEffect(() => {
    
  }, [])
  
  return (
    <svg
      className='barChart'
      width={width}
      height={height}
      ref={svgRef}>
      <g className='yaxis' />
      <g className='xaxis' />
    </svg>
  );
}

export default BarChart;