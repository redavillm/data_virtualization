import { TOTAL_BAR_HEIGHT, TOTAL_BAR_WIDTH } from "../constants";
import { IColumn } from "../interfaces";
import { calculateHeight } from "../utilities";

export const Column: React.FC<IColumn> = ({
  title,
  stage: { front, back, db },
  barWidth,
  maxValue,
}) => {
  const frontHeight = calculateHeight(front, maxValue);
  const backHeight = calculateHeight(back, maxValue);
  const dbHeight = calculateHeight(db, maxValue);

  const totalHeight = frontHeight + backHeight + dbHeight;

  return (
    <g transform={`translate(${barWidth}, ${TOTAL_BAR_HEIGHT - totalHeight})`}>
      <g>
        <svg
          width={TOTAL_BAR_WIDTH}
          height={frontHeight}
          viewBox={`0 0 ${TOTAL_BAR_WIDTH} ${frontHeight}`}
        >
          <path
            d={`M10 0C4.47715 0 0 4.47715 0 10V${frontHeight}H${TOTAL_BAR_WIDTH}V10C${TOTAL_BAR_WIDTH} 4.47715 ${
              TOTAL_BAR_WIDTH - 4.47715
            } 0 ${TOTAL_BAR_WIDTH - 10} 0H10Z`}
            fill="#4AB6E8"
          />
        </svg>
        <text
          x={TOTAL_BAR_WIDTH / 2}
          y={frontHeight / 2}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="16"
        >
          {front}
        </text>
      </g>
      <rect
        y={frontHeight}
        width={TOTAL_BAR_WIDTH}
        height={backHeight}
        fill="#AA6FAC"
      />
      <text
        x={TOTAL_BAR_WIDTH / 2}
        y={frontHeight + backHeight / 2}
        fill="white"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="16"
      >
        {back}
      </text>
      <g transform={`translate(0, ${frontHeight + backHeight})`}>
        <path
          d={`M0 0H${TOTAL_BAR_WIDTH}V${dbHeight - 10}C${TOTAL_BAR_WIDTH} ${
            dbHeight - 5
          } ${TOTAL_BAR_WIDTH - 5} ${dbHeight} ${
            TOTAL_BAR_WIDTH - 10
          } ${dbHeight}H10C5 ${dbHeight} 0 ${dbHeight - 5} 0 ${
            dbHeight - 10
          }V0Z`}
          fill="#E85498"
        />
        <text
          x={TOTAL_BAR_WIDTH / 2}
          y={dbHeight / 2}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="16"
        >
          {db}
        </text>
      </g>
      <text
        x={TOTAL_BAR_WIDTH / 2}
        y={totalHeight + 10}
        fill="black"
        textAnchor="middle"
        alignmentBaseline="hanging"
        fontSize="14"
      >
        {title}
      </text>
    </g>
  );
};
