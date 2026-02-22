export const convertPointCoordinateToPixel = ({ point, axisStart, axisEnd,  axisWidthInPixels}) => {
    const axisSizeInUnits = axisEnd - axisStart;
    const pixelPerUnit = axisWidthInPixels / axisSizeInUnits;
    return (point - axisStart) * pixelPerUnit;
}
