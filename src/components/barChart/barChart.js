import { useState, useEffect, useRef } from "react";
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
  return (
    <>
      {
        data.map((datum) =>
          <rect
            key={`bar-${datum.name}`}
            x={scaleX(datum.name)}
            y={0 <= datum.chg_percent ? scaleY(datum.chg_percent) : xAxisHeight}
            width={scaleX.bandwidth()}
            height={(xAxisHeight - scaleY(Math.abs(datum.chg_percent)))}
            fill={0 <= datum.chg_percent ? 'green' : 'red'}
            style={{'stroke': 'black', 'stroke-width': (datum === hoveredBar ? 2 : 0)}}
            onMouseOver={() => hover(datum)}
            onMouseOut={() => unHover()}
          />
        )
      }
      
      {
        hoveredBar ?
        <ToolTip
          datum={hoveredBar}
          scaleX={scaleX}
          scaleY={scaleY}
        /> : null
      }
    </>
  );
}

function ToolTip({ datum, scaleX, scaleY }) {
  console.log(datum);
  return <text x="20" y="20">
    {datum.name}
  </text>
}

function BarChart({ data }) {
  const [ hoveredBar, setHoveredBar ] = useState(null);
  
  const dataSorted = data.sort((a, b) => b.chg_percent - a.chg_percent)
  
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
	
	const chgs = dataSorted.map(({ chg_percent }) => chg_percent);
  const minChg = Math.min(...chgs, -1.25);
  const maxChg = Math.max(...chgs, 1.25);

  const scaleX = scaleBand()
    .domain(dataSorted.map(({ name }) => name))
    .range([0, width])
    .padding(0.5);
    
  const scaleY = scaleLinear()
    .domain([minChg - 0.25, maxChg + 0.25])
    .range([height, 0]);
  
  const xAxisHeight = height * maxChg / (maxChg - minChg);

  return (
    <>
      <svg viewBox='0 0 500 300'>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <Bars
            data={dataSorted}
            xAxisHeight={xAxisHeight}
            scaleX={scaleX}
            scaleY={scaleY}
            hover={(bar) => setHoveredBar(bar)}
            unHover={() => setHoveredBar(null)}
            hoveredBar={hoveredBar}
          />
          <XAxis scale={scaleX} transform={`translate(0, ${xAxisHeight})`} />
          <YAxis scale={scaleY} />
        </g>
      </svg>
      
    </>
  );
}

export default BarChart;