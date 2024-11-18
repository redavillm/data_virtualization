import { BAR_GAPS, COLORS, TOTAL_BAR_WIDTH } from "../../constants";
import { IArrow } from "../../interfaces";
import { prettyNumber } from "../../utilities/prettyNumber";
import { DecreaseArrow } from "./DecreaseArrow";
import { IncreaseArrow } from "./IncreaseArrow";
import { Line } from "./Line";

export const Arrow: React.FC<IArrow> = ({
  difference,
  startX,
  startY,
  endX,
  endY,
}) => {
  const arrowHeight = startY > endY ? startY : endY;

  if (startY < 0 || endY < 0) {
    return null;
  }

  let rectColor: string;
  let rectSign: string;
  let indicatorArrow;

  const rectIndents = TOTAL_BAR_WIDTH + (BAR_GAPS - 48) / 2 - 40;

  if (startY === endY) {
    rectColor = COLORS.DEFAULT;
    rectSign = "";
    indicatorArrow = "";
  } else {
    if (startY > endY) {
      rectColor = COLORS.GOOD; //положительный
      rectSign = "+";
      indicatorArrow = <IncreaseArrow valueX={startX + rectIndents + 5} />;
    } else {
      rectColor = COLORS.BAD; //отрицательный
      rectSign = "-";
      indicatorArrow = <DecreaseArrow valueX={startX + rectIndents + 5} />;
    }
  }

  return (
    <svg
      width={(TOTAL_BAR_WIDTH * 2 + BAR_GAPS) * 2}
      viewBox={`0 0 ${(TOTAL_BAR_WIDTH * 2 + BAR_GAPS) * 2} ${arrowHeight}`}
      height={arrowHeight}
      fill="none"
    >
      <rect
        x={startX + rectIndents}
        width="48"
        height="24"
        rx="12"
        fill={rectColor}
      />
      {Math.round(difference) / 1000 < 1 ? indicatorArrow : null}
      <text
        x={startX + rectIndents + 24}
        y="13"
        fill="white"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="14"
      >
        {rectSign}
        {prettyNumber(Math.round(difference))}
      </text>
      <Line x1={startX} y1={startY} x2={startX} />
      <Line x1={startX} x2={startX + rectIndents} />
      <Line x1={startX + rectIndents + 48} x2={endX} />
      <Line x1={endX} x2={endX} y2={endY} />
      <Line x1={endX} x2={endX} y2={endY} />
      <Line x1={endX} y1={endY} x2={endX - 5} y2={endY - 5} />
      <Line x1={endX} y1={endY} x2={endX + 5} y2={endY - 5} />
    </svg>
  );
};
