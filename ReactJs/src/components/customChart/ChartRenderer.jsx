import React from "react";

import AxisRenderer from "./AxisRenderer";

const ChartRenderer = ({ config }) => {
  const width = config.width;
  const height = config.height;
  const xAxis = config.xAxis;
  const yAxis = config.yAxis;
  const points = config.points;

  const plotAbleLengthInPixels = width - yAxis.paddingLeft;
  const plotAbleHeightInPixels = height - xAxis.paddingBottom;

  return (
    <div style={{ width, height }}>
      <AxisRenderer xAxis={xAxis} yAxis={yAxis} width={width} height={height} />
    </div>
  );
};

export default ChartRenderer;
