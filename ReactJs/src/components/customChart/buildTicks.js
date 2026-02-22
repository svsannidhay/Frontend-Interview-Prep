export const buildTicks = ({ axisStart, axisEnd, interval }) => {
    const ticks = [];
    for (let tickValue = axisStart; tickValue <= axisEnd; tickValue += interval) {
        ticks.push(tickValue);
    }
    return ticks;
}