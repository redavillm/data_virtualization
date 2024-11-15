import { TOTAL_BAR_HEIGHT } from "../constants";

export const calculateHeight = (value: number, maxValue: number) =>
  value * (TOTAL_BAR_HEIGHT / maxValue);
