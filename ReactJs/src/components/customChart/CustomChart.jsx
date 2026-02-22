import React from "react";

import ChartRenderer from "./ChartRenderer";

const CHART_CONFIG = {
  width: 500,
  height: 300,
  xAxis: {
    start: 1000,
    end: 8000,
    interval: 1000,
    paddingBottom: 40,
  },
  yAxis: {
    start: 0,
    end: 100,
    interval: 20,
    paddingLeft: 40,
  },
  points: [
    {
      x: 2000,
      y: 20,
    },
    {
      x: 4000,
      y: 50,
    },
    {
      x: 6000,
      y: 80,
    },
  ],
};

const CustomChart = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      Chart Renderer
      <ChartRenderer config={CHART_CONFIG} />
    </div>
  );
};

export default CustomChart;
