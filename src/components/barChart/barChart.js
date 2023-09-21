import { useEffect, useRef } from "react";
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

function Bars({ data, xAxisHeight, scaleX, scaleY }) {
  return (
    <>
      {data.map(({ chg_percent, name }) =>
        <rect
          key={`bar-${name}`}
          x={scaleX(name)}
          y={0 <= chg_percent ? scaleY(chg_percent) : xAxisHeight}
          width={scaleX.bandwidth()}
          height={(xAxisHeight - scaleY(Math.abs(chg_percent)))}
          fill={0 <= chg_percent ? 'green' : 'red'}
        />
      )}
    </>
  );
}

function BarChart({ data }) {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;
	
	const chgs = data.map(({ chg_percent }) => chg_percent);
  const minChg = Math.min(...chgs, 0);
  const maxChg = Math.max(...chgs, 0);

  const scaleX = scaleBand()
    .domain(data.map(({ name }) => name))
    .range([0, width])
    .padding(0.5);
  const scaleY = scaleLinear()
    .domain([minChg * 1.25, maxChg * 1.25])
    .range([height, 0]);
  
  const xAxisHeight = height * maxChg / (maxChg - minChg);

  return (
    <svg viewBox='0 0 500 500'>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Bars data={data} xAxisHeight={xAxisHeight} scaleX={scaleX} scaleY={scaleY} />
        <XAxis scale={scaleX} transform={`translate(0, ${xAxisHeight})`} />
        <YAxis scale={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart;