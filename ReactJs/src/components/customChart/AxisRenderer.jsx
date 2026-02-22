import "./axisStyles.css";
import { buildTicks } from "./buildTicks";
import { convertPointCoordinateToPixel } from "./pixelConverter";

const AxisRenderer = ({ width, height, xAxis, yAxis }) => {
  const paddingBottom = xAxis.paddingBottom;
  const paddingLeft = yAxis.paddingLeft;

  const xTicks = buildTicks({
    axisStart: xAxis.start,
    axisEnd: xAxis.end,
    interval: xAxis.interval,
  });

  return (
    <>
      <div
        className="axis-line"
        style={{
          bottom: paddingBottom,
          left: paddingLeft,
          height: "2px",
          width: width - paddingLeft,
        }}
      >
        {"\u00A0"}
      </div>
      <div
        className="axis-line"
        style={{
          width: "2px",
          height: height - paddingBottom,
          left: paddingLeft,
          bottom: paddingBottom,
        }}
      >
        {"\u00A0"}
      </div>
      {xTicks.map((tickValue, index) => {
        const positionInPixels = convertPointCoordinateToPixel({
          point: tickValue,
          axisStart: xAxis.start,
          axisEnd: xAxis.end,
          axisWidthInPixels: width - paddingLeft,
        });
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: paddingLeft + positionInPixels,
              bottom: paddingBottom - 12,
              height: "12px",
              width: "1px",
              backgroundColor: "gray",
            }}
          >
            {"\u00A0"}
          </div>
        );
      })}
    </>
  );
};

export default AxisRenderer;
