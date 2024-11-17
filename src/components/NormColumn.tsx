import { TOTAL_BAR_HEIGHT, TOTAL_BAR_WIDTH } from "../constants";
import { INormColumn } from "../interfaces";
import { calculateHeight } from "../utilities";

export const NormColum: React.FC<INormColumn> = ({
  title,
  norm,
  maxValue,
  barWidth,
}) => {
  const barHeight = calculateHeight(norm, maxValue);

  const position = TOTAL_BAR_HEIGHT - barHeight;

  let translateY = 0;

  switch (title) {
    case "OS Doors":
      translateY = 33;
      break;
    case "OS Bombuntu":
      translateY = 0;
      break;
    case "Mibre Office":
      translateY = 105;
      break;
    case "LoWtEx":
      translateY = 0;
      break;
    default:
      translateY = 0;
  }

  return (
    <g transform={`translate(${barWidth}, ${position})`}>
      <rect
        transform={`translate(0, ${translateY})`}
        width={TOTAL_BAR_WIDTH}
        height={barHeight}
        fill="url(#diagonalLine)"
        rx={10}
        ry={10}
      />
      <rect
        x={TOTAL_BAR_WIDTH / 4}
        y={barHeight / 2 - 10}
        width={TOTAL_BAR_WIDTH / 2}
        height={20}
        fill="white"
        rx={5}
        ry={5}
      />
      <text
        x={TOTAL_BAR_WIDTH / 2}
        y={barHeight / 2}
        fill="black"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="16"
      >
        {norm}
      </text>
      <text
        x={TOTAL_BAR_WIDTH / 2}
        y={barHeight + 10}
        fill="black"
        textAnchor="middle"
        alignmentBaseline="hanging"
        fontSize="14"
      >
        норматив
      </text>
      <defs>
        <pattern
          id="diagonalLine"
          patternUnits="userSpaceOnUse"
          width="100"
          height={TOTAL_BAR_HEIGHT}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.7031 0H10C4.47715 0 0 4.47715 0 10V45.934L41.9436 0H28.9482L0.0733177 31.6219L0.0733178 22.5925L20.7031 0ZM50.1886 0L0 54.9634V185C0 185.412 0.0249141 185.818 0.0733178 186.217V185.983L80 98.4525V84.1404L0.0733177 171.671L0.0733178 162.642L80 75.1109V60.7989L0.0733177 148.33L0.0733178 139.3L80 51.7694V37.4573L0.0733177 124.988L0.0733178 115.959L80 28.4279V14.1158L0.0733177 101.646L0.0733178 92.617L79.1672 5.99837C77.8126 2.89956 74.9328 0.619879 71.4769 0.108297L0.0733177 78.305L0.0733178 69.2755L63.3307 0H50.1886ZM80 107.482L2.8408 191.982C4.65697 193.844 7.19347 195 10 195H13.1536L80 121.794V107.482ZM80 130.823L21.3986 195H34.4674L80 145.135V130.823ZM80 154.165L42.7124 195H55.7811L80 168.477V154.165ZM80 177.506L64.0262 195H70C75.5229 195 80 190.523 80 185V177.506Z"
            fill="#4AB6E8"
          />
        </pattern>
      </defs>
    </g>
  );
};
