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
      <svg viewBox='0 0 500 300'
        font-size='20'>
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
          <XAxis scale={scaleX} transform={`translate(0, ${xAxisHeight})`}/>
          <YAxis scale={scaleY} />
        </g>
      </svg>
      
    </>
  );
}

export default BarChart;