import React, { useState, useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select
} from "d3";

import './barChart.css';

function XAxis({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} />;
}

function YAxis({ scale }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} />;
}

function Bars({ data, xAxisHeight, scaleX, scaleY, hover, unHover, hoveredBar }) {
  const [toolTipPos, setToolTipPos] = useState({x: 0, y: 0});
  
  return (
    <>
      {
        data.map((datum) => {
          const topY = 0 <= datum.chg_percent ? scaleY(datum.chg_percent) : xAxisHeight;
          const height = (xAxisHeight - scaleY(Math.abs(datum.chg_percent)));
          return <rect
            key={`bar-${datum.name}`}
            x={scaleX(datum.name)}
            y={topY}
            width={scaleX.bandwidth()}
            height={height}
            fill={0 <= datum.chg_percent ? 'green' : 'red'}
            style={{'stroke': 'black', 'stroke-width': (datum === hoveredBar ? 2 : 0)}}
            onMouseOver={() => {
              hover(datum);
              setToolTipPos({x: scaleX(datum.name), y: datum.chg_percent < 0 ? topY + height + 10 : topY - 10});
            }}
            onMouseOut={() => unHover()}
          />
        })
      }
      
      {
        hoveredBar ?
        <ToolTip datum={hoveredBar} x={toolTipPos.x} y={toolTipPos.y} /> : null
      }
    </>
  );
}

function ToolTip({ datum, x, y }) {
  return <text x={`${x}`} y={`${y}`}>
    {datum.chg_percent}
  </text>
}

function BarChart({ data, width, height }) {
  // const [ hoveredBar, setHoveredBar ] = useState(null);
  const svgRef = useRef();
  
  useEffect(() => {
    
    const chgs = data.map(({ chg_percent }) => chg_percent);
    const minChg = Math.min(...chgs, -1.25);
    const maxChg = Math.max(...chgs, 1.25);
    
    const xAxisHeight = maxChg / (maxChg - minChg);
    
    const svg = select(svgRef.current);
    
    // Set up the y-axis
    const scaleY = scaleLinear()
      .domain([minChg - 0.25, maxChg + 0.25])
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
    
    
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      
      .attr('x', ({ name })=> scaleX(name))
      .attr('width', scaleX.bandwidth())
      
      .attr('y', ({ chg_percent }) => scaleY(Math.max(0, chg_percent)))
      .attr('height', ({ chg_percent }) => scaleY(0) - scaleY(Math.abs(chg_percent)));
      
  }, [data, height, width]);
  //
  
  
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