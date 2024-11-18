import { COLORS } from "../../constants";
import { ILine } from "../../interfaces";

export const Line: React.FC<ILine> = ({
  x1 = 12,
  y1 = 12,
  x2 = 12,
  y2 = 12,
}) => {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={COLORS.DEFAULT}
      strokeLinecap="round"
    />
  );
};
